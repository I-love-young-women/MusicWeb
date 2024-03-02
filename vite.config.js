import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      // 配置别名，指向需要的路径
      '@': path.resolve(__dirname, 'src'),
      // 如果您使用require函数加载资源，也可以配置别名指向需要的路径
      'assets': path.resolve(__dirname, 'src/assets')
    }
  }
});
