import _, { camelCase, isArray, isObject, map } from 'lodash';

export const toCamelCase = (data: any): any => {
  if (isArray(data)) {
    return map(data, toCamelCase);
  }

  if (isObject(data)) {
    return _(data)
      .mapKeys((_, k) => camelCase(k))
      .mapValues((v) => toCamelCase(v))
      .value();
  }

  return data;
};
