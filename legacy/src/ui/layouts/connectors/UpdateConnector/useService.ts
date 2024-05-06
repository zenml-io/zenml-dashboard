/* eslint-disable */

import { SecretDetailRouteParams } from '.';
import { connectorsActions } from '../../../../redux/actions';
import { connectorSelectors } from '../../../../redux/selectors';
import { useParams, useSelector } from '../../../hooks';
import { useDispatch } from 'react-redux';

import { useEffect, useState } from 'react';

interface ServiceInterface {
  connector: any;
  fetching?: boolean;
}

export const useService = (): ServiceInterface => {
  const dispatch = useDispatch();
  const { id } = useParams<SecretDetailRouteParams>();
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    setFetching(true);

    dispatch(
      connectorsActions.connectorForId({
        connectorId: id,
        onSuccess: () => setFetching(false),
        onFailure: () => setFetching(false),
      }),
    );
    // Legacy: previously runs was in pipeline
  }, [id]);

  const connector = useSelector(connectorSelectors.connectorForId(id));

  return { connector, fetching };
};
