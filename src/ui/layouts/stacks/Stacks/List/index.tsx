import React from 'react';

import { translate } from '../translate';
import { CollapseTable } from '../../../common/CollapseTable';
import { useHistory } from '../../../../hooks';
import { routePaths } from '../../../../../routes/routePaths';

import { useService } from './useService';
import { getHeaderCols } from './getHeaderCols';
import { RunsForStackTable } from './RunsForStackTable';
// import { Box } from '../../../../components';

interface Props {
  filter: any;
}
export const List: React.FC<Props> = ({ filter }: Props) => {
  // export const List: React.FC = () => {
  const history = useHistory();
  const {
    openStackIds,
    setOpenStackIds,
    fetching,
    filteredStacks,
    setSelectedRunIds,
    // } = useService();
  } = useService(filter);

  const headerCols = getHeaderCols({ openStackIds, setOpenStackIds });

  const openDetailPage = (stack: TStack) => {
    setSelectedRunIds([]);

    history.push(routePaths.stack.configuration(stack.id));
  };
  console.log('testStack', filteredStacks);

  return (
    <>
      {/* <Box>a</Box> */}
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
