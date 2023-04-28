import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { repositoryActions } from '../../../../redux/actions/repositories';
import {
  repositoryPagesSelectors,
  repositorySelectors,
  workspaceSelectors,
} from '../../../../redux/selectors';
import BasePage from '../repository-layout';
import { routePaths } from '../../../../routes/routePaths';
// import { translate } from './translate';
import FilterComponent, {
  getInitialFilterStateForRepositories,
} from '../../../components/Filters';
import { Box, FlexBox, PrimaryButton } from '../../../components';
import { useHistory, useLocationPath } from '../../../hooks';
import RepositoryGrid from './repository-grid/grid';
import { Pagination } from '../../common/Pagination';
import { usePaginationAsQueryParam } from '../../../hooks/usePaginationAsQueryParam';
import { ItemPerPage } from '../../common/ItemPerPage';
import { useUpdateRepositoryPagination } from './service';
import { repositoryPagesActions } from '../../../../redux/actions';
import { FullWidthSpinner } from '../../../components';

const RepositoriyListBody = () => {
  const { dispatchRepositoryPagination } = useUpdateRepositoryPagination();
  const ITEMS_PER_PAGE = parseInt(
    process.env.REACT_APP_ITEMS_PER_PAGE as string,
  );
  const DEFAULT_ITEMS_PER_PAGE = 10;
  // TODO: Dev please note: getInitialFilterState is for stack inital filter value for any other component you need to modify it
  const [filters, setFilter] = useState([
    getInitialFilterStateForRepositories(),
  ]);
  const repoPagination = useSelector(
    repositorySelectors.getRepositoryPagination,
  );
  const history = useHistory();
  const dispatch = useDispatch();
  const { pageIndex, setPageIndex } = usePaginationAsQueryParam();
  const childRef = useRef();
  const [itemPerPage, setItemPerPage] = useState(
    ITEMS_PER_PAGE ? ITEMS_PER_PAGE : DEFAULT_ITEMS_PER_PAGE,
  );
  const repositories = useSelector(repositorySelectors.allRepositories);
  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);
  const isFetching = useSelector(repositoryPagesSelectors.fetching);

  useEffect(() => {
    dispatch(repositoryPagesActions.setFetching({ fetching: true }));
    dispatch(
      repositoryActions.getAll({
        page: 1,
        size: itemPerPage,
        workspace: selectedWorkspace,
        onSuccess: () =>
          dispatch(repositoryPagesActions.setFetching({ fetching: false })),
      }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedWorkspace, dispatch]);

  const filter = getFilter(filters);
  const validFilters = filter.filter((item: any) => item.value);
  const isValidFilterForValue: any = filter?.map((f: any) => f.value).join('');
  const isValidFilterForCategory: any = filter
    ?.map((f: any) => f.value && f.type.value)
    .join('');
  const checkValidFilter = isValidFilterForValue + isValidFilterForCategory;

  useEffect(() => {
    dispatchRepositoryPagination(
      1,
      itemPerPage,
      checkValidFilter.length > 0 ? validFilters : [],
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    checkValidFilter,
    itemPerPage,
    dispatchRepositoryPagination,
  ]);

  function updateData(pageNumber: number, pageSize: number) {
    dispatchRepositoryPagination(pageNumber, pageSize);
  }

  function getFilter(values: any) {
    const filterValuesMap = values.map((v: any) => {
      return {
        column: v.column.selectedValue,
        type: v.contains.selectedValue,
        value: v.filterValue,
      };
    });
    return filterValuesMap;
  }

  return (
    <Box style={{ marginTop: '-20px', width: '100%' }}>
      <FilterComponent
        getInitials={getInitialFilterStateForRepositories}
        filters={filters}
        setFilter={setFilter}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          {isFetching ? (
            <FullWidthSpinner color="black" size="md" />
          ) : (
            <>
              <RepositoryGrid repositories={repositories} />
              {repositories.length >= 1 && (
                <div
                  style={{
                    position: 'fixed',
                    right: '0',
                    bottom: '0',
                    height: '92px',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <div style={{ alignSelf: 'center' }}>
                    <div style={{ display: 'flex' }}>
                      <Pagination
                        // isExpended={isExpended}
                        ref={childRef}
                        onChange={(pageNumber: any) =>
                          updateData(pageNumber, itemPerPage)
                        }
                        // getFetchedState={getFetchedState}
                        itemPerPage={itemPerPage}
                        pageIndex={pageIndex}
                        setPageIndex={setPageIndex}
                        pages={repoPagination?.total_pages}
                        totalOfPages={repoPagination?.total_pages as any}
                        totalLength={repoPagination.max_size as any}
                        totalCount={repoPagination?.total as any}
                      />

                      <ItemPerPage
                        itemPerPage={itemPerPage}
                        onChangePagePerItem={(size: any) => {
                          setItemPerPage(size);
                          updateData(1, size);
                          setPageIndex(0);
                        }}
                      ></ItemPerPage>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </FilterComponent>
      <FlexBox
        style={{
          position: 'fixed',
          right: '0',
          bottom: '0',
          marginRight: '45px',
        }}
      >
        <Box marginBottom="lg">
          <PrimaryButton
            onClick={() => {
              history.push(routePaths.repositories.create(selectedWorkspace));
            }}
          >
            Create Repository
          </PrimaryButton>
        </Box>
      </FlexBox>
    </Box>
  );
};

function RepositoriesList() {
  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);
  const locationPath = useLocationPath();

  return (
    <BasePage
      tabPages={[
        {
          text: 'Repositories',
          Component: RepositoriyListBody,
          path: routePaths.repositories.list(
            selectedWorkspace ? selectedWorkspace : locationPath.split('/')[2],
          ),
        },
      ]}
      tabBasePath={routePaths.repositories.list(selectedWorkspace)}
      breadcrumbs={[]}
      title="Repositories"
      headerWithButtons
      renderHeaderRight={() => <></>}
    />
  );
}

export default RepositoriesList;
