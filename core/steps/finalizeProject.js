import path from "path";
import chalk from "chalk";
import { createProjectStructure } from "../createProjectStructure.js";
import { createPackageJson } from "../createPackageJson.js";
import { installPackages } from "../installPackages.js";
import { getPackagesList } from "../utils/getPackagesList.js";

export async function finalizeProject(config) {
  const projectDir = path.resolve(process.cwd(), config.projectName);
  const packages = getPackagesList(config.framework, config.features);

  createProjectStructure(config);
  createPackageJson({ ...config, projectDir, packages });

  const install = await import("../../helpers/prompts.js").then((m) =>
    m.confirmPrompt("Install node_modules now?", true)
  );

  if (install) {
    await installPackages({ ...config, projectDir });
  }

  console.log(chalk.green("\n✨ Project created successfully!\n"));
}
