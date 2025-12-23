import { execSync } from "child_process";

/**
 * Get latest stable version of an npm package
 * Falls back to "latest" on error
 */
export function getLatestStableVersion(pkgName) {
  try {
    const version = execSync(`npm view ${pkgName} version`, {
      stdio: ["pipe", "pipe", "ignore"],
    })
      .toString()
      .trim();

    return `^${version}`;
  } catch {
    return "latest";
  }
}
