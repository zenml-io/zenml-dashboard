import React, { useState } from 'react';

import { routePaths } from '../../../../routes/routePaths';
import { Box, Paragraph, icons } from '../../../components';
import { iconColors, iconSizes } from '../../../../constants';
import {
  camelCaseToParagraph,
  formatDateForOverviewBar,
} from '../../../../utils';
import { translate } from './translate';
import { Configuration } from './Configuration';
import { Runs } from './Runs';
import { BasePage } from '../BasePage';
import { useService } from './useService';
import { useLocationPath, useSelector } from '../../../hooks';
import FilterComponent, {
  getInitialFilterStateForRuns,
} from '../../../components/Filters';
import { projectSelectors } from '../../../../redux/selectors';

const FilterWrapperForRun = () => {
  const locationPath = useLocationPath();

  // TODO: Dev please note: getInitialFilterState is for stack inital filter value for any other component you need to modify it
  const [filters, setFilter] = useState([getInitialFilterStateForRuns()]);
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
    <FilterComponent
      getInitials={getInitialFilterStateForRuns}
      filters={filters}
      setFilter={setFilter}
    >
      <Runs
        filter={getFilter(filters)}
        stackComponentId={locationPath.split('/')[5]}
      />
    </FilterComponent>
  );
};
const getTabPages = (
  stackId: TId,
  locationPath: any,
  selectedProject: string,
): TabPage[] => {
  return [
    {
      text: translate('tabs.configuration.text'),
      Component: () => <Configuration stackId={stackId} />,
      path: routePaths.stackComponents.configuration(
        locationPath.split('/')[4],
        stackId,
        selectedProject,
      ),
    },
    {
      text: translate('tabs.runs.text'),
      Component: FilterWrapperForRun,
      path: routePaths.stackComponents.runs(
        locationPath.split('/')[4],
        stackId,
        selectedProject,
      ),
    },
  ];
};

const getBreadcrumbs = (
  stackId: TId,
  locationPath: any,
  selectedProject: string,
): TBreadcrumb[] => {
  return [
    {
      name: camelCaseToParagraph(locationPath.split('/')[4]),

      clickable: true,
      to: routePaths.stackComponents.base(
        locationPath.split('/')[4],
        selectedProject,
      ),
    },
    {
      name: stackId,
      clickable: true,
      to: routePaths.stackComponents.configuration(
        camelCaseToParagraph(locationPath.split('/')[4]),
        stackId,
        selectedProject,
      ),
    },
  ];
};

export interface StackDetailRouteParams {
  id: TId;
}

export const StackDetail: React.FC = () => {
  const locationPath = useLocationPath();
  const { stackComponent } = useService();
  const selectedProject = useSelector(projectSelectors.selectedProject);
  const tabPages = getTabPages(
    stackComponent.id,
    locationPath,
    selectedProject,
  );
  const breadcrumbs = getBreadcrumbs(
    stackComponent.id,
    locationPath,
    selectedProject,
  );

  const boxStyle = {
    backgroundColor: '#E9EAEC',
    padding: '10px 0',
    borderRadius: '8px',
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'space-around',
  };
  const headStyle = { color: '#828282' };
  const paraStyle = { color: '#515151', marginTop: '10px' };

  return (
    <BasePage
      headerWithButtons
      tabPages={tabPages}
      tabBasePath={routePaths.stackComponents.base(
        stackComponent.id,
        selectedProject,
      )}
      breadcrumbs={breadcrumbs}
    >
      <Box style={boxStyle}>
        <Box>
          <Paragraph style={headStyle}>ID</Paragraph>
          <Paragraph style={paraStyle}>{stackComponent.id}</Paragraph>
        </Box>
        <Box>
          <Paragraph style={headStyle}>Shared</Paragraph>
          <Paragraph
            style={{
              marginTop: '10px',
              justifyContent: 'center',
              borderRadius: '50%',
              height: '25px',
              width: '25px',
              paddingTop: '3px',
              textAlign: 'center',
            }}
          >
            {stackComponent.isShared ? (
              <icons.multiUser color={iconColors.white} size={iconSizes.sm} />
            ) : (
              <icons.singleUser color={iconColors.white} size={iconSizes.sm} />
            )}
          </Paragraph>
        </Box>
        <Box>
          <Paragraph style={headStyle}>Name</Paragraph>
          <Paragraph style={paraStyle}>{stackComponent.name}</Paragraph>
        </Box>
        <Box>
          <Paragraph style={headStyle}>Flavor</Paragraph>
          <Paragraph style={paraStyle}>{stackComponent.flavor}</Paragraph>
        </Box>
        <Box>
          <Paragraph style={headStyle}>Author</Paragraph>
          <Paragraph style={paraStyle}>{stackComponent?.user?.name}</Paragraph>
        </Box>
        <Box>
          <Paragraph style={headStyle}>Created</Paragraph>
          <Paragraph style={paraStyle}>
            {formatDateForOverviewBar(stackComponent.created)}
          </Paragraph>
        </Box>
      </Box>
    </BasePage>
  );
};

export default StackDetail;
