import { getMySecretsAction } from './getMySecretsAction';
import { getSecretByIdAction } from './getSecretByIdAction';

export const secretsActions = {
  getMy: getMySecretsAction,
  secretForId: getSecretByIdAction,
};
