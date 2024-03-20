import { byKeyForIds } from './reducerHelpers';

describe('byKeyForIds', () => {
  it('when I dont have a current state, I add the id to the store', () => {
    const currentState = {};

    const entities = [
      {
        id: '123',
        name: 'renan',
        teamId: 'id1',
      },
    ];

    const key = 'teamId';

    const nextValue = byKeyForIds(currentState, entities, key);

    expect(nextValue).toEqual({ id1: ['123'] });
  });

  it('Does not add duplicated data', () => {
    const currentState = {
      'some-team-id': ['id1', 'id2', 'id3'],
    };

    const entities = [
      {
        id: 'id1',
        name: 'renan',
        teamId: 'some-team-id',
      },
    ];

    const key = 'teamId';

    const nextValue = byKeyForIds(currentState, entities, key);

    expect(nextValue).toEqual({ 'some-team-id': ['id1', 'id2', 'id3'] });
  });

  it('Does not add duplicated data', () => {
    const currentState = {};

    const entities = [
      {
        id: 'id1',
        name: 'renan',
        teamId: 'some-team-id',
      },
      {
        id: 'id2',
        name: 'renan',
        teamId: 'some-team-id',
      },
    ];

    const key = 'teamId';

    const nextValue = byKeyForIds(currentState, entities, key);

    expect(nextValue).toEqual({ 'some-team-id': ['id1', 'id2'] });
  });
});
