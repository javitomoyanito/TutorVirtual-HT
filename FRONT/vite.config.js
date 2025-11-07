import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";


export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom", // simula el navegador
    setupFiles: "./src/test/setupTests.js", // archivo de configuración opcional
    
  },
});
