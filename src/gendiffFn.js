import fs from 'fs';
import path from 'path';
import _ from 'lodash';

// const file1 = '../__fixtures__/file1.json';
// const file2 = '../__fixtures__/file2.json';

function genDiff(filepath1, filepath2) {
  const resolvedPath1 = path.resolve(filepath1);
  const resolvedPath2 = path.resolve(filepath2);
  const data1 = JSON.parse(fs.readFileSync(resolvedPath1, 'utf-8'));
  const data2 = JSON.parse(fs.readFileSync(resolvedPath2, 'utf-8'));
  const keys = _.uniq([...Object.keys(data1), ...Object.keys(data2)].sort());
  const difference = [];
  keys.forEach((key) => {
    const val1 = data1[key];
    const val2 = data2[key];
    if (val1 === val2) {
      difference.push(`  ${key}: ${val1}`);
      return;
    }
    if (val1 && val2) {
      difference.push(`- ${key}: ${val1}`);
      difference.push(`+ ${key}: ${val2}`);
      return;
    }
    if (val1 !== undefined) {
      difference.push(`- ${key}: ${val1}`);
      return;
    }
    difference.push(`+ ${key}: ${val2}`);
  });
  return `{\n ${difference.join('\n ')}\n}`;
}

// console.log(genDiff(file1, file2));
export default genDiff;
