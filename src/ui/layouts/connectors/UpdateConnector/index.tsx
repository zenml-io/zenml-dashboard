import React, { useEffect, useState } from 'react';

import { routePaths } from '../../../../routes/routePaths';
import { translate } from './translate';
import { UpdateConfig } from './UpdateConfig';

import { BasePage } from '../BasePage';
import { useService } from './useService';
import { useHistory, useLocation, useSelector } from '../../../hooks';

import { Box } from '../../../components';
import { workspaceSelectors } from '../../../../redux/selectors';
import { DEFAULT_WORKSPACE_NAME } from '../../../../constants';

import { CollapseTable } from '../../common/CollapseTable';
import { GetHeaderCols } from './getHeaderCols';

const getTabPages = (
  connectorId: TId,
  selectedWorkspace: string,
  routeState?: any,
): TabPage[] => {
  return [
    {
      text: translate('tabs.update.text'),
      Component: () => (
        <UpdateConfig connectorId={connectorId} state={routeState} />
      ),
      path: routePaths.connectors.updateConnector(
        connectorId,
        selectedWorkspace,
      ),
    },
  ];
};

const url_string = window.location.href;
const url = new URL(url_string);
const workspaceName = url.searchParams.get('workspace');
const workspace = workspaceName ? workspaceName : DEFAULT_WORKSPACE_NAME;

const getBreadcrumbs = (
  connectorId: TId,
  selectedWorkspace: string,
): TBreadcrumb[] => {
  return [
    {
      name: translate('header.breadcrumbs.secrets.text'),
      clickable: true,
      to: routePaths.connectors.base + `?workspace=${workspace}`,
    },
    {
      name: connectorId,
      clickable: true,
      to: routePaths.connectors.configuration(connectorId, selectedWorkspace),
    },
  ];
};

export interface SecretDetailRouteParams {
  id: TId;
}

export const ConnectorDetail: React.FC = () => {
  const { connector } = useService();
  const filteredConnector: any = [];
  filteredConnector.push(connector);
  const history = useHistory();
  const location = useLocation();

  const [routeState, setRouteState] = useState({}) as any;

  useEffect(() => {
    setRouteState(location);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setRouteState]);

  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);

  const tabPages = getTabPages(connector.id, selectedWorkspace, routeState);
  const breadcrumbs = getBreadcrumbs(connector.id, selectedWorkspace);
  const headerCols = GetHeaderCols({
    filteredConnector,
  });

  const openDetailPage = (secret: any) => {
    history.push(routePaths.connectors.list(selectedWorkspace));
  };
  return (
    <BasePage
      headerWithButtons
      singleTab={true}
      tabPages={tabPages}
      tabBasePath={routePaths.connectors.base}
      breadcrumbs={breadcrumbs}
      title="Connector"
    >
      <Box marginTop="lg" style={{ overflowX: 'auto' }}>
        <CollapseTable
          pagination={false}
          renderAfterRow={(secret: any) => <></>}
          headerCols={headerCols}
          tableRows={filteredConnector}
          emptyState={{ text: translate('emptyState.text') }}
          trOnClick={openDetailPage}
        />
      </Box>
    </BasePage>
  );
};

export default ConnectorDetail;
