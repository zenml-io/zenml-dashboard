export const millisecondsIn = {
  oneHundredMilliseconds: 1000,
  seconds: (s: number | undefined | null): number => {
    if (!s) return 0;
    return 1000 * s;
  },
};
