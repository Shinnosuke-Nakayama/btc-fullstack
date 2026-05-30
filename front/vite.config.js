import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
dotenv.config();

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/categorys": {
        target: "http://localhost:3000",
      },
      "/editdata/": {
        target: "http://localhost:3000",
      },
      "/editdata": {
        target: "http://localhost:3000",
      },
      "/videos/": {
        target: "http://localhost:3000",
      },
      "/videos": {
        target: "http://localhost:3000",
      },
    },
  },
});
