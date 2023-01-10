import React from 'react';

import { translate } from '../translate';
import { CollapseTable } from '../../../common/CollapseTable';
import { useHistory, useSelector } from '../../../../hooks';
import { routePaths } from '../../../../../routes/routePaths';

import { useService } from './useService';
import { GetHeaderCols } from './getHeaderCols';
import { RunsForStackTable } from './RunsForStackTable';
import {
  projectSelectors,
  stackSelectors,
} from '../../../../../redux/selectors';

interface Props {
  filter: any;
}
export const List: React.FC<Props> = ({ filter }: Props) => {
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
  } = useService(filter);

  const headerCols = GetHeaderCols({
    openStackIds,
    setOpenStackIds,
    filteredStacks,
    setFilteredStacks: setFilteredStacks,
    activeSorting,
    setActiveSorting,
    activeSortingDirection,
    setActiveSortingDirection,
  });
  const selectedProject = useSelector(projectSelectors.selectedProject);
  const stacksPaginated = useSelector(stackSelectors.mystacksPaginated);
  const openDetailPage = (stack: TStack) => {
    setSelectedRunIds([]);

    history.push(routePaths.stack.configuration(stack.id, selectedProject));
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
        paginated={stacksPaginated}
        loading={fetching}
        showHeader={true}
        headerCols={headerCols}
        tableRows={filteredStacks}
        emptyState={{ text: translate('emptyState.text') }}
        trOnClick={openDetailPage}
      />
    </>
  );
};
