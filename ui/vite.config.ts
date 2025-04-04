import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  // server: {
  //   host: "0.0.0.0",
  //   hmr: {
  //     clientPort: 3000,
  //   },
  //   port: 80,
  //   watch: {
  //     usePolling: true,
  //   },
  // },
  plugins: [react()],
  build: {
    emptyOutDir: true,
    chunkSizeWarningLimit: 800,
  },
});
