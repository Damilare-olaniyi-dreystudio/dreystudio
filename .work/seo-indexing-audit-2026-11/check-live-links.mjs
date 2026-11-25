import { writeFile } from 'node:fs/promises';

const paths = [
  '/work/skincare-website/', '/privacy-policy', '/website-developer-nigeria',
  '/work/Nexus-Construction/', '/website-developer-lagos', '/website-developer-abuja',
  '/pricing', '/blog/top-web-designers-in-nigeria-2026/', '/contact', '/website-developer-ibadan',
];
let next = 0;
const results = new Array(paths.length);
async function check(path) {
  const requestedUrl = `https://dreystudio.ng${path}`;
  try {
    const response = await fetch(requestedUrl, {
      redirect: 'follow',
      headers: { 'user-agent': 'Mozilla/5.0 (compatible; DreyStudioSEOAudit/1.0)' },
      signal: AbortSignal.timeout(15000),
    });
    const html = await response.text();
    const hrefs = [...html.matchAll(/\bhref\s*=\s*["']([^"']+)["']/gi)].map(match => match[1].replaceAll('&amp;', '&'));
    const wwwInternal = [...new Set(hrefs.filter(href => /^https?:\/\/www\.dreystudio\.ng(?:[/:?#]|$)/i.test(href)))];
    const apexInternal = [...new Set(hrefs.filter(href => /^https?:\/\/dreystudio\.ng(?:[/:?#]|$)/i.test(href)))];
    return { requestedUrl, status: response.status, finalUrl: response.url, wwwInternalCount: wwwInternal.length, wwwInternal: wwwInternal.slice(0, 30), apexInternalCount: apexInternal.length, contentType: response.headers.get('content-type'), error: null };
  } catch (error) {
    return { requestedUrl, error: `${error.name}: ${error.message}` };
  }
}
async function worker() {
  while (next < paths.length) {
    const index = next++;
    results[index] = await check(paths[index]);
  }
}
await Promise.all(Array.from({ length: 4 }, () => worker()));
const outputPath = process.argv[2] ?? '.work/seo-indexing-audit-2026-11/live-link-results.json';
await writeFile(outputPath, `${JSON.stringify({ results }, null, 2)}\n`, 'utf8');
for (const result of results) console.log(`${result.requestedUrl}\tstatus=${result.status ?? 'ERROR'}\tfinal=${result.finalUrl ?? ''}\twwwInternal=${result.wwwInternalCount ?? 0}${result.error ? `\t${result.error}` : ''}${result.wwwInternal?.length ? `\t${result.wwwInternal.join(' | ')}` : ''}`);
console.log(`Saved details to ${outputPath}`);
