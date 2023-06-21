import React, { useCallback, useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import './styles.css';
import styles from './index.module.scss';
import {
  Box,
  FlexBox,
  IfElse,
  // If,
  H3,
  Truncate,
  FullWidthSpinner,
  // Paragraph,
  // icons,
} from '../../../components';
import { Link } from 'react-router-dom';
// import { getPaginationData } from '../../../../utils/pagination';
// import { Pagination } from '../Pagination';
// import { usePaginationAsQueryParam } from '../../../hooks/usePaginationAsQueryParam';

// import { iconColors, iconSizes } from '../../../../constants/icons';
// import OutsideClickHandler from 'react-outside-click-handler';

// import { organizationActions } from '../../../../redux/actions';

export interface HeaderCol {
  render?: () => JSX.Element;
  width: number | string;
  renderRow: (arg: any) => JSX.Element;
}

export interface TableProps {
  route?: any;
  isExpended?: boolean;
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
  route,
  isExpended,
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
    // console.log(tableElement.current.style.gridTemplateColumns, 'offsetHeight');
    setTableHeight(tableElement?.current?.offsetHeight as any);

    // eslint-disable-next-line
  }, [tableElement.current]);

  const mouseDown = (index: any) => {
    setActiveIndex(index);
  };
  console.log('paginatomnanas', paginated, pagination);

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

  let rowsToDisplay = tableRows;

  if (pagination) {
    rowsToDisplay = tableRows;
  }

  if (loading) {
    return <FullWidthSpinner color="black" size="md" />;
  }

  const columnWidths = columns
    .map((column: any) => column.text.width || 'auto')
    .join(' '); // set column widths or default to 'auto'
  const gridTemplateColumns = ` ${columnWidths}`;
  return (
    <FlexBox.Column
      fullWidth
      style={{
        // marginBottom: pagination ? '90px' : '0px',
        minWidth: '1250px',
        overflowX: 'auto',
      }}
    >
      <IfElse
        condition={tableRows.length > 0 && !loading}
        renderWhenTrue={() => (
          <>
            <div>
              <div>
                <table
                  ref={tableElement as any}
                  style={{
                    gridTemplateColumns: gridTemplateColumns,
                  }}
                >
                  <thead>
                    <tr style={{ backgroundColor: '#F5F3F9' }}>
                      {console.log(gridTemplateColumns, 'columns')}

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
                            onMouseDown={() => mouseDown(i)}
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
                              <Box paddingVertical="md" paddingLeft="lg">
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
              {/* <button onClick={resetTableCells}>Reset</button> */}
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

            {/* <If condition={pagination}>
              {() => (
                <FlexBox
                  marginTop="xxxl"
                  marginBottom="xxxl"
                  justifyContent="center"
                >
                  <Pagination
                    isExpended={isExpended}
                    ref={childRef}
                    // getFetchedState={getFetchedState}
                    activeSorting={activeSorting}
                    filters={validFilters}
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
                                                        validFilters,
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
            </If> */}
            {/* {console.log(paginated, 'paginated')} */}
          </>
        )}
        renderWhenFalse={() => (
          <Box
            style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}
            paddingVertical="xxl"
          >
            <H3>
              {emptyState && emptyState.text}{' '}
              {route && <Link to={route}>Click here to register new one.</Link>}
            </H3>
          </Box>
        )}
      />
    </FlexBox.Column>
  );
};
