export const escapeQuotes = (str: string) =>
  str.replace(/'/g, "\\'").replace(/"/g, '\\"');

export const unescapeQuotes = (str: string) =>
  str.replace(/\\'/g, "'").replace(/\\"/g, '"');
