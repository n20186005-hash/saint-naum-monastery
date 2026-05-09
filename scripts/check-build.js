/**
 * 运行 Next.js 构建并检查错误
 * Run Next.js build and check for errors
 */

const { execSync } = require('child_process');
const path = require('path');

const rootDir = path.join(__dirname, '..');

async function checkBuild() {
  console.log('🔨 开始 Next.js 构建检查...\n');
  console.log('⏳ 这可能需要几分钟，请耐心等待...\n');

  try {
    // 检查 node_modules 是否存在
    const nodeModulesPath = path.join(rootDir, 'node_modules');
    if (!require('fs').existsSync(nodeModulesPath)) {
      console.log('📦 未找到 node_modules，正在安装依赖...\n');
      execSync('npm install', {
        cwd: rootDir,
        stdio: 'inherit',
        shell: true
      });
      console.log('\n✅ 依赖安装完成\n');
    }

    console.log('🚀 开始构建项目...\n');
    
    // 运行构建
    const output = execSync('npm run build', {
      cwd: rootDir,
      encoding: 'utf-8',
      stdio: 'pipe',
      shell: true
    });

    console.log(output);
    console.log('\n✅ 构建成功！没有发现错误。');
    return true;

  } catch (error) {
    console.log('\n❌ 构建失败！错误信息:\n');
    console.log(error.stdout || error.stderr || error.message);
    
    // 检查常见错误
    const errorOutput = error.stdout || error.stderr || '';
    
    if (errorOutput.includes('Module not found')) {
      console.log('\n💡 提示: 可能存在模块导入错误，请检查组件导入路径。');
    }
    
    if (errorOutput.includes('SyntaxError')) {
      console.log('\n💡 提示: 可能存在语法错误，请检查相关文件。');
    }
    
    if (errorOutput.includes('Cannot find module')) {
      console.log('\n💡 提示: 可能缺少依赖模块，请运行 npm install。');
    }

    return false;
  }
}

// 运行构建检查
checkBuild().then(success => {
  process.exit(success ? 0 : 1);
}).catch(err => {
  console.error('❌ 检查过程中发生错误:', err);
  process.exit(1);
});
