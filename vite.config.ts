import { fileURLToPath, URL } from "node:url";
import path from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { VitePluginFonts } from "vite-plugin-fonts";
import svgLoader from "vite-svg-loader";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePluginFonts({
      google: {
        families: [{ name: "Montserrat", styles: "ital,wght@0,400;1,200,700" }],
      },
    }),
    svgLoader({
      defaultImport: "component",
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/scss/variables.scss";`,
      },
    },
  },
});
