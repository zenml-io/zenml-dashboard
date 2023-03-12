import React, { useEffect, useState } from 'react';
import { routePaths } from '../../../../routes/routePaths';
import { useHistory, useLocationPath, useSelector } from '../../../hooks';

import { Table } from '../../common/Table';

import { useHeaderCols } from './HeaderCols';
import { useService } from './useService';
import { workspaceSelectors } from '../../../../redux/selectors';
import { Box, FlexBox, If } from '../../../components';
import { ItemPerPage } from '../../common/ItemPerPage';
import { Pagination } from '../../common/Pagination';
import { usePaginationAsQueryParam } from '../../../hooks/usePaginationAsQueryParam';
import { callActionForStackComponentRunsForPagination } from '../StackDetail/useService';

export const RunsTable: React.FC<{
  isExpended?: boolean;
  stackComponentId?: any;
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
  stackComponentId,
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
  const locationPath = useLocationPath();
  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);
  const { pageIndex, setPageIndex } = usePaginationAsQueryParam();
  const {
    dispatchStackComponentRunsData,
  } = callActionForStackComponentRunsForPagination();
  const ITEMS_PER_PAGE = parseInt(
    process.env.REACT_APP_ITEMS_PER_PAGE as string,
  );
  const DEFAULT_ITEMS_PER_PAGE = 10;
  const [itemPerPage, setItemPerPage] = useState(
    ITEMS_PER_PAGE ? ITEMS_PER_PAGE : DEFAULT_ITEMS_PER_PAGE,
  );
  const initialRef: any = null;
  const childRef = React.useRef(initialRef);
  const {
    sortedRuns,
    setSortedRuns,
    activeSorting,
    setActiveSorting,
    activeSortingDirection,
    setActiveSortingDirection,
    setSelectedRunIds,
  } = useService({ runIds, filter });
  const validFilters = filter?.filter((item: any) => item.value);
  const isValidFilterFroValue: any = filter?.map((f: any) => f.value).join('');
  const isValidFilterForCategory: any = filter
    ?.map((f: any) => f.value && f.type.value)
    .join('');
  const checkValidFilter = isValidFilterFroValue + isValidFilterForCategory;
  const openDetailPage = (run: TRun) => {
    setSelectedRunIds([]);

    if (id) {
      history.push(
        routePaths.stackComponents.runs(
          locationPath.split('/')[4],
          stackComponentId,
          selectedWorkspace,
        ),
      );
      // debugger;
    } else {
      history.push(
        routePaths.run.component.statistics(
          locationPath.split('/')[4],
          run.stackComponentId,
          run.id,
          selectedWorkspace,
        ),
      );
    }
  };

  // const openDetailPage = (stackComponent: TStack) => {
  //   setSelectedRunIds([]);

  //   if (id) {
  //     history.push(
  //       routePaths.stackComponents.base(
  //         locationPath.split('/')[4],
  //         selectedProject,
  //       ),
  //     );
  //   } else {
  //     history.push(
  //       routePaths.stackComponents.configuration(
  //         locationPath.split('/')[4],
  //         stackComponent.id,
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
  useEffect(() => {
    if (filter) {
      setPageIndex(0);
    }
    dispatchStackComponentRunsData(
      stackComponentId,
      1,
      itemPerPage,
      checkValidFilter.length ? (validFilters as any) : [],
      (activeSortingDirection?.toLowerCase() + ':' + activeSorting) as any,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkValidFilter, activeSortingDirection, activeSorting]);
  const onChange = (pageNumber: any, size: any) => {
    // debugger;
    dispatchStackComponentRunsData(
      stackComponentId,

      pageNumber,
      size,
      checkValidFilter.length ? (validFilters as any) : [],
      (activeSortingDirection?.toLowerCase() + ':' + activeSorting) as any,
    );
  };
  useEffect(() => {
    if (getSorted) {
      getSorted(activeSorting, activeSortingDirection);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getSorted]);
  return (
    <>
      <Table
        activeSorting={
          activeSortingDirection?.toLowerCase() + ':' + activeSorting
        }
        // activeSorting={
        //   activeSorting !== 'created' && activeSortingDirection !== 'ASC'
        //     ? activeSorting
        //     : 'created'
        // }
        pagination={pagination}
        loading={fetching}
        showHeader={true}
        filters={filter}
        paginated={paginated}
        headerCols={headerCols}
        tableRows={sortedRuns}
        emptyState={{ text: emptyStateText }}
        trOnClick={openDetailPage}
      />
      <FlexBox
        style={{
          position: 'fixed',
          right: '0',
          bottom: '0',
          height: '92px',
          width: '100%',
          justifyContent: 'center',
          backgroundColor: 'white',
        }}
      >
        <Box style={{ alignSelf: 'center' }}>
          <If condition={!fetching}>
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
                  onChange={(pageNumber: any) =>
                    onChange(pageNumber, itemPerPage)
                  }
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

                <If
                  condition={sortedRuns.length > 0 && paginated?.totalitem > 1}
                >
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
        </Box>
      </FlexBox>
    </>
  );
};
