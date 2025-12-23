import inquirer from "inquirer";

/**
 * Displays a single-choice selection prompt.
 *
 * @param {Object} options
 * @param {string} options.name - Result key name
 * @param {string} options.message - Prompt message
 * @param {Array<{name: string, value: any}>} options.choices - Available choices
 * @param {any} [options.defaultValue] - Default selected value
 *
 * @returns {Promise<any>} Selected value
 */
export async function singleChoiceCheckbox({
  name,
  message,
  choices,
  defaultValue,
}) {
  let selected = defaultValue ? [defaultValue] : [];
  while (true) {
    const answer = await inquirer.prompt([
      {
        type: "checkbox",
        name,
        message,
        choices,
        default: selected,
        loop: false,
      },
    ]);
    if (answer[name].length === 1) return answer[name][0];
    selected = [answer[name][answer[name].length - 1]];
  }
}

export async function confirmPrompt(message, defaultValue = true) {
  const { proceed } = await inquirer.prompt([
    {
      type: "confirm",
      name: "proceed",
      message,
      default: defaultValue,
    },
  ]);
  return proceed;
}
