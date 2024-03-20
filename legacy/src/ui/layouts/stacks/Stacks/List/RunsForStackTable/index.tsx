import React from 'react';

import { Box, FlexBox, Paragraph } from '../../../../../components';
import { RunsTable } from '../../../RunsTable';
import { translate } from '../../translate';
import { useService } from './useService';
import styles from './NestedRow.module.scss';
import { useHistory, useSelector } from '../../../../../hooks';
import { routePaths } from '../../../../../../routes/routePaths';
import { workspaceSelectors } from '../../../../../../redux/selectors';
import { Stack } from '../../../../../../api/types';

export const RunsForStackTable: React.FC<{
  stack: Stack;
  openStackIds: TId[];
  fetching: boolean;
  nestedRow: boolean;
}> = ({ stack, openStackIds, fetching, nestedRow }) => {
  const { runIds, isStackOpen } = useService({
    stack,
    openStackIds,
  });

  if (!isStackOpen()) return null;
  if (nestedRow) {
    const nestedRowtiles: any[] = [];
    for (const [key, value] of Object.entries(
      stack.metadata?.components ?? {},
    )) {
      if (Array.isArray(value) && value.length > 0 && 'name' in value[0]) {
        nestedRowtiles.push({
          type: key,
          name: value[0].name,
          id: value[0].id,
        });
      }
    }

    return <NestedRow tiles={nestedRowtiles} />;
  }

  return (
    <Box marginBottom="md">
      <RunsTable
        fetching={fetching}
        emptyStateText={translate('runsEmptyState.text')}
        pagination={false}
        runIds={runIds}
      />
    </Box>
  );
};

interface tile {
  name: string;
  type: string;
  id: TId;
}
interface NestedRowProps {
  tiles: tile[];
}
function NestedRow({ tiles }: NestedRowProps) {
  const history = useHistory();
  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);

  return (
    <FlexBox.Row
      marginVertical="sm"
      marginHorizontal="md"
      className={styles.nestedrow}
      padding="md"
      alignItems="center"
    >
      {tiles &&
        tiles.map((tile: tile, index: number) => (
          <Box key={index} className={styles.tile} color="black">
            <Paragraph
              size="small"
              style={{ cursor: 'pointer' }}
              onClick={() => {
                history.push(
                  routePaths.stackComponents.configuration(
                    tile.type,
                    tile.id,
                    selectedWorkspace,
                  ),
                );
              }}
            >
              <span>
                {tile.type} {'>'}{' '}
              </span>{' '}
              <span className={styles.name}>{tile.name}</span>
            </Paragraph>
          </Box>
        ))}
    </FlexBox.Row>
  );
}
