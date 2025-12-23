import chalk from "chalk";
import path from "path";
import { collectProjectConfig } from "./steps/collectProjectConfig.js";
import { reviewAndConfirm } from "./steps/reviewAndConfirm.js";
import { createProjectStructure } from "./createProjectStructure.js";
import { createPackageJson } from "./createPackageJson.js";
import { installPackages } from "./installPackages.js";

/**
 * Main CLI workflow controller.
 *
 * Responsibilities:
 * - Collect user configuration
 * - Allow review & editing
 * - Generate project structure
 * - Generate package.json
 * - Optionally install dependencies
 *
 * @returns {Promise<void>}
 */
export async function runCLI() {
  try {
    const config = await collectProjectConfig();
    const confirmed = await reviewAndConfirm(config);
    if (!confirmed) {
      console.log(chalk.yellow("Project creation canceled."));
      return;
    }

    const projectDir = path.resolve(process.cwd(), config.projectName);

    createProjectStructure(config);

    createPackageJson({
      projectDir,
      ...config,
    });

    console.log("📝 Created package.json");

    if (confirmed.installNodeModules) {
      await installPackages({
        projectDir,
        ...config,
      });
    }

    console.log(chalk.green("\n✨ Project created successfully!\n"));
    const pm = confirmed.packageManager || "npm";
    const pmCommand = pm === "yarn" ? "yarn" : pm === "pnpm" ? "pnpm" : "npm";

    console.log(chalk.cyan("📋 Next steps:\n"));
    console.log(chalk.cyan(`  cd ${confirmed.projectName}`));
    if (!confirmed.installNodeModules) {
      console.log(chalk.yellow(`  ${pmCommand} install`));
    }
    console.log(chalk.cyan(`  ${pmCommand} run dev\n`));
  } catch (error) {
    if (error?.name === "ExitPromptError") {
      console.log(chalk.yellow("\n⛔ Operation canceled.\n"));
      process.exit(0);
    }

    throw error;
  }
}
