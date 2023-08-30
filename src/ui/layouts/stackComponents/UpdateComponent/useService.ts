/* eslint-disable */

import { StackDetailRouteParams } from '.';
import {
  flavorsActions,
  runPagesActions,
  stackComponentsActions,
} from '../../../../redux/actions';
import {
  flavorSelectors,
  sessionSelectors,
  stackComponentSelectors,
  workspaceSelectors,
} from '../../../../redux/selectors';
import { useParams, useSelector } from '../../../hooks';
import { useDispatch } from 'react-redux';

import { useEffect, useState } from 'react';
import { filterObjectForParam } from '../../../../utils';
import { Flavor, StackComponent } from '../../../../api/types';

import axios from 'axios';

interface ServiceInterface {
  stackComponent: StackComponent;
  id: TId;
  flavor?: any;
  loading: any;
  serviceConnectorResources: any;
  fetching?: boolean;
}

export const useService = (): ServiceInterface => {
  const dispatch = useDispatch();

  const [mapStackComponent, setMapppedStackComponent] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [loading, setLoading] = useState(false);
  const [flavor, setFlavor] = useState(([] as unknown) as Flavor);
  const { id } = useParams<StackDetailRouteParams>();
  const authToken = useSelector(sessionSelectors.authenticationToken);
  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);
  const currentFlavor = useSelector(flavorSelectors.myFlavorsAll) as any;
  const ITEMS_PER_PAGE = parseInt(
    process.env.REACT_APP_ITEMS_PER_PAGE as string,
  );
  const DEFAULT_ITEMS_PER_PAGE = 10;
  const stackComponent = useSelector(
    stackComponentSelectors.stackComponentForId(id),
  );

  const [serviceConnectorResources, setServiceConnectorResources] = useState(
    [],
  );
  const fetchResourcesList = async () => {
    let url = `${process.env.REACT_APP_BASE_API_URL}/workspaces/${selectedWorkspace}/service_connectors/resources?resource_type=${currentFlavor[0].connectorResourceType}`;
    if (currentFlavor[0].connectorType !== null) {
      url = `${process.env.REACT_APP_BASE_API_URL}/workspaces/${selectedWorkspace}/service_connectors/resources?resource_type=${currentFlavor[0].connectorResourceType}&connector_type=${currentFlavor[0].connectorType}`;
    }
    const response = await axios.get(url, {
      headers: {
        Authorization: `bearer ${authToken}`,
      },
    });

    setServiceConnectorResources(response?.data);
    setLoading(false);
    //Setting the response into state
  };
  useEffect(() => {
    setFetching(true);
    setLoading(true);
    // Legacy: previously runs was in pipeline
    dispatch(
      stackComponentsActions.stackComponentForId({
        stackComponentId: id,
        onSuccess: (res) => {
          fetchResourcesList();

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
  }, [id]);

  return {
    stackComponent,
    id,
    flavor,
    loading: fetching,
    serviceConnectorResources,
    fetching: loading,
  };
};

export const callActionForStackComponentRunsForPagination = () => {
  const dispatch = useDispatch();

  function dispatchStackComponentRunsData(
    id: any,
    page: number,
    size: number,
    filters?: any[],
    sortby?: string,
  ) {
    const logicalOperator = localStorage.getItem('logical_operator');
    let filtersParam = filterObjectForParam(filters);

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
