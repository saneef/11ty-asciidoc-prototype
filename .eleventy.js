const asciidoctor = require("asciidoctor")();
module.exports = function (config) {
  config.addExtension("adoc", function (path, contents) {
    console.log("🔨");
    return asciidoctor.convert(contents);
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
