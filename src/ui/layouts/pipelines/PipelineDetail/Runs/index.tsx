import React, { useState } from 'react';
import { translate } from '../translate';
import { RunsTable } from '../../RunsTable';
// import { useService } from './useService';
import { usePollingService } from '../../../../hooks/usePollingService';
import { useSelector } from 'react-redux';
import {
  runPagesSelectors,
  runSelectors,
} from '../../../../../redux/selectors';
import { Run } from '../../../../../api/types';
import { pipelinesActions } from '../../../../../redux/actions';

export const Runs: React.FC<{
  isExpended?: any;

  pipelineId: TId;
  filter: any;
  runId?: any;
  pagination?: boolean;
}> = ({
  pipelineId,
  filter,
  pagination,
  runId,

  isExpended = false,
}) => {
  const [sortBy, setSortBy] = useState('created');
  function getSorted(activeSorting: any, activeSortingDirection: any) {
    setSortBy(activeSortingDirection?.toLowerCase() + ':' + activeSorting);
  }
  // const { fetching, runIds, runsPaginated } = useService({
  //   isExpended,
  //   sortBy,
  //   pipelineId,
  //   filter,
  // });

  const fetching = useSelector(runPagesSelectors.fetching);
  const runs: Run[] = useSelector(runSelectors.runsForPipelineId(pipelineId));
  const runIds = runs.map((run: Run) => run.id);
  const runsPaginated = useSelector(runSelectors.myRunsPaginated);
  const paginatedValue = runsPaginated;
  usePollingService({
    pipelineId,
    filter,
    sortBy,
    dispatchFun: pipelinesActions.allRunsByPipelineId,
    paginatedValue,
  });

  return (
    <RunsTable
      isExpended={isExpended}
      pipelineId={pipelineId}
      id={runId}
      pagination={pagination}
      getSorted={getSorted}
      paginated={runsPaginated}
      fetching={runId === undefined && fetching}
      emptyStateText={translate('emptyState.text')}
      runIds={runId === undefined ? runIds : [runId]}
      filter={filter}
    />
  );
};
