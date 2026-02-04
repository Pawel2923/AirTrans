import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "0.0.0.0",
    port: 5173,
    watch: {
      usePolling: true,
      interval: 1000,
    },
    hmr: {
      clientPort: 3000,
    },
  },
  plugins: [react()],
  build: {
    emptyOutDir: true,
    chunkSizeWarningLimit: 800,
  },
});
