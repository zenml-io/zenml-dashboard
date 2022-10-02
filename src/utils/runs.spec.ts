import { getLastThreeRuns } from './runs';

describe('getLastThreeRuns', () => {
  describe('test null cases', () => {
    it('given undefined or null returns []', () => {
      expect(getLastThreeRuns(null)).toEqual([]);
      expect(getLastThreeRuns(undefined)).toEqual([]);
      expect(getLastThreeRuns([])).toEqual([]);
    });
  });

  describe('returns the last three runs', () => {
    it('given unsorted array', () => {
      const date = new Date();
      const secondDate = new Date();
      secondDate.setDate(date.getDate() + 10);

      const firstRun = {
        kubeflowStartTime: date,
      };

      const secondRun = {
        kubeflowStartTime: secondDate,
      };
      const runs = [firstRun, secondRun] as TRun[];

      expect(getLastThreeRuns(runs)).toEqual([secondRun, firstRun]);
    });
  });
});
