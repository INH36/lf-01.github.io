import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { visualizer } from 'rollup-plugin-visualizer'
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr({ svgrOptions: { icon: true } }),
    visualizer({open: true}),
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
  css: {
    preprocessorOptions:{
      scss: {
        additionalData: `@use "@/styles/global.scss" as *;`
      }
    }
  },
  build:{
    rollupOptions: {
      output:{
        manualChunks(id) {
          if(id.includes("node_modules")) {
            return id .toString() .split("node_modules/")[1] .split("/")[0] .toString(); 
          }
        },
        chunkFileNames: 'static/js/[name]-[hash].js',  // 引入文件名称
        entryFileNames: 'static/js/[name]-[hash].js',  // 包入口文件名称
        assetFileNames: 'static/[ext]/[name]-[hash].[ext]',  // 资源文件
      }
    }
  },
  server: {
    host: "0.0.0.0",
    port: 4124,
  },
});

