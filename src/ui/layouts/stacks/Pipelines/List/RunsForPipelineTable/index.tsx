import React from 'react';

import { Box, FlexBox, Paragraph } from '../../../../../components';
import { RunsTable } from '../../../RunsTable';
import { translate } from '../../translate';
import { useService } from './useService';
import styles from './NestedRow.module.scss';

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
  console.log('pipeline: ', pipeline);

  if (!isPipelineOpen()) return null;

  if (nestedRow) {
    const nestedRowtiles = [];

    for (const [key] of Object.entries(pipeline.components)) {
      nestedRowtiles.push({
        type: key,
        name: pipeline.components[key].name,
      });
    }

    // const nestedRowtiles = pipeline.components.map((c: any) => ({
    //   name: c.name,
    //   type: c.type,
    // }));
    /**
     * return nested rows each row should not exceed more than 4 tiles
     */
    return (
      <>
        <NestedRow tiles={nestedRowtiles} />
        {/* <NestedRow tiles={nestedRowtiles} />; */}
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
      // justifyContent="center"
    >
      {tiles &&
        tiles.map((tile: tile, index: number) => (
          <Box key={index} className={styles.tile} color="black">
            <Paragraph size="small">
              <span>
                {tile.name} {'>'}{' '}
              </span>{' '}
              <span className={styles.name}>{tile.type}</span>
            </Paragraph>
          </Box>
        ))}

      {/* <Box className={styles.tile} color="black">
        <Paragraph size="small">
          <span>artifact_store {'>'} </span>{' '}
          <span className={styles.name}>s3_aws</span>
        </Paragraph>
      </Box>
      <Box className={styles.tile} color="black">
        <Paragraph size="small">
          <span>secret_manager {'>'} </span>{' '}
          <span className={styles.name}>azure_key_vault</span>
        </Paragraph>
      </Box>
      <Box className={styles.tile} color="black">
        <Paragraph size="small">
          <span>experiment_tracker {'>'} </span>{' '}
          <span className={styles.name}>mlflow_prd</span>
        </Paragraph>
      </Box> */}
    </FlexBox.Row>
  );
}
