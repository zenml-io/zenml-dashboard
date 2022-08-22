export const idsInsert = (existingIds: any, entities: Array<any>) => {
  const newIds = (existingIds || []).slice(0);
  const ids = entities.map((i: any) => i.id);

  ids.forEach((id: any) => {
    if (newIds.indexOf(id) === -1) {
      newIds.push(id);
    }
  });

  return newIds;
};

export const byKeyInsert = (existingByIds: any, entities: any, key = 'id') => {
  const newByIds = { ...existingByIds };

  entities.forEach((entity: any) => {
    const id = entity[key];
    newByIds[id] = entity;
  });

  return newByIds;
};

export const byKeyToId = (existingByIds: any, entities: any, key = 'id') => {
  const newByIds = { ...existingByIds };

  entities.forEach((entity: any) => {
    const entityKey = entity[key];
    newByIds[entityKey] = entity.id;
  });

  return newByIds;
};

const getNextStateForExistingEntityKey = (
  state: any,
  entityKey: any,
  entity: any,
) => {
  const nextState = { ...state };
  const isEntityIdAlreadyIncluded = nextState[entityKey].includes(entity.id);
  if (!isEntityIdAlreadyIncluded) {
    nextState[entityKey].push(entity.id);
  }

  return nextState;
};

export const byKeyForIds = (currentState: any, entities: any, key = 'id') => {
  let nextState = { ...currentState };

  entities.forEach((entity: any) => {
    const entityKey = entity[key];

    const stateForEntityKeyExists = !!nextState[entityKey];

    if (stateForEntityKeyExists) {
      nextState = getNextStateForExistingEntityKey(
        nextState,
        entityKey,
        entity,
      );
    } else {
      nextState[entityKey] = [entity.id];
    }
  });

  return nextState;
};
