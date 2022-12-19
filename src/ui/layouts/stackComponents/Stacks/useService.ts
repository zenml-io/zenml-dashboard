/* eslint-disable */

import { useEffect } from 'react';
import {
  stackComponentsActions,
  stackPagesActions,
} from '../../../../redux/actions';
// import { projectSelectors } from '../../../../redux/selectors';
import { useDispatch, useLocationPath, useSelector } from '../../../hooks';
import { DEFAULT_PROJECT_NAME } from '../../../../constants';
import { projectSelectors } from '../../../../redux/selectors';

interface ServiceInterface {
  setFetching: (arg: boolean) => void;
}

export const useService = (): ServiceInterface => {
  const locationPath = useLocationPath();
  const selectedProject = useSelector(projectSelectors.selectedProject);
  const dispatch = useDispatch();

  const url_string = window.location.href;
  const url = new URL(url_string);
  const projectName = url.searchParams.get('project');
  // debugger;
  useEffect(() => {
    setFetching(true);
    dispatch(
      stackComponentsActions.getMy({
        project: selectedProject ? selectedProject : locationPath.split('/')[2],
        type: locationPath.split('/')[4],
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
  };
};
