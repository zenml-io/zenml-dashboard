/* eslint-disable */

import { SecretDetailRouteParams } from '.';
import { connectorsActions } from '../../../../redux/actions';
import { connectorSelectors } from '../../../../redux/selectors';
import { useParams, useSelector } from '../../../hooks';
import { useDispatch } from 'react-redux';
import { stackPagesActions } from '../../../../redux/actions';
import { useEffect, useState } from 'react';
import { filterObjectForParam } from '../../../../utils';

interface ServiceInterface {
  connector: any;
  fetching?: boolean;
}

export const useService = (): ServiceInterface => {
  const dispatch = useDispatch();
  const { id } = useParams<SecretDetailRouteParams>();
  const [fetching, setFetching] = useState(false);
  const ITEMS_PER_PAGE = parseInt(
    process.env.REACT_APP_ITEMS_PER_PAGE as string,
  );
  const DEFAULT_ITEMS_PER_PAGE = 10;
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
    // dispatch(
    //   connectorsActions.allRunsBysecretId({
    //     sort_by: 'desc:created',
    //     logical_operator: 'and',
    //     page: 1,
    //     size: ITEMS_PER_PAGE ? ITEMS_PER_PAGE : DEFAULT_ITEMS_PER_PAGE,
    //     secretId: id,
    //     onSuccess: () => setFetching(false),
    //     onFailure: () => setFetching(false),
    //   }),
    // );
  }, [id]);

  // const setFetching = (fetching: boolean) => {
  //   dispatch(secretPagesActions.setFetching({ fetching }));
  // };

  const connector = useSelector(connectorSelectors.connectorForId(id));

  // const connector = useSelector(connectorSelectors.connectorForId(id));

  return { connector, fetching };
};
