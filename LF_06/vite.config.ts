import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { visualizer } from 'rollup-plugin-visualizer'
import Components from 'unplugin-react-components/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    Components({
      dts: true
    }), 
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
            } else if (id.includes('@ant-design')) {
              return 'antd-design-vendor';
            } else if (id.includes('@fortawesome') || id.includes('@remix')){
              return 'fortawesome-remix-vendor'
            }  else {
              return 'others-vendor';
            }
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

