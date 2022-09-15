import { useEffect } from 'react';
import {
  pipelinePagesActions,
  workspacesActions,
} from '../../../../redux/actions';
import { useDispatch, useRequestOnMount } from '../../../hooks';

export const useService = (): void => {
  const dispatch = useDispatch();

  useRequestOnMount(workspacesActions.getMy, {});

  useEffect(() => {
    setFetching(true);
    dispatch(
      workspacesActions.getMy({
        onSuccess: () => setFetching(false),
        onFailure: () => setFetching(false),
      }),
    );
  }, []);

  const setFetching = (fetching: boolean) => {
    dispatch(pipelinePagesActions.setFetching({ fetching }));
  };
};
