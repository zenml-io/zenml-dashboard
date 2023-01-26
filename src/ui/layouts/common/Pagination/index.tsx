import React, { forwardRef, useImperativeHandle } from 'react';
import { FlexBox, icons } from '../../../components';
import styles from './index.module.scss';
import { joinClassNames, addStyle } from '../../../../utils';
import { useLocation } from 'react-router-dom';
import { callActionForStacksForPagination } from '../../stacks/Stacks/useService';
import { callActionForStackComponentsForPagination } from '../../stackComponents/Stacks/useService';
import {
  callActionForAllrunsForPagination,
  callActionForPipelinesForPagination,
} from '../../pipelines/Pipelines/useService';
import { callActionForPipelineRunsForPagination } from '../../pipelines/PipelineDetail/useService';
import { callActionForStackRunsForPagination } from '../../stacks/StackDetail/useService';
import { callActionForStackComponentRunsForPagination } from '../../stackComponents/StackDetail/useService';
import { usePagination, DOTS, useDispatch } from '../../../hooks';
import { organizationActions } from '../../../../redux/actions';
// const PaginationItem = (props: {
//   isActive: boolean;
//   index: string;
//   onClick: any;
// }) => (
//   <div
//     tabIndex={props.isActive ? -1 : 0}
//     role="button"
//     onClick={props.onClick}
//     className={joinClassNames(
//       styles.paginationNumbers,
//       addStyle(props.isActive, styles.active),
//     )}
//   >
//     <span
//       className={styles.paginationText}
//       style={{ color: props.isActive ? '#fff' : '#333' }}
//     >
//       {props.index}
//     </span>
//   </div>
// );

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
  setPageIndex: (arg1: number) => void;
  pages: any;
  filters?: any[];
  totalOfPages: number;
  totalLength: number;
  totalCount: number;
  itemPerPage: number;
}

export const Pagination: React.FC<Props> = forwardRef((props, ref) => {
  const { dispatchStackData } = callActionForStacksForPagination();
  const {
    dispatchStackComponentsData,
  } = callActionForStackComponentsForPagination();
  const dispatch = useDispatch();
  const { dispatchPipelineData } = callActionForPipelinesForPagination();
  const { dispatchAllrunsData } = callActionForAllrunsForPagination();
  const { dispatchPipelineRunsData } = callActionForPipelineRunsForPagination();
  const { dispatchStackRunsData } = callActionForStackRunsForPagination();
  const {
    dispatchStackComponentRunsData,
  } = callActionForStackComponentRunsForPagination();
  const locationPath = useLocation();
  const componentName = locationPath.pathname.split('/')[3];
  const CheckIfRun =
    componentName === 'components'
      ? locationPath.pathname.split('/')[6]
      : locationPath.pathname.split('/')[5];
  const id =
    componentName === 'components'
      ? locationPath.pathname.split('/')[5]
      : locationPath.pathname.split('/')[4];
  // const isValidFilter = props.filters?.map((f) => f.value).join('');
  // const [fetchingMembers, setFetchingMembers] = useState(true);
  useImperativeHandle(ref, () => ({
    callOnChange(page: number, size: number, filters: any, activeSorting: any) {
      props.setPageIndex(page - 1);
      onChange(page, size, componentName, filters, activeSorting);
      // debugger;
    },
  }));

  // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [fetchingMembers]);

  const paginationRange = usePagination({
    currentPage: props.pageIndex + 1,
    totalCount: props.totalCount,
    siblingCount: 1,
    pageSize: props.itemPerPage,
  });
  console.log(paginationRange, 'paginationRange1');
  // if (
  //   props.pageIndex === 0 ||
  //   (paginationRange && paginationRange.length < 2)
  // ) {
  //   return null;
  // }
  const onChange = (
    page: any,
    size: number,
    componentName: string,
    filters: any,
    activeSorting: any,
  ) => {
    switch (componentName) {
      case 'stacks':
        if (CheckIfRun) {
          dispatchStackRunsData(id, page, size, filters as any, activeSorting);
          break;
        } else {
          dispatchStackData(page, size, filters as any, activeSorting);
          break;
        }
      case 'components':
        if (CheckIfRun) {
          dispatchStackComponentRunsData(
            id,
            page,
            size,
            filters as any,
            activeSorting,
          );
          break;
        } else {
          dispatchStackComponentsData(
            page,
            size,
            filters as any,
            activeSorting,
          );
          break;
        }
      case 'pipelines':
        if (CheckIfRun) {
          dispatchPipelineRunsData(
            id,
            page,
            size,
            filters as any,
            activeSorting,
          );
          break;
        } else {
          dispatchPipelineData(page, size, filters as any, activeSorting);
          break;
        }

      case 'all-runs':
        dispatchAllrunsData(page, size, filters as any);
        break;

      default:
        break;
    }

    if (locationPath.pathname.split('/')[2] === 'organization') {
      // debugger;
      // setFetchingMembers(true);
      dispatch(
        organizationActions.getMembers({
          page: page,
          size: size,
          sort_by: activeSorting,
          // onSuccess: () => setFetchingMembers(false),
          // onFailure: () => setFetchingMembers(false),
        }),
      );
    }
  };
  // console.log(itemPerPage, 'itemPerPage');
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(props.totalOfPages); i++) {
    pageNumbers.push(i);
  }
  //  function filterPages = (visiblePages, totalPages) => {
  //     return visiblePages.filter(page => page <= totalPages);
  //   };
  //   function getVisiblePages = (page, total) => {
  //     if (total < 7) {
  //       return filterPages([1, 2, 3, 4, 5, 6], total) as;
  //     } else {
  //       if (page % 5 >= 0 && page > 4 && page + 2 < total) {
  //         return [1, page - 1, page, page + 1, total];
  //       } else if (page % 5 >= 0 && page > 4 && page + 2 >= total) {
  //         return [1, total - 3, total - 2, total - 1, total];
  //       } else {
  //         return [1, 2, 3, 4, 5, total];
  //       }
  //     }
  //   };

  //   const visiblePages = getVisiblePages(page, this.props.pages);

  return (
    <FlexBox.Column alignItems="center">
      <FlexBox>
        <PaginationNavigationItem
          hasNext={props.pageIndex !== 0}
          onClick={() => {
            // switch (componentName) {
            //   case 'stacks':
            //     onChange(props.pageIndex, props.itemPerPage);
            //     break;

            //   default:
            //     break;
            // }

            onChange(
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
            onChange(
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
          {console.log(paginationRange, 'paginationRange')}
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
                    onChange(
                      pageNumber,
                      props.itemPerPage,
                      componentName,
                      props.filters,
                      props.activeSorting,
                    );

                    props.setPageIndex(pageNumber - 1);
                  }}
                >
                  {/* {pageNumber} */}
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

          {/* {pageNumbers.map((p: any) => (
            <Box key={p}>
              <PaginationItem
                onClick={() => {
                  onChange(p, props.itemPerPage, componentName, props.filters);

                  props.setPageIndex(p - 1);
                }}
                index={p}
                isActive={props.pageIndex === p - 1}
              />
            </Box>
          ))} */}
        </FlexBox>

        <PaginationNavigationItem
          hasNext={props.pageIndex + 1 < props.totalOfPages}
          onClick={() => {
            onChange(
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
            onChange(
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
