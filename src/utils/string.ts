export const truncate = (str: string, n: number): string => {
  if (!str) return '';
  if (!n) return str;
  return str.length > n ? str.substr(0, n) : str;
};

export const replaceVersion = (string: string, newVersion: string) => {
  if (string) {
    const regex = /\d+\.\d+\.\d+/; // Regular expression to match version numbers like "0.35.0"
    return string.replace(regex, newVersion);
  }
};
