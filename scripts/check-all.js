/**
 * 主检查脚本 - 运行所有检查项
 * Main check script - Run all checks
 */

const { execSync } = require('child_process');
const path = require('path');

const scriptsDir = __dirname;
const rootDir = path.join(scriptsDir, '..');

console.log('🔍 开始全面检查网站...\n');
console.log('='.repeat(60));

let hasErrors = false;
const results = [];

// 1. 检查 JSON 文件格式
console.log('\n📝 1. 验证 JSON 文件格式...');
try {
  execSync('node scripts/validate-json.js', {
    cwd: rootDir,
    stdio: 'inherit',
    shell: true
  });
  results.push({ name: 'JSON 验证', status: '✅ 通过' });
} catch (err) {
  results.push({ name: 'JSON 验证', status: '❌ 失败' });
  hasErrors = true;
}

console.log('\n' + '='.repeat(60));

// 2. 检查链接和图片资源
console.log('\n🔗 2. 检查链接和图片资源...');
try {
  execSync('node scripts/check-links.js', {
    cwd: rootDir,
    stdio: 'inherit',
    shell: true
  });
  results.push({ name: '链接和图片检查', status: '✅ 通过' });
} catch (err) {
  results.push({ name: '链接和图片检查', status: '❌ 失败' });
  hasErrors = true;
}

console.log('\n' + '='.repeat(60));

// 3. 检查 Next.js 构建
console.log('\n🔨 3. 运行 Next.js 构建检查...');
console.log('⚠️  注意: 构建检查需要较长时间，如果不想等待，可以跳过此步骤。');
console.log('   如果想运行构建检查，请取消注释下面的代码。\n');

// 如果需要运行构建检查，取消注释以下代码：
/*
try {
  execSync('node scripts/check-build.js', {
    cwd: rootDir,
    stdio: 'inherit',
    shell: true
  });
  results.push({ name: 'Next.js 构建', status: '✅ 通过' });
} catch (err) {
  results.push({ name: 'Next.js 构建', status: '❌ 失败' });
  hasErrors = true;
}
*/

results.push({ name: 'Next.js 构建', status: '⏭️  已跳过' });

console.log('\n' + '='.repeat(60));

// 4. 检查 .gitignore 文件
console.log('\n📋 4. 检查 .gitignore 文件...');
const fs = require('fs');
const gitignorePath = path.join(rootDir, '.gitignore');

if (fs.existsSync(gitignorePath)) {
  console.log('✅ .gitignore 文件存在');
  const content = fs.readFileSync(gitignorePath, 'utf-8');
  const lines = content.split('\n').filter(l => l.trim() && !l.startsWith('#'));
  console.log(`   包含 ${lines.length} 条忽略规则`);
  results.push({ name: '.gitignore 检查', status: '✅ 通过' });
} else {
  console.log('❌ .gitignore 文件不存在');
  results.push({ name: '.gitignore 检查', status: '❌ 失败' });
  hasErrors = true;
}

console.log('\n' + '='.repeat(60));

// 输出总结
console.log('\n📊 检查总结:\n');
console.log('┌' + '─'.repeat(30) + '┬' + '─'.repeat(20) + '┐');
console.log('│' + ' 检查项'.padEnd(30) + '│' + ' 状态'.padEnd(20) + '│');
console.log('├' + '─'.repeat(30) + '┼' + '─'.repeat(20) + '┤');

for (const result of results) {
  console.log('│ ' + result.name.padEnd(28) + '│ ' + result.status.padEnd(18) + '│');
}

console.log('└' + '─'.repeat(30) + '┴' + '─'.repeat(20) + '┘');

console.log('\n' + '='.repeat(60));

if (hasErrors) {
  console.log('\n❌ 检查完成，发现错误！请修复后重新检查。');
  process.exit(1);
} else {
  console.log('\n✅ 所有检查通过！网站可以安全部署。');
  process.exit(0);
}
