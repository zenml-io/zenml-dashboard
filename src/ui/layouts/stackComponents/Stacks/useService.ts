/* eslint-disable */

import { useEffect } from 'react';
import {
  stackComponentsActions,
  stackPagesActions,
} from '../../../../redux/actions';
// import { workspaceSelectors } from '../../../../redux/selectors';
import {
  useDispatch,
  useLocation,
  useLocationPath,
  useParams,
  useSelector,
} from '../../../hooks';
import { DEFAULT_WORKSPACE_NAME } from '../../../../constants';
import { workspaceSelectors } from '../../../../redux/selectors';
import { filterObjectForParam } from '../../../../utils';

interface ServiceInterface {
  setFetching: (arg: boolean) => void;
}

export const useService = (): ServiceInterface => {
  const locationPath = useLocationPath();
  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);
  const dispatch = useDispatch();

  const url_string = window.location.href;
  const url = new URL(url_string);
  const workspaceName = url.searchParams.get('workspace');
  const ITEMS_PER_PAGE = parseInt(
    process.env.REACT_APP_ITEMS_PER_PAGE as string,
  );
  const location: any = useLocation();

  console.log(location.state?.state, 'flavorName');
  const DEFAULT_ITEMS_PER_PAGE = 10;
  useEffect(() => {
    setFetching(true);

    // dispatch(
    //   stackComponentsActions.getMy({
    //     workspace: selectedWorkspace
    //       ? selectedWorkspace
    //       : locationPath.split('/')[2],
    //     type: locationPath.split('/')[4],
    //     sort_by: 'desc:created',
    //     logical_operator: 'and',
    //     index: 1,
    //     size: ITEMS_PER_PAGE ? ITEMS_PER_PAGE : DEFAULT_ITEMS_PER_PAGE,
    //     onSuccess: () => setFetching(false),
    //     onFailure: () => setFetching(false),
    //   }),
    // );
  }, [locationPath, selectedWorkspace]);

  const setFetching = (fetching: boolean) => {
    dispatch(stackPagesActions.setFetching({ fetching }));
  };

  return {
    setFetching,
  };
};

export const callActionForStackComponentsForPagination = () => {
  const locationPath = useLocationPath();
  const dispatch = useDispatch();
  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);

  function dispatchStackComponentsData(
    page: number,
    size: number,
    filters?: any[],
    sortby?: string,
  ) {
    const logicalOperator = localStorage.getItem('logical_operator');

    let filtersParam = filterObjectForParam(filters);
    setFetching(true);
    dispatch(
      stackComponentsActions.getMy({
        workspace: selectedWorkspace
          ? selectedWorkspace
          : locationPath.split('/')[2],
        type: locationPath.split('/')[4],
        sort_by: sortby ? sortby : 'desc:created',
        logical_operator: logicalOperator ? JSON.parse(logicalOperator) : 'and',
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
    dispatchStackComponentsData,
  };
};
