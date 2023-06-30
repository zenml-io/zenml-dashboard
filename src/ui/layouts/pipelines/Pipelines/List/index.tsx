import React, { useEffect, useState } from 'react';

import { translate } from '../translate';
import { CollapseTable } from '../../../common/CollapseTable';
import { useHistory, useSelector } from '../../../../hooks';
import { routePaths } from '../../../../../routes/routePaths';

import { useService } from './useService';
import { GetHeaderCols } from './getHeaderCols';
import { RunsForPipelineTable } from './RunsForPipelineTable';
import {
  pipelineSelectors,
  workspaceSelectors,
} from '../../../../../redux/selectors';
import { Box, FlexBox, If } from '../../../../components';

import { ItemPerPage } from '../../../common/ItemPerPage';
import { usePaginationAsQueryParam } from '../../../../hooks/usePaginationAsQueryParam';
import { callActionForPipelinesForPagination } from '../useService';
import { Pagination } from '../../../common/Pagination';

interface Props {
  filter: any;
  pagination?: boolean;
  id?: string;
  isExpended?: boolean;
}
export const List: React.FC<Props> = ({
  filter,
  pagination,
  isExpended,
  id,
}: Props) => {
  const history = useHistory();
  const { dispatchPipelineData } = callActionForPipelinesForPagination();
  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);
  const pipelinesPaginated = useSelector(
    pipelineSelectors.myPipelinesPaginated,
  );
  const {
    openPipelineIds,
    setOpenPipelineIds,
    fetching,
    filteredPipelines,
    setFilteredPipelines,
    activeSorting,
    setActiveSorting,
    activeSortingDirection,
    setActiveSortingDirection,
    setSelectedRunIds,
  } = useService({ filter, isExpended });
  const ITEMS_PER_PAGE = parseInt(
    process.env.REACT_APP_ITEMS_PER_PAGE as string,
  );
  const DEFAULT_ITEMS_PER_PAGE = 10;

  const { pageIndex, setPageIndex } = usePaginationAsQueryParam();

  const [itemPerPage, setItemPerPage] = useState(
    ITEMS_PER_PAGE ? ITEMS_PER_PAGE : DEFAULT_ITEMS_PER_PAGE,
  );
  const initialRef: any = null;
  const childRef = React.useRef(initialRef);
  const expendedRow = filteredPipelines.filter((item) => item.id === id);

  const headerCols = GetHeaderCols({
    expendedRow,
    openPipelineIds,
    setOpenPipelineIds,
    filteredPipelines,
    setFilteredPipelines: setFilteredPipelines,
    activeSorting,
    setActiveSorting,
    activeSortingDirection,
    setActiveSortingDirection,
  });

  const openDetailPage = (pipeline: TPipeline) => {
    setSelectedRunIds([]);
    if (id) {
      history.push(routePaths.pipelines.list(selectedWorkspace));
    } else {
      history.push(routePaths.pipeline.runs(selectedWorkspace, pipeline.id));
    }
  };
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
    dispatchPipelineData(
      1,
      itemPerPage,
      checkValidFilter.length ? (validFilters as any) : [],
      (activeSortingDirection?.toLowerCase() + ':' + activeSorting) as any,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkValidFilter, activeSortingDirection, activeSorting]);
  const onChange = (pageNumber: any, size: any) => {
    // debugger;
    dispatchPipelineData(
      pageNumber,
      size,
      checkValidFilter.length ? (validFilters as any) : [],
      (activeSortingDirection?.toLowerCase() + ':' + activeSorting) as any,
    );
  };

  return (
    <Box
      style={{
        overflowX: 'auto',
        marginBottom: pipelinesPaginated.totalitem > 5 ? '90px' : '0px',
      }}
    >
      <CollapseTable
        renderAfterRow={(pipeline: TPipeline) => (
          <RunsForPipelineTable
            pipeline={pipeline}
            openPipelineIds={openPipelineIds}
            fetching={fetching}
            nestedRow={true}
          />
        )}
        activeSorting={
          activeSortingDirection?.toLowerCase() + ':' + activeSorting
        }
        // activeSorting={
        //   activeSorting !== 'created' && activeSortingDirection !== 'ASC'
        //     ? activeSorting
        //     : 'created'
        // }
        pagination={pagination}
        paginated={pipelinesPaginated}
        loading={fetching}
        showHeader={true}
        filters={filter}
        headerCols={headerCols}
        tableRows={filteredPipelines}
        emptyState={
          filter[0]?.value
            ? {
                text: translate('emptyState.text'),
              }
            : {
                text: `Nothing to see here, it seems like no pipeline has been configured yet.`,
              }
        }
        trOnClick={openDetailPage}
      />

      <If condition={pipelinesPaginated.totalitem > 5}>
        {() => (
          <FlexBox
            style={{
              position: 'fixed',
              right: '0',
              bottom: '0',
              height: '92px',
              width: '100%',
              justifyContent: 'center',
              backgroundColor: 'white',
              // marginRight: '45px',
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
                      pages={pipelinesPaginated?.totalPages}
                      totalOfPages={pipelinesPaginated?.totalPages}
                      totalLength={pipelinesPaginated?.length}
                      totalCount={pipelinesPaginated?.totalitem}
                    />

                    <If
                      condition={
                        filteredPipelines.length > 0 &&
                        pipelinesPaginated?.totalitem > 1
                      }
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
        )}
      </If>
    </Box>
  );
};
