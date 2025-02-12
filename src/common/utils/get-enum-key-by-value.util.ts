export const getEnumKeyByValue = (Enum: unknown, value: string): string => {
  const index = Object.values(Enum as object).indexOf(value);

  return Object.keys(Enum as object)[index];
};
