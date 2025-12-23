import { singleChoiceCheckbox, confirmPrompt } from "../../helpers/prompts.js";
import { FEATURE_CHOICES } from "../../config/featuresConfig.js";
import {
  ARCHITECTURES,
  getRecommendedArchitecture,
} from "../../config/architectures.js";
import {
  applyExclusiveRules,
  filterArchitecturesByStore,
} from "../featureRules.js";
import { selectArchitecture } from "../selectArchitecture.js";
import inquirer from "inquirer";

export async function collectProjectConfig() {
  const { projectName } = await inquirer.prompt([
    {
      type: "input",
      name: "projectName",
      message: "Project name:",
      validate: (v) => (v && !v.includes(" ") ? true : "Invalid project name"),
    },
  ]);

  const framework = await singleChoiceCheckbox({
    name: "framework",
    message: "Select project type:",
    choices: [
      { name: "Vue", value: "vue" },
      { name: "Nuxt 3", value: "nuxt" },
      { name: "Vue 3 + Vuetify", value: "vuetify" },
    ],
  });

  let features = [];
  const featureChoices = applyExclusiveRules(features, FEATURE_CHOICES);
  const featureResult = await inquirer.prompt([
    {
      type: "checkbox",
      name: "features",
      message: "Select features:",
      choices: featureChoices,
    },
  ]);
  features = featureResult.features;

  const store = await singleChoiceCheckbox({
    name: "store",
    message: "Select store:",
    choices: [
      { name: "None", value: null },
      { name: "Pinia", value: "pinia" },
      { name: "Vuex", value: "vuex" },
    ],
  });
  if (store) features.push(store);

  const scale = await singleChoiceCheckbox({
    name: "scale",
    message: "Project scale:",
    choices: [
      { name: "Small", value: "small" },
      { name: "Medium", value: "medium" },
      { name: "Large", value: "large" },
    ],
  });

  const lifetime = await singleChoiceCheckbox({
    name: "lifetime",
    message: "Project lifetime:",
    choices: [
      { name: "Short-term", value: "short" },
      { name: "Long-term", value: "long" },
    ],
  });

  const architecture = await selectArchitecture({
    framework,
    scale,
    lifetime,
    features,
    ARCHITECTURES,
    filterArchitecturesByStore,
    getRecommendedArchitecture,
    confirmPrompt,
    singleChoiceCheckbox,
  });

  const packageManager = await singleChoiceCheckbox({
    name: "packageManager",
    message: "Select package manager:",
    choices: ["npm", "yarn", "pnpm"].map((v) => ({ name: v, value: v })),
  });

  return {
    projectName,
    framework,
    features,
    architecture,
    scale,
    lifetime,
    packageManager,
  };
}
