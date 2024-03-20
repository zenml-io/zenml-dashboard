import { handleUpdateNumericInput } from './input';

describe('handleUpdateNumericInput', () => {
  it('if not value, returns null', () => {
    expect(handleUpdateNumericInput('')).toEqual(null);
  });

  it('if numeric without coma, returns numeric value', () => {
    expect(handleUpdateNumericInput('1')).toEqual(1);
  });

  it('if numeric with coma, returns numeric value', () => {
    expect(handleUpdateNumericInput('1.0')).toEqual(1);
  });

  it('if numeric with coma, returns numeric value', () => {
    expect(handleUpdateNumericInput('1.')).toEqual(1);
  });

  it('if float, returns floor', () => {
    expect(handleUpdateNumericInput('1.5')).toEqual(1);
  });
});
