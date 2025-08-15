import { build } from 'vite';
import { copyFile, mkdir } from 'fs/promises';
import { resolve } from 'path';

async function buildExtension() {
  try {
    console.log('开始构建扩展...');
    
    // 构建React应用
    await build();
    
    // 复制必要的文件到dist目录
    const distDir = resolve(process.cwd(), 'dist');
    
    // 确保dist目录存在
    await mkdir(distDir, { recursive: true });
    
    // 复制manifest.json
    await copyFile(
      resolve(process.cwd(), 'public/manifest.json'),
      resolve(distDir, 'manifest.json')
    );
    
    // 复制content.js
    await copyFile(
      resolve(process.cwd(), 'public/content.js'),
      resolve(distDir, 'content.js')
    );
    
    // 复制图标
    await copyFile(
      resolve(process.cwd(), 'public/vite.svg'),
      resolve(distDir, 'vite.svg')
    );
    
    console.log('✅ 扩展构建完成！');
    console.log('📁 构建文件位于: dist/ 目录');
    console.log('🔧 请将dist目录加载到Chrome扩展管理页面');
    
  } catch (error) {
    console.error('❌ 构建失败:', error);
    process.exit(1);
  }
}

buildExtension();
