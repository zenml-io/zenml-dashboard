import React, { useEffect, useState } from 'react';
import { workspaceSelectors } from '../../../../redux/selectors';
import { routePaths } from '../../../../routes/routePaths';
import { useHistory, useSelector } from '../../../hooks';

import { Table } from '../../common/Table';

import { useHeaderCols } from './HeaderCols';
import { useService } from './useService';
import { FlexBox, If } from '../../../components';
import { Pagination } from '../../common/Pagination';
import { ItemPerPage } from '../../common/ItemPerPage';
import { usePaginationAsQueryParam } from '../../../hooks/usePaginationAsQueryParam';
import { callActionForStackRunsForPagination } from '../StackDetail/useService';
interface filterValue {
  label: string;
  type: string;
  value: string;
}
interface Props {
  filter: any;
}
export const RunsTable: React.FC<{
  isExpended?: boolean;
  stackId?: any;
  getSorted?: any;
  runIds: TId[];
  paginated?: any;
  pagination?: boolean;
  emptyStateText: string;
  fetching: boolean;
  filter?: any;
  id?: any;
}> = ({
  isExpended,
  stackId,
  getSorted,
  runIds,
  pagination = true,
  paginated,
  emptyStateText,
  fetching,
  filter,
  id,
}) => {
  const history = useHistory();

  const {
    sortedRuns,
    setSortedRuns,
    activeSorting,
    setActiveSorting,
    activeSortingDirection,
    setActiveSortingDirection,
    setSelectedRunIds,
  } = useService({ runIds, filter });
  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);
  const { dispatchStackRunsData } = callActionForStackRunsForPagination();
  const { pageIndex, setPageIndex } = usePaginationAsQueryParam();
  const ITEMS_PER_PAGE = parseInt(
    process.env.REACT_APP_ITEMS_PER_PAGE as string,
  );
  const DEFAULT_ITEMS_PER_PAGE = 10;
  const [itemPerPage, setItemPerPage] = useState(
    ITEMS_PER_PAGE ? ITEMS_PER_PAGE : DEFAULT_ITEMS_PER_PAGE,
  );
  const initialRef: any = null;
  const childRef = React.useRef(initialRef);
  const openDetailPage = (run: TRun) => {
    setSelectedRunIds([]);
    if (id) {
      history.push(routePaths.stack.runs(selectedWorkspace, stackId));
      // debugger;
    } else {
      history.push(
        routePaths.run.stack.statistics(
          selectedWorkspace,
          run.id,
          run.stack.id,
        ),
      );
    }
  };

  // const openDetailPage = (run: TRun) => {
  //   setSelectedRunIds([]);

  //   if (id) {
  //     history.push(
  //       routePaths.stackComponents.runs(
  //         locationPath.split('/')[4],
  //         stackComponentId,
  //         selectedProject,
  //       ),
  //     );
  //     // debugger;
  //   } else {
  //     history.push(
  //       routePaths.run.component.statistics(
  //         locationPath.split('/')[4],
  //         run.stackComponentId,
  //         run.id,
  //         selectedProject,
  //       ),
  //     );
  //   }
  // };

  const headerCols = useHeaderCols({
    isExpended,
    runs: sortedRuns,
    setRuns: setSortedRuns,
    activeSorting,
    setActiveSorting,
    activeSortingDirection,
    setActiveSortingDirection,
  });
  // useEffect(() => {
  //   getSorted(activeSorting, activeSortingDirection);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [getSorted]);
  const validFilters = filter?.filter((item: any) => item.value);
  const isValidFilterFroValue: any = filter?.map((f: any) => f.value).join('');
  const isValidFilterForCategory: any = filter
    ?.map((f: any) => f.value && f.type.value)
    .join('');
  const checkValidFilter = isValidFilterFroValue + isValidFilterForCategory;
  useEffect(() => {
    if (filter) {
      setPageIndex(0);
    }
    dispatchStackRunsData(
      stackId,
      1,
      itemPerPage,
      checkValidFilter.length ? (validFilters as any) : [],
      (activeSortingDirection?.toLowerCase() + ':' + activeSorting) as any,
    );
  }, [checkValidFilter, activeSortingDirection, activeSorting]);
  const onChange = (pageNumber: any, size: any) => {
    // debugger;
    dispatchStackRunsData(
      stackId,
      pageNumber,
      size,
      checkValidFilter.length ? (validFilters as any) : [],
      (activeSortingDirection?.toLowerCase() + ':' + activeSorting) as any,
    );
  };

  return (
    <>
      <Table
        activeSorting={
          activeSortingDirection?.toLowerCase() + ':' + activeSorting
        } // activeSorting={
        //   activeSorting !== 'created' && activeSortingDirection !== 'ASC'
        //     ? activeSorting
        //     : 'created'
        // }
        pagination={pagination}
        loading={fetching}
        filters={filter}
        showHeader={true}
        paginated={paginated}
        headerCols={headerCols}
        tableRows={sortedRuns}
        emptyState={{ text: emptyStateText }}
        trOnClick={openDetailPage}
      />
      <If condition={sortedRuns.length > 0}>
        {() => (
          <FlexBox
            marginTop="xxxl"
            marginBottom="xxxl"
            style={{ alignSelf: 'center' }}
            justifyContent="center"
          >
            <Pagination
              // isExpended={isExpended}
              ref={childRef}
              onChange={(pageNumber: any) => onChange(pageNumber, itemPerPage)}
              // getFetchedState={getFetchedState}
              activeSorting={activeSorting}
              filters={filter}
              itemPerPage={itemPerPage}
              pageIndex={pageIndex}
              setPageIndex={setPageIndex}
              pages={paginated?.totalPages}
              totalOfPages={paginated?.totalPages}
              totalLength={paginated?.length}
              totalCount={paginated?.totalitem}
            />

            <If condition={sortedRuns.length > 0 && paginated?.totalitem > 1}>
              {() => (
                <ItemPerPage
                  itemPerPage={itemPerPage}
                  onChangePagePerItem={(size: any) => {
                    setItemPerPage(size);
                    onChange(1, size);
                    setPageIndex(0);
                  }}
                ></ItemPerPage>
              )}
            </If>
          </FlexBox>
        )}
      </If>
    </>
  );
};
