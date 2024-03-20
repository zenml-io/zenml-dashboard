import { formatDateToDisplay, formateDateDifference } from './date';

const dateString = '2020-02-18T14:24:49.000Z';

describe('formatDateToDisplay', () => {
  it('return dd.MM.yyyy for complete date', () => {
    expect(formatDateToDisplay(new Date(dateString))).toEqual('18.02.2020');
  });
});

describe('formateDateDifference', () => {
  it('formats date to hh:mm:ss', () => {
    const startDate = new Date(2020, 8, 3, 10, 24, 10);
    const endDate = new Date(2020, 8, 6, 15, 10, 50);

    expect(formateDateDifference(endDate, startDate)).toEqual('76:46:40');
  });

  it('returns empty string when there is no start date', () => {
    const startDate = null;
    const endDate = new Date(2020, 8, 6, 15, 10, 50);

    expect(formateDateDifference(endDate, startDate)).toEqual('');
  });

  it('returns empty string when there is no end date', () => {
    const startDate = new Date(2020, 8, 6, 15, 10, 50);
    const endDate = null;

    expect(formateDateDifference(endDate, startDate)).toEqual('');
  });
});
