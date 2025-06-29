import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr({ svgrOptions: { icon: true } }),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(__dirname, 'src/assets/svg-icons')], // svg图标文件路径
      symbolId: 'icon-[dir]-[name]', // 生成的symbolId格式
      inject: 'body-last', // 图标插入位置
      customDomId: '__svg__icons__dom__', // 自定义的DOM元素ID
      svgoOptions: {
        plugins: [
          {
            name: 'removeAttrs',
            params: {
              attrs: ['fill', 'stroke']
            }
          }
        ]
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    host: "0.0.0.0",
    port: 4124,
  },
  base: './',
  build: {
    outDir: 'dist',
  }
});

