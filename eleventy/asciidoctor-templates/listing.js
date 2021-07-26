const hljs = require("highlight.js");

module.exports = ({ node }) => {
  const level = node.getLevel() + 2;
  const title = node.getTitle();
  const style = node.getStyle();
  const content = node.getSource();

  let titleEl = "";
  if (title) {
    titleEl = `<h${level}>${title}</h${level}>`;
  }

  if (style === "source") {
    const lang = node.getAttribute("language");

    let highlightedContent = content.trim();
    if (lang && lang !== "text") {
      try {
        highlightedContent = hljs.highlight(content.trim(), {
          language: lang,
        }).value;
      } catch (e) {
        if (e.toString().indexOf("Unknown language") === -1) {
          console.log(e);
        } else {
          console.log(`'${lang}' is not a language supported by highlight.js`);
        }
      }
    }

    return `${titleEl}
<pre class="language-${lang} hljs"><code class="language-${lang} hljs">${highlightedContent}</code></pre> `;
  }

  return `${titleEl}
<pre>${content}</pre>`;
};
