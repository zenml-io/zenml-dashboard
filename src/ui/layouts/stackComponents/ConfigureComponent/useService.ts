/* eslint-disable */

import { useEffect, useState } from 'react';

import { useParams, useSelector } from '../../../hooks';
import axios from 'axios';

import {
  flavorSelectors,
  sessionSelectors,
  workspaceSelectors,
} from '../../../../redux/selectors';

import { FlavorDetailRouteParams } from '.';
import { Flavor } from '../../../../api/types';

interface ServiceInterface {
  flavor: Flavor;
  id: any;
  fetching?: boolean;
  serviceConnectorResources?: any;
}

export const useService = (): ServiceInterface => {
  const { id } = useParams<FlavorDetailRouteParams>();
  const flavor: any = useSelector(flavorSelectors.flavorForId(id));
  const authToken = useSelector(sessionSelectors.authenticationToken);
  const [fetching, setFetching] = useState(false);
  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);
  const [serviceConnectorResources, setServiceConnectorResources] = useState(
    [],
  );

  useEffect(() => {
    if (flavor.connectorResourceType) {
      fetchResourcesList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flavor.connectorResourceType]);

  const fetchResourcesList = async () => {
    setFetching(true);
    let url = `${process.env.REACT_APP_BASE_API_URL}/workspaces/${selectedWorkspace}/service_connectors/resources?resource_type=${flavor.connectorResourceType}`;
    if (flavor.connectorType !== null) {
      url = `${process.env.REACT_APP_BASE_API_URL}/workspaces/${selectedWorkspace}/service_connectors/resources?resource_type=${flavor.connectorResourceType}&connector_type=${flavor.connectorType}`;
    }
    const response = await axios.get(url, {
      headers: {
        Authorization: `bearer ${authToken}`,
      },
    });

    setServiceConnectorResources(response?.data);
    setFetching(false);
    //Setting the response into state
  };
  return {
    id,
    flavor,
    fetching,
    serviceConnectorResources,
  };
};
