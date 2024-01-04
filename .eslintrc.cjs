module.exports = {
  extends: ["@rocketseat/eslint-config/next", "next/core-web-vitals"],
  rules: {
    "@typescript-eslint/no-var-requires": "off",
    "prettier/prettier": [
      "error",
      {
        printWidth: 80,
        tabWidth: 2,
        singleQuote: false,
        trailingComma: "all",
        arrowParens: "always",
        semi: false,
        endOfLine: "auto",
      },
    ],
  },
}
