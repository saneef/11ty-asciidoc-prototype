module.exports = ({ node }) => {
  const level = node.getLevel() + 1;
  return `<h${level} id="${node.getId()}">${node.getTitle()}</h${level}>
  ${node.getContent()}`;
};
