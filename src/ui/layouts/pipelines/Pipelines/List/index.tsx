import React from 'react';

import { translate } from '../translate';
import { CollapseTable } from '../../../common/CollapseTable';
import { useHistory } from '../../../../hooks';
import { routePaths } from '../../../../../routes/routePaths';

import { useService } from './useService';
import { getHeaderCols } from './getHeaderCols';
import { RunsForPipelineTable } from './RunsForPipelineTable';

interface Props {
  filter: any;
}
export const List: React.FC<Props> = ({ filter }: Props) => {
  const history = useHistory();
  const {
    openPipelineIds,
    setOpenPipelineIds,
    fetching,
    filteredPipelines,
    setSelectedRunIds,
  } = useService(filter);

  const headerCols = getHeaderCols({ openPipelineIds, setOpenPipelineIds });

  const openDetailPage = (pipeline: TPipeline) => {
    setSelectedRunIds([]);

    history.push(routePaths.pipeline.configuration(pipeline.id));
  };

  // debugger;
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
        loading={fetching}
        showHeader={true}
        headerCols={headerCols}
        tableRows={filteredPipelines}
        emptyState={{ text: translate('emptyState.text') }}
        trOnClick={openDetailPage}
      />
    </>
  );
};
