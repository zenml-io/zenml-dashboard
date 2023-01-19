import React, { memo } from 'react';
import { Handle, Position } from 'react-flow-renderer';
import { Cached, Completed, Failed, Running } from './icons';

import styles from './index.module.scss';
import { NodeProps } from './types';

const StepNode = ({
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
      <div
        className={styles.stepBody}
        style={
          data.status === 'completed'
            ? { borderColor: '#4ade80' }
            : data.status === 'failed'
            ? { borderColor: '#FF5C93' }
            : data.status === 'running'
            ? { borderColor: '#22BBDD' }
            : data.status === 'cached'
            ? { borderColor: '#4ade80' }
            : { borderColor: '#000' }
        }
      >
        <div
          className={styles.stepIcon}
          style={
            data.status === 'completed'
              ? { background: '#4ade80' }
              : data.status === 'failed'
              ? { background: '#FF5C93' }
              : data.status === 'running'
              ? { background: '#22BBDD' }
              : data.status === 'cached'
              ? { background: '#4ade80' }
              : { background: '#000' }
          }
        >
          {data.status === 'running' ? (
            <Running />
          ) : data.status === 'completed' ? (
            <Completed />
          ) : data.status === 'cached' ? (
            <Cached />
          ) : (
            <Failed />
          )}
        </div>
        <div className={styles.stepText}>
          <p className={styles.stepTitle}>{data.name}</p>
        </div>
      </div>
      <Handle
        type="source"
        position={sourcePosition}
        className={styles.handle}
      />
    </>
  );
};

export default memo(StepNode);
