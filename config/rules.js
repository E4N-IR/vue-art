export const EXCLUSIVE_RULES = [
  {
    ifSelected: "eslint",
    disable: "cypress",
    reason: "ESLint selected, Cypress optional",
  },
  {
    ifSelected: "vitest",
    disable: "cypress",
    reason: "Vitest selected, Cypress optional",
  },
];

export const STORE_ARCHITECTURE_RULES = [
  { store: "vuex", forbiddenArchitectures: ["atomic"] },
];
