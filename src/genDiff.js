import path from 'path';
import _ from 'lodash';
import fs from 'fs';
import parse from './parser.js';
import makePretty from './formatters/index.js';

function diffObjs(obj1, obj2) {
  const keys = _.uniq([...Object.keys(obj1), ...Object.keys(obj2)]);
  const ast = {};
  // ast has the following structure:
  // { [key]: { status: '', , children: {} } }
  // status: added, deleted, changed, unchanged, nested
  const getKeyStatus = (key) => {
    if (_.has(obj1, key) && _.has(obj2, key)) {
      if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
        return 'nested';
      }
      if (obj1[key] === obj2[key]) {
        return 'unchanged';
      }
      return 'changed';
    }
    return _.has(obj1, key) ? 'deleted' : 'added';
  };

  keys.forEach((key) => {
    const syntax = {
      status: getKeyStatus(key),
      children: _.isObject(obj1[key]) && _.isObject(obj2[key])
        ? diffObjs(obj1[key], obj2[key])
        : {},
    };
    _.set(ast, key, syntax);
  });
  return ast;
}

function genDiff(filepath1, filepath2, format = 'stylish') {
  const data1 = fs.readFileSync(path.resolve(filepath1), 'utf-8');
  const data2 = fs.readFileSync(path.resolve(filepath2), 'utf-8');
  const extension1 = path.extname(filepath1).slice(1);
  const extension2 = path.extname(filepath2).slice(1);
  const parsedData1 = parse(data1, extension1);
  const parsedData2 = parse(data2, extension2);
  const ast = diffObjs(parsedData1, parsedData2);
  return makePretty(ast, parsedData1, parsedData2, format);
}
export default genDiff;
