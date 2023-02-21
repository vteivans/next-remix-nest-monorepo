module.exports = {
  extends: [
    "next",
    "turbo",
    "prettier",
    // "plugin:@typescript-eslint/recommended-requiring-type-checking",
    // "plugin:@typescript-eslint/recommended",
  ],
  plugins: [
    "@typescript-eslint/",
    // "@typescript-eslint/eslint-plugins/no-floating-promises",
  ],
  parser: "@typescript-eslint/parser",
  rules: {
    "@next/next/no-html-link-for-pages": "off",
    "react/jsx-key": "off",
    "@typescript-eslint/no-floating-promises": "error",
    "@typescript-eslint/no-misused-promises": "error",
    "no-unused-vars": [
      "warn",
      {
        varsIgnorePattern: "React",
      },
    ],
  },
};
