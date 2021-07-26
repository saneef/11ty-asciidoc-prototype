module.exports = ({ node }) => {
  const title = node.getTitle();
  const { attribution, citetitle } = node.getAttributes();

  const titleContent = title ? `<p class="title">${title}<p>` : "";
  let attributionContent = "";
  if (attribution || citetitle) {
    attributionContent = `<p class="attribution">— ${attribution}${
      citetitle ? `<br>${citetitle}` : ""
    }</p>`;
  }

  return `<blockquote>${titleContent}${node.getContent()}${attributionContent}</blockquote>`;
};
