import { defineConfig } from "vite";

// https://vitejs.dev/config
export default defineConfig({
  build: {
    rollupOptions: {
      external: [
        "electron",
        "better-sqlite3", // ✅ Add this line
        "path",
        "fs",
      ],
      output: {
        entryFileNames: "[name].js",
      },
    },
  },
});
