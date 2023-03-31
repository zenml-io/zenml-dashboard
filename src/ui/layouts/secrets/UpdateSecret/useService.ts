/* eslint-disable */

import { SecretDetailRouteParams } from '.';
import {
  pipelinesActions,
  runPagesActions,
  secretsActions,
} from '../../../../redux/actions';
import { stackSelectors, secretSelectors } from '../../../../redux/selectors';
import { useParams, useSelector } from '../../../hooks';
import { useDispatch } from 'react-redux';
import { stackPagesActions } from '../../../../redux/actions';
import { useEffect } from 'react';
import { filterObjectForParam } from '../../../../utils';

interface ServiceInterface {
  secret: any;
}

export const useService = (): ServiceInterface => {
  const dispatch = useDispatch();
  const { id } = useParams<SecretDetailRouteParams>();
  // debugger;
  const ITEMS_PER_PAGE = parseInt(
    process.env.REACT_APP_ITEMS_PER_PAGE as string,
  );
  const DEFAULT_ITEMS_PER_PAGE = 10;
  useEffect(() => {
    // setFetching(true);

    dispatch(
      secretsActions.secretForId({
        secretId: id,
        onSuccess: () => setFetching(false),
        onFailure: () => setFetching(false),
      }),
    );
    // Legacy: previously runs was in pipeline
    // dispatch(
    //   secretsActions.allRunsBysecretId({
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

  const setFetching = (fetching: boolean) => {
    // dispatch(runPagesActions.setFetching({ fetching }));
  };

  const secret = useSelector(secretSelectors.secretForId(id));

  return { secret };
};
