/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ["@menup"], // uses the config in `packages/config/eslint`
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    tsconfigRootDir: __dirname,
    project: ["./apps/*/tsconfig.json", "./packages/**/*/tsconfig.json"],
  },
  settings: {
    next: {
      rootDir: ["apps/*/"],
    },
  },
};
