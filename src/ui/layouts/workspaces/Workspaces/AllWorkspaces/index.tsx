import React from 'react';

import { Table } from '../../../common/Table';

import { useHeaderCols } from './HeaderCols';

import { useService } from './useService';

import { getTranslateByScope } from '../../../../../services';

export const translate = getTranslateByScope('ui.layouts.AllWorkspaces');

export const AllWorkspaces: React.FC = () => {
  const { fetching, workspaces } = useService();

  const headerCols = useHeaderCols();

  return (
    <Table
      pagination={true}
      headerCols={headerCols}
      loading={fetching}
      showHeader={true}
      tableRows={workspaces}
      emptyState={{ text: translate('emptyState.text') }}
    />
  );
};
