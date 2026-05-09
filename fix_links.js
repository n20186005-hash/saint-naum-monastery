const fs = require('fs');
const files = [
  'src/components/Gallery.tsx',
  'src/components/MapEmbed.tsx',
  'src/components/Reviews.tsx'
];
for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/https:\/\/maps\.app\.goo\.gl\/XDcyssi4yjc5w5kQ9/g, 'https://maps.app.goo.gl/tBYxnMmu8qMX3yGa6');
  fs.writeFileSync(file, content, 'utf8');
}
console.log('Links fixed!');