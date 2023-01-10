import React from 'react';

import { translate } from '../translate';
import { CollapseTable } from '../../../common/CollapseTable';
import { useHistory, useLocationPath, useSelector } from '../../../../hooks';
import { routePaths } from '../../../../../routes/routePaths';

import { useService } from './useService';
import { GetHeaderCols } from './getHeaderCols';
import { RunsForStackTable } from './RunsForStackTable';
import { camelCaseToParagraph } from '../../../../../utils';
// import { DEFAULT_PROJECT_NAME } from '../../../../../constants';
import {
  projectSelectors,
  stackComponentSelectors,
} from '../../../../../redux/selectors';

interface Props {
  filter: any;
}

export const List: React.FC<Props> = ({ filter }: Props) => {
  const locationPath = useLocationPath();
  const selectedProject = useSelector(projectSelectors.selectedProject);
  const stackComponentsPaginated = useSelector(
    stackComponentSelectors.mystackComponentsPaginated,
  );

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

  const openDetailPage = (stackComponent: TStack) => {
    setSelectedRunIds([]);

    history.push(
      routePaths.stackComponents.configuration(
        locationPath.split('/')[4],
        stackComponent.id,
        selectedProject,
      ),
    );
  };

  // const url_string = window.location.href;
  // const url = new URL(url_string);
  // const projectName = url.searchParams.get('project');
  // const project = projectName ? projectName : DEFAULT_PROJECT_NAME;

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
        paginated={stackComponentsPaginated}
        loading={fetching}
        showHeader={true}
        headerCols={headerCols}
        tableRows={filteredStacks}
        emptyState={
          filter[0]?.value
            ? {
                text: translate('emptyState.text'),
              }
            : {
                text: `Nothing to see here, it seems like no ${camelCaseToParagraph(
                  selectedProject,
                )} has been configured yet.`,
              }
        }
        trOnClick={openDetailPage}
      />
    </>
  );
};
