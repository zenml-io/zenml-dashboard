import React from 'react';
import styles from './NestedRow.module.scss';

import { Box, FlexBox, Paragraph } from '../../../../../components';
import { RunsTable } from '../../../RunsTable';
import { translate } from '../../translate';
import { useService } from './useService';

export const RunsForPipelineTable: React.FC<{
  pipeline: TPipeline;
  openPipelineIds: TId[];
  fetching: boolean;
  nestedRow: boolean;
}> = ({ pipeline, openPipelineIds, fetching, nestedRow }) => {
  const { runIds, isPipelineOpen } = useService({
    pipeline,
    openPipelineIds,
  });

  if (!isPipelineOpen()) return null;
  if (nestedRow) {
    const nestedRowtiles = [];
    for (const [key] of Object.entries(pipeline.components)) {
      nestedRowtiles.push({
        type: key,
        name: pipeline.components[key].name,
      });
    }
    return (
      <>
        <NestedRow tiles={nestedRowtiles} />
      </>
    );
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
}
interface NestedRowProps {
  tiles: tile[];
}
function NestedRow({ tiles }: NestedRowProps) {
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
            <Paragraph size="small">
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
