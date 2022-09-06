import React, { memo } from 'react';
import { Handle, Position } from 'react-flow-renderer';

import styles from './index.module.scss';
import { NodeProps } from './types';

const ArtifactNode = ({
  data,
  targetPosition = Position.Top,
  sourcePosition = Position.Bottom,
}: NodeProps) => {
  return (
    <>
      <Handle
        type="target"
        position={targetPosition}
        className={styles.handle}
      />
      <div className={styles.artifactBody}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#999"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="4" y1="9" x2="20" y2="9" />
          <line x1="4" y1="15" x2="20" y2="15" />
          <line x1="10" y1="3" x2="8" y2="21" />
          <line x1="16" y1="3" x2="14" y2="21" />
        </svg>
        {/* <p className={styles.artifactTitle}>
          Artifact: {data.data.execution_id}
        </p> */}
      </div>
      <Handle
        type="source"
        position={sourcePosition}
        className={styles.handle}
      />
    </>
  );
};

export default memo(ArtifactNode);
