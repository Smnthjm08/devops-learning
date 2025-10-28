/** @type {import("eslint").Linter.Config} */
export default {
  root: true,
  ignorePatterns: ["apps/**", "packages/**"],
  extends: ["@workspace/eslint-config/library"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
};
