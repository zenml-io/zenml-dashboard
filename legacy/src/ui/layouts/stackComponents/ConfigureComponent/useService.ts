/* eslint-disable */

import { useEffect, useState } from 'react';
import { useParams, useSelector } from '../../../hooks';
import {
  flavorSelectors,
  sessionSelectors,
  workspaceSelectors,
} from '../../../../redux/selectors';

import { FlavorDetailRouteParams } from '.';
import { Flavor } from '../../../../api/types';
import axios from 'axios';

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
    if (flavor.metadata.connector_resource_type) {
      fetchResourcesList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flavor.metadata.connector_resource_type]);

  const fetchResourcesList = async () => {
    setFetching(true);

    let url = `${process.env.REACT_APP_BASE_API_URL}/workspaces/${selectedWorkspace}/service_connectors/resources?resource_type=${flavor.metadata.connector_resource_type}`;
    if (flavor.metadata.connector_type !== null) {
      url = `${process.env.REACT_APP_BASE_API_URL}/workspaces/${selectedWorkspace}/service_connectors/resources?resource_type=${flavor.metadata.connector_resource_type}&connector_type=${flavor.metadata.connector_type}`;
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
