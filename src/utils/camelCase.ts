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

export const camelCaseToParagraph = (string: string) => {
  return string
    .replace(/(_|-)/g, ' ')
    .trim()
    .replace(/\w\S*/g, function (str: string) {
      return str.charAt(0).toUpperCase() + str.substr(1);
    })
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1 $2');
};
export const titleCase = (s: any) => {
  return s?.replace(/^_*(.)|_+(.)/g, (s: any, c: string, d: string) =>
    c ? c.toUpperCase() : ' ' + d.toUpperCase(),
  );
};
