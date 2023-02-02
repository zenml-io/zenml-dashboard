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

interface Props {
  filter: any;
  pagination?: boolean;
  id?: string;
  isExpended?: boolean;
  stackComponentId?: TId;
}
export const List: React.FC<Props> = ({
  filter,
  pagination,
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

  useEffect(() => {
    if (stackComponentId) {
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
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stackComponentId]);
  console.log(fetching, 'asdasdasd');
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

  // console.log(filter, 'filterfilterfilter');
  const openDetailPage = (stack: TStack) => {
    setSelectedRunIds([]);
    if (id) {
      history.push(routePaths.stacks.list(selectedWorkspace));
    } else {
      history.push(routePaths.stack.configuration(stack.id, selectedWorkspace));
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
  console.log(filter, 'filfilterter');
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
        activeSorting={
          activeSortingDirection?.toLowerCase() + ':' + activeSorting
        }
        // activeSorting={
        //   activeSorting !== 'created' && activeSortingDirection !== 'ASC'
        //     ? activeSorting
        //     : 'created'
        // }
        pagination={pagination}
        paginated={stacksPaginated}
        loading={
          expendedRow.length > 0
            ? false
            : filter[0].value || !stackComponentId
            ? fetching
            : fetchingForStacksFroComponents
        }
        showHeader={true}
        filters={filter}
        headerCols={headerCols}
        tableRows={expendedRow.length > 0 ? expendedRow : filteredStacks}
        emptyState={{ text: translate('emptyState.text') }}
        trOnClick={openDetailPage}
      />
    </>
  );
};
