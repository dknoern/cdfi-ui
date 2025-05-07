import { SorterFn } from 'types/misc';

export const sortByBoolean: SorterFn<boolean> = (a, b) => {
  if (a === b) return 0;
  if (a) return 1;
  return -1;
};

export const sortByNumber: SorterFn<number> = (a, b) => {
  if (a > b) return 1;
  if (a < b) return -1;
  return 0;
};

export const sortByString: SorterFn<string> = (a, b) => {
  const aLow = a.toLocaleLowerCase();
  const bLow = b.toLocaleLowerCase();
  if (aLow > bLow) return 1;
  if (aLow < bLow) return -1;
  return 0;
};

// sorting objects by prop
export const sortByField = (
  field: string,
  fieldType: 'string' | 'number' | 'boolean' = 'number',
): SorterFn => {
  let sorter: SorterFn;
  switch (fieldType) {
    case 'number':
      sorter = sortByNumber;
      break;
    case 'string':
      sorter = sortByString;
      break;
    default:
      sorter = sortByBoolean;
  }

  return ((a, b) => sorter(a[field], b[field])) as SorterFn;
};

// Descending sorter
export const desc = (sortFn: SorterFn): SorterFn => {
  return ((a, b) => sortFn(b, a)) as SorterFn;
};

export const sortByStringDesc = desc(sortByString);

export const sortByAccountCode = sortByField('accountCode', 'string');

export const sortById = sortByField('id');

export const sortByIdDesc = desc(sortById);

export const sortByIndex = sortByField('index');

export const sortByName = sortByField('name', 'string');

export const sortByNameDesc = desc(sortByName);

export const sortByOrder = sortByField('order');

export const sortByPosition = sortByField('position');

// input format unix
export const sortByLastModified = sortByField('lastModified');
