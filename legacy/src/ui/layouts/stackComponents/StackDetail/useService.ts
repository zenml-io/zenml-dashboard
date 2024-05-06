/* eslint-disable */

import { StackDetailRouteParams } from '.';
import {
  connectorsActions,
  flavorsActions,
  runPagesActions,
  stackComponentsActions,
} from '../../../../redux/actions';
import {
  sessionSelectors,
  stackComponentSelectors,
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
  flavor: any;
  loading: any;
  flavorList: any[];
  serviceConnectorResources?: any;
}

export const useService = (): ServiceInterface => {
  const dispatch = useDispatch();
  const authToken = useSelector(sessionSelectors.authenticationToken);
  const [fetching, setFetching] = useState(false);
  const [flavor, setFlavor] = useState({} as Flavor);
  const [flavorList, setFlavorList] = useState([] as Flavor[]);
  const [
    serviceConnectorResources,
    setServiceConnectorResources,
  ] = useState() as any;
  const { id } = useParams<StackDetailRouteParams>();

  const stackComponent = useSelector(
    stackComponentSelectors.stackComponentForId(id),
  );
  const fetchServiceConnectorType = async (res: any) => {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_API_URL}/service_connector_types/${res?.metadata?.connector_type?.connector_type}`,
      {
        headers: {
          Authorization: `bearer ${authToken}`,
        },
      },
    );

    setServiceConnectorResources(response.data);

    //Setting the response into state
  };
  useEffect(() => {
    setFetching(true);

    // Legacy: previously runs was in pipeline
    dispatch(
      stackComponentsActions.stackComponentForId({
        stackComponentId: id,
        onSuccess: (res) => {
          if (res?.metadata?.connector !== null) {
            dispatch(
              connectorsActions.connectorForId({
                connectorId: res?.metadata?.connector.id,
                onSuccess: (res) => {
                  fetchServiceConnectorType(res);
                },
              }),
            );
          }

          dispatch(
            flavorsActions.getType({
              type: res?.body.type,
              name: res?.body.flavor,
              onSuccess: (res: any) => {
                setFlavorList(res.items);
                // setFetching(false);

                dispatch(
                  flavorsActions.getById({
                    flavorId: res.items[0].id,
                    onSuccess: (item: any) => {
                      setFlavor(item);

                      setFetching(false);
                    },
                    onFailure: () => setFetching(false),
                  }),
                );
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
    flavorList,
    loading: fetching,
    serviceConnectorResources,
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
