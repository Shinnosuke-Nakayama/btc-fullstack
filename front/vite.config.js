import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

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
      "/editdatapost": {
        target: "http://localhost:3000",
      },
    },
  },
});
