var fractal = require('@frctl/fractal').create();
fractal.set('project.title', 'Wondrous Base BaselOne Sample');
fractal.components.set('path', __dirname + '/components');

module.exports = fractal; // export the configured Fractal instance for use by the CLI tool.