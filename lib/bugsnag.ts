import React from "react";
import Bugsnag from "@bugsnag/js";
import BugsnagPluginReact from "@bugsnag/plugin-react";

Bugsnag.start({
  apiKey: "0d9b370861e7003d0f15c6ae2a78adea",
  plugins: [new BugsnagPluginReact()],
});

export const notify = (errMessage: string) =>
  Bugsnag.notify(new Error(errMessage || "Unknown message"));

export const ErrorBoundary =
  Bugsnag.getPlugin("react")!.createErrorBoundary(React);
