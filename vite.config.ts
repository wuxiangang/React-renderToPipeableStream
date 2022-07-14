import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path'
import { entry, assets } from './config';

export const pathResolver = (pathStr: string) => {
	return resolve(__dirname, '.', pathStr)
}

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
          '@': pathResolver('./src')
        },
      },
    plugins: [react()],
    build: {
      // terserOptions: {
      //   compress: {
      //     drop_console: false
      //   }
      // },
      rollupOptions: {
        input: {
          [entry]: pathResolver('./src/entry-client.tsx'),
        },
        output: {
          // 入口文件名
          entryFileNames: `${assets}/[name].js`,
          // 块文件名
          chunkFileNames: `${assets}/[name].js`,
          // 资源文件名 css 图片等等
          assetFileNames: `${assets}/[name].[ext]`,
        }
      }
    }
});
