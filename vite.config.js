import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import path from 'path'
import fs from 'fs'

/** Copy index.html to 404.html after build so hosts that serve 404.html for unknown paths (e.g. GitHub Pages) still load the SPA. */
function copyIndexTo404() {
  return {
    name: 'copy-index-to-404',
    closeBundle() {
      const outDir = path.resolve(__dirname, 'dist')
      const indexPath = path.join(outDir, 'index.html')
      const notFoundPath = path.join(outDir, '404.html')
      if (fs.existsSync(indexPath)) {
        fs.copyFileSync(indexPath, notFoundPath)
      }
    },
  }
}

export default defineConfig({
  plugins: [
    react(),
    copyIndexTo404(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    allowedHosts: true,
    // Remove server proxy for Supabase compatibility
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    // Optimize for Netlify deployment
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
        },
      },
    },
    // Netlify-specific optimizations
    chunkSizeWarningLimit: 1000,
    // Fix for Netlify deployment
    assetsDir: 'assets',
  },
  // Define global constants for build
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
  },
  // Ensure proper environment variable handling for Netlify
  envPrefix: 'VITE_',
})
