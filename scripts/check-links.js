/**
 * 检查翻译文件中的链接是否有效
 * Check for broken links in translation files
 */

const fs = require('fs');
const path = require('path');

const messagesDir = path.join(__dirname, '..', 'src', 'messages');
const galleryDir = path.join(__dirname, '..', 'public', 'gallery');

// 检查图片文件是否存在
function checkImageExists(imagePath) {
  const fullPath = path.join(__dirname, '..', 'public', imagePath);
  return fs.existsSync(fullPath);
}

// 检查 Google Maps 链接格式是否有效
function checkGoogleMapsLink(url) {
  if (!url) return { valid: false, error: 'URL is empty' };
  if (url.includes('maps.app.goo.gl') || url.includes('google.com/maps')) {
    return { valid: true, message: 'Valid Google Maps URL' };
  }
  return { valid: false, error: 'Invalid Google Maps URL format' };
}

// 主检查函数
async function checkLinks() {
  console.log('🔍 开始检查链接和图片资源...\n');
  
  const jsonFiles = fs.readdirSync(messagesDir).filter(f => f.endsWith('.json'));
  let hasErrors = false;
  const results = [];

  for (const file of jsonFiles) {
    const filePath = path.join(messagesDir, file);
    const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    
    console.log(`📝 检查文件: ${file}`);
    
    // 检查 gallery 中的图片
    if (content.gallery && content.gallery.photos) {
      for (const photo of content.gallery.photos) {
        if (!checkImageExists(photo.src)) {
          console.log(`  ❌ 图片不存在: ${photo.src}`);
          results.push({ file, error: `Missing image: ${photo.src}` });
          hasErrors = true;
        } else {
          console.log(`  ✅ 图片存在: ${photo.src}`);
        }
      }
    }
    
    // 检查 hero 背景图
    if (content.hero && content.hero.bgImage) {
      if (!checkImageExists(content.hero.bgImage)) {
        console.log(`  ❌ 背景图不存在: ${content.hero.bgImage}`);
        results.push({ file, error: `Missing bg image: ${content.hero.bgImage}` });
        hasErrors = true;
      } else {
        console.log(`  ✅ 背景图存在: ${content.hero.bgImage}`);
      }
    }
    
    // 检查 Google Maps 链接
    if (content.mapSection) {
      if (content.mapSection.openMapsUrl) {
        const result = checkGoogleMapsLink(content.mapSection.openMapsUrl);
        if (!result.valid) {
          console.log(`  ❌ 无效的 Maps 链接: ${content.mapSection.openMapsUrl}`);
          results.push({ file, error: `Invalid Maps URL: ${content.mapSection.openMapsUrl}` });
          hasErrors = true;
        } else {
          console.log(`  ✅ Maps 链接有效: ${content.mapSection.openMapsUrl}`);
        }
      }
    }
    
    console.log('');
  }

  console.log('\n📊 检查总结:');
  if (hasErrors) {
    console.log(`❌ 发现 ${results.length} 个错误:`);
    results.forEach(r => console.log(`  - ${r.file}: ${r.error}`));
    return false;
  } else {
    console.log('✅ 所有链接和图片资源检查通过！');
    return true;
  }
}

// 运行检查
checkLinks().then(success => {
  process.exit(success ? 0 : 1);
}).catch(err => {
  console.error('❌ 检查过程中发生错误:', err);
  process.exit(1);
});
