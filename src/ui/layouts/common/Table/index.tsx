import React, { useCallback, useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import './styles.css';
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
import { useDispatch, useLocation } from '../../../hooks';
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

import { organizationActions } from '../../../../redux/actions';

export interface HeaderCol {
  render?: () => JSX.Element;
  width: number | string;
  renderRow: (arg: any) => JSX.Element;
}

export interface TableProps {
  headerCols: HeaderCol[];
  tableRows: any[];
  minCellWidth?: any;
  activeSorting?: any;
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

const createHeaders = (headers: any[]) => {
  return headers.map((item) => ({
    text: item,
    ref: useRef() as any,
  }));
};

export const Table: React.FC<TableProps> = ({
  headerCols,
  tableRows,
  paginated,
  minCellWidth = 120,
  activeSorting,
  filters,
  showHeader = true,
  pagination = true,
  loading = false,
  emptyState,
  renderAfterRow,
  trOnClick,
}) => {
  const [tableHeight, setTableHeight] = useState('auto');
  const [activeIndex, setActiveIndex] = useState(null);
  const tableElement = useRef(document.createElement('table'));
  const columns = createHeaders(headerCols);

  useEffect(() => {
    console.log(tableElement.current.style.gridTemplateColumns, 'offsetHeight');
    setTableHeight(tableElement.current.offsetHeight as any);

     // eslint-disable-next-line
  }, [tableElement.current]);

  const mouseDown = (index: any) => {
    setActiveIndex(index);
  };

  const mouseMove = useCallback(
    (e) => {
      // debugger;
      const gridColumns = columns.map((col, i) => {
        // debugger;
        if (i === activeIndex) {
          const width = e.clientX - col.ref.current.offsetLeft;

          if (width >= minCellWidth) {
            return `${width}px`;
          }
        }
        return `${col.ref.current.offsetWidth}px`;
      });

      tableElement.current.style.gridTemplateColumns = `${gridColumns.join(
        ' ',
      )}`;
      // console.log(tableElement.current.style.gridTemplateColumns, 'aasaaa');
    },
    [activeIndex, columns, minCellWidth],
  );

  const removeListeners = useCallback(() => {
    window.removeEventListener('mousemove', mouseMove);
    window.removeEventListener('mouseup', removeListeners);
  }, [mouseMove]);

  const mouseUp = useCallback(() => {
    setActiveIndex(null);
    removeListeners();
  }, [setActiveIndex, removeListeners]);

  useEffect(() => {
    if (activeIndex !== null) {
      window.addEventListener('mousemove', mouseMove);
      window.addEventListener('mouseup', mouseUp);
    }

    return () => {
      removeListeners();
    };
  }, [activeIndex, mouseMove, mouseUp, removeListeners]);

  // Demo only
  const resetTableCells = () => {
    debugger;
    tableElement.current.style.gridTemplateColumns = '';
  };

  const [showItems, setShowItems] = useState(false);
  const [fetchingMembers, setFetchingMembers] = useState(false);

  const { pageIndex, setPageIndex } = usePaginationAsQueryParam();
  const locationPath = useLocation();
  const dispatch = useDispatch();
  // const childRef = React.useRef(null);
  const initialRef: any = null;
  const childRef = React.useRef(initialRef);
  const ITEMS_PER_PAGE = parseInt(
    process.env.REACT_APP_ITEMS_PER_PAGE as string,
  );
  const DEFAULT_ITEMS_PER_PAGE = 10;
  const itemPerPageOptions = [5, 10, 15, 20];
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
    setItemPerPage(itemPerPage);
    if (filters) {
      setPageIndex(0);
    }
    switch (componentName) {
      case 'stacks':
        if (CheckIfRun) {
          dispatchStackRunsData(
            id,
            1,
            itemPerPage,
            filters as any,
            activeSorting,
          );
          break;
        } else {
          dispatchStackData(1, itemPerPage, filters as any, activeSorting);
          break;
        }
      case 'components':
        if (CheckIfRun) {
          dispatchStackComponentRunsData(
            id,
            1,
            itemPerPage,
            filters as any,
            activeSorting,
          );
          break;
        } else {
          dispatchStackComponentsData(
            1,
            itemPerPage,
            filters as any,
            activeSorting,
          );
          break;
        }
      case 'pipelines':
        if (CheckIfRun) {
          dispatchPipelineRunsData(
            id,
            1,
            itemPerPage,
            filters as any,
            activeSorting,
          );
          break;
        } else {
          console.log(itemPerPage, 'itemPerPage');
          if (!renderAfterRow) break;
          dispatchPipelineData(1, itemPerPage, filters as any, activeSorting);
          break;
        }

      case 'all-runs':
        dispatchAllrunsData(1, itemPerPage, filters as any, activeSorting);
        break;

      default:
        break;
    }
    if (locationPath.pathname.split('/')[2] === 'organization') {
      // debugger;
      setFetchingMembers(true);
      dispatch(
        organizationActions.getMembers({
          page: 1,
          size: ITEMS_PER_PAGE ? ITEMS_PER_PAGE : DEFAULT_ITEMS_PER_PAGE,
          sort_by: activeSorting,
          onSuccess: () => setFetchingMembers(false),
          onFailure: () => setFetchingMembers(false),
        }),
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locationPath.pathname.split('/')[4], isValidFilter, activeSorting]);
  let rowsToDisplay = tableRows;

  // function getFetchedState(state: any) {
  //   setFetchingMembers(state);
  //   // console.log(activeSorting, activeSortingDirection, 'aaaaaaa');
  // }
  if (pagination) {
    rowsToDisplay = tableRows;
  }

  if (loading) {
    return <FullWidthSpinner color="black" size="md" />;
  }
  if (fetchingMembers) {
    return <FullWidthSpinner color="black" size="md" />;
  }
  // console.log(fetchingMembers, activeSorting, 'fetchingMembers');
  const onChangePagePerItem = (p: number, size: number) => {
    // onChange(p + 1, size);
    setItemPerPage(size);
  };
  // console.log('pages11', itemPerPage, ITEMS_PER_PAGE);
  return (
    <FlexBox.Column fullWidth>
      <IfElse
        condition={tableRows.length > 0 && !loading}
        renderWhenTrue={() => (
          <>
            <div>
              <div>
                <table ref={tableElement as any} style={{ gridTemplateColumns: `minmax(50px, 2fr)`.repeat(columns?.length) }} >
                  <thead>
                    <tr style={{ backgroundColor: '#F5F3F9' }}>
                      {console.log(columns, 'columns')}
                      {columns.map(({ ref, text }, i) => (
                        <th
                          ref={ref}
                          className={styles.tableHeadingTh}
                          style={{
                            // width: text.width,
                            backgroundColor: '#F5F3F9',
                            fontSize: '14px',
                            fontWeight: 700,
                          }}
                          key={i}
                        >
                          <Box
                            style={{ backgroundColor: '#F5F3F9' }}
                            paddingVertical={showHeader ? 'sm' : null}
                            paddingLeft="lg"
                          >
                            {text.render && text.render()}
                          </Box>
                          
                          <div
                            style={{ height: tableHeight }}
                            onMouseDown={() => i !== 0 && mouseDown(i)}
                            className={`resize-handle ${
                              activeIndex === i ? 'active' : 'idle'
                            }`}
                          />
                        </th>
                      ))}
                    </tr>
                  </thead>

                  {rowsToDisplay.map((headerRow: any, index: number) => (
                    <>
                    <tbody>
                      <tr
                        onClick={() => trOnClick && trOnClick(headerRow)}
                        className={cn(
                          styles.tableRow,
                          trOnClick && styles.clickableTableRow,
                        )}
                        style={{
                          backgroundColor:
                            index % 2 !== 0 ? '#F5F3F9' : 'white',
                        }}
                        key={index}
                      >
                        {columns.map(({ ref, text }, i) => (
                          <td
                            className={styles.tableTd}
                            style={{
                              backgroundColor:
                                index % 2 !== 0 ? '#F5F3F9' : 'white',
                            }}
                            key={i}
                          >
                            <Box paddingVertical="sm" paddingLeft="lg">
                              <Truncate maxLines={1}>
                                {text.renderRow(headerRow)}
                              </Truncate>
                            </Box>
                          </td>
                        ))}
                      </tr>
                      {/* <table className={styles.collapseTable}> */}
                      <tbody>
                        {renderAfterRow && renderAfterRow(headerRow)}
                      </tbody>
                      {/* </table> */}
                    </tbody>
                      </>
                  ))}
                </table>


              </div>
              <button onClick={resetTableCells}>Reset</button>
            </div>

            {/* <table className={styles.table} ref={tableElement}>
                <thead>
                  <tr className={showHeader ? styles.tableHeaderRow : ''}>
                    {headerCols.map((headerCol: HeaderCol, index: number) => (
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
                        <Box
                          style={{ backgroundColor: '#f6f67' }}
                          paddingVertical={showHeader ? 'sm' : null}
                          paddingLeft="lg"
                        >
                          {headerCol.render && headerColheaderCol.render && headerCol.render()}
                        </Box>
                        {console.log(tableHeight, 'tableHeight')}
                        <div
                          style={{ height: tableHeight }}
                          onMouseDown={() => mouseDown(index)}
                          className={`resize-handle ${
                            activeIndex === index ? 'active' : 'idle'
                          }`}
                        />
                      </th>
                    ))}
                  </tr>
                </thead>
                {rowsToDisplay.map((headerRow: any, index: number) => (
                  <>
                    <tbody key={index}>
                      <tr
                        onClick={() => trOnClick && trOnClick(headerRow)}
                        className={cn(
                          styles.tableRow,
                          trOnClick && styles.clickableTableRow,
                        )}
                        style={{
                          backgroundColor:
                            index % 2 !== 0 ? '#F5F3F9' : 'white',
                        }}
                        key={index}
                      >
                        {headerCols.map(
                          (headerCol: HeaderCol, index: number) => (
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
                          ),
                        )}
                      </tr>
                    </tbody>

                    <table className={styles.collapseTable}>
                      <tbody>
                        {renderAfterRow && renderAfterRow(headerRow)}
                      </tbody>
                    </table>
                  </>
                ))}
              </table> */}

            <If condition={pagination}>
              {() => (
                <FlexBox
                  marginTop="xxxl"
                  marginBottom="xxxl"
                  justifyContent="center"
                >
                  <Pagination
                    ref={childRef}
                    // getFetchedState={getFetchedState}
                    activeSorting={activeSorting}
                    filters={filters}
                    itemPerPage={itemPerPage}
                    pageIndex={pageIndex}
                    setPageIndex={setPageIndex}
                    pages={paginated?.totalPages}
                    totalOfPages={paginated?.totalPages}
                    totalLength={tableRows?.length}
                    totalCount={paginated?.totalitem}
                  />

                  <If
                    condition={tableRows.length > 0 && paginated?.totalitem > 5}
                  >
                    {() => (
                      <>
                        <Box marginLeft="xxxl" className="d-none d-md-block">
                          <Box>
                            <FlexBox>
                              <Box
                                style={{
                                  marginTop: '4px',
                                  marginRight: '10px',
                                }}
                              >
                                <span className={styles.itemText1}>
                                  Items Showing
                                </span>
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
                                      <span className={styles.itemText}>
                                        {itemPerPage}
                                      </span>
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
                                      <OutsideClickHandler
                                        onOutsideClick={() => {}}
                                      >
                                        <Box
                                          className={styles.popup}
                                          marginTop="sm"
                                        >
                                          <Box
                                            marginVertical="sm"
                                            marginLeft="md"
                                            className="d-none d-md-block"
                                          >
                                            <Box marginTop="sm">
                                              {itemPerPageOptions.map(
                                                (option, index) => (
                                                  <Box
                                                    marginTop="sm"
                                                    key={index}
                                                    onClick={() => {
                                                      onChangePagePerItem(
                                                        pageIndex,
                                                        parseInt(`${option}`),
                                                      );
                                                      childRef?.current?.callOnChange(
                                                        1,
                                                        parseInt(`${option}`),
                                                        filters,
                                                        activeSorting,
                                                      );
                                                      setShowItems(false);
                                                    }}
                                                  >
                                                    <span
                                                      className={
                                                        styles.itemText
                                                      }
                                                      style={{
                                                        cursor: 'pointer',
                                                      }}
                                                    >
                                                      {option}
                                                    </span>
                                                  </Box>
                                                ),
                                              )}
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
                </FlexBox>
              )}
            </If>
            {/* {console.log(paginated, 'paginated')} */}
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