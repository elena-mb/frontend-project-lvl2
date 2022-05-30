import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

export default (ast, data1, data2, formatStyle) => {
  switch (formatStyle) {
    case 'plain':
      return plain(ast, data1, data2);
    case 'json':
      return json(ast, data1, data2);
    default:
      return stylish(ast, data1, data2);
  }
};
