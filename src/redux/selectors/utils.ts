import _ from 'lodash';

const testById = ({
  byId,
  stateStructure,
}: {
  byId: Function;
  stateStructure: string;
}) => {
  describe('byId', () => {
    it('is defined', () => {
      expect(byId).toBeDefined();
    });

    it('to return correctly the value given a state', () => {
      const state = {};
      const byIdValue = {
        someId: {
          id: 'someId',
        },
        otherId: {
          id: 'otherId',
        },
      };
      _.set(state, `${stateStructure}.byId`, byIdValue);

      expect(byId(state)).toEqual(byIdValue);
    });
  });
};

const testIds = ({
  byId,
  stateStructure,
}: {
  byId: Function;
  stateStructure: string;
}) => {
  describe('testIds', () => {
    it('is defined', () => {
      expect(byId).toBeDefined();
    });

    it('to return correctly the value given a state', () => {
      const state = {};
      const idsValue = ['a', 'b'];
      _.set(state, `${stateStructure}.ids`, idsValue);

      expect(byId(state)).toEqual(idsValue);
    });
  });
};

const keyFromStore = ({
  selector,
  stateStructure,
  stateKey,
}: {
  selector: Function;
  stateStructure: string;
  stateKey: string;
}) => {
  describe(stateKey, () => {
    it('is defined', () => {
      expect(selector).toBeDefined();
    });

    it('null state case', () => {
      expect(selector(undefined)).toEqual(undefined);
      expect(selector(null)).toEqual(undefined);
    });

    it('to return correctly the value given a state', () => {
      const keyValue = 123;
      const state = {};
      _.set(state, `${stateStructure}.${stateKey}`, keyValue);

      expect(selector(state)).toEqual(keyValue);
    });
  });
};

export const extractItemFromById = (id: string | null | undefined) => (
  byId: any,
) => _.get(byId, String(id)) || {};

export const extractAllFromById = (byId: any) => _.values(byId) || [];

const selectorsTestHelpers = {
  byId: testById,
  ids: testIds,
  keyFromStore: keyFromStore,
};

export { selectorsTestHelpers };
