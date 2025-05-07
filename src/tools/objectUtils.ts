type Obj = Record<string, any>;
type Path = string[] | string;

/**
 * @param obj Object to operate
 * @param value Value to set
 * @param path Array of string elements or string with path parts separated by symbol
 * @return Modified object or null if error occurred
 */
const setByPath = (obj: Obj, value: any, path: Path): Obj | null => {
  let pathParts = path;

  if (typeof path === 'string') pathParts = path.split(/[^a-zA-Z]/);

  try {
    let resultObj: any = obj;

    for (let i = 0; i < pathParts.length - 1; i += 1) {
      resultObj = resultObj[pathParts[i]];
    }

    resultObj[pathParts[pathParts.length - 1]] = value;

    return resultObj;
  } catch (e) {
    console.error('setByPath()', e);
  }

  return null;
};

/**
 * @param obj Object to operate
 * @param path Array of string elements or string with path parts separated by symbol
 * @return Value or null if error occurred
 */
const getByPath = (obj: Obj, path: Path): Obj | null => {
  let pathParts = path;

  if (typeof path === 'string') pathParts = path.split(/[^a-zA-Z]/);

  try {
    return (pathParts as string[]).reduce(
      (o, key) => (o && o[key] ? o[key] : null),
      obj,
    );
  } catch (e) {
    console.error('getByPath()', e);
  }

  return null;
};

/**
 * @param obj Object to operate
 * @param separator Separates resulting path parts
 * @param prefix Prefix
 * @return Flattened obj with mapped nested fields
 */

const flattenObject = (
  obj: Obj,
  separator = '.',
  prefix = '',
): Record<string, any> =>
  Object.keys(obj).reduce((acc, k) => {
    const pre = prefix.length ? `${prefix}${separator}` : '';
    if (
      typeof obj[k] === 'object' &&
      obj[k] !== null &&
      Object.keys(obj[k]).length > 0
    )
      Object.assign(acc, flattenObject(obj[k], separator, `${pre}${k}`));
    else acc[`${pre}${k}`] = obj[k];
    return acc;
  }, {} as Record<string, any>);

export { getByPath, setByPath, flattenObject };
