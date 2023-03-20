import React, { useEffect, useState } from 'react';

import { translate } from '../translate';
import { CollapseTable } from '../../../common/CollapseTable';
import { useHistory, useLocationPath, useSelector } from '../../../../hooks';
import { routePaths } from '../../../../../routes/routePaths';

import { useService } from './useService';
import { GetHeaderCols } from './getHeaderCols';
import { RunsForStackTable } from './RunsForStackTable';
import { camelCaseToParagraph } from '../../../../../utils';
// import { DEFAULT_WORKSPACE_NAME } from '../../../../../constants';
import {
  workspaceSelectors,
  stackComponentSelectors,
} from '../../../../../redux/selectors';
import { Box, FlexBox, If } from '../../../../components';
import { Pagination } from '../../../common/Pagination';
import { ItemPerPage } from '../../../common/ItemPerPage';
// import { callActionForStackComponentRunsForPagination } from '../../StackDetail/useService';
import { usePaginationAsQueryParam } from '../../../../hooks/usePaginationAsQueryParam';
import { callActionForStackComponentsForPagination } from '../useService';

interface Props {
  filter: any;
  pagination?: boolean;
  id?: string;
  isExpended?: boolean;
}

export const List: React.FC<Props> = ({
  filter,
  pagination,
  isExpended = false,
  id,
}: // isExpended = false,
Props) => {
  const locationPath = useLocationPath();
  const componentId = locationPath.split('/')[4];
  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);
  const stackComponentsPaginated = useSelector(
    stackComponentSelectors.mystackComponentsPaginated,
  );
  const { pageIndex, setPageIndex } = usePaginationAsQueryParam();
  const {
    dispatchStackComponentsData,
  } = callActionForStackComponentsForPagination();

  // const [selectedComponentId, setSelectedComponentId] = useState('');
  const ITEMS_PER_PAGE = parseInt(
    process.env.REACT_APP_ITEMS_PER_PAGE as string,
  );
  const DEFAULT_ITEMS_PER_PAGE = 10;
  const history = useHistory();
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
  } = useService({ filter, isExpended });
  const [itemPerPage, setItemPerPage] = useState(
    ITEMS_PER_PAGE ? ITEMS_PER_PAGE : DEFAULT_ITEMS_PER_PAGE,
  );
  const initialRef: any = null;
  const childRef = React.useRef(initialRef);
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

  const openDetailPage = (stackComponent: TStack) => {
    setSelectedRunIds([]);
    // debugger;
    if (id) {
      history.push(
        routePaths.stackComponents.base(
          locationPath.split('/')[4],
          selectedWorkspace,
        ),
      );
    } else {
      history.push(
        routePaths.stackComponents.configuration(
          locationPath.split('/')[4],
          stackComponent.id,
          selectedWorkspace,
        ),
      );
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
    dispatchStackComponentsData(
      1,
      itemPerPage,
      checkValidFilter.length ? (validFilters as any) : [],
      (activeSortingDirection?.toLowerCase() + ':' + activeSorting) as any,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkValidFilter, activeSortingDirection, activeSorting, componentId]);
  const onChange = (pageNumber: any, size: any) => {
    // debugger;
    dispatchStackComponentsData(
      pageNumber,
      size,
      checkValidFilter.length ? (validFilters as any) : [],
      (activeSortingDirection?.toLowerCase() + ':' + activeSorting) as any,
    );
  };

  return (
    <>
      <CollapseTable
        renderAfterRow={(stack: TStack) => (
          <RunsForStackTable
            nestedRow={true}
            stack={stack}
            openStackIds={openStackIds}
            fetching={fetching}
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
        isExpended={isExpended}
        pagination={pagination}
        paginated={stackComponentsPaginated}
        loading={fetching}
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
                text: `Nothing to see here, it seems like no ${camelCaseToParagraph(
                  locationPath.split('/')[4],
                )} has been configured yet.`,
              }
        }
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
          backgroundColor: 'white ',
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
                  pages={stackComponentsPaginated?.totalPages}
                  totalOfPages={stackComponentsPaginated?.totalPages}
                  totalLength={stackComponentsPaginated?.length}
                  totalCount={stackComponentsPaginated?.totalitem}
                />

                <If
                  condition={
                    filteredStacks.length > 0 &&
                    stackComponentsPaginated?.totalitem > 1
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
    </>
  );
};
