import React from 'react';

import { Table, TableProps } from '../Table';

interface CollapseTableProps {
  renderAfterRow: (arg: any) => JSX.Element;
}

export const CollapseTable: React.FC<TableProps & CollapseTableProps> = ({
  headerCols,
  tableRows,
  showHeader = true,
  pagination = true,
  loading = false,
  emptyState,
  filters,
  paginated,
  renderAfterRow,
  trOnClick,
}) => {
  return (
    <Table
      headerCols={headerCols}
      tableRows={tableRows}
      showHeader={showHeader}
      pagination={pagination}
      loading={loading}
      filters={filters}
      paginated={paginated}
      renderAfterRow={renderAfterRow}
      emptyState={emptyState}
      trOnClick={trOnClick}
    />
  );
};
