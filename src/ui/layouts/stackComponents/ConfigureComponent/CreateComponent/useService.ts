/* eslint-disable */

import { useEffect, useState } from 'react';
import { useDispatch, useLocationPath, useSelector } from '../../../../hooks';
import {
  sessionSelectors,
  workspaceSelectors,
} from '../../../../../redux/selectors';
import axios from 'axios';

export const getServiceConnectorResources = (connectorResourceType: any) => {
  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);

  const authToken = useSelector(sessionSelectors.authenticationToken);
  const [fetching, setFetching] = useState(false);
  const [serviceConnectorResources, setServiceConnectorResources] = useState(
    [],
  );
  useEffect(() => {
    if (connectorResourceType) {
      fetchResourcesList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connectorResourceType]);

  const fetchResourcesList = async () => {
    setFetching(true);
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_API_URL}/workspaces/${selectedWorkspace}/service_connectors/resources?resource_type=${connectorResourceType}`,
      {
        headers: {
          Authorization: `bearer ${authToken}`,
        },
      },
    );

    setServiceConnectorResources(response?.data);
    setFetching(false);
  };

  return {
    fetching,
    serviceConnectorResources,
  };
};
