import React from 'react';

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
}: // isExpended = false,
Props) => {
  const locationPath = useLocationPath();
  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);
  const stackComponentsPaginated = useSelector(
    stackComponentSelectors.mystackComponentsPaginated,
  );

  // const [selectedComponentId, setSelectedComponentId] = useState('');

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
        activeSortingDirection={activeSortingDirection}
        activeSorting={
          activeSortingDirection?.toLowerCase() + ':' + activeSorting
        }
        // activeSorting={
        //   activeSorting !== 'created' && activeSortingDirection !== 'ASC'
        //     ? activeSorting
        //     : 'created'
        // }
        pagination={pagination}
        paginated={stackComponentsPaginated}
        loading={expendedRow.length > 0 ? false : fetching}
        showHeader={true}
        filters={filter}
        headerCols={headerCols}
        tableRows={expendedRow.length > 0 ? expendedRow : filteredStacks}
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
      {/* {isExpend ?  : <></>} */}
    </>
  );
};
