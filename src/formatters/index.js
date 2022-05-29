import stylish from './stylish.js';
import plain from './plain.js';

export default (ast, data1, data2, formatStyle) => (formatStyle === 'stylish'
  ? stylish(ast, data1, data2)
  : plain(ast, data1, data2));
