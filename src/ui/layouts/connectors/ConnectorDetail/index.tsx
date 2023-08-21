import React, { useState } from 'react';

import { routePaths } from '../../../../routes/routePaths';
import { translate } from './translate';
import { Configuration } from './Configuration';

import { BasePage } from '../BasePage';
import { useService } from './useService';
import { useHistory, useLocationPath, useSelector } from '../../../hooks';

import { Box } from '../../../components';
import { workspaceSelectors } from '../../../../redux/selectors';
import { DEFAULT_WORKSPACE_NAME } from '../../../../constants';

import { CollapseTable } from '../../common/CollapseTable';
import { GetHeaderCols } from './getHeaderCols';
import { ConnectorComponents } from './ConnectorComponents';
import FilterComponent, {
  getInitialFilterState,
} from '../../../components/Filters';

const FilterWrapper = () => {
  const locationPath = useLocationPath();

  // TODO: Dev please note: getInitialFilterState is for stack inital filter value for any other component you need to modify it
  const [filters, setFilter] = useState([getInitialFilterState()]);
  function getFilter(values: any) {
    const filterValuesMap = values.map((v: any) => {
      return {
        column: v.column.selectedValue,
        type: v.contains.selectedValue,
        value: v.filterValue,
      };
    });
    return filterValuesMap;
  }
  return (
    <Box style={{ marginTop: '10px', width: '100%' }}>
      <FilterComponent
        getInitials={getInitialFilterState}
        filters={filters}
        setFilter={setFilter}
      >
        <ConnectorComponents
          id={locationPath.split('/')[4]}
          filter={getFilter(filters)}
        />
      </FilterComponent>
    </Box>
  );
};
const getTabPages = (
  connectorId: TId,
  selectedWorkspace: string,
  fetching?: boolean,
): TabPage[] => {
  return [
    {
      text: translate('tabs.configuration.text'),
      Component: () => (
        <Configuration connectorId={connectorId} fetching={fetching} />
      ),
      path: routePaths.connectors.configuration(connectorId, selectedWorkspace),
    },
    {
      text: 'Components',
      Component: FilterWrapper,
      path: routePaths.connectors.connectorComponents(
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
      name: translate('header.breadcrumbs.connectors.text'),
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

export const StackDetail: React.FC = () => {
  const { connector, fetching } = useService();
  const filteredConnector: any = [];
  filteredConnector.push(connector);
  const history = useHistory();

  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);

  const tabPages = getTabPages(connector.id, selectedWorkspace, fetching);
  const breadcrumbs = getBreadcrumbs(connector.id, selectedWorkspace);
  const headerCols = GetHeaderCols({
    filteredConnector,
  });

  const openDetailPage = (connector: any) => {
    history.push(routePaths.connectors.list(selectedWorkspace));
  };

  return (
    <BasePage
      headerWithButtons
      singleTab={true}
      tabPages={tabPages}
      tabBasePath={routePaths.connectors.base}
      breadcrumbs={breadcrumbs}
      title="Connectors"
    >
      <Box marginTop="lg" style={{ overflowX: 'auto' }}>
        <CollapseTable
          pagination={false}
          renderAfterRow={(connector: any) => <></>}
          headerCols={headerCols}
          tableRows={filteredConnector}
          emptyState={{ text: translate('emptyState.text') }}
          trOnClick={openDetailPage}
        />
      </Box>
    </BasePage>
  );
};

export default StackDetail;
