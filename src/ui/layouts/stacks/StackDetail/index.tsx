import React, { useState } from 'react';

import { Box, Paragraph, icons } from '../../../components';
import { iconColors, iconSizes } from '../../../../constants';
import { formatDateForOverviewBar } from '../../../../utils';
import { routePaths } from '../../../../routes/routePaths';
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
import { DEFAULT_PROJECT_NAME } from '../../../../constants';

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
      <Runs filter={getFilter(filters)} stackId={locationPath.split('/')[4]} />
    </FilterComponent>
  );
};
const getTabPages = (stackId: TId, selectedProject: string): TabPage[] => {
  return [
    {
      text: translate('tabs.configuration.text'),
      Component: () => <Configuration stackId={stackId} />,
      path: routePaths.stack.configuration(stackId, selectedProject),
    },
    {
      text: translate('tabs.runs.text'),
      Component: FilterWrapperForRun,
      path: routePaths.stack.runs(selectedProject, stackId),
    },
  ];
};

const url_string = window.location.href;
const url = new URL(url_string);
const projectName = url.searchParams.get('project');
const project = projectName ? projectName : DEFAULT_PROJECT_NAME;

const getBreadcrumbs = (
  stackId: TId,
  selectedProject: string,
): TBreadcrumb[] => {
  return [
    {
      name: translate('header.breadcrumbs.stacks.text'),
      clickable: true,
      to: routePaths.stacks.base + `?project=${project}`,
      // to: routePaths.stacks.list(selectedProject),
    },
    {
      name: stackId,
      clickable: true,
      to: routePaths.stack.configuration(stackId, selectedProject),
    },
  ];
};

export interface StackDetailRouteParams {
  id: TId;
}

export const StackDetail: React.FC = () => {
  const { stack } = useService();
  const selectedProject = useSelector(projectSelectors.selectedProject);

  const tabPages = getTabPages(stack.id, selectedProject);
  const breadcrumbs = getBreadcrumbs(stack.id, selectedProject);

  const boxStyle = {
    backgroundColor: '#E9EAEC',
    padding: '10px 0',
    borderRadius: '8px',
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'space-around',
  };
  const headStyle = { color: '#828282' };

  return (
    <BasePage
      headerWithButtons
      tabPages={tabPages}
      tabBasePath={routePaths.stack.base(stack.id)}
      breadcrumbs={breadcrumbs}
    >
      <Box style={boxStyle}>
        <Box>
          <Paragraph style={headStyle}>ID</Paragraph>
          <Paragraph style={{ color: '#515151', marginTop: '10px' }}>
            {stack.id}
          </Paragraph>
        </Box>
        <Box>
          <Paragraph style={headStyle}>NAME</Paragraph>
          <Paragraph style={{ color: '#515151', marginTop: '10px' }}>
            {stack.name}
          </Paragraph>
        </Box>
        <Box>
          <Paragraph style={headStyle}>SHARED</Paragraph>
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
            {stack.isShared ? (
              <icons.multiUser color={iconColors.white} size={iconSizes.sm} />
            ) : (
              <icons.singleUser color={iconColors.white} size={iconSizes.sm} />
            )}
          </Paragraph>
        </Box>
        <Box>
          <Paragraph style={headStyle}>AUTHOR</Paragraph>
          <Paragraph style={{ color: '#515151', marginTop: '10px' }}>
            {stack?.user?.name}
          </Paragraph>
        </Box>
        <Box>
          <Paragraph style={headStyle}>CREATED</Paragraph>
          <Paragraph style={{ color: '#515151', marginTop: '10px' }}>
            {formatDateForOverviewBar(stack.created)}
          </Paragraph>
        </Box>
      </Box>
    </BasePage>
  );
};

export default StackDetail;
