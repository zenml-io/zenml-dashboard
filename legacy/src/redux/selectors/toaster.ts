export const getToasterDescription = (state: {
  toaster: { description: string | null };
}): string | null => {
  if (!state || !state.toaster || !state.toaster.description) return null;

  return state.toaster.description;
};

export const getToasterType = (state: {
  toaster: { description: string | null; type: string | null };
}): string | null => {
  if (!state || !state.toaster || !state.toaster.type) return null;

  return state.toaster.type;
};
