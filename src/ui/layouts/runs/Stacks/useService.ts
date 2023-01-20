/* eslint-disable */

import { useEffect } from 'react';
import { stackPagesActions, stacksActions } from '../../../../redux/actions';
import { projectSelectors } from '../../../../redux/selectors';

import { useDispatch, useLocationPath, useSelector } from '../../../hooks';

interface ServiceInterface {
  setFetching: (arg: boolean) => void;
}

export const useService = (): ServiceInterface => {
  const locationPath = useLocationPath();
  const dispatch = useDispatch();
  const selectedProject = useSelector(projectSelectors.selectedProject);
  const ITEMS_PER_PAGE = parseInt(
    process.env.REACT_APP_ITEMS_PER_PAGE as string,
  );
  const DEFAULT_ITEMS_PER_PAGE = 10;
  useEffect(() => {
    setFetching(true);
    dispatch(
      stacksActions.getMy({
        sort_by: 'created',
        logical_operator: 'and',
        page: 1,
        size: ITEMS_PER_PAGE ? ITEMS_PER_PAGE : DEFAULT_ITEMS_PER_PAGE,
        project: selectedProject as string,
        onSuccess: () => setFetching(false),
        onFailure: () => setFetching(false),
      }),
    );
  }, [locationPath]);

  const setFetching = (fetching: boolean) => {
    dispatch(stackPagesActions.setFetching({ fetching }));
  };

  return {
    setFetching,
  };
};
