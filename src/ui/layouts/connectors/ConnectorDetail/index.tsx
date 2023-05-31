import React, { useState } from 'react';

// import { Box, Paragraph, icons } from '../../../components';
// import { iconColors, iconSizes } from '../../../../constants';
// import { formatDateToDisplayOnTable } from '../../../../utils';
import { routePaths } from '../../../../routes/routePaths';
import { translate } from './translate';
import { Configuration } from './Configuration';
// import styles from './NestedRow.module.scss';
// import { MetaData } from './Metadata';
import { BasePage } from '../BasePage';
import { useService } from './useService';
import { useHistory, useLocationPath, useSelector } from '../../../hooks';
// import FilterComponent, {
//   getInitialFilterStateForRuns,
// } from '../../../components/Filters';
import { Box } from '../../../components';
import {
  // stackPagesSelectors,
  workspaceSelectors,
} from '../../../../redux/selectors';
import { DEFAULT_WORKSPACE_NAME } from '../../../../constants';
// import { List } from '../Stacks/List';
// import { Box, Row } from '../../../components';
// import { StackBox } from '../../common/StackBox';

// import { GetFlavorsListForLogo } from '../../stackComponents/Stacks/List/GetFlavorsListForLogo';
// import { FullWidthSpinner } from '../../../components';
import { CollapseTable } from '../../common/CollapseTable';
import { GetHeaderCols } from './getHeaderCols';
import { ConnectorComponents } from './ConnectorComponents';
import FilterComponent, {
  getInitialFilterState,
} from '../../../components/Filters';

const FilterWrapper = () => {
  // const { connector, fetching } = useService();
  const locationPath = useLocationPath();
  // const history = useHistory();
  // const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);p
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
      // to: routePaths.stacks.list(selectedWorkspace),
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

  // const { flavourList, fetching } = GetFlavorsListForLogo();
  // const stackComponentsMap = stackComponents.map((item) => {
  //   const temp: any = flavourList.find(
  //     (fl: any) => fl.name === item.flavor && fl.type === item.type,
  //   );
  //   if (temp) {
  //     return {
  //       ...item,
  //       flavor: {
  //         logoUrl: temp.logo_url,
  //         name: item.flavor,
  //       },
  //     };
  //   }
  //   return item;
  // });

  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);

  // if (flavourList?.length > 1) {
  //   for (const [key] of Object.entries(connector?.components)) {
  //     const { logo_url }: any = flavourList.find(
  //       (fl: any) =>
  //         fl.name === connector?.components[key][0]?.flavor &&
  //         fl.type === connector?.components[key][0]?.type,
  //     );
  //     console.log(logo, 'flavourListflavourList');

  //     nestedRowtiles.push({
  //       ...connector?.components[key][0],
  //       type: key,
  //       name: connector?.components[key][0]?.name,
  //       id: connector?.components[key][0]?.id,
  //       logo: logo_url,
  //     });
  //   }
  // }

  const tabPages = getTabPages(connector.id, selectedWorkspace, fetching);
  const breadcrumbs = getBreadcrumbs(connector.id, selectedWorkspace);
  const headerCols = GetHeaderCols({
    filteredConnector,
  });
  // const boxStyle = {
  //   backgroundColor: '#E9EAEC',
  //   padding: '10px 0',
  //   borderRadius: '8px',
  //   marginTop: '20px',
  //   display: 'flex',
  //   justifyContent: 'space-around',
  // };
  // const headStyle = { color: '#828282' };
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
      <Box marginTop="lg">
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
