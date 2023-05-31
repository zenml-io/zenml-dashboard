/* eslint-disable */

import { useEffect, useState } from 'react';
import {
  stackComponentsActions,
  stackPagesActions,
} from '../../../../../redux/actions';
// import { workspaceSelectors } from '../../../../redux/selectors';
import {
  useDispatch,
  useLocation,
  useLocationPath,
  useParams,
  useSelector,
} from '../../../../hooks';
import { DEFAULT_WORKSPACE_NAME } from '../../../../../constants';
import {
  sessionSelectors,
  workspaceSelectors,
} from '../../../../../redux/selectors';
import { filterObjectForParam } from '../../../../../utils';
import axios from 'axios';

export const getServiceConnectorResources = (connectorResourceType: any) => {
  const locationPath = useLocationPath();
  const dispatch = useDispatch();
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
  }, []);

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
    //Setting the response into state
  };

  return {
    setFetching,
    serviceConnectorResources,
    // dispatchStackComponentsData,
  };
};
