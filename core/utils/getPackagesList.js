import { CORE_PACKAGES, PACKAGE_MAP } from "../../config/packages.js";

/**
 * Generates a unique list of npm packages based on framework and selected features.
 *
 * - Includes core framework packages
 * - Merges feature-based packages
 * - Automatically removes duplicates
 *
 * @param {"vue"|"nuxt"|"vuetify"} framework
 * The selected framework.
 *
 * @param {string[]} features
 * List of enabled features (e.g. ["pinia", "eslint", "tailwind"]).
 *
 * @returns {string[]}
 * A deduplicated array of npm package names.
 */
export function getPackagesList(framework, features) {
  const set = new Set(CORE_PACKAGES[framework] || []);

  features.forEach((feature) => {
    PACKAGE_MAP[framework]?.[feature]?.forEach((pkg) => {
      set.add(pkg);
    });
  });

  return [...set];
}
