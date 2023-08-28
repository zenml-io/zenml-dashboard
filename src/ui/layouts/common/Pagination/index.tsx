import React, { forwardRef } from 'react';
import { FlexBox, icons } from '../../../components';
import styles from './index.module.scss';
import { joinClassNames, addStyle } from '../../../../utils';
import { useLocation } from 'react-router-dom';

import { usePagination, DOTS } from '../../../hooks';

const PaginationNavigationItem = (props: {
  onClick: any;
  hasNext: boolean;
  icon: any;
  style?: any;
}) => (
  <div
    style={props.style}
    role="button"
    onClick={props.onClick}
    className={joinClassNames(
      styles.paginationNavigationItem,
      addStyle(!props.hasNext, styles.hidden),
    )}
  >
    <props.icon color="black" size="sml" />
  </div>
);

interface Props {
  activeSorting?: any;
  ref: any;
  pageIndex: number;
  onChange?: any;
  setPageIndex: (arg1: number) => void;
  pages: any;
  filters?: any[];
  totalOfPages: number;
  totalLength: number;
  totalCount: number;
  itemPerPage: number;
  isExpended?: boolean;
}

export const Pagination: React.FC<Props> = forwardRef((props, ref) => {
  const locationPath = useLocation();
  const componentName = locationPath.pathname.split('/')[3];

  const paginationRange = usePagination({
    currentPage: props.pageIndex + 1,
    totalCount: props.totalCount,
    siblingCount: 1,
    pageSize: props.itemPerPage,
  });

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(props.totalOfPages); i++) {
    pageNumbers.push(i);
  }

  return (
    <FlexBox.Column alignItems="center">
      <FlexBox>
        <PaginationNavigationItem
          hasNext={props.pageIndex !== 0}
          onClick={() => {
            props.onChange(
              1,
              props.itemPerPage,
              componentName,
              props.filters,
              props.activeSorting,
            );

            props.setPageIndex(0);
          }}
          icon={icons.paginationFirst}
        />
        <PaginationNavigationItem
          hasNext={props.pageIndex !== 0}
          onClick={() => {
            props.onChange(
              props.pageIndex,
              props.itemPerPage,
              componentName,
              props.filters,
              props.activeSorting,
            );

            props.setPageIndex(props.pageIndex - 1);
          }}
          icon={icons.paginationPrev}
        />

        <FlexBox>
          {paginationRange &&
            paginationRange.map((pageNumber: any) => {
              if (pageNumber === DOTS) {
                return (
                  <div className={joinClassNames(styles.paginationDots)}>
                    ...
                  </div>
                );
              }

              return (
                <li
                  className={joinClassNames(
                    styles.paginationNumbers,
                    addStyle(props.pageIndex === pageNumber - 1, styles.active),
                  )}
                  onClick={() => {
                    props.onChange(
                      pageNumber,
                      props.itemPerPage,
                      componentName,
                      props.filters,
                      props.activeSorting,
                    );

                    props.setPageIndex(pageNumber - 1);
                  }}
                >
                  <span
                    className={styles.paginationText}
                    style={{
                      color:
                        props.pageIndex === pageNumber - 1 ? '#fff' : '#333',
                    }}
                  >
                    {pageNumber}
                  </span>
                </li>
              );
            })}
        </FlexBox>
        <PaginationNavigationItem
          hasNext={props.pageIndex + 1 < props.totalOfPages}
          onClick={() => {
            props.onChange(
              props.pageIndex + 2,
              props.itemPerPage,
              componentName,
              props.filters,

              props.activeSorting,
            );
            props.setPageIndex(props.pageIndex + 1);
          }}
          icon={icons.paginationNext}
        />
        <PaginationNavigationItem
          hasNext={props.pageIndex + 1 < props.totalOfPages}
          onClick={() => {
            props.onChange(
              props.totalOfPages,
              props.itemPerPage,
              componentName,
              props.filters,
              props.activeSorting,
            );
            props.setPageIndex(props.totalOfPages - 1);
          }}
          icon={icons.paginationLast}
        />
      </FlexBox>
    </FlexBox.Column>
  );
});
