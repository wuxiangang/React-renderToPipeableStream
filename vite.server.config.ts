import { defineConfig } from 'vite';
import { assets } from './config';
import baseConfig, { pathResolver } from './vite.config'

// https://vitejs.dev/config/
export default defineConfig({
  ...baseConfig,
  build: {
    outDir: 'dist/server',
    ssr: pathResolver('./src/entry-server.tsx'),
    rollupOptions: {
      output: {
        // 入口文件名
        entryFileNames: `[name].js`,
        // 块文件名
        chunkFileNames: `${assets}/[name].js`,
        // 资源文件名 css 图片等等
        assetFileNames: `${assets}/[name].[ext]`,
      }
    }
  }
});
