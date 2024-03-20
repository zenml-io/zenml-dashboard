import React from 'react';
import { Handle, Position } from 'react-flow-renderer';
import { Cached, Completed, Failed, Running } from './icons';

import styles from './index.module.scss';
import { NodeProps } from 'react-flow-renderer';

const StepNode = ({
  data,
  targetPosition = Position.Top,
  sourcePosition = Position.Bottom,
}: NodeProps) => {
  return (
    <>
      <div className={styles.stepMainContainer} style={{ borderRadius: 10 }}>
        <Handle
          type="target"
          position={targetPosition}
          className={styles.handle}
        />
        <div
          className={`${
            data.selected ? styles.stepBodySelected : styles.stepBody
          }`}
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
                ? { background: 'rgba(55,196,168,0.1)' }
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
          isValidConnection={(connection) =>
            connection.source === data.execution_id
          }
        />
      </div>
    </>
  );
};

export default StepNode;
