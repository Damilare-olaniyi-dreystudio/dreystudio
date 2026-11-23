const fs = require('fs');
const path = 'C:/Users/PC/Downloads/dreystudio-main/about.html';
const html = fs.readFileSync(path, 'utf8');
const secondDocument = html.indexOf('<html lang="en">', html.indexOf('<html lang="en">') + 1);
if (secondDocument < 0) throw new Error('Duplicated About document boundary not found.');
const repaired = '<!DOCTYPE html>\n' + html.slice(secondDocument);
fs.writeFileSync(path, repaired, 'utf8');
console.log('About duplicate document removed.');
