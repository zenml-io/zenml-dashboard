import React, { useState } from 'react';

import { routePaths } from '../../../../routes/routePaths';
import {
  Box,
  FlexBox,
  // FullWidthSpinner,
  PrimaryButton,
} from '../../../components';

import { camelCaseToParagraph } from '../../../../utils';

import { translate } from './translate';
import { Configuration } from './Configuration';

import { BasePage } from '../BasePage';
import { useService } from './useService';
import { useHistory, useLocationPath, useSelector } from '../../../hooks';
import FilterComponent from '../../../components/Filters';
import { workspaceSelectors } from '../../../../redux/selectors';
import { Flavor, StackComponent } from '../../../../api/types';

import { List } from '../../stacks/Stacks/List';
import { CollapseTable } from '../../common/CollapseTable';
import { GetHeaderCols } from './getHeaderCols';
import {
  getInitialFilterStateStacks,
  searchParamConstants,
} from '../../stacks/Stacks/filterParamConstants';
import { sanitizeUrl } from '../../../../utils/url';

const FilterWrapperForStacks = () => {
  const locationPath = useLocationPath();
  const history = useHistory();
  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);
  // TODO: Dev please note: getInitialFilterState is for stack inital filter value for any other component you need to modify it
  const [filters, setFilter] = useState([getInitialFilterStateStacks()]);
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
        searchColumns={searchParamConstants}
        getInitials={getInitialFilterStateStacks}
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
  flavor: Flavor,
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
          flavor={flavor}
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
      testId: 'stack_tab',
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
  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);

  const history = useHistory();
  const {
    stackComponent,
    id,
    flavor,
    flavorList,
    loading,
    serviceConnectorResources,
  } = useService();

  const tabPages = getTabPages(
    flavor,
    id,
    locationPath,
    selectedWorkspace,
    loading,
    serviceConnectorResources,
  );

  const breadcrumbs = getBreadcrumbs(id, locationPath, selectedWorkspace);
  const mappedStackComponent: any = [];
  mappedStackComponent.push(stackComponent);

  // let mappedStackComponentWithLogo: any = [];
  // if (flavor.name) {
  //   mappedStackComponentWithLogo = mappedStackComponent.map((item: any) => {
  //     return {
  //       ...item,
  //       flavor: {
  //         logoUrl: flavor?.body.logo_url,
  //         name: flavor?.name,
  //       },
  //     };
  //   });
  // }

  const mappedStackComponentWithLogo: any = mappedStackComponent.map(
    (item: any) => {
      const temp: any = flavorList?.find(
        (fl: any) =>
          fl?.name === item?.body?.flavor &&
          fl?.body?.type === item?.body?.type,
      );
      if (temp) {
        return {
          ...item,
          flavor: {
            logoUrl: sanitizeUrl(temp.body.logo_url),
            name: item.name,
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
