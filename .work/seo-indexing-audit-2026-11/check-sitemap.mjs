import { readFile, writeFile } from 'node:fs/promises';

const sitemapPath = process.argv[2] ?? 'sitemap.xml';
const outputPath = process.argv[3] ?? '.work/seo-indexing-audit-2026-11/sitemap-results.json';
const xml = await readFile(sitemapPath, 'utf8');
const urls = [...xml.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/g)].map(match => match[1].trim());

async function check(url) {
  const chain = [];
  let current = url;
  try {
    for (let hop = 0; hop <= 8; hop += 1) {
      const response = await fetch(current, {
        redirect: 'manual',
        headers: { 'user-agent': 'Mozilla/5.0 (compatible; DreyStudioSEOAudit/1.0)' },
        signal: AbortSignal.timeout(15000),
      });
      const location = response.headers.get('location');
      chain.push({
        url: current,
        status: response.status,
        location,
        server: response.headers.get('server'),
        contentType: response.headers.get('content-type'),
      });
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
      return { sitemapUrl: url, chain, finalUrl: current, finalStatus: response.status, canonical, ogUrl, title, error: null };
    }
    return { sitemapUrl: url, chain, error: 'Redirect limit exceeded' };
  } catch (error) {
    return { sitemapUrl: url, chain, error: `${error.name}: ${error.message}` };
  }
}

let next = 0;
const results = new Array(urls.length);
async function worker() {
  while (next < urls.length) {
    const index = next++;
    results[index] = await check(urls[index]);
  }
}
await Promise.all(Array.from({ length: 5 }, () => worker()));
await writeFile(outputPath, `${JSON.stringify({ checkedAt: new Date().toISOString(), sitemapPath, entryCount: urls.length, results }, null, 2)}\n`, 'utf8');
const exceptions = results.filter(result => result.error || result.finalStatus !== 200 || result.chain.length > 1 || (result.canonical && result.canonical !== result.finalUrl));
console.log(`Entries=${urls.length}; final 200=${results.filter(result => result.finalStatus === 200).length}; redirected=${results.filter(result => result.chain.length > 1).length}; non-200=${results.filter(result => result.finalStatus !== 200).length}; errors=${results.filter(result => result.error).length}; self-canonical-mismatch=${results.filter(result => result.canonical && result.canonical !== result.finalUrl).length}`);
for (const result of exceptions) console.log(`${result.sitemapUrl}\t${result.error ?? `final=${result.finalStatus} ${result.finalUrl}; canonical=${result.canonical ?? '(missing)'}`}`);
console.log(`Saved full response data to ${outputPath}`);
