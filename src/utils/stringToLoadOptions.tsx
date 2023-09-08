const stringToLoadOptions = (
  array: string[],
): { label: string; value: string }[] =>
  array.sort().map((element) => ({
    label: element,
    value: element,
  }));

export default stringToLoadOptions;
