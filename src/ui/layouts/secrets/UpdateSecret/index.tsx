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
import { Secret } from '../../../../api/types';

const getTabPages = (
  secretId: TId,
  selectedWorkspace: string,
  routeState?: any,
): TabPage[] => {
  return [
    {
      text: translate('tabs.update.text'),
      Component: () => <UpdateConfig secretId={secretId} state={routeState} />,
      path: routePaths.secret.updateSecret(secretId, selectedWorkspace),
    },
  ];
};

const url_string = window.location.href;
const url = new URL(url_string);
const workspaceName = url.searchParams.get('workspace');
const workspace = workspaceName ? workspaceName : DEFAULT_WORKSPACE_NAME;

const getBreadcrumbs = (
  secretId: TId,
  selectedWorkspace: string,
): TBreadcrumb[] => {
  return [
    {
      name: translate('header.breadcrumbs.secrets.text'),
      clickable: true,
      to: routePaths.secrets.base + `?workspace=${workspace}`,
    },
    {
      name: secretId,
      clickable: true,
      to: routePaths.secret.configuration(secretId, selectedWorkspace),
    },
  ];
};

export interface SecretDetailRouteParams {
  id: TId;
}

export const StackDetail: React.FC = () => {
  const { secret } = useService();
  const location = useLocation();
  const filteredSecret: Secret[] = [];
  filteredSecret.push(secret);
  const history = useHistory();
  const [routeState, setRouteState] = useState({}) as any;

  useEffect(() => {
    setRouteState(location);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setRouteState]);

  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);

  const tabPages = getTabPages(secret.id, selectedWorkspace, routeState);
  const breadcrumbs = getBreadcrumbs(secret.id, selectedWorkspace);
  const headerCols = GetHeaderCols({
    filteredSecret,
  });

  const openDetailPage = (secret: Secret) => {
    history.push(routePaths.secrets.list(selectedWorkspace));
  };
  return (
    <BasePage
      headerWithButtons
      singleTab={true}
      tabPages={tabPages}
      tabBasePath={routePaths.secret.base(secret.id)}
      breadcrumbs={breadcrumbs}
      title="Secrets"
    >
      <Box marginTop="lg" style={{ overflowX: 'auto' }}>
        <CollapseTable
          pagination={false}
          renderAfterRow={(secret: Secret) => <></>}
          headerCols={headerCols}
          tableRows={filteredSecret}
          emptyState={{ text: translate('emptyState.text') }}
          trOnClick={openDetailPage}
        />
      </Box>
    </BasePage>
  );
};

export default StackDetail;
