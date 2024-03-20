import React, { useState } from 'react';
import { translate } from '../translate';
import { RunsTable } from '../../RunsTable';
// import { useService } from './useService';
import { usePollingService } from '../../../../hooks/usePollingService';
import {
  runPagesSelectors,
  runSelectors,
} from '../../../../../redux/selectors';
import { useSelector } from 'react-redux';
import { Run } from '../../../../../api/types';
import { stacksActions } from '../../../../../redux/actions';

export const Runs: React.FC<{
  isExpended?: any;
  stackId: TId;
  filter: any;
  runId?: any;
  pagination?: boolean;
}> = ({ stackId, filter, pagination, runId, isExpended = false }) => {
  const [sortBy, setSortBy] = useState('created');
  function getSorted(activeSorting: any, activeSortingDirection: any) {
    setSortBy(activeSortingDirection?.toLowerCase() + ':' + activeSorting);
  }

  const runs = useSelector(runSelectors.myRuns);
  const runIds = runs.map((run: Run) => run.id);
  const runsPaginated = useSelector(runSelectors.myRunsPaginated);
  const fetching = useSelector(runPagesSelectors.fetching);

  // const dispatchFun = 'runsActions.allRuns';
  const paginatedValue = runsPaginated;
  usePollingService({
    stackId,
    filter,
    sortBy,
    dispatchFun: stacksActions.allRunsByStackId,
    paginatedValue,
  });

  return (
    <RunsTable
      isExpended={isExpended}
      stackId={stackId}
      id={runId}
      pagination={pagination}
      getSorted={getSorted}
      fetching={runId === undefined && fetching}
      paginated={runsPaginated}
      emptyStateText={translate('emptyState.text')}
      runIds={runId === undefined ? runIds : [runId]}
      filter={filter}
    />
  );
};
