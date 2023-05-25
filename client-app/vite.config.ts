import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh';
import react from '@vitejs/plugin-react-swc'
import dotenv from 'dotenv';

dotenv.config();
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
})
