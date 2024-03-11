// vite.config.js
import { defineConfig } from "file:///D:/place/music/cloud-music/node_modules/vite/dist/node/index.js";
import vue from "file:///D:/place/music/cloud-music/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import path from "path";

var __vite_injected_original_dirname = "D:\\place\\music\\cloud-music";
var vite_config_default = defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      // 配置别名，指向需要的路径
      "@": path.resolve(__vite_injected_original_dirname, "src"),
      // 如果您使用require函数加载资源，也可以配置别名指向需要的路径
      "assets": path.resolve(__vite_injected_original_dirname, "src/assets")
    }
  }
});
export {
  vite_config_default as default
};
