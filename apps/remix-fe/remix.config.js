/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  ignoredRouteFiles: ["**/.*"],
  watchPaths: ["../../packages/ui"],
  // transpileModules: ["ui"],
  // serverDependenciesToBundle: [/^ui\//],
  serverDependenciesToBundle: ["ui"],
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // serverBuildPath: "build/index.js",
  // publicPath: "/build/",
};
