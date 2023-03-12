/* eslint-disable */

import { StackDetailRouteParams } from '.';
import {
  flavorsActions,
  pipelinesActions,
  runPagesActions,
  stackComponentPagesActions,
  stackComponentsActions,
  stacksActions,
} from '../../../../redux/actions';
import {
  stackComponentSelectors,
  stackSelectors,
} from '../../../../redux/selectors';
import { useParams, useSelector } from '../../../hooks';
import { useDispatch } from 'react-redux';
import { stackPagesActions } from '../../../../redux/actions';
import { useEffect, useState } from 'react';
import { filterObjectForParam } from '../../../../utils';
import { GetFlavorsListForLogo } from '../Stacks/List/GetFlavorsListForLogo';

interface ServiceInterface {
  stackComponent: TStack;
  id: TId;
  flavor?: any;
  loading: any;
}

export const useService = (): ServiceInterface => {
  const dispatch = useDispatch();

  const [mapStackComponent, setMapppedStackComponent] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [flavor, setFlavor] = useState([]);
  const { id } = useParams<StackDetailRouteParams>();
  const ITEMS_PER_PAGE = parseInt(
    process.env.REACT_APP_ITEMS_PER_PAGE as string,
  );
  const DEFAULT_ITEMS_PER_PAGE = 10;
  const stackComponent = useSelector(
    stackComponentSelectors.stackComponentForId(id),
  );

  useEffect(() => {
    setFetching(true);
    // Legacy: previously runs was in pipeline
    dispatch(
      stackComponentsActions.stackComponentForId({
        stackComponentId: id,
        onSuccess: (res) => {
          // setFetching(false);

          dispatch(
            flavorsActions.getType({
              type: res?.type,
              name: res?.flavor,
              onSuccess: (res: any) => {
                setFlavor(res.items);
                setFetching(false);
              },
              onFailure: () => setFetching(false),
            }),
          );
        },
        onFailure: () => setFetching(false),
      }),
    );
    // dispatch(
    //   stackComponentsActions.allRunsByStackComponentId({
    //     sort_by: 'desc:created',
    //     logical_operator: 'and',
    //     stackComponentId: id,
    //     page: 1,
    //     size: ITEMS_PER_PAGE ? ITEMS_PER_PAGE : DEFAULT_ITEMS_PER_PAGE,
    //     onSuccess: () => setFetching(false),
    //     onFailure: () => setFetching(false),
    //   }),
    // );
  }, [id]);

  // const setFetching = (fetching: boolean) => {
  //   dispatch(stackComponentPagesActions.setFetching({ fetching }));
  // };

  return { stackComponent, id, flavor, loading: fetching };
};

export const callActionForStackComponentRunsForPagination = () => {
  const dispatch = useDispatch();
  // const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);
  // const { id } = useParams<PipelineDetailRouteParams>();
  function dispatchStackComponentRunsData(
    id: any,
    page: number,
    size: number,
    filters?: any[],
    sortby?: string,
  ) {
    const logicalOperator = localStorage.getItem('logical_operator');
    let filtersParam = filterObjectForParam(filters);
    console.log(page, size, 'page,size');
    // debugger;
    setFetching(true);
    dispatch(
      stackComponentsActions.allRunsByStackComponentId({
        sort_by: sortby ? sortby : 'created',
        logical_operator: logicalOperator ? JSON.parse(logicalOperator) : 'and',
        stackComponentId: id,
        page: page,
        size: size,
        filtersParam,
        onSuccess: () => setFetching(false),
        onFailure: () => setFetching(false),
      }),
    );
  }

  const setFetching = (fetching: boolean) => {
    dispatch(runPagesActions.setFetching({ fetching }));
  };
  return {
    setFetching,
    dispatchStackComponentRunsData,
  };
};
