import React, { forwardRef, useImperativeHandle } from 'react';
import { FlexBox, icons } from '../../../components';
import styles from './index.module.scss';
import { joinClassNames, addStyle } from '../../../../utils';
import { useLocation } from 'react-router-dom';

import { usePagination, DOTS } from '../../../hooks';
import { callActionForFlavorsForPagination } from '../../stackComponents/RegisterComponents/useService';

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
  ref: any;
  pageIndex: number;
  setPageIndex: (arg1: number) => void;
  pages: any;
  totalOfPages: number;
  totalLength: number;
  totalCount: number;
  itemPerPage: number;
}

export const PaginationForFlavor: React.FC<Props> = forwardRef((props, ref) => {
  const { dispatchFlavorsData } = callActionForFlavorsForPagination();
  const locationPath = useLocation();
  const type = locationPath.pathname.split('/')[4];

  useImperativeHandle(ref, () => ({
    callOnChange(page: number, size: number) {
      props.setPageIndex(page - 1);
      onChange(page, size, type);
    },
  }));

  // eslint-disable-next-line react-hooks/exhaustive-deps

  const paginationRange = usePagination({
    currentPage: props.pageIndex + 1,
    totalCount: props.totalCount,
    siblingCount: 1,
    pageSize: props.itemPerPage,
  });
  const onChange = (page: any, size: number, type: string) => {
    dispatchFlavorsData(page, size, type);
  };

  return (
    <FlexBox.Column alignItems="center">
      <FlexBox>
        <PaginationNavigationItem
          hasNext={props.pageIndex !== 0}
          onClick={() => {
            onChange(1, props.itemPerPage, type);

            props.setPageIndex(0);
          }}
          icon={icons.paginationFirst}
        />
        <PaginationNavigationItem
          hasNext={props.pageIndex !== 0}
          onClick={() => {
            onChange(props.pageIndex, props.itemPerPage, type);

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
                    onChange(pageNumber, props.itemPerPage, type);

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
            onChange(props.pageIndex + 2, props.itemPerPage, type);
            props.setPageIndex(props.pageIndex + 1);
          }}
          icon={icons.paginationNext}
        />
        <PaginationNavigationItem
          hasNext={props.pageIndex + 1 < props.totalOfPages}
          onClick={() => {
            onChange(props.totalOfPages, props.itemPerPage, type);
            props.setPageIndex(props.totalOfPages - 1);
          }}
          icon={icons.paginationLast}
        />
      </FlexBox>
    </FlexBox.Column>
  );
});
