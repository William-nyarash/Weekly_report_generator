import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => {
  // eslint-disable-next-line no-undef
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [
      react(),
      tailwindcss()
    ],

    server: {
      proxy: {
        "/gti": {
          target: env.PROD_SERVER,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/gti/, ""),
        },
      },
    },
  };
});