import { EXCLUSIVE_RULES, STORE_ARCHITECTURE_RULES } from "../config/rules.js";

/**
 * Disables feature choices based on exclusive selection rules.
 *
 * @param {string[]} selectedFeatures - Features currently selected by the user.
 * @param {Array<{ value: string, label: string, disabled?: string }>} featureChoices - All available feature choices.
 * @returns {Array<{ value: string, label: string, disabled?: string }>} Updated feature choices with disabled reasons applied.
 */
export function applyExclusiveRules(selectedFeatures, featureChoices) {
  return featureChoices.map((choice) => {
    const copy = { ...choice };
    EXCLUSIVE_RULES.forEach((rule) => {
      if (
        selectedFeatures.includes(rule.ifSelected) &&
        rule.disable === choice.value
      ) {
        copy.disabled = rule.reason;
      }
    });
    return copy;
  });
}
/**
 * Filters architectures that are forbidden for a specific store.
 *
 * @param {string} store - The selected store type.
 * @param {string[]} architectures - List of available architectures.
 * @returns {string[]} Filtered architectures allowed for the store.
 */
export function filterArchitecturesByStore(store, architectures) {
  const rule = STORE_ARCHITECTURE_RULES.find((r) => r.store === store);
  if (!rule) return architectures;
  return architectures.filter((a) => !rule.forbiddenArchitectures.includes(a));
}
