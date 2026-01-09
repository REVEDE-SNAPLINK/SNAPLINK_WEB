import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, 'src') },
      { find: '@assets', replacement: path.resolve(__dirname, 'src/assets') },
      { find: '@components', replacement: path.resolve(__dirname, 'src/components') },
      { find: '@pages', replacement: path.resolve(__dirname, 'src/pages') },
      { find: '@styles', replacement: path.resolve(__dirname, 'src/styles') },
      { find: '@hooks', replacement: path.resolve(__dirname, 'src/hooks') },
      { find: '@/config', replacement: path.resolve(__dirname, 'src/config') },
      { find: '@/api', replacement: path.resolve(__dirname, 'src/api') },
      { find: '@/auth', replacement: path.resolve(__dirname, 'src/auth') },
      { find: '@/store', replacement: path.resolve(__dirname, 'src/store') },
    ]
  }
})
