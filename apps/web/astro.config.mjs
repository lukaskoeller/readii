// @ts-check
import { defineConfig } from "astro/config";

import sitemap from "@astrojs/sitemap";
import { DEFAULT_LOCALE, LOCALES } from "./src/constants";

// https://astro.build/config
export default defineConfig({
  integrations: [sitemap()],
  vite: {
    ssr: {
      noExternal: ['@nordcode/ui'],
    },
    css: {
      transformer: "lightningcss",
      lightningcss: {
        drafts: {
          customMedia: true,
        },
      },
    },
  },
  i18n: {
    locales: [...LOCALES],
    defaultLocale: DEFAULT_LOCALE,
  }
});
