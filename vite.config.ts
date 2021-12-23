import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react';
// import reactRefresh from '@vitejs/plugin-react-refresh';
import graphql from "@rollup/plugin-graphql";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), graphql()]
})
