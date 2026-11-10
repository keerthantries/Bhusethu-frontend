import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  if (mode === 'production' && !env.VITE_API_URL) {
    throw new Error('VITE_API_URL is required for production builds.')
  }

  return {
    plugins: [react()],
    publicDir: 'public',
    server: {
      port: 5173
    }
  }
})
