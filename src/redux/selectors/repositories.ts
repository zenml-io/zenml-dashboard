import { State } from '../reducers/repositories';
import _ from 'lodash';

const stateKey = (state: State) =>
  _.get(state, 'persisted.repositories.repositories' || []);

function allRepositories(state: State): TRepository[] {
  console.log(state);
  if (!state) return [];
  return stateKey(state);
}

export const repositorySelectors = {
  allRepositories,
};
