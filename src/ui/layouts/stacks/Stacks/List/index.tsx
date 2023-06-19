import React, { useEffect, useState } from 'react';

import { translate } from '../translate';
import { CollapseTable } from '../../../common/CollapseTable';
import { useDispatch, useHistory, useSelector } from '../../../../hooks';
import { routePaths } from '../../../../../routes/routePaths';

import { useService } from './useService';
import { GetHeaderCols } from './getHeaderCols';
import { RunsForStackTable } from './RunsForStackTable';
import {
  workspaceSelectors,
  stackSelectors,
} from '../../../../../redux/selectors';
// import { callActionForStacksForPagination } from '../useService';
import { stacksActions } from '../../../../../redux/actions';
import { Pagination } from '../../../common/Pagination';
import { usePaginationAsQueryParam } from '../../../../hooks/usePaginationAsQueryParam';
import { Box, FlexBox, If } from '../../../../components';
import { ItemPerPage } from '../../../common/ItemPerPage';
import { callActionForStacksForPagination } from '../useService';

interface Props {
  filter: any;
  pagination?: boolean;
  id?: string;
  isExpended?: boolean;
  stackComponentId?: TId;
}
export const List: React.FC<Props> = ({
  filter,
  pagination = true,
  isExpended,
  id,
  stackComponentId,
}: Props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [
    fetchingForStacksFroComponents,
    setFetchingForStacksFroComponents,
  ] = useState(false);

  const ITEMS_PER_PAGE = parseInt(
    process.env.REACT_APP_ITEMS_PER_PAGE as string,
  );
  const DEFAULT_ITEMS_PER_PAGE = 10;
  const {
    openStackIds,
    setOpenStackIds,
    fetching,
    filteredStacks,
    setFilteredStacks,
    activeSorting,
    setActiveSorting,
    activeSortingDirection,
    setActiveSortingDirection,
    setSelectedRunIds,
  } = useService({ filter, isExpended, stackComponentId });
  const stacksPaginated = useSelector(stackSelectors.mystacksPaginated);
  const { pageIndex, setPageIndex } = usePaginationAsQueryParam();

  const [itemPerPage, setItemPerPage] = useState(
    ITEMS_PER_PAGE ? ITEMS_PER_PAGE : DEFAULT_ITEMS_PER_PAGE,
  );
  const initialRef: any = null;
  const childRef = React.useRef(initialRef);
  // useEffect(() => {
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [stackComponentId]);
  const { dispatchStackData } = callActionForStacksForPagination();
  const expendedRow = filteredStacks.filter((item) => item.id === id);
  const headerCols = GetHeaderCols({
    expendedRow,
    openStackIds,
    setOpenStackIds,
    filteredStacks,
    setFilteredStacks: setFilteredStacks,
    activeSorting,
    setActiveSorting,
    activeSortingDirection,
    setActiveSortingDirection,
  });
  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);

  const openDetailPage = (stack: TStack) => {
    setSelectedRunIds([]);
    if (id) {
      history.push(routePaths.stacks.list(selectedWorkspace));
    } else {
      history.push(routePaths.stack.configuration(stack.id, selectedWorkspace));
    }
  };

  const validFilters = filter?.filter((item: any) => item.value);
  const isValidFilterFroValue: any = filter?.map((f: any) => f.value).join('');
  const isValidFilterForCategory: any = filter
    ?.map((f: any) => f.value && f.type.value)
    .join('');
  const checkValidFilter = isValidFilterFroValue + isValidFilterForCategory;

  useEffect(() => {
    if (stackComponentId && !filter) {
      setFetchingForStacksFroComponents(true);
      dispatch(
        stacksActions.getMy({
          component_id: stackComponentId,
          sort_by: 'desc:created',
          logical_operator: 'and',
          page: 1,
          size: ITEMS_PER_PAGE ? ITEMS_PER_PAGE : DEFAULT_ITEMS_PER_PAGE,
          workspace: selectedWorkspace,
          onSuccess: () => setFetchingForStacksFroComponents(false),
          onFailure: () => setFetchingForStacksFroComponents(false),
        }),
      );
    } else {
      if (filter) {
        setPageIndex(0);
        if (stackComponentId) {
          dispatchStackData(
            1,
            itemPerPage,
            checkValidFilter.length ? (validFilters as any) : [],
            (activeSortingDirection?.toLowerCase() +
              ':' +
              activeSorting) as any,
            stackComponentId,
          );
        } else {
          dispatchStackData(
            1,
            itemPerPage,
            checkValidFilter.length ? (validFilters as any) : [],
            (activeSortingDirection?.toLowerCase() +
              ':' +
              activeSorting) as any,
          );
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    checkValidFilter,
    activeSortingDirection,
    activeSorting,
    stackComponentId,
  ]);
  const onChange = (pageNumber: any, size: any) => {
    if (stackComponentId) {
      dispatchStackData(
        pageNumber,
        size,
        checkValidFilter.length ? (validFilters as any) : [],
        (activeSortingDirection?.toLowerCase() + ':' + activeSorting) as any,
        stackComponentId,
      );
    } else {
      dispatchStackData(
        pageNumber,
        size,
        checkValidFilter.length ? (validFilters as any) : [],
        (activeSortingDirection?.toLowerCase() + ':' + activeSorting) as any,
      );
    }
  };

  return (
    <>
      <CollapseTable
        renderAfterRow={(stack: TStack) => (
          <>
            <RunsForStackTable
              nestedRow={true}
              stack={stack}
              openStackIds={openStackIds}
              fetching={fetching}
            />
          </>
        )}
        route={routePaths.stacks.createStack(selectedWorkspace)}
        activeSorting={
          activeSortingDirection?.toLowerCase() + ':' + activeSorting
        }
        pagination={pagination}
        paginated={stacksPaginated}
        loading={fetching || fetchingForStacksFroComponents}
        showHeader={true}
        filters={filter}
        headerCols={headerCols}
        tableRows={filteredStacks}
        emptyState={
          filter[0]?.value
            ? {
                text: translate('emptyState.text'),
              }
            : {
                text: `Nothing to see here, it seems like no stack has been configured yet.`,
              }
        }
        trOnClick={openDetailPage}
      />
      <If condition={stacksPaginated.totalitem > 5}>
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
              <If condition={!fetching && !fetchingForStacksFroComponents}>
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
                      pages={stacksPaginated?.totalPages}
                      totalOfPages={stacksPaginated?.totalPages}
                      totalLength={stacksPaginated?.length}
                      totalCount={stacksPaginated?.totalitem}
                    />

                    <If
                      condition={
                        filteredStacks.length > 0 &&
                        stacksPaginated?.totalitem > 1
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
    </>
  );
};
