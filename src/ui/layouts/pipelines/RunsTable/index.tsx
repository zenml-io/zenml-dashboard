import React, { useEffect, useState } from 'react';
import { routePaths } from '../../../../routes/routePaths';
import { useHistory, useSelector } from '../../../hooks';

import { Table } from '../../common/Table';

import { useHeaderCols } from './HeaderCols';
import { useService } from './useService';
import { workspaceSelectors } from '../../../../redux/selectors';
import { Box, FlexBox, If } from '../../../components';
import { Pagination } from '../../common/Pagination';
import { usePaginationAsQueryParam } from '../../../hooks/usePaginationAsQueryParam';
import { ItemPerPage } from '../../common/ItemPerPage';
import { callActionForPipelineRunsForPagination } from '../PipelineDetail/useService';
import { callActionForAllrunsForPagination } from '../Pipelines/useService';

interface Props {
  filter: any;
}
export const RunsTable: React.FC<{
  isExpended?: boolean;
  pipelineId?: any;
  runIds: TId[];
  getSorted?: any;
  paginated?: any;
  pagination?: boolean;
  emptyStateText: string;
  fetching: boolean;
  pipelineRuns?: any;
  fromAllruns?: boolean;
  filter?: any;
  id?: any;
}> = ({
  isExpended,
  pipelineId,
  getSorted,
  runIds,
  pagination = true,
  emptyStateText,
  fetching,
  paginated,
  pipelineRuns,
  fromAllruns,
  filter,
  id,
}) => {
  const history = useHistory();
  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);
  const {
    sortedRuns,
    setSortedRuns,
    activeSorting,
    setActiveSorting,
    activeSortingDirection,
    setActiveSortingDirection,
    setSelectedRunIds,
  } = useService({ pipelineRuns, runIds, filter });
  const { pageIndex, setPageIndex } = usePaginationAsQueryParam();
  const { dispatchPipelineRunsData } = callActionForPipelineRunsForPagination();
  const { dispatchAllrunsData } = callActionForAllrunsForPagination();
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
    // debugger;
    if (fromAllruns) {
      // debugger;
      if (id) {
        history.push(routePaths.pipelines.allRuns(selectedWorkspace));
      } else {
        history.push(routePaths.run.run.statistics(selectedWorkspace, run.id));
      }
    } else {
      if (id) {
        history.push(routePaths.pipeline.runs(selectedWorkspace, pipelineId));
      } else {
        history.push(
          routePaths.run.pipeline.statistics(
            selectedWorkspace,
            run.id,
            run.pipeline_id ? run.pipeline_id : run.pipelineId,
          ),
        );
      }
    }
  };

  const headerCols = useHeaderCols({
    isExpended,
    runs: sortedRuns,
    setRuns: setSortedRuns,
    activeSorting,
    setActiveSorting,
    activeSortingDirection,
    setActiveSortingDirection,
    nestedRuns: pipelineRuns ? true : false,
  });

  useEffect(() => {
    if (getSorted) {
      getSorted(activeSorting, activeSortingDirection);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getSorted]);
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
    if (fromAllruns) {
      dispatchAllrunsData(
        1,
        itemPerPage,
        checkValidFilter.length ? (validFilters as any) : [],
        (activeSortingDirection?.toLowerCase() + ':' + activeSorting) as any,
      );
    } else {
      dispatchPipelineRunsData(
        pipelineId,
        1,
        itemPerPage,
        checkValidFilter.length ? (validFilters as any) : [],
        (activeSortingDirection?.toLowerCase() + ':' + activeSorting) as any,
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkValidFilter, activeSortingDirection, activeSorting]);
  const onChange = (pageNumber: any, size: any) => {
    // debugger;
    if (fromAllruns) {
      dispatchAllrunsData(
        pageNumber,
        size,
        checkValidFilter.length ? (validFilters as any) : [],
        (activeSortingDirection?.toLowerCase() + ':' + activeSorting) as any,
      );
    } else {
      dispatchPipelineRunsData(
        pipelineId,
        pageNumber,
        size,
        checkValidFilter.length ? (validFilters as any) : [],
        (activeSortingDirection?.toLowerCase() + ':' + activeSorting) as any,
      );
    }
  };

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
        paginated={paginated}
        showHeader={true}
        headerCols={headerCols}
        tableRows={sortedRuns}
        filters={filter}
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
