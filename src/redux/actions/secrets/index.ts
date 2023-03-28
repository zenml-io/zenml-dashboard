import { getMySecretsAction } from './getMySecretsAction';
import { getSecretByIdAction } from './getSecretByIdAction';
// import { getAllRunsByStackId } from './getAllRunsBySecretId';

export const secretsActions = {
  getMy: getMySecretsAction,
  secretForId: getSecretByIdAction,
  // allRunsByStackId: getAllRunsByStackId,
};
