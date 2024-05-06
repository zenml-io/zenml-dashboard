import { REQUESTED, SUCCESS, FAILURE } from '../constants';

export const testHelperForActionTypes = ({
  types,
  actionType,
}: {
  types: {
    request: string;
    failure: string;
    success: string;
  };
  actionType: string;
}) => {
  describe(actionType, () => {
    it('REQUESTED type is correct', () => {
      expect(types.request).toEqual(`${actionType}_${REQUESTED}`);
    });
    it('SUCCESS type is correct', () => {
      expect(types.success).toEqual(`${actionType}_${SUCCESS}`);
    });
    it('FAILURE type is correct', () => {
      expect(types.failure).toEqual(`${actionType}_${FAILURE}`);
    });
  });
};
