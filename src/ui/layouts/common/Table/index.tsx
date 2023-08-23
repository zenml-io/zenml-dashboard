import React, { useCallback, useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import './styles.css';
import styles from './index.module.scss';
import {
  Box,
  FlexBox,
  IfElse,
  H3,
  Truncate,
  FullWidthSpinner,
} from '../../../components';
import { Link } from 'react-router-dom';

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
  maxCellWidth?: any;
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
  minCellWidth = 150,
  maxCellWidth = 240,
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
  const [hoverIndex, setHoverIndex] = useState(null);
  const tableElement = useRef(document.createElement('table'));
  const columns = createHeaders(headerCols);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    setTableHeight((tableElement?.current?.offsetHeight - 2) as any);

    // eslint-disable-next-line
  }, [tableElement.current]);

  const mouseDown = (index: any) => {
    setActiveIndex(index);
  };

  const mouseMove = useCallback(
    (e) => {
      const gridColumns = columns.map((col, i) => {
        // we must need to optimize this logic later
        if (i === (activeIndex as any) + 1 && i <= columns.length - 1) {
          const newWidth =
            e.clientX -
              columns[activeIndex as any].ref.current.offsetLeft -
              70 <=
            minCellWidth
              ? minCellWidth
              : e.clientX -
                columns[activeIndex as any].ref.current.offsetLeft -
                70;
          const widthDifference =
            newWidth <= minCellWidth
              ? 0
              : columns[activeIndex as any].ref.current.offsetWidth - newWidth;
          const width = col.ref.current.offsetWidth + widthDifference;

          if (width >= minCellWidth && newWidth >= minCellWidth) {
            return `${width}px`;
          }
        } else if (i === activeIndex && i < columns.length - 1) {
          const width =
            e.clientX - col.ref.current.offsetLeft - 70 <= minCellWidth
              ? minCellWidth
              : e.clientX - col.ref.current.offsetLeft - 70;
          const widthDifference =
            width <= minCellWidth ? 0 : col.ref.current.offsetWidth - width;
          const newWidth =
            columns[(activeIndex as any) + 1].ref.current.offsetWidth +
            widthDifference;

          if (width >= minCellWidth && newWidth > minCellWidth) {
            return `${width}px`;
          }
        }

        return `${col.ref.current.offsetWidth}px`;
      });
      tableElement.current.style.gridTemplateColumns = `${gridColumns.join(
        ' ',
      )}`;
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
                    overflow: 'auto',
                  }}
                  className="border-x border-t border-theme-border-moderate rounded-md"
                >
                  <thead>
                    <tr>
                      {columns.map(({ ref, text }, i) => (
                        <th
                          ref={ref}
                          className={`${styles.tableHeadingTh} bg-theme-surface-tertiary border-b border-theme-border-moderate`}
                          style={{
                            fontSize: '14px',
                            fontWeight: 700,
                            borderRight:
                              i === columns.length - 1
                                ? '0'
                                : '1px solid #cacaca',
                          }}
                          key={i}
                        >
                          <Box
                            paddingVertical={showHeader ? 'sm' : null}
                            paddingLeft="lg"
                          >
                            {text.render && text.render()}
                          </Box>

                          <div
                            className="resize-handle"
                            style={{
                              height: tableHeight,
                              display: 'block',
                              position: 'absolute',
                              cursor:
                                i < columns.length - 1
                                  ? 'col-resize'
                                  : 'pointer',
                              width: '7px',
                              right: '0',
                              top: '0',
                              zIndex: 1,
                              borderRight:
                                hover &&
                                hoverIndex === i &&
                                i < columns.length - 1
                                  ? '2px solid  #431d93'
                                  : '0',
                            }}
                            onMouseEnter={() => {
                              setHover(true);
                              setHoverIndex(i as any);
                            }}
                            onMouseLeave={() => {
                              setHover(false);
                              setHoverIndex(null);
                            }}
                            onMouseDown={(e) => {
                              if (i < columns.length - 1) mouseDown(i);
                            }}
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
                          key={index}
                        >
                          {columns.map(({ ref, text }, i) => (
                            <td
                              className={`${styles.tableTd} !p-4 bg-theme-surface-primary border-b border-theme-border-moderate`}
                              key={i}
                            >
                              <Truncate maxLines={1}>
                                {text.renderRow(headerRow)}
                              </Truncate>
                            </td>
                          ))}
                        </tr>

                        <tbody>
                          {renderAfterRow && renderAfterRow(headerRow)}
                        </tbody>
                      </tbody>
                    </>
                  ))}
                </table>
              </div>
            </div>
          </>
        )}
        renderWhenFalse={() => (
          <Box
            style={{
              textAlign: 'center',
              maxWidth: '700px',
              margin: '0 auto',
            }}
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
