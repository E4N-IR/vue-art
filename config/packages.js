export const CORE_PACKAGES = {
  vue: ["vue", "vite", "@vitejs/plugin-vue"],
  vuetify: [
    "vue",
    "vite",
    "@vitejs/plugin-vue",
    "vuetify",
    "vite-plugin-vuetify",
    "@mdi/font",
  ],
  nuxt: ["nuxt"],
};

export const PACKAGE_MAP = {
  vue: {
    ts: ["typescript"],
    router: ["vue-router"],
    pinia: ["pinia"],
    vuex: ["vuex"],
    eslint: ["eslint"],
    vitest: ["vitest"],
    cypress: ["cypress"],
    tailwind: ["tailwindcss", "postcss", "autoprefixer"],
    scss: ["sass"],
    pwa: ["vite-plugin-pwa"],
    axios: ["axios"],
  },

  vuetify: {
    ts: ["typescript"],
    router: ["vue-router"],
    pinia: ["pinia"],
    vuex: ["vuex"],
    eslint: ["eslint"],

    tailwind: ["tailwindcss", "postcss", "autoprefixer"],
    pwa: ["vite-plugin-pwa"],
    axios: ["axios"],
  },

  nuxt: {
    ts: ["@nuxt/typescript-build"],
    pinia: ["@pinia/nuxt"],
    vuex: ["vuex"],
    eslint: ["eslint"],
    pwa: ["@nuxt/pwa"],
    i18n: ["@nuxt/i18n"],
    auth: ["@nuxt/auth-next"],
    axios: ["@nuxt/axios"],
    vitest: ["vitest"],
    cypress: ["cypress"],
    tailwind: ["@nuxt/tailwindcss"],
    vuetify: ["vuetify"],
  },
};
