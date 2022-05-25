import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';
// import process from 'node:process';

const parse = (filepath) => {
  const extension = path.extname(filepath);
  let parsedData;
  if (extension === '.json') {
    parsedData = JSON.parse(fs.readFileSync(filepath, 'utf-8'));
  } if (extension === '.yml' || extension === '.yaml') {
    parsedData = yaml.load(fs.readFileSync(filepath, 'utf-8'));
  }
  return parsedData;
};

export default parse;
