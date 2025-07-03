import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { visualizer } from 'rollup-plugin-visualizer'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    visualizer({open: true}),
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
            if(id.includes('react') || id.includes('redux') || id.includes('react-dom') || 
               id.includes('react-router') || id.includes('react-redux')) {
              return 'react-vendor';
            }
            else if(id.includes('antd')) {
              return 'antd-vendor';
            } else if(id.includes('rc')) {
              return 'rc-vendor';
            }else {
              return 'others-vendor';
            }
          }
          // if(id.includes("node_modules")) {
          //   return id .toString() .split("node_modules/")[1] .split("/")[0] .toString(); 
          // }
        },
        chunkFileNames: 'static/js/[name]-[hash].js',  // 引入文件名称
        entryFileNames: 'static/js/[name]-[hash].js',  // 包入口文件名称
        assetFileNames: 'static/[ext]/[name]-[hash].[ext]',  // 资源文件
      }
    },
    reportCompressedSize: false,
    sourcemap: false
  },
  server: {
    host: "0.0.0.0",
    port: 4124,
  },
});

