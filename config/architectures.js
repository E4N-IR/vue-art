/**
 * Available architectures per framework.
 *
 * @type {Record<string, string[]>}
 */
export const ARCHITECTURES = {
  nuxt: ["default", "feature", "layered", "enterprise"],
  vue: ["simple", "atomic", "feature", "enterprise"],
  vuetify: ["simple", "feature", "enterprise"],
};

/**
 * Determines the recommended architecture based on project context.
 *
 * @param {Object} params
 * @param {string} params.framework
 * @param {"small"|"medium"|"large"} params.scale
 * @param {"short"|"long"} params.lifetime
 * @param {string[]} params.features
 *
 * @returns {string} Recommended architecture
 */
export function getRecommendedArchitecture({
  framework,
  scale,
  lifetime,
  features,
}) {
  const archs = ARCHITECTURES[framework];
  if (framework === "nuxt") {
    if (scale === "large") return "enterprise";
    if (scale === "medium" && features.includes("ts")) return "feature";
    return "default";
  }
  if (framework === "vuetify") {
    if (scale === "large") return "enterprise";
    if (features.includes("ts") && features.includes("router"))
      return "feature";
    return "simple";
  }
  if (framework === "vue") {
    if (scale === "large") return "enterprise";
    if (
      features.includes("ts") &&
      features.includes("router") &&
      features.includes("pinia")
    )
      return "feature";
    if (features.includes("ts")) return "atomic";
    return "simple";
  }

  return archs[0];
}
