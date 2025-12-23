#!/usr/bin/env node
import chalk from "chalk";
import { runCLI } from "../core/runCLI.js";

/**
 * Gracefully handles Ctrl+C (SIGINT) interruption.
 * Prevents ugly stack traces and exits cleanly.
 */
process.on("SIGINT", () => {
  console.log(chalk.yellow("\n⛔ Operation canceled by user.\n"));
  process.exit(0);
});

/**
 * Global handler for unhandled promise rejections.
 * Specifically catches Inquirer ExitPromptError.
 */
process.on("unhandledRejection", (error) => {
  if (error?.name === "ExitPromptError") {
    console.log(chalk.yellow("\n⛔ Operation canceled.\n"));
    process.exit(0);
  }

  console.error(chalk.red("Unexpected error:"), error);
  process.exit(1);
});

console.log(chalk.cyan("\n✨ Vue Art CLI – Modular Version\n"));

await runCLI();
