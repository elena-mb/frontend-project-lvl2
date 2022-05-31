import _ from 'lodash';

function json(ast, data1, data2) {
  const mapping = {
    unchanged(key, o1, o2, hasChildren) {
      return hasChildren
        ? {
          [key]: {
            status: 'unchanged',
            value: json(ast[key].children, o1[key], o2[key]),
          },
        }
        : {
          [key]: {
            status: 'unchanged',
            value: _.get(o1, key),
          },
        };
    },
    changed(key, o1, o2) {
      return {
        [key]: {
          status: 'changed',
          prevValue: _.get(o1, key),
          value: _.get(o2, key),
        },
      };
    },

    deleted(key, o1) {
      return {
        [key]: {
          status: 'deleted',
          value: _.get(o1, key),
        },
      };
    },

    added(key, o1, o2) {
      return {
        [key]: {
          status: 'added',
          value: _.get(o2, key),
        },
      };
    },
  };
  const keys = _.sortBy(Object.keys(ast));
  const diffObject = keys
    .reduce((acc, key) => {
      const { status } = ast[key];
      const result = mapping[status](key, data1, data2, ast[key].hasChildren());
      return { ...acc, ...result };
    }, {});
  return diffObject;
}

export default (ast, data1, data2) => {
  const resutlObject = json(ast, data1, data2);
  return JSON.stringify(resutlObject);
};
