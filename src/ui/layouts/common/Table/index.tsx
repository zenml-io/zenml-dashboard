import React from 'react';
import cn from 'classnames';

import styles from './index.module.scss';
import {
  Box,
  FlexBox,
  IfElse,
  If,
  H3,
  Truncate,
  FullWidthSpinner,
} from '../../../components';
import { getPaginationData } from '../../../../utils/pagination';
import { Pagination } from '../Pagination';
import { usePaginationAsQueryParam } from '../../../hooks/usePaginationAsQueryParam';

export interface HeaderCol {
  render?: () => JSX.Element;
  width: number | string;
  renderRow: (arg: any) => JSX.Element;
}

export interface TableProps {
  headerCols: HeaderCol[];
  tableRows: any[];
  showHeader?: boolean;
  pagination?: boolean;
  loading?: boolean;
  emptyState?: {
    text: string;
  };
  renderAfterRow?: (arg: any) => JSX.Element;
  trOnClick?: (arg: any) => void;
}

const ITEMS_PER_PAGE = parseInt(process.env.REACT_APP_ITEMS_PER_PAGE as string);

export const Table: React.FC<TableProps> = ({
  headerCols,
  tableRows,
  showHeader = true,
  pagination = true,
  loading = false,
  emptyState,
  renderAfterRow,
  trOnClick,
}) => {
  const { pageIndex, setPageIndex } = usePaginationAsQueryParam();

  const { itemsForPage, pages, totalOfPages } = getPaginationData({
    pageIndex,
    itemsPerPage: ITEMS_PER_PAGE,
    items: tableRows,
  });

  let rowsToDisplay = tableRows;

  if (pagination) {
    rowsToDisplay = itemsForPage;
  }

  if (loading) {
    return <FullWidthSpinner color="black" size="md" />;
  }

  return (
    <FlexBox.Column className={styles.tableWrapper} fullWidth>
      <IfElse
        condition={tableRows.length > 0 && !loading}
        renderWhenTrue={() => (
          <>
            <table className={styles.table}>
              <thead style={{ backgroundColor: '#F4F4F4' }}>
                <tr className={showHeader ? styles.tableHeaderRow : ''}>
                  {headerCols.map((headerCol: HeaderCol, index: number) => (
                    <th
                      className={styles.tableHeadingTh}
                      style={{
                        width: headerCol.width,
                        color: '#000',
                        fontWeight: 700,
                      }}
                      key={index}
                    >
                      <Box
                        paddingVertical={showHeader ? 'sm' : null}
                        paddingLeft="lg"
                      >
                        {headerCol.render && headerCol.render()}
                      </Box>
                    </th>
                  ))}
                </tr>
              </thead>
            </table>
            {rowsToDisplay.map((headerRow: any, index: number) => (
              <>
                <table
                  className={cn(
                    styles.table,
                    index + 1 === rowsToDisplay.length && styles.lastTable,
                  )}
                >
                  <tbody key={index}>
                    <tr
                      onClick={() => trOnClick && trOnClick(headerRow)}
                      className={cn(
                        styles.tableRow,
                        trOnClick && styles.clickableTableRow,
                      )}
                      key={index}
                    >
                      {headerCols.map((headerCol: HeaderCol, index: number) => (
                        <td
                          className={styles.tableTd}
                          style={{ width: headerCol.width }}
                          key={index}
                        >
                          <Box paddingVertical="md" paddingLeft="lg">
                            <Truncate maxLines={1}>
                              {headerCol.renderRow(headerRow)}
                            </Truncate>
                          </Box>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
                <table className={styles.collapseTable}>
                  <tbody>{renderAfterRow && renderAfterRow(headerRow)}</tbody>
                </table>
              </>
            ))}
            <If condition={pagination}>
              {() => (
                <Pagination
                  pageIndex={pageIndex}
                  setPageIndex={setPageIndex}
                  pages={pages}
                  totalOfPages={totalOfPages}
                  totalLength={tableRows.length}
                />
              )}
            </If>
          </>
        )}
        renderWhenFalse={() => (
          <Box
            style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}
            paddingVertical="xxl"
          >
            <H3>{emptyState && emptyState.text}</H3>
          </Box>
        )}
      />
    </FlexBox.Column>
  );
};
