import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';

const parse = (filepath) => {
  const extension = path.extname(filepath);
  const parsed = {};
  if (extension === '.json') {
    parsed.data = JSON.parse(fs.readFileSync(filepath, 'utf-8'));
  } if (extension === '.yml' || extension === '.yaml') {
    parsed.data = yaml.load(fs.readFileSync(filepath, 'utf-8'));
  }
  return parsed.data;
};

export default parse;
