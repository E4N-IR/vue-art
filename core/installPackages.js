import { execa } from "execa";
import fs from "fs";
import path from "path";
import { createPackageJson } from "./createPackageJson.js";
/**
 * Installs npm dependencies using selected package manager.
 * Handles Ctrl+C interruption gracefully.
 *
 * @param {Object} options
 * @param {string} options.projectDir
 * @param {"npm"|"yarn"|"pnpm"} options.packageManager
 * @param {string[]} options.features
 * @param {string} options.framework
 *
 * @returns {Promise<void>}
 */
export async function installPackages({
  projectDir,
  framework,
  features,
  packageManager,
  projectName,
}) {
  const pkgPath = path.join(projectDir, "package.json");
  if (!fs.existsSync(pkgPath)) {
    const { CORE_PACKAGES, PACKAGE_MAP } = await import(
      "../config/packages.js"
    );
    const packages = new Set();
    CORE_PACKAGES[framework]?.forEach((p) => packages.add(p));
    features.forEach((f) => {
      const pkgList = PACKAGE_MAP[framework]?.[f];
      if (pkgList) pkgList.forEach((p) => packages.add(p));
    });
    createPackageJson({
      projectDir,
      projectName,
      framework,
      features,
      packages: [...packages],
    });
    console.log("📝 Created package.json");
  }

  const pkgContent = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));
  const hasDependencies =
    (pkgContent.dependencies &&
      Object.keys(pkgContent.dependencies).length > 0) ||
    (pkgContent.devDependencies &&
      Object.keys(pkgContent.devDependencies).length > 0);

  if (!hasDependencies) {
    console.log("No packages to install.");
    return;
  }

  console.log(`\n📦 Installing packages with ${packageManager}...\n`);

  let args = [];
  if (packageManager === "npm") args = ["install"];
  if (packageManager === "yarn") args = ["install"];
  if (packageManager === "pnpm") args = ["install"];

  try {
    const subprocess = execa(packageManager, args, {
      cwd: projectDir,
      stdio: "inherit",
    });

    await subprocess;
    console.log("\n✅ Packages installed successfully!\n");
  } catch (error) {
    if (
      error.signal === "SIGINT" ||
      error.code === "SIGINT" ||
      error.exitCode === 130 ||
      error.code === 130 ||
      error.message?.includes("SIGINT") ||
      error.message?.includes("canceled") ||
      error.message?.includes("User force closed")
    ) {
      const sigintError = new Error(
        "Installation interrupted by user (SIGINT)"
      );
      sigintError.signal = "SIGINT";
      sigintError.code = "SIGINT";
      sigintError.exitCode = 130;
      throw sigintError;
    }
    throw error;
  }
}
