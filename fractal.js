// --------------------------------------------------------
// Dependencies
// --------------------------------------------------------
var fractal = require("@frctl/fractal").create();
const pkg = require("./package.json");
const twigAdapter = require("@wondrousllc/fractal-twig-drupal-adapter");

fractal.set("project.title", "WNDRS Fractal Sample - BaselOne");
fractal.components.set("path", __dirname + "/components/");

// mock twig functions, filter and tags
const twig = twigAdapter({
  handlePrefix: "@components/"
});

// --------------------------------------------------------
// Configuration
// --------------------------------------------------------
const paths = {
  build: `${__dirname}/styleguide`,
  docs: `${__dirname}/docs`,
  components: `${__dirname}/components`,
  static: `${__dirname}/static`
};

fractal.set("project.title", pkg.name);
fractal.set("project.version", pkg.version);
fractal.set("project.author", pkg.author);

fractal.components.engine(twig);
fractal.components.set("default.preview", "@preview");
fractal.components.set("ext", ".twig");
fractal.components.set("path", paths.components);

fractal.docs.set("path", paths.docs);

fractal.web.set("builder.dest", paths.build);
fractal.web.set("static.path", paths.static);

module.exports = fractal; // export the configured Fractal instance for use by the CLI tool.
