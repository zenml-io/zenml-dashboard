import React, { useState } from 'react';

import { RunsTable } from '../../RunsTable';

import { useService } from './useService';

import { getTranslateByScope } from '../../../../../services';

export const translate = getTranslateByScope('ui.layouts.AllRuns');

interface Props {
  filter: any;
}

export const AllRuns: React.FC<Props> = ({ filter }: Props) => {
  const [sortBy, setSortBy] = useState('created');
  function getSorted(activeSorting: any, activeSortingDirection: any) {
    setSortBy(activeSortingDirection?.toLowerCase() + ':' + activeSorting);
    // console.log(activeSorting, activeSortingDirection, 'aaaaaaa');
  }

  const { fetching, runIds, runsPaginated } = useService({ filter, sortBy });

  return (
    <RunsTable
      getSorted={getSorted}
      paginated={runsPaginated}
      fetching={fetching}
      emptyStateText={translate('emptyState.text')}
      runIds={runIds}
      fromAllruns={true}
      filter={filter}
    />
  );
};
