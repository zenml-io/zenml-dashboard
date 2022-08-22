export const truncate = (str: string, n: number): string => {
  if (!str) return '';
  if (!n) return str;
  return str.length > n ? str.substr(0, n) : str;
};
