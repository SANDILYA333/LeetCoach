const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: {
    "background/service-worker": "./src/background/service-worker.ts",
    "content/content-script": "./src/content/content-script.ts", 
    "injected/monaco-extractor": "./src/injected/monaco-extractor.ts",
    "popup/popup": "./src/popup/popup.ts"
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
    clean: true // 🚀 Clean dist folder on each build
  },
  resolve: {
    extensions: [".ts", ".js"]
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "src/popup/popup.html", to: "popup/popup.html" },
        { from: "manifest.json", to: "manifest.json" }, // 🎯 Copy manifest too
        // { from: "icons", to: "icons" }, // 📁 Uncomment when you add icons
      ],
    }),
  ],
  target: ["web", "es2020"], // 🌐 Chrome extension compatible
  mode: "production",
  devtool: "source-map", // 🔍 Better debugging in production
  optimization: {
    minimize: true,
    splitChunks: false // 📦 Keep everything in single files for extensions
  }
};