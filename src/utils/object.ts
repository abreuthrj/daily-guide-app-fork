export const deepMerge = (target: any, object: any) => {
  if (typeof target !== 'object') {
    return target || object;
  }

  for (const key of [...Object.keys(target), ...Object.keys(object)]) {
    if (typeof target[key] === 'object') {
      target[key] = deepMerge(target[key], object);
    }

    if (!target[key] && object[key]) {
      target[key] = object[key];
    }
  }

  return {
    ...object,
    ...target,
  };
};
