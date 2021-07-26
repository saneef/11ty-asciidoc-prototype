const asciidoctor = require("./eleventy/eleventy-asciidoctor.js");

module.exports = function (config) {
  // Add support for Asciidoc
  config.addTemplateFormats("adoc");
  config.addExtension("adoc", asciidoctor());

  return {
    dir: {
      input: "src",
      output: "dist",
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    passthroughFileCopy: true,
  };
};
