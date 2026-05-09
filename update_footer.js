const fs = require('fs');
const path = require('path');

const files = [
  'src/messages/zh.json',
  'src/messages/en.json',
  'src/messages/petrovaradin.zh.json',
  'src/messages/petrovaradin.en.json'
];

for (const file of files) {
  const filePath = path.resolve(file);
  if (!fs.existsSync(filePath)) continue;
  
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  if (data.footer) {
    data.footer.logo = 'Petrovaradin Fortress Clock';
  }

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8');
}
console.log('Footer updated.');
