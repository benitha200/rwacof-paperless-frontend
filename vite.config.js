// import path from "path"
// import react from "@vitejs/plugin-react"
// import { defineConfig } from "vite"

// export default defineConfig({
//   plugins: [react()],
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "./src"),
//     },
//   },
//   base:"/",
// })

import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    // Comment out or remove the rollupOptions temporarily
    // rollupOptions: {
    //   output: {
    //     manualChunks(id) {
    //       if (id.includes('node_modules')) {
    //         return id.split('node_modules/')[1].split('/')[0];
    //       }
    //     },
    //   },
    // },
  },
  base: '/',
  server: {
    host: true, // This allows external access
    port: 5173, // Ensure this port is open
  },
  preview: {
    port: 8011,
    strictPort: true,
    host: true,
  }
})