import _, { isArray, isObject, kebabCase, map } from 'lodash';

export const toKebabCase = (data: any): any => {
  if (isArray(data)) {
    return map(data, toKebabCase);
  }

  if (isObject(data)) {
    return _(data)
      .mapKeys((_, k) => kebabCase(k))
      .mapValues((v) => toKebabCase(v))
      .value();
  }

  return data;
};
