import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
  ],
  // Base path for Netlify deployment
  base: './',
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
