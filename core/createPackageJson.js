import fs from "fs";
import path from "path";
import { getLatestStableVersion } from "./utils/getLatestVersion.js";

/**
 * Generates a complete package.json in the specified project directory.
 * Includes base dependencies/devDependencies for the selected framework
 *
 * @param {Object} options
 * @param {string} options.projectDir - Path to the project folder.
 * @param {string} [options.projectName] - Name of the project (defaults to folder name).
 * @param {"vue"|"vuetify"|"nuxt"} options.framework - Framework to setup.
 * @param {string[]} [options.features] - Optional features to include (e.g., "vitest").
 */

export function createPackageJson({
  projectDir,
  projectName,
  framework,
  features,
}) {
  const name = (projectName || path.basename(projectDir))
    .replace(/\s+/g, "-")
    .toLowerCase();

  /** @type {Record<string, any>} */
  const pkg = {
    name,
    version: "1.0.0",
    private: true,
    scripts: {},
    dependencies: {},
    devDependencies: {},
  };

  const baseDependencies = {};
  const baseDevDependencies = {};

  if (framework === "vue" || framework === "vuetify") {
    pkg.type = "module";
    pkg.scripts = {
      dev: "vite",
      build: "vite build",
      preview: "vite preview",
    };

    baseDependencies["vue"] = "^3.4.0";
    baseDevDependencies["vite"] = "^5.0.0";
    baseDevDependencies["@vitejs/plugin-vue"] = "^5.0.0";

    if (framework === "vuetify") {
      baseDependencies["vuetify"] = "^3.5.0";
      baseDependencies["@mdi/font"] = "^7.4.0";
    }
  }

  if (framework === "nuxt") {
    pkg.scripts = {
      dev: "nuxt dev",
      build: "nuxt build",
      preview: "nuxt preview",
      generate: "nuxt generate",
    };
    baseDependencies["nuxt"] = "^3.12.0";
  }

  if (features?.includes("vitest")) {
    pkg.scripts.test = "vitest";
  }

  const runtimeDeps = new Set([
    "vue-router",
    "pinia",
    "vuex",
    "axios",
    "vuetify",
    "@mdi/font",
    "@nuxt/pwa",
    "@nuxt/axios",
    "@nuxt/i18n",
    "@nuxt/auth-next",
    "@pinia/nuxt",
  ]);

  const devDeps = new Set([
    "typescript",
    "vite",
    "@vitejs/plugin-vue",
    "tailwindcss",
    "postcss",
    "autoprefixer",
    "sass",
    "vite-plugin-pwa",
    "eslint",
    "vitest",
    "cypress",
    "@nuxt/typescript-build",
    "@nuxt/tailwindcss",
  ]);

  Object.entries(baseDependencies).forEach(([pkgName, version]) => {
    pkg.dependencies[pkgName] = version;
  });

  Object.entries(baseDevDependencies).forEach(([pkgName, version]) => {
    pkg.devDependencies[pkgName] = version;
  });

  (features || []).forEach((pkgName) => {
    if (baseDependencies[pkgName] || baseDevDependencies[pkgName]) {
      return;
    }

    const resolvedVersion = getLatestStableVersion(pkgName);

    if (runtimeDeps.has(pkgName)) {
      if (!pkg.dependencies[pkgName]) {
        pkg.dependencies[pkgName] = resolvedVersion;
      }
    } else if (devDeps.has(pkgName)) {
      if (!pkg.devDependencies[pkgName]) {
        pkg.devDependencies[pkgName] = resolvedVersion;
      }
    } else {
      if (!pkg.dependencies[pkgName] && !pkg.devDependencies[pkgName]) {
        pkg.dependencies[pkgName] = resolvedVersion;
      }
    }
  });

  Object.keys(pkg.scripts).forEach((k) => {
    if (!pkg.scripts[k]) delete pkg.scripts[k];
  });

  if (Object.keys(pkg.dependencies).length === 0) delete pkg.dependencies;
  if (Object.keys(pkg.devDependencies).length === 0) delete pkg.devDependencies;

  const pkgPath = path.join(projectDir, "package.json");
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2), "utf-8");
}
