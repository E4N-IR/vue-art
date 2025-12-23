/**
 * Prompts the user to select a project architecture.
 * Filters available architectures based on selected store (Pinia/Vuex)
 * and offers a recommended architecture for confirmation.
 *
 * @param {Object} options
 * @param {"vue"|"vuetify"|"nuxt"} options.framework - Selected framework.
 * @param {string} options.scale - Project scale (e.g., small, medium, large).
 * @param {string} options.lifetime - Expected project lifetime.
 * @param {string[]} options.features - Selected project features.
 * @param {Record<string, string[]>} options.ARCHITECTURES - Available architectures per framework.
 * @param {function} options.filterArchitecturesByStore - Filters architectures based on the store.
 * @param {function} options.getRecommendedArchitecture - Returns the recommended architecture.
 * @param {function} options.singleChoiceCheckbox - Async prompt for single choice selection.
 * @param {function} options.confirmPrompt - Async prompt for yes/no confirmation.
 * @returns {Promise<string>} The selected or recommended architecture.
 */
export async function selectArchitecture({
  framework,
  scale,
  lifetime,
  features,
  ARCHITECTURES,
  filterArchitecturesByStore,
  getRecommendedArchitecture,
  singleChoiceCheckbox,
  confirmPrompt,
}) {
  let architectureChoices = ARCHITECTURES[framework];
  architectureChoices = filterArchitecturesByStore(
    features.includes("pinia")
      ? "pinia"
      : features.includes("vuex")
      ? "vuex"
      : null,
    architectureChoices
  );

  const recommendedArchitecture = getRecommendedArchitecture({
    framework,
    scale,
    lifetime,
    features,
  });
  const useRecommended = await confirmPrompt(
    `Recommended architecture: "${recommendedArchitecture}". Use it?`
  );

  if (useRecommended) return recommendedArchitecture;

  const result = await singleChoiceCheckbox({
    name: "architecture",
    message: "Select architecture manually:",
    choices: architectureChoices.map((a) => ({ name: a, value: a })),
  });

  return result;
}
