/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  ignoredRouteFiles: ["**/.*"],
  watchPaths: ["../../packages/ui", "../../packages/api-client"],
  // transpileModules: ["ui"],
  // serverDependenciesToBundle: [/^ui\//],
  serverDependenciesToBundle: ["ui", "api-client"],
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // serverBuildPath: "build/index.js",
  // publicPath: "/build/",
};
