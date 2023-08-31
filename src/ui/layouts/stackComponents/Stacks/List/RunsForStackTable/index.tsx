import React from 'react';

import {
  Box,
  // FlexBox,
  // Paragraph
} from '../../../../../components';
import { RunsTable } from '../../../RunsTable';
import { translate } from '../../translate';
import { useService } from './useService';
// import styles from './NestedRow.module.scss';
import { StackComponent } from '../../../../../../api/types';

export const RunsForStackTable: React.FC<{
  stack: StackComponent;
  openStackIds: TId[];
  fetching: boolean;
  nestedRow: boolean;
}> = ({ stack, openStackIds, fetching, nestedRow }) => {
  const { runIds, isStackOpen } = useService({
    stack,
    openStackIds,
  });

  if (!isStackOpen()) return null;
  // remove dead code later

  // if (nestedRow) {
  //   const nestedRowtiles: any[] = [];
  //   for (const [key, value] of Object.entries(stack?.components)) {
  //     if (Array.isArray(value) && value.length > 0 && 'name' in value[0]) {
  //       nestedRowtiles.push({
  //         type: key,
  //         name: value[0].name,
  //       });
  //     }
  //   }

  //   return (
  //     <>
  //       <NestedRow tiles={nestedRowtiles} />
  //     </>
  //   );
  // }

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
// remove dead code later
// function NestedRow({ tiles }: NestedRowProps) {
//   return (
//     <FlexBox.Row
//       marginVertical="sm"
//       marginHorizontal="md"
//       className={styles.nestedrow}
//       padding="md"
//       alignItems="center"
//     >
//       {tiles &&
//         tiles.map((tile: tile, index: number) => (
//           <Box key={index} className={styles.tile} color="black">
//             <Paragraph size="small">
//               <span>
//                 {tile.type} {'>'}{' '}
//               </span>{' '}
//               <span className={styles.name}>{tile.name}</span>
//             </Paragraph>
//           </Box>
//         ))}
//     </FlexBox.Row>
//   );
// }
