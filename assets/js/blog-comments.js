import { initializeApp } from 'https://www.gstatic.com/firebasejs/13.0.0/firebase-app.js';
import {
  collection,
  doc,
  getFirestore,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where,
  writeBatch
} from 'https://www.gstatic.com/firebasejs/13.0.0/firebase-firestore.js';
import { firebaseConfig } from './firebase-blog-config.js';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mppqvbkb';
const COMMENTS_PER_POST = 50;

function makeElement(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text !== undefined) element.textContent = text;
  return element;
}

function appendField(form, labelText, input, required) {
  const label = makeElement('label', '', required ? `${labelText} *` : labelText);
  label.append(input);
  form.append(label);
}

function buildCommentSection(articleId, articleTitle) {
  const section = makeElement('section', 'blog-comments');
  section.id = 'comments';
  section.setAttribute('aria-labelledby', 'blog-comments-title');
  section.dataset.articleId = articleId;

  const kicker = makeElement('div', 'blog-kicker', 'Join the conversation');
  const title = makeElement('h2', '', 'Leave a Reply');
  title.id = 'blog-comments-title';
  const intro = makeElement('p', 'blog-comments-intro', 'Your email address will not be published. Required fields are marked * . Comments appear after review.');
  const list = makeElement('div', 'blog-comments-list');
  list.setAttribute('aria-live', 'polite');
  list.append(makeElement('p', 'blog-comments-empty', 'Loading comments…'));

  const form = makeElement('form', 'blog-comment-form');
  form.noValidate = true;
  form.setAttribute('aria-label', `Leave a comment on ${articleTitle}`);

  const name = document.createElement('input');
  name.name = 'name';
  name.type = 'text';
  name.required = true;
  name.maxLength = 80;
  name.autocomplete = 'name';
  appendField(form, 'Name', name, true);

  const email = document.createElement('input');
  email.name = 'email';
  email.type = 'email';
  email.required = true;
  email.maxLength = 254;
  email.autocomplete = 'email';
  appendField(form, 'Email', email, true);

  const website = document.createElement('input');
  website.name = 'website';
  website.type = 'url';
  website.maxLength = 200;
  website.autocomplete = 'url';
  website.placeholder = 'https://';
  appendField(form, 'Website (optional)', website, false);

  const comment = document.createElement('textarea');
  comment.name = 'comment';
  comment.required = true;
  comment.maxLength = 4000;
  comment.autocomplete = 'off';
  comment.setAttribute('aria-label', 'Comment');
  appendField(form, 'Comment', comment, true);

  const saveLabel = makeElement('label', 'blog-comment-save');
  const save = document.createElement('input');
  save.name = 'save-details';
  save.type = 'checkbox';
  saveLabel.append(save, document.createTextNode('Save my name, email, and website in this browser for the next time I comment.'));
  form.append(saveLabel);

  const honeypotLabel = makeElement('label', 'blog-comment-honeypot', 'Leave this field empty');
  const honeypot = document.createElement('input');
  honeypot.name = '_gotcha';
  honeypot.type = 'text';
  honeypot.tabIndex = -1;
  honeypot.autocomplete = 'off';
  honeypotLabel.append(honeypot);
  form.append(honeypotLabel);

  const submit = makeElement('button', 'blog-comment-submit', 'Post a comment');
  submit.type = 'submit';
  form.append(submit);

  const status = makeElement('p', 'blog-comment-status');
  status.setAttribute('role', 'status');
  status.setAttribute('aria-live', 'polite');
  form.append(status);
  section.append(kicker, title, intro, list, form);

  return { section, form, list, status, submit, fields: { comment, name, email, website, save, honeypot } };
}

function safeWebsite(value) {
  if (!value) return '';
  try {
    const url = new URL(value);
    return ['http:', 'https:'].includes(url.protocol) ? url.href : '';
  } catch {
    return '';
  }
}

function renderComments(list, comments) {
  list.replaceChildren();
  if (!comments.length) {
    list.append(makeElement('p', 'blog-comments-empty', 'No replies yet. You can start the conversation.'));
    return;
  }
  comments.forEach((comment) => {
    const item = makeElement('article', 'blog-comment-item');
    const meta = makeElement('div', 'blog-comment-item__meta');
    const displayName = makeElement('span', 'blog-comment-item__name', comment.name || 'Reader');
    meta.append(displayName);
    if (comment.createdAt?.toDate) {
      const date = comment.createdAt.toDate();
      meta.append(makeElement('time', '', new Intl.DateTimeFormat(undefined, { dateStyle: 'medium' }).format(date)));
    }
    const website = safeWebsite(comment.website);
    if (website) {
      const link = makeElement('a', 'blog-comment-item__website', 'Website');
      link.href = website;
      link.target = '_blank';
      link.rel = 'nofollow noopener noreferrer';
      meta.append(link);
    }
    item.append(meta, makeElement('p', 'blog-comment-item__body', comment.body || ''));
    list.append(item);
  });
}

function setStatus(status, message, state = '') {
  status.textContent = message;
  if (state) status.dataset.state = state;
  else delete status.dataset.state;
}

async function sendFormspreeNotification({ articleTitle, articleUrl, name, email, body }) {
  const response = await fetch(FORMSPREE_ENDPOINT, {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({
      _subject: `New blog comment awaiting approval: ${articleTitle}`,
      name,
      email,
      article: articleTitle,
      article_url: articleUrl,
      comment: body,
      _gotcha: ''
    })
  });
  if (!response.ok) throw new Error('The notification email could not be sent.');
}

async function initCommentSection(ui, db) {
  const { section, form, list, status, submit, fields } = ui;
  const articleId = section.dataset.articleId;
  const articleTitle = document.querySelector('.blog-article-title, h1')?.textContent.trim() || 'Drey Studio blog post';
  const articleUrl = window.location.href;

  try {
    const commentsQuery = query(
      collection(db, 'blogComments', articleId, 'entries'),
      where('status', '==', 'approved'),
      orderBy('createdAt', 'desc'),
      limit(COMMENTS_PER_POST)
    );
    onSnapshot(commentsQuery, (snapshot) => {
      renderComments(list, snapshot.docs.map((item) => item.data()));
    }, () => {
      list.replaceChildren(makeElement('p', 'blog-comments-empty', 'Comments are temporarily unavailable. Please try again later.'));
    });
  } catch {
    list.replaceChildren(makeElement('p', 'blog-comments-empty', 'Comments are temporarily unavailable. Please try again later.'));
  }

  const savedDetails = localStorage.getItem('drey-blog-comment-details');
  if (savedDetails) {
    try {
      const details = JSON.parse(savedDetails);
      fields.name.value = details.name || '';
      fields.email.value = details.email || '';
      fields.website.value = details.website || '';
      fields.save.checked = true;
    } catch {
      localStorage.removeItem('drey-blog-comment-details');
    }
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (fields.honeypot.value) return;
    if (!form.reportValidity()) return;

    const values = {
      name: fields.name.value.trim(),
      email: fields.email.value.trim(),
      website: safeWebsite(fields.website.value.trim()),
      body: fields.comment.value.trim()
    };
    if (values.name.length < 2 || values.body.length < 3 || !values.email) {
      setStatus(status, 'Please complete the required fields.', 'error');
      return;
    }
    if (fields.website.value.trim() && !values.website) {
      setStatus(status, 'Please enter a valid website URL.', 'error');
      return;
    }

    submit.disabled = true;
    setStatus(status, 'Submitting your comment…');
    try {
      const entryRef = doc(collection(db, 'blogComments', articleId, 'entries'));
      const privateRef = doc(db, 'blogCommentPrivate', entryRef.id);
      const batch = writeBatch(db);
      batch.set(entryRef, {
        name: values.name,
        body: values.body,
        website: values.website,
        status: 'pending',
        createdAt: serverTimestamp()
      });
      batch.set(privateRef, {
        articleId,
        email: values.email,
        createdAt: serverTimestamp()
      });
      await batch.commit();

      if (fields.save.checked) {
        localStorage.setItem('drey-blog-comment-details', JSON.stringify({ name: values.name, email: values.email, website: values.website }));
      } else {
        localStorage.removeItem('drey-blog-comment-details');
      }

      fields.comment.value = '';
      fields.honeypot.value = '';
      try {
        await sendFormspreeNotification({ ...values, articleTitle, articleUrl });
        setStatus(status, 'Thanks for your comment. It has been sent for review and will appear after approval.');
      } catch {
        setStatus(status, 'Your comment was saved for review, but the email alert could not be sent.');
      }
    } catch (error) {
      console.error('Could not save blog comment:', error);
      setStatus(status, 'We could not submit your comment right now. Please try again shortly.', 'error');
    } finally {
      submit.disabled = false;
    }
  });
}

function initializeComments() {
  const article = document.querySelector('.blog-article-page');
  if (!article) return;
  const articleId = window.location.pathname.split('/').filter(Boolean).at(-1);
  if (!articleId || articleId === '_template') return;
  const cta = article.querySelector('.blog-cta');
  if (!cta || article.querySelector('.blog-comments')) return;

  const ui = buildCommentSection(articleId, document.querySelector('.blog-article-title, h1')?.textContent.trim() || 'Drey Studio blog post');
  cta.before(ui.section);
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  initCommentSection(ui, db);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeComments, { once: true });
} else {
  initializeComments();
}
