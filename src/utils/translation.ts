export const tselector = (str: string, key: string) => {
  const excluder = new RegExp(`<(?!${key})[^:>]*:([^>]*)>`, 'g');
  const includer = new RegExp(`<${key}:([^>]*)>`, 'g');

  return str.replace(excluder, '').replace(includer, '$1');
};
