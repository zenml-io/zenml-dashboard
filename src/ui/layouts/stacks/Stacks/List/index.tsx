import React from 'react';

import { translate } from '../translate';
import { CollapseTable } from '../../../common/CollapseTable';
import { useHistory, useSelector } from '../../../../hooks';
import { routePaths } from '../../../../../routes/routePaths';

import { useService } from './useService';
import { GetHeaderCols } from './getHeaderCols';
import { RunsForStackTable } from './RunsForStackTable';
import {
  workspaceSelectors,
  stackSelectors,
} from '../../../../../redux/selectors';

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
  const stacksPaginated = useSelector(stackSelectors.mystacksPaginated);

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
        loading={expendedRow.length > 0 ? false : fetching}
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
