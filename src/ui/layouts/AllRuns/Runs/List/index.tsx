import React, { useState } from 'react';
import { RunsTable } from '../../RunsTable';
// import { useService } from './useService';
import { getTranslateByScope } from '../../../../../services';
import { usePollingService } from '../../../../hooks/usePollingService';
import { useSelector } from 'react-redux';
import {
  runPagesSelectors,
  runSelectors,
} from '../../../../../redux/selectors';
import { Run } from '../../../../../api/types';
import { runsActions } from '../../../../../redux/actions';

export const translate = getTranslateByScope('ui.layouts.AllRuns');

interface Props {
  filter: any;
  runId?: any;
  pagination?: boolean;
}

export const List: React.FC<Props> = ({ filter, pagination, runId }: Props) => {
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
    filter,
    sortBy,
    dispatchFun: runsActions.allRuns,
    paginatedValue,
  });

  // const { fetching, runIds, runsPaginated } = useService({ filter, sortBy });

  return (
    <>
      <RunsTable
        isExpended={false}
        id={runId}
        pagination={pagination}
        getSorted={getSorted}
        paginated={runsPaginated}
        fetching={fetching}
        emptyStateText={
          filter[0]?.value
            ? translate('emptyState.text')
            : `Nothing to see here, it seems like no run has been configured yet.`
        }
        runIds={runIds}
        fromAllruns={true}
        filter={filter}
      />
    </>
  );
};
