const fs = require('fs');
const path = require('path');

const dir = 'src/components';
const files = fs.readdirSync(dir)
  .filter(f => f.startsWith('Petrovaradin') && f.endsWith('.tsx'))
  .map(f => path.join(dir, f));

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/useTranslations\('petrovaradin\./g, "useTranslations('");
  content = content.replace(/messages\?\.petrovaradin\?/g, "messages?");
  fs.writeFileSync(file, content, 'utf8');
}
console.log('Keys fixed!');