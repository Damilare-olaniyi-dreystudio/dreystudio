const fs = require('node:fs');
const vm = require('node:vm');
const html = fs.readFileSync('index.html', 'utf8');
const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map((match) => match[1]);
if (scripts.length === 0) throw new Error('No inline JavaScript blocks found.');
for (const [index, source] of scripts.entries()) {
  try {
    new vm.Script(source, { filename: `index-inline-${index + 1}.js` });
  } catch (error) {
    throw new Error(`Inline script ${index + 1} failed: ${error.message}`);
  }
}
console.log(`PASS: parsed ${scripts.length} inline JavaScript blocks.`);
