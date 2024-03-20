import joinClassNames from 'classnames';

export const addStyle = (
  condition: boolean,
  styleWhenTrue: string,
  styleWhenFalse = '',
): string => {
  if (condition) {
    return styleWhenTrue;
  }
  return styleWhenFalse;
};

export { joinClassNames };
