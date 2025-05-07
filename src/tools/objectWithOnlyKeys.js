export const objectWithOnlyKeys = (obj, keys) => {
  return keys.reduce((res, k) => {
    if (k in obj) res[k] = obj[k];
    return res;
  }, {});
};
