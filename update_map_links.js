const fs = require('fs');
const path = require('path');

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  // Regex to match existing google maps links
  const mapRegex = /https:\/\/maps\.app\.goo\.gl\/[a-zA-Z0-9]+/g;
  content = content.replace(mapRegex, 'https://maps.app.goo.gl/tBYxnMmu8qMX3yGa6');
  fs.writeFileSync(filePath, content, 'utf8');
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      replaceInFile(fullPath);
    }
  }
}

walkDir(path.join(__dirname, 'src', 'components'));
console.log('Replaced map links in components.');
