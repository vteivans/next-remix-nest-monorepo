/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  extends: ["custom"],
  parserOptions: {
    project: true,
    tsconfigRootDir: __dirname,
    ignorePatterns: ["*/.eslintrc.js"],
  },
};
