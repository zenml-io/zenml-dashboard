import { millisecondsIn } from './time';

describe('millisecondsIn seconds', () => {
  it('returns 0 for not a null or undefined', () => {
    expect(millisecondsIn.seconds(null as any)).toEqual(0);
    expect(millisecondsIn.seconds(undefined as any)).toEqual(0);
  });

  it('returns 2000 for 2', () => {
    expect(millisecondsIn.seconds(2)).toEqual(2000);
  });

  it('returns 500 for 0.5', () => {
    expect(millisecondsIn.seconds(0.5)).toEqual(500);
  });
});
