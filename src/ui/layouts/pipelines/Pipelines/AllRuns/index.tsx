import React, { useState } from 'react';
import { RunsTable } from '../../../AllRuns/RunsTable';
import { useService } from './useService';
import { getTranslateByScope } from '../../../../../services';

import { callActionForPipelineRunsForPagination } from '../../PipelineDetail/useService';
import { callActionForAllrunsForPagination } from '../useService';

export const translate = getTranslateByScope('ui.layouts.AllRuns');

interface Props {
  filter: any;
  runId?: any;
  pagination?: boolean;
}

export const AllRuns: React.FC<Props> = ({
  filter,
  pagination,
  runId,
}: Props) => {
  const [sortBy, setSortBy] = useState('created');
  function getSorted(activeSorting: any, activeSortingDirection: any) {
    setSortBy(activeSortingDirection?.toLowerCase() + ':' + activeSorting);
  }

  const { fetching, runIds, runsPaginated } = useService({ filter, sortBy });

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
        callActionForPipelineRunsForPagination={
          callActionForPipelineRunsForPagination
        }
        callActionForAllrunsForPagination={callActionForAllrunsForPagination}
      />
    </>
  );
};
