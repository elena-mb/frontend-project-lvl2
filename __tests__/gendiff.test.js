import path, { dirname } from 'path';
import * as fs from 'fs';
import { fileURLToPath } from 'url';
// import _ from 'lodash';
import genDiff from '../src/genDiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

function getParsedResult(filename) {
  const extension = path.extname(filename);
  switch (extension) {
    case '.txt':
      return fs.readFileSync(getFixturePath(filename), 'utf-8').toString().trim();
    case '.json':
      return JSON.parse(fs.readFileSync(getFixturePath(filename), 'utf-8'));
    default:
      throw new Error('wrong file format');
  }
}

const gendiffResultStylish = getParsedResult('resultStylish.txt');
const gendiffResultPlain = getParsedResult('resultPlain.txt');
const gendiffResultJSON = getParsedResult('resultJSON.json');

test('json files, stylish format', () => {
  const filepath1 = getFixturePath('file1.json');
  const filepath2 = getFixturePath('file2.json');
  expect(genDiff(filepath1, filepath2)).toEqual(gendiffResultStylish);
});

test('yaml files, stylish format', () => {
  const filepath1 = getFixturePath('file1.yaml');
  const filepath2 = getFixturePath('file2.yml');
  expect(genDiff(filepath1, filepath2)).toEqual(gendiffResultStylish);
});

test('json files, plain format', () => {
  const filepath1 = getFixturePath('file1.json');
  const filepath2 = getFixturePath('file2.json');
  expect(genDiff(filepath1, filepath2, 'plain')).toEqual(gendiffResultPlain);
});

test('yaml files, plain format', () => {
  const filepath1 = getFixturePath('file1.yaml');
  const filepath2 = getFixturePath('file2.yml');
  expect(genDiff(filepath1, filepath2, 'plain')).toEqual(gendiffResultPlain);
});

test('json files, json format', () => {
  const filepath1 = getFixturePath('file1.json');
  const filepath2 = getFixturePath('file2.json');
  const actual = genDiff(filepath1, filepath2, 'json');
  expect(JSON.parse(actual)).toEqual(gendiffResultJSON);
});
