import path from 'path';
import _ from 'lodash';
import parse from './parsers.js';
import stylish from './stylish.js';

function diffObjs(obj1, obj2) {
  const keys = _.uniq([...Object.keys(obj1), ...Object.keys(obj2)]);
  const ast = {};
  // { [key]: { status: '', hasChildren(), children: [] } }
  // status: added, deleted, changed, unchanged
  const getKeyStatus = (key) => {
    if (_.has(obj1, key) && _.has(obj2, key)) {
      if (obj1[key] === obj2[key] || (_.isObject(obj1[key]) && _.isObject(obj2[key]))) {
        return 'unchanged';
      }
      return 'changed';
    }
    return _.has(obj1, key) ? 'deleted' : 'added';
  };

  keys.forEach((key) => {
    ast[key] = {
      status: getKeyStatus(key),
      hasChildren() {
        return _.isObject(obj1[key]) || _.isObject(obj2[key]);
      },
      children: _.isObject(obj1[key]) && _.isObject(obj2[key])
        ? diffObjs(obj1[key], obj2[key])
        : {},
    };
  });
  return ast;
}

function genDiff(filepath1, filepath2, format = 'stylish') {
  const resolvedPath1 = path.resolve(filepath1);
  const resolvedPath2 = path.resolve(filepath2);
  const data1 = parse(resolvedPath1);
  const data2 = parse(resolvedPath2);
  const ast = diffObjs(data1, data2);
  return format === 'stylish' ? stylish(ast, data1, data2) : 'working on other formats';
}
export default genDiff;
