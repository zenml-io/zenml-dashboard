import _ from 'lodash';

export const camelCaseObject = (object: any): any => {
  const newObject: any = {};
  for (const [key, value] of Object.entries(object)) {
    newObject[_.camelCase(key)] = value;
  }

  return newObject;
};

export const camelCaseArray = (array: any[]): any[] => {
  return array.map((arrayItem: any) => camelCaseObject(arrayItem));
};
