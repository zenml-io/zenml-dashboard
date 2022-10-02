export const handleUpdateNumericInput = (value: string): number | null => {
  if (!value) return null;
  else return Math.floor(Number(value));
};
