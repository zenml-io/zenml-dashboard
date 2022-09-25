import React from 'react';
import styles from './NestedRow.module.scss';

import { Box, FlexBox, Paragraph, Separator, icons, ColoredCircle } from '../../../../../components';
import { iconColors, iconSizes } from '../../../../../../constants';
import { formatDateToDisplay } from '../../../../../../utils';
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
        id: pipeline.components[key].id,
        type: pipeline.components[key].type,
        is_shared: pipeline.components[key].is_shared,
        name: pipeline.components[key].name,
        username: pipeline.components[key].user_name,
        creation_date: pipeline.components[key].creation_date,
      });
    }

    return (
        <NestedRow tiles={nestedRowtiles} />
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
  id: string;  
  type: string;  
  is_shared: string;  
  name: string;
  username: string; 
  creation_date: Date; 
}
interface NestedRowProps {
  tiles: tile[];
}

function NestedRow({ tiles }: NestedRowProps) {
  return (
    <Box
      marginVertical="sm"
      marginHorizontal="md"
      className={styles.nestedrow}
      padding="md"
    > 
      {tiles &&
        tiles.map((tile: tile, index: number) => (
          <>
          <FlexBox.Row key={index} className={styles.tile} color="black" justifyContent="space-between">
           <Box>
            <Paragraph size="small">{tile.id}</Paragraph>
          </Box>
      
          <Box>
            <Paragraph size="small">{tile.type}</Paragraph>
          </Box>
            
          <Box>
            <FlexBox justifyContent='center' style={{ backgroundColor: tile.is_shared ? '#431D93' : '#FF5C93', borderRadius: '50%', height: '25px', width: '25px', paddingTop: '3px', textAlign: 'center' }}>
              {tile.is_shared ? <icons.check color={iconColors.white} size={iconSizes.sm} /> : <icons.close color={iconColors.white} size={iconSizes.sm} />} 
            </FlexBox>    
          </Box>
          
          <Box>
            <Paragraph size="small">{tile.name}</Paragraph>
          </Box>
            
          <Box>
            <FlexBox alignItems="center">
              <Box paddingRight="sm">
                <ColoredCircle color="secondary" size="sm">
                  {tile.username?.split(' ')?.map((name) => name[0])?.join('')?.substring(0, 2)?.toUpperCase()}
                </ColoredCircle>
              </Box>
              <Paragraph size="small">{tile.username}</Paragraph>
            </FlexBox>
          </Box>
            
          <Box>
            <Paragraph size="small">{formatDateToDisplay(tile.creation_date)}</Paragraph>
          </Box>
          </FlexBox.Row>
          <Box marginHorizontal="md">
            <Separator.LightNew />
          </Box> 
          </>
        ))}
    </Box>
  );
}
