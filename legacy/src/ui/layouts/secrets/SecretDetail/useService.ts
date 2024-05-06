/* eslint-disable */

import { SecretDetailRouteParams } from '.';
import { secretsActions } from '../../../../redux/actions';
import { secretSelectors } from '../../../../redux/selectors';
import { useParams, useSelector } from '../../../hooks';
import { useDispatch } from 'react-redux';

import { useEffect, useState } from 'react';
import { Secret } from '../../../../api/types';

interface ServiceInterface {
  secret: Secret;
  fetching?: boolean;
}

export const useService = (): ServiceInterface => {
  const dispatch = useDispatch();
  const { id } = useParams<SecretDetailRouteParams>();
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    setFetching(true);

    dispatch(
      secretsActions.secretForId({
        secretId: id,
        onSuccess: () => setFetching(false),
        onFailure: () => setFetching(false),
      }),
    );
  }, [id]);

  const secret = useSelector(secretSelectors.secretForId(id));

  return { secret, fetching };
};
