import React from 'react';
import { Handle, Position } from 'react-flow-renderer';
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
        <div className={data.selected ? styles.stepBody : styles.stepBody}>
          <div className={styles.stepText}>
            <p className={styles.stepTitle}>{data.pipeline_parameter_name}</p>
          </div>
        </div>
        <Handle
          type="source"
          position={sourcePosition}
          className={styles.handle}
          isValidConnection={(connection) => connection.source === data.execution_id}
        />
      </div>
    </>
  );
};

export default StepNode;
