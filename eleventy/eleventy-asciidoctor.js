const path = require("path");
const asciidoctor = require("asciidoctor")();
const nunjucks = require("nunjucks");
const fs = require("fs");
const matter = require("gray-matter");

function renderAsciidoc(content, baseDir, attributes = {}) {
  return asciidoctor.convert(content, {
    /* eslint-disable camelcase */
    base_dir: baseDir,
    template_dir: path.join(__dirname, "./asciidoctor-templates"),
    safe: "server",
    attributes,
    /* eslint-enable camelcase */
  });
}

function eleventyAsciidoctor() {
  const getInstanceFromInputPath = (inputPath) => {
    return matter(fs.readFileSync(inputPath, "utf8"));
  };

  const compile = (str) => (data) => {
    const {
      page: { inputPath },
      asciidoctorAttributes,
    } = data;

    if (str) {
      // Since `read: false` is set 11ty doesn't read file contents
      // so if str has a value, it's a permalink (which can be a string or a function)
      return typeof str === "function"
        ? str(data)
        : nunjucks.renderString(str, data);
    }

    const { content } = getInstanceFromInputPath(inputPath);
    const baseDir = path.join(__dirname, "..", path.dirname(inputPath));

    if (content) {
      return renderAsciidoc(content, baseDir, asciidoctorAttributes);
    }
  };

  return {
    read: false,
    getData: true,
    getInstanceFromInputPath,
    compile,
  };
}

module.exports = eleventyAsciidoctor;
