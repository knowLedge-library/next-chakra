const path = require("path");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

/** @type { import('next').NextConfig } */
module.exports = {
  reactStrictMode: true,

  webpack(config, options) {
    const { dev, isServer } = options;

    // Do not run type checking twice
    // Show type error in runtime
    if (dev && isServer) {
      config.plugins.push(new ForkTsCheckerWebpackPlugin());
    }

    // Avoid duplicated react dependencies error when using `yarn link` to
    // For more info @see https://github.com/martpie/next-transpile-modules/tree/2d935beb70f8420ca42dd0d7bb2ca6755ff8d38c#i-have-trouble-with-duplicated-dependencies-or-the-invalid-hook-call-error-in-react
    config.resolve.alias["react"] = path.resolve(
      __dirname,
      "node_modules/react"
    );

    return config;
  },
};
