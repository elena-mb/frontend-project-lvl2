import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/gendiffFn.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('shallow tree', () => {
  const filepath1 = getFixturePath('file1.json');
  const filepath2 = getFixturePath('file2.json');
  expect(genDiff(filepath1, filepath2))
    .toEqual('{\n - follow: false\n   host: hexlet.io\n - proxy: 123.234.53.22\n - timeout: 50\n + timeout: 20\n + verbose: true\n}');
});
