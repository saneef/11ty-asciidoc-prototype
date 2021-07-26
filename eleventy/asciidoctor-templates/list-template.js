module.exports = (node, el = "ul") => {
  const id = node.getId();
  const items = node.getItems();

  const level = node.getLevel() + 2;
  const title = node.getTitle();

  let titleEl = "";
  if (title) {
    titleEl = `<h${level}>${title}</h${level}>`;
  }

  let listItems = "";
  if (items) {
    listItems = items.reduce((acc, item) => {
      const id = item.getId();
      const content = item.getBlocks().length ? item.getContent() : "";
      return `${acc}
    <li${id ? ` id="${id}"` : ""}>
      ${item.getText()}
      ${content}
    </li>`;
    }, "");
  }

  let classAttr = "";
  const roles = node.getRoles();
  if (roles.length) {
    classAttr = ` class="${roles.join(" ")}"`;
  }

  return `${titleEl}<${el}${id ? ` id="${id}"` : ""}${classAttr}>
  ${listItems}
</${el}>`;
};
