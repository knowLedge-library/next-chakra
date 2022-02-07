const path = require("path");
const nextBundleAnalyzer = require("@next/bundle-analyzer");
const withTM = require("next-transpile-modules");
const { withSentryConfig } = require("@sentry/nextjs");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

// Enable analyze
const withBundleAnalyzer = nextBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

/** @type { import('next').NextConfig } */
module.exports = withTM([
  "@cosmosreverse/cosmos",
  "@cosmosreverse/cosmos-react",
])(
  withBundleAnalyzer({
    reactStrictMode: true,
    swcMinify: true,

    webpack(config, options) {
      const { dev, isServer } = options;

      // Integration source-map
      // Copied from https://github.com/vercel/next-plugins/blob/6786c6c431d896757b870f112f89e1fcf7ac7ae6/packages/next-source-maps/index.js#L13
      if (!dev) {
        config.devtool = "source-map";

        for (const plugin of config.plugins) {
          if (plugin.constructor.name === "UglifyJsPlugin") {
            plugin.options.sourceMap = true;
            break;
          }
        }

        if (config.optimization && config.optimization.minimizer) {
          for (const plugin of config.optimization.minimizer) {
            if (plugin.constructor.name === "TerserPlugin") {
              plugin.options.sourceMap = true;
              break;
            }
          }
        }
      }

      // Do not run type checking twice
      // Show type error in runtime
      if (dev && isServer) {
        config.plugins.push(new ForkTsCheckerWebpackPlugin());
      }

      // 使用 `yarn link` 时，避免使用重复的React依赖所引发的错误。
      // For more info @see https://github.com/martpie/next-transpile-modules/tree/2d935beb70f8420ca42dd0d7bb2ca6755ff8d38c#i-have-trouble-with-duplicated-dependencies-or-the-invalid-hook-call-error-in-react
      config.resolve.alias["react"] = path.resolve(
        __dirname,
        "node_modules/react"
      );

      return config;
    },

    webpackDevMiddleware(config) {
      // eslint-disable-next-line no-param-reassign
      config.watchOptions.ignored = [
        // remove ignoring of all npm modules
        ...config.watchOptions.ignored.filter(
          (ignore) => !ignore.toString().includes("node_modules")
        ),
        /[\\/]node_modules[\\/]((?!dist|dist-react|loader)[\\/].+)/,
      ];

      return config;
    },
  })
);
