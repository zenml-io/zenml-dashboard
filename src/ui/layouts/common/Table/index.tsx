import React, { useEffect, useRef, useState } from 'react';
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
import { useLocation } from '../../../hooks';
import { callActionForStacksForPagination } from '../../stacks/Stacks/useService';
import { callActionForStackComponentsForPagination } from '../../stackComponents/Stacks/useService';
import { callActionForPipelinesForPagination } from '../../pipelines/Pipelines/useService';

export interface HeaderCol {
  render?: () => JSX.Element;
  width: number | string;
  renderRow: (arg: any) => JSX.Element;
}

export interface TableProps {
  headerCols: HeaderCol[];
  tableRows: any[];
  paginated?: any;
  filters?: any[];
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
  paginated,
  filters,
  showHeader = true,
  pagination = true,
  loading = false,
  emptyState,
  renderAfterRow,
  trOnClick,
}) => {
  const { pageIndex, setPageIndex } = usePaginationAsQueryParam();
  const locationPath = useLocation();
  // const childRef = React.useRef(null);
  const initialRef: any = null;
  const childRef = React.useRef(initialRef);
  const ITEMS_PER_PAGE = parseInt(
    process.env.REACT_APP_ITEMS_PER_PAGE as string,
  );
  const DEFAULT_ITEMS_PER_PAGE = 5;
  // const itemPerPage = ITEMS_PER_PAGE ? ITEMS_PER_PAGE : DEFAULT_ITEMS_PER_PAGE;
  const [itemPerPage, setItemPerPage] = useState(
    ITEMS_PER_PAGE ? ITEMS_PER_PAGE : DEFAULT_ITEMS_PER_PAGE,
  );
  const { itemsForPage, pages, totalOfPages } = getPaginationData({
    pageIndex,
    itemsPerPage: itemPerPage,
    items: tableRows,
  });
  const isValidFilter = filters?.map((f) => f.value).join('');
  const { dispatchStackData } = callActionForStacksForPagination();
  const {
    dispatchStackComponentsData,
  } = callActionForStackComponentsForPagination();

  const { dispatchPipelineData } = callActionForPipelinesForPagination();

  const componentName = locationPath.pathname.split('/')[3];
  useEffect(() => {
    // console.log(locationPath.pathname.split('/')[4], 'locationPath1');
    setItemPerPage(DEFAULT_ITEMS_PER_PAGE);
    switch (componentName) {
      case 'stacks':
        dispatchStackData(1, 5, filters as any);
        break;
      case 'components':
        dispatchStackComponentsData(1, 5, filters as any);
        break;
      case 'pipelines':
        dispatchPipelineData(1, 5, filters as any);
        break;

      default:
        break;
    }
  }, [locationPath.pathname.split('/')[4], isValidFilter]);
  let rowsToDisplay = tableRows;

  if (pagination) {
    rowsToDisplay = tableRows;
  }

  if (loading) {
    return <FullWidthSpinner color="black" size="md" />;
  }
  const onChangePagePerItem = (p: number, size: number) => {
    // onChange(p + 1, size);
    setItemPerPage(size);
  };
  console.log('pages11', itemPerPage, ITEMS_PER_PAGE);
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
                  ref={childRef}
                  filters={filters}
                  itemPerPage={itemPerPage}
                  pageIndex={pageIndex}
                  setPageIndex={setPageIndex}
                  pages={paginated?.totalPages}
                  totalOfPages={paginated?.totalPages}
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
      <If condition={tableRows.length > 0 && paginated?.totalitem > 5}>
        {() => (
          <>
            {/* {console.log(paginated.totalPages, '1111', tableRows.length > 0)} */}
            <Box marginLeft="md" className="d-none d-md-block">
              <select
                onChange={(e: any) => {
                  onChangePagePerItem(pageIndex, parseInt(e.target.value));
                  childRef?.current?.callOnChange(
                    pageIndex,
                    parseInt(e.target.value),
                    filters,
                  );
                }}
                // defaultValue={itemPerPage}
                value={itemPerPage}
                placeholder={'Item per Page'}
                // className={cn(css.input)}
                style={{
                  border: 'none',
                  outline: 'none',
                  width: '146px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  color: '#424240',
                }}
              >
                {[5, 10, 15, 20].map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </Box>
          </>
        )}
      </If>
    </FlexBox.Column>
  );
};
