import React, { useEffect, useState } from 'react';

import { translate } from '../translate';
import { CollapseTable } from '../../../common/CollapseTable';
import { useHistory, useSelector } from '../../../../hooks';
import { routePaths } from '../../../../../routes/routePaths';

import { useService } from './useService';
import { GetHeaderCols } from './getHeaderCols';

import {
  workspaceSelectors,
  secretSelectors,
} from '../../../../../redux/selectors';

import { Pagination } from '../../../common/Pagination';
import { usePaginationAsQueryParam } from '../../../../hooks/usePaginationAsQueryParam';
import { Box, FlexBox, If, PrimaryButton } from '../../../../components';
import { ItemPerPage } from '../../../common/ItemPerPage';
import { callActionForSecretsForPagination } from '../useService';

interface Props {
  filter: any;
  pagination?: boolean;
  id?: string;
  isExpended?: boolean;
}
export const List: React.FC<Props> = ({
  filter,
  pagination = true,
  isExpended,
  id,
}: Props) => {
  const history = useHistory();

  const ITEMS_PER_PAGE = parseInt(
    process.env.REACT_APP_ITEMS_PER_PAGE as string,
  );
  const DEFAULT_ITEMS_PER_PAGE = 10;
  const {
    openSecretIds,
    setOpenSecretIds,
    fetching,
    filteredSecrets,
    setFilteredSecrets,
    activeSorting,
    setActiveSorting,
    activeSortingDirection,
    setActiveSortingDirection,
    setSelectedRunIds,
  } = useService({ filter, isExpended });
  const secretsPaginated = useSelector(secretSelectors.mySecretsPaginated);
  const { pageIndex, setPageIndex } = usePaginationAsQueryParam();

  const [itemPerPage, setItemPerPage] = useState(
    ITEMS_PER_PAGE ? ITEMS_PER_PAGE : DEFAULT_ITEMS_PER_PAGE,
  );
  const initialRef: any = null;
  const childRef = React.useRef(initialRef);

  const { dispatchSecretData } = callActionForSecretsForPagination();
  const expendedRow = filteredSecrets.filter((item: any) => item.id === id);
  const headerCols = GetHeaderCols({
    expendedRow,
    openSecretIds,
    setOpenSecretIds,
    filteredSecrets,
    setFilteredSecrets: setFilteredSecrets,
    activeSorting,
    setActiveSorting,
    activeSortingDirection,
    setActiveSortingDirection,
  });
  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);

  const openDetailPage = (secret: any) => {
    setSelectedRunIds([]);
    if (id) {
      history.push(routePaths.secrets.list(selectedWorkspace));
    } else {
      history.push(
        routePaths.secret.configuration(secret.id, selectedWorkspace),
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

      dispatchSecretData(
        1,
        itemPerPage,
        checkValidFilter.length ? (validFilters as any) : [],
        (activeSortingDirection?.toLowerCase() + ':' + activeSorting) as any,
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkValidFilter, activeSortingDirection, activeSorting]);
  const onChange = (pageNumber: any, size: any) => {
    dispatchSecretData(
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
        marginBottom: secretsPaginated.totalitem > 5 ? '90px' : '0px',
      }}
    >
      <CollapseTable
        route={routePaths.secrets.registerSecrets(selectedWorkspace)}
        renderAfterRow={(secret: any) => <></>}
        activeSorting={
          activeSortingDirection?.toLowerCase() + ':' + activeSorting
        }
        pagination={pagination}
        paginated={secretsPaginated}
        loading={fetching}
        showHeader={true}
        filters={filter}
        headerCols={headerCols}
        tableRows={filteredSecrets}
        emptyState={
          filter[0]?.value
            ? {
                text: translate('emptyState.text'),
              }
            : {
                text: `Nothing to see here, it seems like no secret has been configured yet.`,
              }
        }
        trOnClick={openDetailPage}
      />
      <If condition={secretsPaginated.totalitem > 5}>
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
                      pages={secretsPaginated?.totalPages}
                      totalOfPages={secretsPaginated?.totalPages}
                      totalLength={secretsPaginated?.length}
                      totalCount={secretsPaginated?.totalitem}
                    />

                    <If
                      condition={
                        filteredSecrets.length > 0 &&
                        secretsPaginated?.totalitem > 1
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
                routePaths.secrets.registerSecrets(selectedWorkspace),
              )
            }
          >
            Register Secret
          </PrimaryButton>
        </Box>
      </FlexBox>
    </Box>
  );
};
