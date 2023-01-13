import React, { useEffect, useState } from 'react';
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
  // Paragraph,
  icons,
} from '../../../components';
// import { getPaginationData } from '../../../../utils/pagination';
import { Pagination } from '../Pagination';
import { usePaginationAsQueryParam } from '../../../hooks/usePaginationAsQueryParam';
import { useLocation } from '../../../hooks';
import { callActionForStacksForPagination } from '../../stacks/Stacks/useService';
import { callActionForStackComponentsForPagination } from '../../stackComponents/Stacks/useService';
import {
  callActionForAllrunsForPagination,
  callActionForPipelinesForPagination,
} from '../../pipelines/Pipelines/useService';
import { callActionForPipelineRunsForPagination } from '../../pipelines/PipelineDetail/useService';
import { callActionForStackRunsForPagination } from '../../stacks/StackDetail/useService';
import { callActionForStackComponentRunsForPagination } from '../../stackComponents/StackDetail/useService';
import { iconColors, iconSizes } from '../../../../constants/icons';
import OutsideClickHandler from 'react-outside-click-handler';

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

// const ITEMS_PER_PAGE = parseInt(process.env.REACT_APP_ITEMS_PER_PAGE as string);

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
  // const [tableHeight, setTableHeight] = useState("auto");
  // const [activeIndex, setActiveIndex] = useState(null);
  // const tableElement = useRef(null);
  // const createHeaders = (headers: any) => {
  //   return headerCols?.map((item: any) => ({
  //     text: item,
  //     ref: tableElement
  //   }));
  // };
  // const columns = createHeaders(headerCols?.length);

  // const minCellWidth = 120

  // useEffect(() => {
  //   // @ts-ignore
  //   // console.log(tableElement && tableElement.current.offsetHeight);
  //   setTableHeight(tableElement?.current?.offsetHeight);
  // }, []);

  // const mouseDown = (index: any) => {
  //   setActiveIndex(index);
  // };

  // const mouseMove = useCallback(
  //   (e) => {
  //     const gridColumns = columns.map((col: any, i: any) => {
  //       if (i === activeIndex) {
  //         const width = e.clientX - col.ref.current.offsetLeft;

  //         if (width >= minCellWidth) {
  //           return `${width}px`;
  //         }
  //       }
  //       return `${col.ref.current.offsetWidth}px`;
  //     });

  //     // @ts-ignore
  //     tableElement.current.style.gridTemplateColumns = `${gridColumns.join(
  //       " "
  //     )}`;
  //   },
  //   [activeIndex, columns, minCellWidth]
  // );

  // const removeListeners = useCallback(() => {
  //   window.removeEventListener("mousemove", mouseMove);
  //   window.removeEventListener("mouseup", removeListeners);
  // }, [mouseMove]);

  // const mouseUp = useCallback(() => {
  //   setActiveIndex(null);
  //   removeListeners();
  // }, [setActiveIndex, removeListeners]);

  // useEffect(() => {
  //   if (activeIndex !== null) {
  //     window.addEventListener("mousemove", mouseMove);
  //     window.addEventListener("mouseup", mouseUp);
  //   }

  //   return () => {
  //     removeListeners();
  //   };
  // }, [activeIndex, mouseMove, mouseUp, removeListeners]);

  // // Demo only
  // const resetTableCells = () => {
  //   // @ts-ignore
  //   tableElement.current.style.gridTemplateColumns = "";
  // };

  const [showItems, setShowItems] = useState(false);
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
  // const { itemsForPage, pages, totalOfPages } = getPaginationData({
  //   pageIndex,
  //   itemsPerPage: itemPerPage,
  //   items: tableRows,
  // });
  const isValidFilter = filters?.map((f) => f.value).join('');

  const { dispatchStackData } = callActionForStacksForPagination();
  const {
    dispatchStackComponentsData,
  } = callActionForStackComponentsForPagination();

  const { dispatchPipelineData } = callActionForPipelinesForPagination();
  const { dispatchAllrunsData } = callActionForAllrunsForPagination();
  const { dispatchPipelineRunsData } = callActionForPipelineRunsForPagination();
  const { dispatchStackRunsData } = callActionForStackRunsForPagination();
  const {
    dispatchStackComponentRunsData,
  } = callActionForStackComponentRunsForPagination();
  const componentName = locationPath.pathname.split('/')[3];
  const CheckIfRun =
    componentName === 'components'
      ? locationPath.pathname.split('/')[6]
      : locationPath.pathname.split('/')[5];
  const id =
    componentName === 'components'
      ? locationPath.pathname.split('/')[5]
      : locationPath.pathname.split('/')[4];
  // console.log(check, '333');
  useEffect(() => {
    // console.log(locationPath.pathname.split('/')[4], 'locationPath1');
    setItemPerPage(DEFAULT_ITEMS_PER_PAGE);
    switch (componentName) {
      case 'stacks':
        if (CheckIfRun) {
          dispatchStackRunsData(id, 1, 5, filters as any);
          break;
        } else {
          dispatchStackData(1, 5, filters as any);
          break;
        }
      case 'components':
        if (CheckIfRun) {
          dispatchStackComponentRunsData(id, 1, 5, filters as any);
          break;
        } else {
          dispatchStackComponentsData(1, 5, filters as any);
          break;
        }
      case 'pipelines':
        if (CheckIfRun) {
          dispatchPipelineRunsData(id, 1, 5, filters as any);
          break;
        } else {
          if (!renderAfterRow) break;
          dispatchPipelineData(1, 5, filters as any);
          break;
        }

      case 'all-runs':
        dispatchAllrunsData(1, 5, filters as any);
        break;

      default:
        break;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
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
              <thead>
                <tr className={showHeader ? styles.tableHeaderRow : ''}>
                  {headerCols.map((headerCol: HeaderCol, index: number, i) => (
                    <th
                      className={styles.tableHeadingTh}                
                      style={{
                        width: headerCol.width,
                        color: '#424240',
                        fontSize: '14px',
                        fontWeight: 700,
                      }}
                      key={index}
                    >
                      <Box style={{ backgroundColor: '#f6f67' }} paddingVertical={showHeader ? 'sm' : null} paddingLeft="lg">
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
                      style={{ backgroundColor: index % 2 !== 0 ? '#F5F3F9' : 'white' }}
                      key={index}
                    >
                      {headerCols.map((headerCol: HeaderCol, index: number) => (
                        <td
                          className={styles.tableTd}
                          style={{ width: headerCol.width }}
                          key={index}
                        >
                          <Box paddingVertical="sm" paddingLeft="lg">
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
            <Box marginLeft="md" className="d-none d-md-block">
              <Box>
                <FlexBox>
                  <Box style={{ marginTop: '4px', marginRight: '10px' }}>
                    <span className={styles.itemText1}>Items Showing</span>
                  </Box>

                  <FlexBox flexDirection="column">
                    <Box>
                      <FlexBox
                        alignItems="center"
                        justifyContent="space-between"
                        paddingHorizontal="sm"
                        className={styles.dropdown}
                        onClick={() => setShowItems(!showItems)}
                      >
                        <Box paddingRight="sm">
                          <span className={styles.itemText}>{itemPerPage}</span>
                        </Box>
                        <Box>
                          <icons.chevronDownLight
                            size={iconSizes.xs}
                            color={iconColors.black}
                          />
                        </Box>
                      </FlexBox>
                    </Box>
                    <Box>
                      <If condition={showItems}>
                        {() => (
                          <OutsideClickHandler onOutsideClick={() => {}}>
                            <Box className={styles.popup} marginTop="sm">
                              <Box
                                marginVertical="sm"
                                marginLeft="md"
                                className="d-none d-md-block"
                              >
                                <Box marginTop="sm">
                                  {[5, 10, 15, 20].map((option, index) => (
                                    <Box
                                      marginTop="sm"
                                      key={index}
                                      onClick={() => {
                                        onChangePagePerItem(
                                          pageIndex,
                                          parseInt(`${option}`),
                                        );
                                        childRef?.current?.callOnChange(
                                          pageIndex,
                                          parseInt(`${option}`),
                                          filters,
                                        );
                                      }}
                                    >
                                      <span
                                        className={styles.itemText}
                                        style={{ cursor: 'pointer' }}
                                      >
                                        {option}
                                      </span>
                                    </Box>
                                  ))}
                                </Box>
                              </Box>
                            </Box>
                          </OutsideClickHandler>
                        )}
                      </If>
                    </Box>
                  </FlexBox>
                </FlexBox>
              </Box>
            </Box>
          </>
        )}
      </If>
    </FlexBox.Column>
  );
};
