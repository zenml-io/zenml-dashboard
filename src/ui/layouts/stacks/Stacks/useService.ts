/* eslint-disable */

import { useEffect } from 'react';
import { stackPagesActions, stacksActions } from '../../../../redux/actions';
import { projectSelectors } from '../../../../redux/selectors';
import { useDispatch, useSelector, useLocationPath } from '../../../hooks';

interface ServiceInterface {
  setFetching: (arg: boolean) => void;
}

export const useService = (): ServiceInterface => {
  const locationPath = useLocationPath();
  const dispatch = useDispatch();
  const selectedProject = useSelector(projectSelectors.selectedProject);

  useEffect(() => {
    setFetching(true);
    console.log('locationPath111', locationPath);
    dispatch(
      stacksActions.getMy({
        page: 1,
        size: 5,
        project: selectedProject,
        onSuccess: () => setFetching(false),
        onFailure: () => setFetching(false),
      }),
    );
  }, [locationPath, selectedProject]);

  const setFetching = (fetching: boolean) => {
    dispatch(stackPagesActions.setFetching({ fetching }));
  };

  return {
    setFetching,
    // dispatchStackData,
  };
};

export const callActionForStacksForPagination = () => {
  const locationPath = useLocationPath();
  const dispatch = useDispatch();
  const selectedProject = useSelector(projectSelectors.selectedProject);

  function dispatchStackData(page: number, size: number, filters?: any[]) {
    let filtersParam = filters?.reduce(
      (obj, item) =>
        Object.assign(obj, {
          [item.column.value]: item.type.value + ':' + item.value,
        }),
      {},
    );

    setFetching(true);
    dispatch(
      stacksActions.getMy({
        project: selectedProject,
        page: page,
        size: size,
        filtersParam,
        onSuccess: () => setFetching(false),
        onFailure: () => setFetching(false),
      }),
    );
  }

  const setFetching = (fetching: boolean) => {
    dispatch(stackPagesActions.setFetching({ fetching }));
  };

  return {
    setFetching,
    dispatchStackData,
  };
};
