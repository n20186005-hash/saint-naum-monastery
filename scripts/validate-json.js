/**
 * 验证所有 JSON 文件的语法
 * Validate all JSON files for syntax errors
 */

const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const srcDir = path.join(rootDir, 'src');
const messagesDir = path.join(srcDir, 'messages');
const componentsDir = path.join(srcDir, 'components');

// 递归查找所有 JSON 文件
function findJsonFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      findJsonFiles(filePath, fileList);
    } else if (file.endsWith('.json')) {
      fileList.push(filePath);
    }
  }
  
  return fileList;
}

// 验证单个 JSON 文件
function validateJsonFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    JSON.parse(content);
    return { valid: true, error: null };
  } catch (err) {
    return { valid: false, error: err.message };
  }
}

// 主验证函数
async function validateAllJson() {
  console.log('🔍 开始验证 JSON 文件...\n');
  
  const jsonFiles = findJsonFiles(rootDir);
  let hasErrors = false;
  const errors = [];

  console.log(`📊 找到 ${jsonFiles.length} 个 JSON 文件\n`);

  for (const filePath of jsonFiles) {
    const relativePath = path.relative(rootDir, filePath);
    const result = validateJsonFile(filePath);
    
    if (!result.valid) {
      console.log(`❌ ${relativePath}`);
      console.log(`   错误: ${result.error}\n`);
      errors.push({ file: relativePath, error: result.error });
      hasErrors = true;
    } else {
      console.log(`✅ ${relativePath}`);
    }
  }

  console.log('\n📊 验证总结:');
  if (hasErrors) {
    console.log(`❌ 发现 ${errors.length} 个 JSON 格式错误:`);
    errors.forEach(e => console.log(`   - ${e.file}: ${e.error}`));
    return false;
  } else {
    console.log('✅ 所有 JSON 文件格式正确！');
    return true;
  }
}

// 运行验证
validateAllJson().then(success => {
  process.exit(success ? 0 : 1);
}).catch(err => {
  console.error('❌ 验证过程中发生错误:', err);
  process.exit(1);
});
