import React from 'react';

import { translate } from '../translate';
import { CollapseTable } from '../../../common/CollapseTable';
import { useHistory, useLocationPath } from '../../../../hooks';
import { routePaths } from '../../../../../routes/routePaths';

import { useService } from './useService';
import { getHeaderCols } from './getHeaderCols';
import { RunsForStackTable } from './RunsForStackTable';
import { camelCaseToParagraph } from '../../../../../utils';
interface Props {
  filter: any;
}

export const List: React.FC<Props> = ({ filter }: Props) => {
  const locationPath = useLocationPath();
  const history = useHistory();
  const {
    openStackIds,
    setOpenStackIds,
    fetching,
    filteredStacks,
    setSelectedRunIds,
  } = useService(filter);

  const headerCols = getHeaderCols({ openStackIds, setOpenStackIds });

  const openDetailPage = (stackComponent: TStack) => {
    setSelectedRunIds([]);

    history.push(
      routePaths.stackComponents.configuration(
        locationPath.split('/')[2],
        stackComponent.id,
      ),
    );
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
                  locationPath.split('/')[2],
                )} has been configured yet`,
              }
        }
        trOnClick={openDetailPage}
      />
    </>
  );
};
