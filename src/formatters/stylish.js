import stringify from './stringify.js';

function stylish(ast, obj1, obj2, depth = 1) {
  const replacer = ' ';
  const spacesCount = 2;
  const indentSize = spacesCount * depth + 2 * (depth - 1);
  const indent = replacer.repeat(indentSize);
  const endingIndent = replacer.repeat(indentSize - spacesCount);
  const mapping = {
    unchanged(key, o1, o2, hasChildren) {
      return hasChildren
        ? `${indent}  ${key}: ${stylish(ast[key].children, o1[key], o2[key], depth + 1)}`
        : `${indent}  ${key}: ${o1[key]}`;
    },
    changed(key, o1, o2, hasChildren) {
      return `${this
        .deleted(key, o1, o2, hasChildren)}\n${this
        .added(key, o1, o2, hasChildren)}`;
    },

    deleted(key, o1, o2, hasChildren) {
      return hasChildren
        ? `${indent}- ${key}: ${stringify(o1[key], replacer.repeat(spacesCount * 2), depth + 1)}`
        : `${indent}- ${key}: ${o1[key]}`;
    },

    added(key, o1, o2, hasChildren) {
      return hasChildren
        ? `${indent}+ ${key}: ${stringify(o2[key], replacer.repeat(spacesCount * 2), depth + 1)}`
        : `${indent}+ ${key}: ${o2[key]}`;
    },
  };
  const keys = Object.keys(ast).sort();
  const strings = keys
    .map((key) => {
      const { status } = ast[key];
      return mapping[status](key, obj1, obj2, ast[key].hasChildren());
    })
    .join('\n');
  return `{\n${strings}\n${endingIndent}}`;
}

export default stylish;
