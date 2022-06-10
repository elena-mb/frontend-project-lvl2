import yaml from 'js-yaml';

const parse = (rowData, extension) => {
  const parsers = {
    json: (data) => JSON.parse(data),
    yml: (data) => yaml.load(data),
    yaml: (data) => yaml.load(data),
  };
  return parsers[extension](rowData);
};

export default parse;
