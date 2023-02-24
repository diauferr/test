export const optionsparseSelectOptionsIdTitle = (innerResult: any) => {
  if (typeof innerResult !== 'object') return [];

  return innerResult.map((item: any) => {
    if (!('id' in item)) return null;
    return { text: item.title, value: item.id };
  });
};
