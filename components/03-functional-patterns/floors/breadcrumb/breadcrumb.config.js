"use strict";

const configHelper = require("@wondrousllc/fractal-config-helper");
const configObject = configHelper.loadYml(__filename);

configObject.context.breadcrumb.content = configHelper.sampleLoader(
  "_rich-text--default.html"
);

// Export config
module.exports = configObject;
