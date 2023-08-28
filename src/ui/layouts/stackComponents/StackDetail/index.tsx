import React, { useState } from 'react';

import { routePaths } from '../../../../routes/routePaths';
import { Box, FlexBox, PrimaryButton } from '../../../components';

import { camelCaseToParagraph } from '../../../../utils';

import { translate } from './translate';
import { Configuration } from './Configuration';

import { BasePage } from '../BasePage';
import { useService } from './useService';
import { useHistory, useLocationPath, useSelector } from '../../../hooks';
import FilterComponent, {
  getInitialFilterState,
} from '../../../components/Filters';
import { workspaceSelectors } from '../../../../redux/selectors';

import { List } from '../../stacks/Stacks/List';
import { CollapseTable } from '../../common/CollapseTable';
import { GetHeaderCols } from './getHeaderCols';

const FilterWrapperForStacks = () => {
  const locationPath = useLocationPath();
  const history = useHistory();
  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);
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
    <Box marginTop="lg" style={{ width: '100%' }}>
      <FilterComponent
        getInitials={getInitialFilterState}
        filters={filters}
        setFilter={setFilter}
      >
        <List
          stackComponentId={locationPath.split('/')[5]}
          filter={getFilter(filters)}
        />
        <FlexBox
          style={{
            position: 'fixed',
            right: '0',
            bottom: '0',
            marginRight: '45px',
          }}
        >
          <Box marginBottom="lg">
            <PrimaryButton
              onClick={() => {
                history.push(
                  routePaths.stackComponents.registerComponents(
                    locationPath.split('/')[4],
                    selectedWorkspace,
                  ),
                );
              }}
            >
              Register New Component
            </PrimaryButton>
          </Box>
        </FlexBox>
      </FilterComponent>
    </Box>
  );
};
const getTabPages = (
  stackId: TId,
  locationPath: any,
  selectedWorkspace: string,
  loading?: boolean,
  serviceConnectorResources?: any,
): TabPage[] => {
  return [
    {
      text: translate('tabs.configuration.text'),
      Component: () => (
        <Configuration
          stackId={stackId}
          loading={loading}
          serviceConnectorResources={serviceConnectorResources}
        />
      ),
      path: routePaths.stackComponents.configuration(
        locationPath.split('/')[4],
        stackId,
        selectedWorkspace,
      ),
    },

    {
      text: 'Stacks',
      Component: FilterWrapperForStacks,
      path: routePaths.stackComponents.stacks(
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
      to: routePaths.stackComponents.configuration(
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

  const {
    stackComponent,
    id,
    flavor,
    loading,
    serviceConnectorResources,
  } = useService();

  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);
  const tabPages = getTabPages(
    id,
    locationPath,
    selectedWorkspace,
    loading,
    serviceConnectorResources,
  );
  const breadcrumbs = getBreadcrumbs(id, locationPath, selectedWorkspace);
  const mappedStackComponent: any = [];
  mappedStackComponent.push(stackComponent);
  const history = useHistory();

  const mappedStackComponentWithLogo: any = mappedStackComponent.map(
    (item: any) => {
      const temp: any = flavor.find(
        (fl: any) => fl.name === item.flavor && fl.type === item.type,
      );
      if (temp) {
        return {
          ...item,
          flavor: {
            logoUrl: temp.logo_url,
            name: item.flavor,
          },
        };
      }
      return item;
    },
  );
  const headerCols = GetHeaderCols({
    mappedStackComponentWithLogo,
  });

  const openDetailPage = (stack: TStack) => {
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
          renderAfterRow={(stack: TStack) => <></>}
          headerCols={headerCols}
          tableRows={mappedStackComponentWithLogo}
          trOnClick={openDetailPage}
        />
      </Box>
    </BasePage>
  );
};

export default StackDetail;
