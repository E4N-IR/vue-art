import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const templatesDir = path.join(__dirname, "..", "templates");

/**
 * Creates project folders and base files based on framework & architecture.
 *
 * @param {Object} options
 * @param {string} options.projectName
 * @param {"vue"|"nuxt"|"vuetify"} options.framework
 * @param {string} options.architecture
 * @param {string[]} options.features
 *
 * @returns {void}
 */
function createVueVuetifyStructure(baseDir, framework, architecture, features) {
  const srcDir = path.join(baseDir, "src");
  fs.ensureDirSync(srcDir);

  const hasVuetify = framework === "vuetify";
  const useTs = features.includes("ts");

  if (framework === "vue") {
    // Vue projects
    if (architecture === "simple") {
      fs.ensureDirSync(path.join(srcDir, "components"));
      fs.ensureDirSync(path.join(srcDir, "views"));
      fs.ensureDirSync(path.join(srcDir, "router"));
      fs.ensureDirSync(path.join(srcDir, "store"));
      fs.ensureDirSync(path.join(srcDir, "assets"));
    } else if (architecture === "feature") {
      fs.ensureDirSync(path.join(srcDir, "features", "example"));
      fs.ensureDirSync(path.join(srcDir, "components"));
      fs.ensureDirSync(path.join(srcDir, "views"));
      fs.ensureDirSync(path.join(srcDir, "router"));
      fs.ensureDirSync(path.join(srcDir, "store"));
      fs.ensureDirSync(path.join(srcDir, "assets"));
    } else if (architecture === "atomic") {
      fs.ensureDirSync(path.join(srcDir, "components", "atoms"));
      fs.ensureDirSync(path.join(srcDir, "components", "molecules"));
      fs.ensureDirSync(path.join(srcDir, "components", "organisms"));
      fs.ensureDirSync(path.join(srcDir, "views"));
      fs.ensureDirSync(path.join(srcDir, "assets"));
    } else if (architecture === "enterprise") {
      fs.ensureDirSync(path.join(srcDir, "modules"));
      fs.ensureDirSync(path.join(srcDir, "features"));
      fs.ensureDirSync(path.join(srcDir, "shared"));
      fs.ensureDirSync(path.join(srcDir, "components", "atoms"));
      fs.ensureDirSync(path.join(srcDir, "components", "molecules"));
      fs.ensureDirSync(path.join(srcDir, "components", "organisms"));
      fs.ensureDirSync(path.join(srcDir, "assets"));
    }
  } else if (framework === "vuetify") {
    if (architecture === "simple") {
      fs.ensureDirSync(path.join(srcDir, "components"));
      fs.ensureDirSync(path.join(srcDir, "views"));
      fs.ensureDirSync(path.join(srcDir, "router"));
      fs.ensureDirSync(path.join(srcDir, "store"));
      fs.ensureDirSync(path.join(srcDir, "plugins"));
      fs.ensureDirSync(path.join(srcDir, "assets"));
    } else if (architecture === "feature") {
      fs.ensureDirSync(path.join(srcDir, "features", "example"));
      fs.ensureDirSync(path.join(srcDir, "components"));
      fs.ensureDirSync(path.join(srcDir, "views"));
      fs.ensureDirSync(path.join(srcDir, "router"));
      fs.ensureDirSync(path.join(srcDir, "store"));
      fs.ensureDirSync(path.join(srcDir, "plugins"));
      fs.ensureDirSync(path.join(srcDir, "assets"));
    } else if (architecture === "enterprise") {
      fs.ensureDirSync(path.join(srcDir, "modules"));
      fs.ensureDirSync(path.join(srcDir, "features"));
      fs.ensureDirSync(path.join(srcDir, "shared"));
      fs.ensureDirSync(path.join(srcDir, "components"));
      fs.ensureDirSync(path.join(srcDir, "plugins"));
      fs.ensureDirSync(path.join(srcDir, "assets"));
    }
  }
}

/**
 * Creates directory structure for Nuxt projects based on architecture
 */
function createNuxtStructure(baseDir, architecture, features) {
  const useTs = features.includes("ts");

  if (architecture === "default") {
    fs.ensureDirSync(path.join(baseDir, "pages"));
    fs.ensureDirSync(path.join(baseDir, "components"));
    fs.ensureDirSync(path.join(baseDir, "composables"));
    fs.ensureDirSync(path.join(baseDir, "plugins"));
    fs.ensureDirSync(path.join(baseDir, "middleware"));
    fs.ensureDirSync(path.join(baseDir, "server", "api"));
    fs.ensureDirSync(path.join(baseDir, "assets"));
  } else if (architecture === "feature") {
    fs.ensureDirSync(path.join(baseDir, "pages"));
    fs.ensureDirSync(path.join(baseDir, "features", "example"));
    fs.ensureDirSync(path.join(baseDir, "components"));
    fs.ensureDirSync(path.join(baseDir, "composables"));
    fs.ensureDirSync(path.join(baseDir, "plugins"));
    fs.ensureDirSync(path.join(baseDir, "middleware"));
    fs.ensureDirSync(path.join(baseDir, "server", "api"));
    fs.ensureDirSync(path.join(baseDir, "assets"));
  } else if (architecture === "layered") {
    fs.ensureDirSync(path.join(baseDir, "pages"));
    fs.ensureDirSync(path.join(baseDir, "layers", "domain"));
    fs.ensureDirSync(path.join(baseDir, "layers", "application"));
    fs.ensureDirSync(path.join(baseDir, "layers", "presentation"));
    fs.ensureDirSync(path.join(baseDir, "components"));
    fs.ensureDirSync(path.join(baseDir, "composables"));
    fs.ensureDirSync(path.join(baseDir, "plugins"));
    fs.ensureDirSync(path.join(baseDir, "middleware"));
    fs.ensureDirSync(path.join(baseDir, "server", "api"));
    fs.ensureDirSync(path.join(baseDir, "assets"));
  } else if (architecture === "enterprise") {
    fs.ensureDirSync(path.join(baseDir, "pages"));
    fs.ensureDirSync(path.join(baseDir, "features"));
    fs.ensureDirSync(path.join(baseDir, "layers"));
    fs.ensureDirSync(path.join(baseDir, "modules"));
    fs.ensureDirSync(path.join(baseDir, "shared"));
    fs.ensureDirSync(path.join(baseDir, "components"));
    fs.ensureDirSync(path.join(baseDir, "composables"));
    fs.ensureDirSync(path.join(baseDir, "plugins"));
    fs.ensureDirSync(path.join(baseDir, "middleware"));
    fs.ensureDirSync(path.join(baseDir, "server", "api"));
    fs.ensureDirSync(path.join(baseDir, "assets"));
  }
}
export function createProjectStructure({
  projectName,
  framework,
  architecture,
  features,
}) {
  const baseDir = path.resolve(process.cwd(), projectName);
  fs.ensureDirSync(baseDir);

  const useTs = features.includes("ts");
  const hasTailwind = features.includes("tailwind");
  const hasRouter = features.includes("router");
  const hasVuetify =
    framework === "vuetify" || features.includes("vuetifyComponents");

  fs.writeFileSync(
    path.join(baseDir, ".gitignore"),
    `# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

# Dependencies
node_modules
dist
dist-ssr
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

# Environment variables
.env
.env.local
.env.*.local

# Build outputs
${framework === "nuxt" ? ".nuxt\n.output\n" : ""}`
  );
  fs.writeFileSync(
    path.join(baseDir, "README.md"),
    `# ${projectName}

${
  framework === "nuxt"
    ? "Nuxt 3"
    : framework === "vuetify"
    ? "Vue 3 + Vuetify"
    : "Vue 3"
} project generated by VueArt CLI.

## Features

${features.length > 0 ? features.map((f) => `- ${f}`).join("\n") : "- None"}

## Getting Started

\`\`\`bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
\`\`\`
`
  );

  if (framework !== "nuxt") {
    createVueVuetifyStructure(baseDir, framework, architecture, features);
    fs.ensureDirSync(path.join(baseDir, "public"));
    const mainExt = useTs ? "ts" : "js";
    const viteConfigExt = useTs ? "ts" : "js";
    const configExt = useTs ? "ts" : "js";
    fs.writeFileSync(
      path.join(baseDir, "index.html"),
      `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${projectName}</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.${mainExt}"></script>
  </body>
</html>
`
    );
    fs.writeFileSync(
      path.join(baseDir, "public/favicon.svg"),
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <circle cx="50" cy="50" r="40" fill="#42b883"/>
  <text x="50" y="60" font-size="40" text-anchor="middle" fill="white">V</text>
</svg>`
    );
    const assetsDir = path.join(baseDir, "src/assets");
    if (fs.existsSync(assetsDir)) {
      if (hasVuetify) {
        const e4nTemplatePath = path.join(templatesDir, "assets", "E4N.vue");
        if (fs.existsSync(e4nTemplatePath)) {
          const e4nContent = fs.readFileSync(e4nTemplatePath, "utf-8");
          fs.writeFileSync(path.join(assetsDir, "E4N.vue"), e4nContent);
        }
        fs.writeFileSync(
          path.join(assetsDir, "logo.svg"),
          `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <rect width="200" height="200" fill="#1867C0"/>
  <path d="M100 50 L150 150 L50 150 Z" fill="white"/>
  <circle cx="100" cy="120" r="20" fill="#1867C0"/>
</svg>`
        );
      } else {
        const vueLogoPath = path.join(
          templatesDir,
          "Vue",
          "assets",
          "logo.svg"
        );
        if (fs.existsSync(vueLogoPath)) {
          fs.writeFileSync(
            path.join(assetsDir, "logo.svg"),
            fs.readFileSync(vueLogoPath, "utf-8")
          );
        } else {
          fs.writeFileSync(
            path.join(assetsDir, "vue.svg"),
            `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <circle cx="50" cy="50" r="40" fill="#42b883"/>
  <text x="50" y="60" font-size="40" text-anchor="middle" fill="white">V</text>
</svg>`
          );
        }
      }
    }
    let vitePlugins = ["vue()"];
    if (hasVuetify) {
      vitePlugins.push("vuetify()");
    }
    const viteConfigContent = `import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
${hasVuetify ? "import vuetify from 'vite-plugin-vuetify';\n" : ""}
export default defineConfig({
  plugins: [${vitePlugins.join(", ")}],
});`;

    fs.writeFileSync(
      path.join(baseDir, `vite.config.${viteConfigExt}`),
      viteConfigContent
    );
    if (useTs) {
      fs.writeFileSync(
        path.join(baseDir, "tsconfig.json"),
        `{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "module": "ESNext",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "preserve",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src/**/*.ts", "src/**/*.d.ts", "src/**/*.tsx", "src/**/*.vue"],
  "references": [{ "path": "./tsconfig.node.json" }]
}

`
      );

      fs.writeFileSync(
        path.join(baseDir, "tsconfig.node.json"),
        `{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}
`
      );
    } else {
      fs.writeFileSync(
        path.join(baseDir, "jsconfig.json"),
        `{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src/**/*"]
}
`
      );
    }

    // Router setup (only create router files if router directory exists)
    let routerImport = "";
    let routerUse = "";
    const routerDir = path.join(baseDir, "src/router");
    if (hasRouter && fs.existsSync(routerDir)) {
      const routerExt = useTs ? "ts" : "js";

      fs.writeFileSync(
        path.join(routerDir, `index.${routerExt}`),
        `import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';

const routes = [
  { path: '/', name: 'home', component: Home },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});`
      );

      const viewsDir = path.join(baseDir, "src/views");
      if (!fs.existsSync(viewsDir)) {
        fs.ensureDirSync(viewsDir);
      }

      let homeVueContent = "";
      if (hasVuetify) {
        homeVueContent = `<template>
  <v-container class="fill-height">
    <v-row justify="center" align="center">
      <v-col cols="12" class="text-center">
        <h1 class="text-h3 mb-4">Welcome to Vuetify App</h1>
        <p class="text-body-1">This page is generated by VueArt CLI.</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script${useTs ? ' setup lang="ts"' : " setup"}>
</script>
`;
      } else {
        // Read from template file
        const vueTemplatePath = path.join(
          templatesDir,
          "Vue",
          "HelloٌWorld.vue"
        );
        if (fs.existsSync(vueTemplatePath)) {
          homeVueContent = fs.readFileSync(vueTemplatePath, "utf-8");
          // Update import paths to match project structure
          homeVueContent = homeVueContent.replace(
            /from "\.\/components\//g,
            'from "../components/'
          );
          homeVueContent = homeVueContent.replace(
            /from "\.\/assets\//g,
            'from "../assets/'
          );
          // Update script tag if needed
          if (useTs && !homeVueContent.includes('lang="ts"')) {
            homeVueContent = homeVueContent.replace(
              /<script setup>/g,
              '<script setup lang="ts">'
            );
          }
        } else {
          // Fallback if template doesn't exist
          homeVueContent = `<template>
  <main class="va-container">
    <h1 class="va-title">Welcome to Vue 3 App</h1>
    <p class="va-subtitle">This page is generated by VueArt CLI.</p>
  </main>
</template>

<script${useTs ? ' setup lang="ts"' : " setup"}>
</script>
`;
        }
      }

      fs.writeFileSync(path.join(viewsDir, "Home.vue"), homeVueContent);

      routerImport = `import { router } from './router';\n`;
      routerUse = `.use(router)`;
    }

    // Store setup (only create store files if store directory exists)
    let storeImports = "";
    let storeUse = "";
    const storeDir = path.join(baseDir, "src/store");
    if (features.includes("pinia") && fs.existsSync(storeDir)) {
      fs.writeFileSync(
        path.join(storeDir, "index.ts"),
        `import { createPinia } from 'pinia';

export const store = createPinia();`
      );
      storeImports = `import { store } from './store';\n`;
      storeUse = `.use(store)`;
    } else if (features.includes("vuex") && fs.existsSync(storeDir)) {
      const storeExt = useTs ? "ts" : "js";
      fs.writeFileSync(
        path.join(storeDir, `index.${storeExt}`),
        `import { createStore } from 'vuex';

export const store = createStore({
  state: () => ({}),
  mutations: {},
  actions: {},
});`
      );
      storeImports = `import { store } from './store';\n`;
      storeUse = `.use(store)`;
    }

    // Vuetify plugin setup (only if plugins directory exists)
    const pluginsDir = path.join(baseDir, "src/plugins");
    if (hasVuetify && fs.existsSync(pluginsDir)) {
      const vuetifyExt = useTs ? "ts" : "js";
      fs.writeFileSync(
        path.join(pluginsDir, `vuetify.${vuetifyExt}`),
        `import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { aliases, mdi } from 'vuetify/iconsets/mdi';
import '@mdi/font/css/materialdesignicons.css';

export default createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
});`
      );
    }

    // CSS setup
    let cssImports = "";
    if (hasVuetify) {
      // Vuetify CSS imports
      cssImports = `import 'vuetify/styles';\n`;
    } else if (hasTailwind) {
      fs.writeFileSync(
        path.join(baseDir, "tailwind.config.cjs"),
        `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};`
      );
      fs.writeFileSync(
        path.join(baseDir, "postcss.config.cjs"),
        `module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};`
      );
      // Assets directory should already exist from structure creation, but ensure it
      if (!fs.existsSync(assetsDir)) {
        fs.ensureDirSync(assetsDir);
      }
      fs.writeFileSync(
        path.join(assetsDir, "main.css"),
        `@tailwind base;
@tailwind components;
@tailwind utilities;

.va-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.va-title {
  font-size: 2rem;
  font-weight: 700;
}

.va-subtitle {
  margin-top: 0.5rem;
  color: #64748b;
}`
      );
      cssImports = `import './assets/main.css';\n`;
    } else {
      // Copy CSS from Vue template if available, otherwise use basic styles
      const vueAssetsDir = path.join(templatesDir, "Vue", "assets");
      if (fs.existsSync(vueAssetsDir)) {
        // Copy base.css
        const baseCssPath = path.join(vueAssetsDir, "base.css");
        if (fs.existsSync(baseCssPath)) {
          fs.writeFileSync(
            path.join(assetsDir, "base.css"),
            fs.readFileSync(baseCssPath, "utf-8")
          );
        }

        // Copy main.css
        const mainCssPath = path.join(vueAssetsDir, "main.css");
        if (fs.existsSync(mainCssPath)) {
          fs.writeFileSync(
            path.join(assetsDir, "main.css"),
            fs.readFileSync(mainCssPath, "utf-8")
          );
          cssImports = `import './assets/main.css';\n`;
        } else {
          // Fallback to basic style.css
          fs.writeFileSync(
            path.join(baseDir, "src/style.css"),
            `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
}

.va-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.va-title {
  font-size: 2rem;
  font-weight: 700;
}

.va-subtitle {
  margin-top: 0.5rem;
  color: #64748b;
}`
          );
          cssImports = `import './style.css';\n`;
        }
      } else {
        // Basic style.css if no Tailwind and no template
        fs.writeFileSync(
          path.join(baseDir, "src/style.css"),
          `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
}

.va-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.va-title {
  font-size: 2rem;
  font-weight: 700;
}

.va-subtitle {
  margin-top: 0.5rem;
  color: #64748b;
}`
        );
        cssImports = `import './style.css';\n`;
      }
    }

    // main file
    let vuetifyImport = "";
    let vuetifyUse = "";
    if (hasVuetify) {
      vuetifyImport = `import vuetify from './plugins/vuetify';\n`;
      vuetifyUse = `.use(vuetify)`;
    }

    const mainContent = `import { createApp } from 'vue';
import App from './App.vue';
${cssImports}${routerImport}${storeImports}${vuetifyImport}const app = createApp(App)${routerUse}${storeUse}${
      vuetifyUse ? ` ${vuetifyUse}` : ""
    };

app.mount('#app');`;

    fs.writeFileSync(path.join(baseDir, `src/main.${mainExt}`), mainContent);

    // App.vue
    const appScriptTag = useTs ? '<script setup lang="ts">' : "<script setup>";

    let appVueContent = "";
    if (hasVuetify) {
      appVueContent = `<template>
  <v-app>
    <v-main>
      <HelloWorld />
    </v-main>
  </v-app>
</template>

${appScriptTag}
import HelloWorld from './components/HelloWorld.vue';
</script>
`;
    } else {
      // Read from template file
      const vueTemplatePath = path.join(templatesDir, "Vue", "HelloٌWorld.vue");
      if (fs.existsSync(vueTemplatePath)) {
        appVueContent = fs.readFileSync(vueTemplatePath, "utf-8");
        // Update import paths to match project structure
        appVueContent = appVueContent.replace(
          /from "\.\/components\//g,
          'from "./components/'
        );
        appVueContent = appVueContent.replace(
          /from "\.\/assets\//g,
          'from "./assets/'
        );
        // Update script tag if needed
        if (useTs && !appVueContent.includes('lang="ts"')) {
          appVueContent = appVueContent.replace(
            /<script setup>/g,
            '<script setup lang="ts">'
          );
        }
      } else {
        // Fallback if template doesn't exist
        appVueContent = `<template>
  <main class="va-container">
    <h1 class="va-title">Welcome to Vue 3 App</h1>
    <p class="va-subtitle">This project is generated by VueArt CLI.</p>
  </main>
</template>

${appScriptTag}
</script>
`;
      }
    }

    fs.writeFileSync(path.join(baseDir, "src/App.vue"), appVueContent);

    // Sample component (only if components directory exists)
    const componentsDir = path.join(baseDir, "src/components");
    if (fs.existsSync(componentsDir)) {
      let helloWorldContent = "";

      if (hasVuetify) {
        // Load Vuetify template
        const vuetifyTemplatePath = path.join(
          templatesDir,
          "Vuetify",
          "HelloWorld.vue"
        );
        if (fs.existsSync(vuetifyTemplatePath)) {
          helloWorldContent = fs.readFileSync(vuetifyTemplatePath, "utf-8");
          helloWorldContent = helloWorldContent.replace(
            /logo\.png/g,
            "logo.svg"
          );
        } else {
          helloWorldContent = `<template>
  <v-container>
    <h1>Welcome to Vuetify</h1>
  </v-container>
</template>

${appScriptTag}
</script>
`;
        }
      } else {
        const vueTemplatePath = path.join(
          templatesDir,
          "Vue",
          "HelloٌWorld.vue"
        );
        if (fs.existsSync(vueTemplatePath)) {
          // Copy E4N component
          const e4nTemplatePath = path.join(
            templatesDir,
            "Vue",
            "components",
            "E4N.vue"
          );
          if (fs.existsSync(e4nTemplatePath)) {
            const e4nContent = fs.readFileSync(e4nTemplatePath, "utf-8");
            fs.writeFileSync(path.join(componentsDir, "E4N.vue"), e4nContent);
          }
          const theWelcomeTemplatePath = path.join(
            templatesDir,
            "Vue",
            "components",
            "TheWelcome.vue"
          );
          if (fs.existsSync(theWelcomeTemplatePath)) {
            let theWelcomeContent = fs.readFileSync(
              theWelcomeTemplatePath,
              "utf-8"
            );
            theWelcomeContent = theWelcomeContent.replace(
              /from '\.\/WelcomeItem\.vue'/g,
              "from './WelcomeItem.vue'"
            );
            theWelcomeContent = theWelcomeContent.replace(
              /from '\.\/icons\//g,
              "from './icons/"
            );
            if (useTs && !theWelcomeContent.includes('lang="ts"')) {
              theWelcomeContent = theWelcomeContent.replace(
                /<script setup>/g,
                '<script setup lang="ts">'
              );
            }
            fs.writeFileSync(
              path.join(componentsDir, "TheWelcome.vue"),
              theWelcomeContent
            );
          }
          const welcomeItemTemplatePath = path.join(
            templatesDir,
            "Vue",
            "components",
            "WelcomeItem.vue"
          );
          if (fs.existsSync(welcomeItemTemplatePath)) {
            fs.writeFileSync(
              path.join(componentsDir, "WelcomeItem.vue"),
              fs.readFileSync(welcomeItemTemplatePath, "utf-8")
            );
          }
          const iconsTemplateDir = path.join(
            templatesDir,
            "Vue",
            "components",
            "icons"
          );
          const iconsTargetDir = path.join(componentsDir, "icons");
          if (fs.existsSync(iconsTemplateDir)) {
            fs.ensureDirSync(iconsTargetDir);
            const iconFiles = fs.readdirSync(iconsTemplateDir);
            iconFiles.forEach((iconFile) => {
              const iconTemplatePath = path.join(iconsTemplateDir, iconFile);
              const iconTargetPath = path.join(iconsTargetDir, iconFile);
              fs.writeFileSync(
                iconTargetPath,
                fs.readFileSync(iconTemplatePath, "utf-8")
              );
            });
          }
          helloWorldContent = `<template>
  <div class="hello">
    <h2>{{ msg }}</h2>
  </div>
</template>

${appScriptTag}
${useTs ? "defineProps<{ msg: string }>();" : "defineProps({ msg: String });"}
</script>

<style scoped>
.hello {
  text-align: center;
}
</style>
`;
        } else {
          helloWorldContent = `<template>
  <div class="hello">
    <h2>{{ msg }}</h2>
  </div>
</template>

${appScriptTag}
${useTs ? "const msg: string = 'Hello World!';" : "const msg = 'Hello World!';"}
</script>

<style scoped>
.hello {
  text-align: center;
}
</style>
`;
        }
      }

      fs.writeFileSync(
        path.join(componentsDir, "HelloWorld.vue"),
        helloWorldContent
      );
    }
    if (architecture === "feature") {
      const exampleFeatureDir = path.join(baseDir, "src/features/example");
      if (fs.existsSync(exampleFeatureDir)) {
        const composableExt = useTs ? "ts" : "js";
        fs.writeFileSync(
          path.join(exampleFeatureDir, `useExample.${composableExt}`),
          `import { ref } from 'vue';

export function useExample() {
  const count = ref(0);
  const increment = () => count.value++;
  return { count, increment };
}`
        );

        fs.writeFileSync(
          path.join(exampleFeatureDir, "ExampleView.vue"),
          `<template>
  <section class="va-container">
    <h2 class="va-title">Feature: Example</h2>
    <button @click="increment">Count: {{ count }}</button>
  </section>
</template>

${appScriptTag}
import { useExample } from './useExample${useTs ? "" : ".js"}';

const { count, increment } = useExample();
</script>
`
        );
      }
    }
    const atomsDir = path.join(baseDir, "src/components/atoms");
    const moleculesDir = path.join(baseDir, "src/components/molecules");
    const organismsDir = path.join(baseDir, "src/components/organisms");
    if (
      fs.existsSync(atomsDir) &&
      fs.existsSync(moleculesDir) &&
      fs.existsSync(organismsDir)
    ) {
      fs.writeFileSync(
        path.join(atomsDir, "VaButton.vue"),
        `<template>
  <button class="va-button">
    <slot />
  </button>
</template>

${appScriptTag}
</script>
`
      );

      fs.writeFileSync(
        path.join(moleculesDir, "VaCard.vue"),
        `<template>
  <section class="va-card">
    <header class="va-card__header">
      <slot name="title" />
    </header>
    <div class="va-card__body">
      <slot />
    </div>
  </section>
</template>

${appScriptTag}
</script>
`
      );

      fs.writeFileSync(
        path.join(organismsDir, "VaLayout.vue"),
        `<template>
  <div class="va-layout">
    <header class="va-layout__header">
      <slot name="header" />
    </header>
    <main class="va-layout__content">
      <slot />
    </main>
  </div>
</template>

${appScriptTag}
</script>
`
      );
    }

    // Enterprise structure example files
    if (architecture === "enterprise") {
      const sharedDir = path.join(baseDir, "src/shared");
      if (fs.existsSync(sharedDir)) {
        if (!fs.existsSync(path.join(sharedDir, "components"))) {
          fs.ensureDirSync(path.join(sharedDir, "components"));
        }
        if (!fs.existsSync(path.join(sharedDir, "utils"))) {
          fs.ensureDirSync(path.join(sharedDir, "utils"));
        }
      }
    }
  }
  if (framework === "nuxt") {
    createNuxtStructure(baseDir, architecture, features);
    fs.ensureDirSync(path.join(baseDir, "layouts"));
    fs.ensureDirSync(path.join(baseDir, "public"));
    if (architecture === "feature") {
      const exampleFeatureDir = path.join(baseDir, "features/example");
      if (fs.existsSync(exampleFeatureDir)) {
        const composableExt = useTs ? "ts" : "js";
        fs.writeFileSync(
          path.join(exampleFeatureDir, `useExample.${composableExt}`),
          `export const useExample = () => {
  const count = useState('example', () => 0);
  const increment = () => count.value++;
  return { count, increment };
};`
        );

        fs.writeFileSync(
          path.join(exampleFeatureDir, "ExamplePage.vue"),
          `<template>
  <main class="va-container">
    <h2 class="va-title">Feature: Example</h2>
    <button @click="increment">Count: {{ count }}</button>
  </main>
</template>

<script${useTs ? ' setup lang="ts"' : " setup"}>
import { useExample } from './useExample${useTs ? "" : ".js"}';

const { count, increment } = useExample();
</script>
`
        );
      }
    }

    if (architecture === "layered" || architecture === "enterprise") {
      const layersDir = path.join(baseDir, "layers");
      if (fs.existsSync(layersDir)) {
        const domainDir = path.join(layersDir, "domain");
        const applicationDir = path.join(layersDir, "application");
        const presentationDir = path.join(layersDir, "presentation");

        if (!fs.existsSync(path.join(domainDir, "entities"))) {
          fs.ensureDirSync(path.join(domainDir, "entities"));
        }
        if (!fs.existsSync(path.join(domainDir, "repositories"))) {
          fs.ensureDirSync(path.join(domainDir, "repositories"));
        }
        if (!fs.existsSync(path.join(applicationDir, "services"))) {
          fs.ensureDirSync(path.join(applicationDir, "services"));
        }
        if (!fs.existsSync(path.join(applicationDir, "use-cases"))) {
          fs.ensureDirSync(path.join(applicationDir, "use-cases"));
        }
        if (!fs.existsSync(path.join(presentationDir, "components"))) {
          fs.ensureDirSync(path.join(presentationDir, "components"));
        }
        if (!fs.existsSync(path.join(presentationDir, "composables"))) {
          fs.ensureDirSync(path.join(presentationDir, "composables"));
        }
      }
    }

    if (architecture === "enterprise") {
      const sharedDir = path.join(baseDir, "shared");
      if (fs.existsSync(sharedDir)) {
        if (!fs.existsSync(path.join(sharedDir, "components"))) {
          fs.ensureDirSync(path.join(sharedDir, "components"));
        }
        if (!fs.existsSync(path.join(sharedDir, "composables"))) {
          fs.ensureDirSync(path.join(sharedDir, "composables"));
        }
        if (!fs.existsSync(path.join(sharedDir, "utils"))) {
          fs.ensureDirSync(path.join(sharedDir, "utils"));
        }

        if (features.includes("pinia")) {
          const storeDir = path.join(sharedDir, "store");
          if (!fs.existsSync(storeDir)) {
            fs.ensureDirSync(storeDir);
          }
          const storeExt = useTs ? "ts" : "js";
          fs.writeFileSync(
            path.join(storeDir, `index.${storeExt}`),
            `import { defineStore } from 'pinia';

export const useAppStore = defineStore('app', {
  state: () => ({
    // Add your state here
  }),
  getters: {
    // Add your getters here
  },
  actions: {
    // Add your actions here
  },
});`
          );
        }
      }
    }

    const nuxtModules = [];
    if (hasTailwind) nuxtModules.push("'@nuxt/tailwindcss'");
    if (features.includes("pwa")) nuxtModules.push("'@nuxt/pwa'");
    if (features.includes("axios")) nuxtModules.push("'@nuxt/axios'");
    if (features.includes("i18n")) nuxtModules.push("'@nuxt/i18n'");
    if (features.includes("auth")) nuxtModules.push("'@nuxt/auth-next'");
    if (features.includes("pinia")) nuxtModules.push("'@pinia/nuxt'");

    fs.writeFileSync(
      path.join(baseDir, "nuxt.config.ts"),
      `// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [${nuxtModules.length > 0 ? nuxtModules.join(", ") : ""}],
})
`
    );

    fs.writeFileSync(
      path.join(baseDir, "app.vue"),
      `<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
`
    );

    fs.writeFileSync(
      path.join(baseDir, "layouts/default.vue"),
      `<template>
  <div>
    <header>
      <nav>
        <NuxtLink to="/">Home</NuxtLink>
      </nav>
    </header>
    <main>
      <slot />
    </main>
  </div>
</template>

<script${useTs ? ' setup lang="ts"' : " setup"}>
</script>
`
    );

    fs.writeFileSync(
      path.join(baseDir, "pages/index.vue"),
      `<template>
  <main class="va-container">
    <h1 class="va-title">Welcome to Nuxt App</h1>
    <p class="va-subtitle">This page is generated by VueArt CLI.</p>
  </main>
</template>

<script${useTs ? ' setup lang="ts"' : " setup"}>
</script>
`
    );

    fs.writeFileSync(path.join(baseDir, "public/favicon.ico"), "");
    if (useTs) {
      fs.writeFileSync(
        path.join(baseDir, "tsconfig.json"),
        `{
  "extends": "./.nuxt/tsconfig.json"
}
`
      );
    }
    if (hasTailwind) {
      const nuxtAssetsDir = path.join(baseDir, "assets");
      if (fs.existsSync(nuxtAssetsDir)) {
        const cssDir = path.join(nuxtAssetsDir, "css");
        if (!fs.existsSync(cssDir)) {
          fs.ensureDirSync(cssDir);
        }
        fs.writeFileSync(
          path.join(cssDir, "main.css"),
          `@tailwind base;
@tailwind components;
@tailwind utilities;

.va-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.va-title {
  font-size: 2rem;
  font-weight: 700;
}

.va-subtitle {
  margin-top: 0.5rem;
  color: #64748b;
}`
        );
      }
    }
  }
}
