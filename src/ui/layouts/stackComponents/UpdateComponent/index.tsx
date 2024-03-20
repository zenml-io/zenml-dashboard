import React, { useEffect, useState } from 'react';

import { routePaths } from '../../../../routes/routePaths';
import { Box } from '../../../components';
import { camelCaseToParagraph } from '../../../../utils';
import { translate } from './translate';
import { UpdateConfig } from './UpdateConfig';
import { BasePage } from '../BasePage';
import { useService } from './useService';
import {
  useHistory,
  useLocation,
  useLocationPath,
  useSelector,
} from '../../../hooks';
import { workspaceSelectors } from '../../../../redux/selectors';
import { StackComponent } from '../../../../api/types';
import { CollapseTable } from '../../common/CollapseTable';
import { GetHeaderCols } from './getHeaderCols';
import { sanitizeUrl } from '../../../../utils/url';

const getTabPages = (
  stackId: TId,
  locationPath: any,
  selectedWorkspace: string,
  loading?: boolean,
  routeState?: any,
  serviceConnectorResources?: any,
  fetching?: boolean,
): TabPage[] => {
  return [
    {
      text: translate('tabs.update.text'),
      Component: () => (
        <UpdateConfig
          state={routeState}
          stackId={stackId}
          serviceConnectorResources={serviceConnectorResources}
          fetching={fetching}
        />
      ),
      path: routePaths.stackComponents.updateComponent(
        locationPath.split('/')[4],
        stackId,
        selectedWorkspace,
      ),
    },
  ];
};

const getBreadcrumbs = (
  stackId: TId,
  locationPath: any,
  selectedWorkspace: string,
): TBreadcrumb[] => {
  return [
    {
      name: camelCaseToParagraph(locationPath.split('/')[4]),

      clickable: true,
      to: routePaths.stackComponents.base(
        locationPath.split('/')[4],
        selectedWorkspace,
      ),
    },
    {
      name: stackId,
      clickable: true,
      to: routePaths.stackComponents.updateComponent(
        camelCaseToParagraph(locationPath.split('/')[4]),
        stackId,
        selectedWorkspace,
      ),
    },
  ];
};

export interface StackDetailRouteParams {
  id: TId;
}

export const StackDetail: React.FC = () => {
  const locationPath = useLocationPath();
  const location = useLocation();
  const [routeState, setRouteState] = useState({}) as any;

  useEffect(() => {
    setRouteState(location.state);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setRouteState]);
  const {
    stackComponent,
    id,
    flavor,
    loading,
    fetching,
    serviceConnectorResources,
  } = useService();

  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);
  const tabPages = getTabPages(
    id,
    locationPath,
    selectedWorkspace,
    loading,
    routeState,
    serviceConnectorResources,
    fetching,
  );
  const breadcrumbs = getBreadcrumbs(id, locationPath, selectedWorkspace);
  const mappedStackComponent: any = [];
  mappedStackComponent.push(stackComponent);
  const history = useHistory();

  const mappedStackComponentWithLogo: any = mappedStackComponent.map(
    (item: any) => {
      const temp: any = flavor.find(
        (fl: any) =>
          fl.name === item.body?.flavor && fl.body?.type === item.body?.type,
      );
      if (temp) {
        return {
          ...item,
          flavor: {
            logoUrl: sanitizeUrl(temp.body?.logo_url),
            name: item.body?.flavor,
          },
        };
      }
      return item;
    },
  );
  const headerCols = GetHeaderCols({
    mappedStackComponentWithLogo,
  });

  const openDetailPage = (stack: StackComponent) => {
    history.push(
      routePaths.stackComponents.base(
        locationPath.split('/')[4],
        selectedWorkspace,
      ),
    );
  };
  return (
    <BasePage
      headerWithButtons
      tabPages={tabPages}
      singleTab={true}
      tabBasePath={routePaths.stackComponents.base(
        stackComponent.id,
        selectedWorkspace,
      )}
      breadcrumbs={breadcrumbs}
      title="Stack Components"
    >
      <Box style={{ marginTop: '40px', overflowX: 'auto' }}>
        <CollapseTable
          pagination={false}
          renderAfterRow={(stack: StackComponent) => <></>}
          headerCols={headerCols}
          tableRows={mappedStackComponentWithLogo}
          trOnClick={openDetailPage}
        />
      </Box>
    </BasePage>
  );
};

export default StackDetail;
