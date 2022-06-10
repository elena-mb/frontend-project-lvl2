import _ from 'lodash';

function plain(ast, obj1, obj2, acc = '') {
  const keys = _.sortBy(Object.keys(ast));
  const getPathTo = (key) => (acc.length > 0 ? `${acc}.${key}` : key);
  const formatValue = (key, obj) => {
    const value = obj[key];
    if (_.isObject(value)) {
      return '[complex value]';
    } if (_.isString(value)) {
      return `'${value}'`;
    }
    return value;
  };
  const mapping = {
    nested(key, o1, o2) {
      return plain(ast[key].children, o1[key], o2[key], getPathTo(key));
    },

    unchanged() {
      return null;
    },

    changed(key, o1, o2) {
      return `Property '${getPathTo(key)}' was updated. From ${formatValue(key, o1)} to ${formatValue(key, o2)}`;
    },

    deleted(key) {
      return `Property '${getPathTo(key)}' was removed`;
    },

    added(key, o1, o2) {
      return `Property '${getPathTo(key)}' was added with value: ${formatValue(key, o2)}`;
    },
  };
  const strings = keys.map((key) => {
    const { status } = ast[key];
    return mapping[status](key, obj1, obj2);
  }).filter((val) => val !== null);
  return strings.join('\n');
}

export default plain;
