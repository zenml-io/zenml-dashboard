import React, { useEffect, useState } from 'react';

import { CollapseTable } from '../../../common/CollapseTable';
import { useHistory, useSelector } from '../../../../hooks';
import { routePaths } from '../../../../../routes/routePaths';

import { useService } from './useService';
import { GetHeaderCols } from './getHeaderCols';

import {
  workspaceSelectors,
  connectorSelectors,
} from '../../../../../redux/selectors';

import { Pagination } from '../../../common/Pagination';
import { usePaginationAsQueryParam } from '../../../../hooks/usePaginationAsQueryParam';
import { Box, FlexBox, If, PrimaryButton } from '../../../../components';
import { ItemPerPage } from '../../../common/ItemPerPage';
import { callActionForConnectorComponentForPagination } from '../../Connectors/useService';

interface Props {
  filter: any;
  pagination?: boolean;
  id?: string;
  isExpended?: boolean;
}
export const ConnectorComponents: React.FC<Props> = ({
  filter,
  pagination = true,
  isExpended,
  id,
}: Props) => {
  const connectorDetail = useSelector(
    connectorSelectors.connectorForId(id as any),
  );

  const history = useHistory();

  const ITEMS_PER_PAGE = parseInt(
    process.env.REACT_APP_ITEMS_PER_PAGE as string,
  );
  const DEFAULT_ITEMS_PER_PAGE = 10;
  const {
    openConnectorIds,
    setOpenConnectorIds,
    fetching,
    filteredConnectors,
    setFilteredConnectors,
    activeSorting,
    setActiveSorting,
    activeSortingDirection,
    setActiveSortingDirection,
  } = useService({ filter, isExpended, connectorDetail });
  const connectorsPaginated = useSelector(
    connectorSelectors.myConnectorsPaginated,
  );
  const { pageIndex, setPageIndex } = usePaginationAsQueryParam();

  const [itemPerPage, setItemPerPage] = useState(
    ITEMS_PER_PAGE ? ITEMS_PER_PAGE : DEFAULT_ITEMS_PER_PAGE,
  );
  const initialRef: any = null;
  const childRef = React.useRef(initialRef);

  const {
    dispatchConnectorComponentsData,
  } = callActionForConnectorComponentForPagination();
  const expendedRow = filteredConnectors.filter((item: any) => item.id === id);

  const headerCols = GetHeaderCols({
    connectorDetail,
    expendedRow,
    openConnectorIds,
    setOpenConnectorIds,
    filteredConnectors,
    setFilteredConnectors: setFilteredConnectors,
    activeSorting,
    setActiveSorting,
    activeSortingDirection,
    setActiveSortingDirection,
  });
  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);

  const openDetailPage = (connector: any) => {};

  const validFilters = filter?.filter((item: any) => item.value);
  const isValidFilterFroValue: any = filter?.map((f: any) => f.value).join('');
  const isValidFilterForCategory: any = filter
    ?.map((f: any) => f.value && f.type.value)
    .join('');
  const checkValidFilter = isValidFilterFroValue + isValidFilterForCategory;

  useEffect(() => {
    if (filter) {
      setPageIndex(0);

      dispatchConnectorComponentsData(
        1,
        itemPerPage,
        checkValidFilter.length ? (validFilters as any) : [],
        (activeSortingDirection?.toLowerCase() + ':' + activeSorting) as any,
        id,
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkValidFilter, activeSortingDirection, activeSorting]);
  const onChange = (pageNumber: any, size: any) => {
    dispatchConnectorComponentsData(
      pageNumber,
      size,
      checkValidFilter.length ? (validFilters as any) : [],
      (activeSortingDirection?.toLowerCase() + ':' + activeSorting) as any,
      id,
    );
  };

  return (
    <Box
      style={{
        overflowX: 'auto',
        marginBottom: connectorsPaginated.totalitem > 5 ? '90px' : '0px',
      }}
    >
      <CollapseTable
        renderAfterRow={(connector: any) => <></>}
        activeSorting={
          activeSortingDirection?.toLowerCase() + ':' + activeSorting
        }
        pagination={pagination}
        paginated={connectorsPaginated}
        loading={fetching}
        showHeader={true}
        filters={filter}
        headerCols={headerCols}
        tableRows={filteredConnectors}
        emptyState={{ text: 'No components' }}
        trOnClick={openDetailPage}
      />
      <If condition={connectorsPaginated.totalitem > 5}>
        {() => (
          <FlexBox
            style={{
              position: 'fixed',
              right: '0',
              bottom: '0',
              height: '92px',
              width: '100%',
              justifyContent: 'center',
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
                      ref={childRef}
                      onChange={(pageNumber: any) =>
                        onChange(pageNumber, itemPerPage)
                      }
                      activeSorting={activeSorting}
                      filters={filter}
                      itemPerPage={itemPerPage}
                      pageIndex={pageIndex}
                      setPageIndex={setPageIndex}
                      pages={connectorsPaginated?.totalPages}
                      totalOfPages={connectorsPaginated?.totalPages}
                      totalLength={connectorsPaginated?.length}
                      totalCount={connectorsPaginated?.totalitem}
                    />

                    <If
                      condition={
                        filteredConnectors.length > 0 &&
                        connectorsPaginated?.totalitem > 1
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
            onClick={() =>
              history.push(
                routePaths.connectors.connectorTypes(selectedWorkspace),
              )
            }
          >
            Register Connector
          </PrimaryButton>
        </Box>
      </FlexBox>
    </Box>
  );
};
