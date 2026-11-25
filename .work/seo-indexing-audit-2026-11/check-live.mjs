import { writeFile } from 'node:fs/promises';

const paths = [
  '/work/skincare-website/',
  '/privacy-policy',
  '/website-developer-nigeria',
  '/work/Nexus-Construction/',
  '/website-developer-lagos',
  '/website-developer-abuja',
  '/pricing',
  '/blog/top-web-designers-in-nigeria-2026/',
  '/contact',
  '/website-developer-ibadan',
];
const targets = [
  ...paths.map(path => ({ role: 'reported-www', url: `https://www.dreystudio.ng${path}`, expected: `https://dreystudio.ng${path}` })),
  ...paths.map(path => ({ role: 'preferred-origin', url: `https://dreystudio.ng${path}`, expected: `https://dreystudio.ng${path}` })),
  { role: 'robots', url: 'https://dreystudio.ng/robots.txt', expected: 'https://dreystudio.ng/robots.txt' },
  { role: 'sitemap', url: 'https://dreystudio.ng/sitemap.xml', expected: 'https://dreystudio.ng/sitemap.xml' },
];

async function trace(target) {
  const chain = [];
  let current = target.url;
  try {
    for (let hop = 0; hop <= 8; hop += 1) {
      const response = await fetch(current, {
        redirect: 'manual',
        headers: { 'user-agent': 'Mozilla/5.0 (compatible; DreyStudioSEOAudit/1.0)' },
        signal: AbortSignal.timeout(15000),
      });
      const location = response.headers.get('location');
      chain.push({ url: current, status: response.status, location });
      if ([301, 302, 303, 307, 308].includes(response.status) && location) {
        current = new URL(location, current).href;
        await response.body?.cancel();
        continue;
      }
      const body = await response.text();
      const canonical = body.match(/<link\b(?=[^>]*\brel=["']canonical["'])[^>]*\bhref=["']([^"']+)["'][^>]*>/i)?.[1]
        ?? body.match(/<link\b[^>]*\bhref=["']([^"']+)["'][^>]*\brel=["']canonical["'][^>]*>/i)?.[1]
        ?? null;
      const ogUrl = body.match(/<meta\b(?=[^>]*\bproperty=["']og:url["'])[^>]*\bcontent=["']([^"']+)["'][^>]*>/i)?.[1]
        ?? body.match(/<meta\b[^>]*\bcontent=["']([^"']+)["'][^>]*\bproperty=["']og:url["'][^>]*>/i)?.[1]
        ?? null;
      const title = body.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.replace(/\s+/g, ' ').trim() ?? null;
      return {
        role: target.role,
        requestedUrl: target.url,
        expectedUrl: target.expected,
        chain,
        finalUrl: current,
        finalStatus: response.status,
        canonical,
        ogUrl,
        title,
        contentType: response.headers.get('content-type'),
        error: null,
      };
    }
    return { role: target.role, requestedUrl: target.url, expectedUrl: target.expected, chain, error: 'Redirect limit exceeded' };
  } catch (error) {
    return { role: target.role, requestedUrl: target.url, expectedUrl: target.expected, chain, error: `${error.name}: ${error.message}` };
  }
}

let next = 0;
const results = new Array(targets.length);
async function worker() {
  while (next < targets.length) {
    const index = next++;
    results[index] = await trace(targets[index]);
  }
}
await Promise.all(Array.from({ length: 5 }, () => worker()));
const outputPath = process.argv[2] ?? '.work/seo-indexing-audit-2026-11/live-url-results.json';
await writeFile(outputPath, `${JSON.stringify({ checkedAt: new Date().toISOString(), results }, null, 2)}\n`, 'utf8');
for (const result of results) {
  if (result.error) {
    console.log(`${result.role}\t${result.requestedUrl}\tERROR\t${result.error}`);
    continue;
  }
  const first = result.chain[0];
  console.log(`${result.role}\t${result.requestedUrl}\tfirst=${first.status}${first.location ? ` => ${first.location}` : ''}\tfinal=${result.finalStatus} ${result.finalUrl}\tcanonical=${result.canonical ?? '(missing)'}\tog=${result.ogUrl ?? '(missing)'}`);
}
console.log(`Saved raw results to ${outputPath}`);
