import React, { useState } from 'react';

import { Box, Paragraph } from '../../../components';
import { formatDateToDisplayOnTable } from '../../../../utils';
import { routePaths } from '../../../../routes/routePaths';
import { translate } from './translate';
import { Configuration } from './Configuration';
import { Runs } from './Runs';
import { BasePage } from '../BasePage';
import { useService } from './useService';
import FilterComponent, {
  getInitialFilterStateForRuns,
} from '../../../components/Filters';
import { useLocationPath, useSelector } from '../../../hooks';
import { projectSelectors } from '../../../../redux/selectors';
import { DEFAULT_PROJECT_NAME } from '../../../../constants';
import { List } from '../Pipelines/List';

interface Props {
  pipelineId: TId;
}
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
        pipelineId={locationPath.split('/')[4]}
      />
    </FilterComponent>
  );
};
const getTabPages = (pipelineId: TId, selectedProject: string): TabPage[] => {
  return [
    {
      text: translate('tabs.configuration.text'),
      Component: () => <Configuration pipelineId={pipelineId} />,
      path: routePaths.pipeline.configuration(pipelineId, selectedProject),
    },
    {
      text: translate('tabs.runs.text'),
      Component: FilterWrapperForRun,
      path: routePaths.pipeline.runs(selectedProject, pipelineId),
    },
  ];
};

const url_string = window.location.href;
const url = new URL(url_string);
const projectName = url.searchParams.get('project');

const getBreadcrumbs = (
  pipelineId: TId,
  selectedProject: string,
): TBreadcrumb[] => {
  return [
    {
      name: translate('header.breadcrumbs.pipelines.text'),
      clickable: true,
      // to: routePaths.pipelines.list(selectedProject),
      to:
        routePaths.pipelines.base +
        `?project=${projectName ? projectName : DEFAULT_PROJECT_NAME}`,
    },
    {
      name: pipelineId,
      clickable: true,
      to: routePaths.pipeline.configuration(pipelineId, selectedProject),
    },
  ];
};

export interface PipelineDetailRouteParams {
  id: TId;
}

export const PipelineDetail: React.FC = () => {
  const { pipeline } = useService();

  const selectedProject = useSelector(projectSelectors.selectedProject);
  const tabPages = getTabPages(pipeline.id, selectedProject);
  const breadcrumbs = getBreadcrumbs(pipeline.id, selectedProject);

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
      tabBasePath={routePaths.pipeline.base(pipeline.id)}
      breadcrumbs={breadcrumbs}
    >
      <List filter={[]} pagination={false} isExpended id={pipeline.id}></List>
      {/* <Box style={boxStyle}>
        <Box>
          <Paragraph style={headStyle}>ID</Paragraph>
          <Paragraph style={{ color: '#515151', marginTop: '10px' }}>
            {pipeline.id}
          </Paragraph>
        </Box>
        <Box>
          <Paragraph style={headStyle}>NAME</Paragraph>
          <Paragraph style={{ color: '#515151', marginTop: '10px' }}>
            {pipeline.name}
          </Paragraph>
        </Box>

        <Box>
          <Paragraph style={headStyle}>AUTHOR</Paragraph>
          <Paragraph style={{ color: '#515151', marginTop: '10px' }}>
            {pipeline?.user?.name}
          </Paragraph>
        </Box>
        <Box>
          <Paragraph style={headStyle}>CREATED</Paragraph>
          <Paragraph style={{ color: '#515151', marginTop: '10px' }}>
            {formatDateToDisplayOnTable(pipeline.created)}
          </Paragraph>
        </Box>
      </Box> */}
    </BasePage>
  );
};

export default PipelineDetail;
