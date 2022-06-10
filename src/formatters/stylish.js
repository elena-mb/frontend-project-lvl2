import _ from 'lodash';

function stringify(val, replacer = ' ', depth = 1) {
  if (!_.isObject(val) || val === null) return `${val}`;
  const spaceFilling = replacer.repeat(depth);
  const endSpaces = replacer.repeat(depth - 1);
  const stringifiedObj = Object.entries(val)
    .map(([key, value]) => `${spaceFilling}${key}: ${stringify(value, replacer, depth + 1)}`)
    .join('\n');
  return `{\n${stringifiedObj}\n${endSpaces}}`;
}

function stylish(ast, obj1, obj2, depth = 1) {
  const replacer = ' ';
  const spacesCount = 2;
  const indentSize = spacesCount * depth + 2 * (depth - 1);
  const indent = replacer.repeat(indentSize);
  const endingIndent = replacer.repeat(indentSize - spacesCount);
  const hasChildren = (key) => _.isEmpty(ast[key].children);
  const mapping = {
    nested(key, o1, o2) {
      return `${indent}  ${key}: ${stylish(ast[key].children, o1[key], o2[key], depth + 1)}`;
    },

    unchanged(key, o1) {
      return `${indent}  ${key}: ${o1[key]}`;
    },

    changed(key, o1, o2) {
      const deletedKey = mapping.deleted(key, o1, o2);
      const addedKey = mapping.added(key, o1, o2);
      return `${deletedKey}\n${addedKey}`;
    },

    deleted(key, o1) {
      return hasChildren(key)
        ? `${indent}- ${key}: ${stringify(o1[key], replacer.repeat(spacesCount * 2), depth + 1)}`
        : `${indent}- ${key}: ${o1[key]}`;
    },

    added(key, o1, o2) {
      return hasChildren(key)
        ? `${indent}+ ${key}: ${stringify(o2[key], replacer.repeat(spacesCount * 2), depth + 1)}`
        : `${indent}+ ${key}: ${o2[key]}`;
    },
  };
  const keys = _.sortBy(Object.keys(ast));
  const strings = keys
    .map((key) => {
      const { status } = ast[key];
      return mapping[status](key, obj1, obj2);
    })
    .join('\n');
  return `{\n${strings}\n${endingIndent}}`;
}

export default stylish;
