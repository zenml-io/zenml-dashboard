import React, { useEffect } from 'react';
import { routePaths } from '../../../../routes/routePaths';
import { useHistory, useSelector } from '../../../hooks';

import { Table } from '../../common/Table';

import { useHeaderCols } from './HeaderCols';
import { useService } from './useService';
import { projectSelectors } from '../../../../redux/selectors';

interface Props {
  filter: any;
}
export const RunsTable: React.FC<{
  runIds: TId[];
  getSorted?: any;
  paginated?: any;
  pagination?: boolean;
  emptyStateText: string;
  fetching: boolean;
  pipelineRuns?: any;
  fromAllruns?: boolean;
  filter?: any;
}> = ({
  getSorted,
  runIds,
  pagination = true,
  emptyStateText,
  fetching,
  paginated,
  pipelineRuns,
  fromAllruns,
  filter,
}) => {
  const history = useHistory();
  const selectedProject = useSelector(projectSelectors.selectedProject);
  const {
    sortedRuns,
    setSortedRuns,
    activeSorting,
    setActiveSorting,
    activeSortingDirection,
    setActiveSortingDirection,
    setSelectedRunIds,
  } = useService({ pipelineRuns, runIds, filter });

  const openDetailPage = (run: TRun) => {
    setSelectedRunIds([]);

    fromAllruns
      ? history.push(routePaths.run.run.statistics(selectedProject, run.id))
      : history.push(
          routePaths.run.pipeline.statistics(
            selectedProject,
            run.id,
            run.pipeline_id ? run.pipeline_id : run.pipelineId,
          ),
        );
  };

  const headerCols = useHeaderCols({
    runs: sortedRuns,
    setRuns: setSortedRuns,
    activeSorting,
    setActiveSorting,
    activeSortingDirection,
    setActiveSortingDirection,
    nestedRuns: pipelineRuns ? true : false,
  });

  useEffect(() => {
    getSorted(activeSorting, activeSortingDirection);
  }, [getSorted]);

  return (
    <Table
      activeSorting={
        activeSorting != 'created' && activeSortingDirection != 'ASC'
          ? activeSorting
          : 'created'
      }
      pagination={pagination}
      loading={fetching}
      paginated={paginated}
      showHeader={true}
      headerCols={headerCols}
      tableRows={sortedRuns}
      filters={filter}
      emptyState={{ text: emptyStateText }}
      trOnClick={openDetailPage}
    />
  );
};
