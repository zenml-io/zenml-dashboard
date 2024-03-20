import React from 'react';
import { RunsTable } from '../../RunsTable';
import { useService } from './useService';
import { getTranslateByScope } from '../../../../../services';

export const translate = getTranslateByScope('ui.layouts.AllRuns');

export const AllRuns: React.FC = () => {
  const { fetching, runIds } = useService();

  return (
    <RunsTable
      fetching={fetching}
      emptyStateText={translate('emptyState.text')}
      runIds={runIds}
    />
  );
};
