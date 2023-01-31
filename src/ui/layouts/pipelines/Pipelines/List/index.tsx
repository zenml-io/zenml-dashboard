import React from 'react';

import { translate } from '../translate';
import { CollapseTable } from '../../../common/CollapseTable';
import { useHistory, useSelector } from '../../../../hooks';
import { routePaths } from '../../../../../routes/routePaths';

import { useService } from './useService';
import { GetHeaderCols } from './getHeaderCols';
import { RunsForPipelineTable } from './RunsForPipelineTable';
import {
  pipelineSelectors,
  workspaceSelectors,
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
  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);
  const pipelinesPaginated = useSelector(
    pipelineSelectors.myPipelinesPaginated,
  );
  const {
    openPipelineIds,
    setOpenPipelineIds,
    fetching,
    filteredPipelines,
    setFilteredPipelines,
    activeSorting,
    setActiveSorting,
    activeSortingDirection,
    setActiveSortingDirection,
    setSelectedRunIds,
  } = useService({ filter, isExpended });
  const expendedRow = filteredPipelines.filter((item) => item.id === id);

  const headerCols = GetHeaderCols({
    expendedRow,
    openPipelineIds,
    setOpenPipelineIds,
    filteredPipelines,
    setFilteredPipelines: setFilteredPipelines,
    activeSorting,
    setActiveSorting,
    activeSortingDirection,
    setActiveSortingDirection,
  });

  const openDetailPage = (pipeline: TPipeline) => {
    setSelectedRunIds([]);
    if (id) {
      history.push(routePaths.pipelines.list(selectedWorkspace));
    } else {
      history.push(
        routePaths.pipeline.configuration(pipeline.id, selectedWorkspace),
      );
    }
  };

  return (
    <>
      <CollapseTable
        renderAfterRow={(pipeline: TPipeline) => (
          <RunsForPipelineTable
            pipeline={pipeline}
            openPipelineIds={openPipelineIds}
            fetching={fetching}
            nestedRow={true}
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
        pagination={pagination}
        paginated={pipelinesPaginated}
        loading={expendedRow.length > 0 ? false : fetching}
        showHeader={true}
        filters={filter}
        headerCols={headerCols}
        tableRows={expendedRow.length > 0 ? expendedRow : filteredPipelines}
        emptyState={{ text: translate('emptyState.text') }}
        trOnClick={openDetailPage}
      />
    </>
  );
};
