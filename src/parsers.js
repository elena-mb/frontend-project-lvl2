import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';

const parse = (filepath) => {
  const extension = path.extname(filepath).slice(1);
  const parsers = {
    json(data) {
      return JSON.parse(data);
    },
    yml(data) {
      return yaml.load(data);
    },
    yaml(data) {
      return yaml.load(data);
    },
  };
  const data = fs.readFileSync(filepath, 'utf-8');
  return parsers[extension](data);
};

export default parse;
