import { confirmPrompt, singleChoiceCheckbox } from "../../helpers/prompts.js";
import { getPackagesList } from "../utils/getPackagesList.js";
import inquirer from "inquirer";
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

/**
 * Allows user to edit individual configuration options
 */
async function editConfig(config) {
  let editedConfig = { ...config };

  // Edit project name
  if (
    await confirmPrompt(
      `Edit project name? (Current: ${config.projectName})`,
      false
    )
  ) {
    const { projectName } = await inquirer.prompt([
      {
        type: "input",
        name: "projectName",
        message: "Project name:",
        default: config.projectName,
        validate: (v) =>
          v && !v.includes(" ") ? true : "Invalid project name",
      },
    ]);
    editedConfig.projectName = projectName;
  }

  // Edit framework
  if (
    await confirmPrompt(`Edit framework? (Current: ${config.framework})`, false)
  ) {
    editedConfig.framework = await singleChoiceCheckbox({
      name: "framework",
      message: "Select project type:",
      choices: [
        { name: "Vue", value: "vue" },
        { name: "Nuxt 3", value: "nuxt" },
        { name: "Vue 3 + Vuetify", value: "vuetify" },
      ],
      defaultValue: config.framework,
    });
  }

  // Edit features
  const currentStore = config.features.find(
    (f) => f === "pinia" || f === "vuex"
  );
  const featuresWithoutStore = config.features.filter(
    (f) => f !== "pinia" && f !== "vuex"
  );

  if (
    await confirmPrompt(
      `Edit features? (Current: ${config.features.join(", ") || "none"})`,
      false
    )
  ) {
    const featureChoices = applyExclusiveRules(
      featuresWithoutStore,
      FEATURE_CHOICES
    );
    const featureResult = await inquirer.prompt([
      {
        type: "checkbox",
        name: "features",
        message: "Select features:",
        choices: featureChoices,
        default: featuresWithoutStore,
      },
    ]);
    editedConfig.features = featureResult.features;
  } else {
    // Keep features as is (without store, we'll add it separately)
    editedConfig.features = [...featuresWithoutStore];
  }

  // Edit store (separate question)
  if (
    await confirmPrompt(
      `Edit store? (Current: ${currentStore || "None"})`,
      false
    )
  ) {
    const store = await singleChoiceCheckbox({
      name: "store",
      message: "Select store:",
      choices: [
        { name: "None", value: null },
        { name: "Pinia", value: "pinia" },
        { name: "Vuex", value: "vuex" },
      ],
      defaultValue: currentStore || null,
    });
    if (store) editedConfig.features.push(store);
  } else if (currentStore) {
    // Keep old store if not editing
    editedConfig.features.push(currentStore);
  }

  // Edit scale
  if (
    await confirmPrompt(`Edit project scale? (Current: ${config.scale})`, false)
  ) {
    editedConfig.scale = await singleChoiceCheckbox({
      name: "scale",
      message: "Project scale:",
      choices: [
        { name: "Small", value: "small" },
        { name: "Medium", value: "medium" },
        { name: "Large", value: "large" },
      ],
      defaultValue: config.scale,
    });
  }

  // Edit lifetime
  if (
    await confirmPrompt(
      `Edit project lifetime? (Current: ${config.lifetime})`,
      false
    )
  ) {
    editedConfig.lifetime = await singleChoiceCheckbox({
      name: "lifetime",
      message: "Project lifetime:",
      choices: [
        { name: "Short-term", value: "short" },
        { name: "Long-term", value: "long" },
      ],
      defaultValue: config.lifetime,
    });
  }

  // Edit architecture
  if (
    await confirmPrompt(
      `Edit architecture? (Current: ${editedConfig.architecture})`,
      false
    )
  ) {
    editedConfig.architecture = await selectArchitecture({
      framework: editedConfig.framework,
      scale: editedConfig.scale,
      lifetime: editedConfig.lifetime,
      features: editedConfig.features,
      ARCHITECTURES,
      filterArchitecturesByStore,
      getRecommendedArchitecture,
      confirmPrompt,
      singleChoiceCheckbox,
      skipRecommendation: true,
      currentArchitecture: editedConfig.architecture,
    });
  }

  // Edit package manager
  if (
    await confirmPrompt(
      `Edit package manager? (Current: ${config.packageManager})`,
      false
    )
  ) {
    editedConfig.packageManager = await singleChoiceCheckbox({
      name: "packageManager",
      message: "Select package manager:",
      choices: ["npm", "yarn", "pnpm"].map((v) => ({ name: v, value: v })),
      defaultValue: config.packageManager,
    });
  }

  return editedConfig;
}

export async function reviewAndConfirm(config) {
  const packages = getPackagesList(config.framework, config.features);

  // Ask if user wants to edit
  const wantsToEdit = await confirmPrompt(
    `
Project: ${config.projectName}
Framework: ${config.framework}
Architecture: ${config.architecture}
Features: ${config.features.join(", ") || "none"}
Packages: ${packages.join(", ") || "none"}

Do you want to edit any of these options?`,
    false
  );

  let finalConfig = config;
  if (wantsToEdit) {
    finalConfig = await editConfig(config);
    // Show updated config and ask again
    const updatedPackages = getPackagesList(
      finalConfig.framework,
      finalConfig.features
    );
    const proceed = await confirmPrompt(
      `
Updated configuration:
Project: ${finalConfig.projectName}
Framework: ${finalConfig.framework}
Architecture: ${finalConfig.architecture}
Features: ${finalConfig.features.join(", ") || "none"}
Packages: ${updatedPackages.join(", ") || "none"}
Proceed?`,
      true
    );

    if (!proceed) {
      return null;
    }
  } else {
    const proceed = await confirmPrompt("Proceed?", true);
    if (!proceed) {
      return null;
    }
  }

  const installNodeModules = await confirmPrompt(
    "Do you want to install dependencies?",
    true
  );

  return {
    ...finalConfig,
    installNodeModules,
  };
}
