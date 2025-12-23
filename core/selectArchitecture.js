/**
 * Prompts the user to select a project architecture.
 * Filters available architectures based on store and recommends an optimal choice.
 *
 * @param {Object} options
 * @param {"vue"|"vuetify"|"nuxt"} options.framework - Selected framework.
 * @param {string} options.scale - Project scale (e.g., small, medium, large).
 * @param {string} options.lifetime - Expected project lifetime.
 * @param {string[]} options.features - Selected project features.
 * @param {Record<string, string[]>} options.ARCHITECTURES - Available architectures per framework.
 * @param {function} options.filterArchitecturesByStore - Function to filter architectures by store.
 * @param {function} options.getRecommendedArchitecture - Function returning recommended architecture.
 * @param {function} options.confirmPrompt - Async function to prompt user for yes/no confirmation.
 * @param {function} options.singleChoiceCheckbox - Async function to prompt user to select a single option.
 * @param {boolean} [options.skipRecommendation=false] - If true, skip recommendation and show list directly.
 * @param {string} [options.currentArchitecture] - Current architecture value (for edit mode).
 * @returns {Promise<string>} Selected or recommended architecture.
 */
export async function selectArchitecture({
  framework,
  scale,
  lifetime,
  features,
  ARCHITECTURES,
  filterArchitecturesByStore,
  getRecommendedArchitecture,
  confirmPrompt,
  singleChoiceCheckbox,
  skipRecommendation = false,
  currentArchitecture,
}) {
  let architectures = ARCHITECTURES[framework];

  if (!architectures || architectures.length === 0) {
    throw new Error(
      `No architectures defined for framework: ${framework}. Available frameworks: ${Object.keys(ARCHITECTURES).join(", ")}`
    );
  }

  architectures = filterArchitecturesByStore(
    features.includes("pinia")
      ? "pinia"
      : features.includes("vuex")
      ? "vuex"
      : null,
    architectures
  );

  if (!architectures || architectures.length === 0) {
    throw new Error(
      `No architectures available after filtering for framework: ${framework}`
    );
  }

  if (skipRecommendation) {
    return singleChoiceCheckbox({
      name: "architecture",
      message: "Select architecture:",
      choices: architectures.map((a) => ({ name: a, value: a })),
      defaultValue: currentArchitecture && architectures.includes(currentArchitecture)
        ? currentArchitecture
        : undefined,
    });
  }

  const recommended = getRecommendedArchitecture({
    framework,
    scale,
    lifetime,
    features,
  });

  const isRecommendedAvailable = architectures.includes(recommended);

  if (isRecommendedAvailable) {
    const useRecommended = await confirmPrompt(
      `Recommended architecture: "${recommended}". Use it?`,
      true
    );

    if (useRecommended) return recommended;
  }

  return singleChoiceCheckbox({
    name: "architecture",
    message: "Select architecture:",
    choices: architectures.map((a) => ({ name: a, value: a })),
  });
}
