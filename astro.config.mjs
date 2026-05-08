// @ts-check
import { defineConfig } from "astro/config";
import { fileURLToPath } from "node:url";

import tailwindcss from "@tailwindcss/vite";

const src = fileURLToPath(new URL("./src", import.meta.url));

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        "@": src,
        "@adapters": fileURLToPath(new URL("./src/adapters", import.meta.url)),
        "@assets": fileURLToPath(new URL("./src/assets", import.meta.url)),
        "@components": fileURLToPath(
          new URL("./src/components", import.meta.url),
        ),
        "@config": fileURLToPath(new URL("./src/shared/config", import.meta.url)),
        "@cache": fileURLToPath(new URL("./src/cache", import.meta.url)),
        "@layouts": fileURLToPath(new URL("./src/layouts", import.meta.url)),
        "@lib": fileURLToPath(new URL("./src/lib", import.meta.url)),
        "@pages": fileURLToPath(new URL("./src/pages", import.meta.url)),
        "@server": fileURLToPath(new URL("./src/server", import.meta.url)),
        "@services": fileURLToPath(new URL("./src/services", import.meta.url)),
        "@shared": fileURLToPath(new URL("./src/shared", import.meta.url)),
        "@styles": fileURLToPath(new URL("./src/styles", import.meta.url)),
        "@models": fileURLToPath(new URL("./src/types/domain/index.ts", import.meta.url)),
        "@ui-types": fileURLToPath(new URL("./src/types/ui/index.ts", import.meta.url)),
      },
    },
  },
});
