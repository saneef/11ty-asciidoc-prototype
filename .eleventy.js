const asciidoctor = require("asciidoctor")();

module.exports = function (config) {
  config.addTemplateFormats("adoc");
  config.addExtension("adoc", {
    read: true,
    compile: (contents) => () => asciidoctor.convert(contents),
  });

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
