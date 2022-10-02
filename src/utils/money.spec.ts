import { formatMoney } from './money';

const testFormatMoney = (args: any) => expect(formatMoney(args));

describe('formatMoney', () => {
  it('return 0 € for null cases', () => {
    testFormatMoney(null).toEqual('0 €');
    testFormatMoney(undefined).toEqual('0 €');
    testFormatMoney('').toEqual('0 €');
  });

  it('return right format for strings', () => {
    testFormatMoney('5.555555').toEqual('5,56 €');
    testFormatMoney('0.12312312312312').toEqual('0,12 €');
    testFormatMoney('0.00123123123').toEqual('0 €');
  });

  it('return right format for numbers', () => {
    testFormatMoney(5.555555).toEqual('5,56 €');
    testFormatMoney(0.12312312312312).toEqual('0,12 €');
    testFormatMoney(4.5).toEqual('4,50 €');
    testFormatMoney(0.00123123123).toEqual('0 €');
  });
});
