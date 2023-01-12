import React from 'react';

import { RunsTable } from '../../RunsTable';

import { useService } from './useService';

import { getTranslateByScope } from '../../../../../services';

export const translate = getTranslateByScope('ui.layouts.AllRuns');

interface Props {
  filter: any;
}

export const AllRuns: React.FC<Props> = ({ filter }: Props) => {
  const { fetching, runIds, runsPaginated } = useService(filter);

  return (
    <RunsTable
      paginated={runsPaginated}
      fetching={fetching}
      emptyStateText={translate('emptyState.text')}
      runIds={runIds}
      fromAllruns={true}
      filter={filter}
    />
  );
};
