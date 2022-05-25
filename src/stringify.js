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

export default stringify;
