const parseBoolean = (value: string | undefined, defaultValue: boolean) => {
  if (value === undefined) return defaultValue;
  if (value.toLowerCase() === 'true') return true;
  if (value.toLowerCase() === 'false') return false;
  return defaultValue;
};

export const isIndexingAllowed = () =>
  parseBoolean(process.env.NEXT_PUBLIC_ALLOW_INDEXING, true);
