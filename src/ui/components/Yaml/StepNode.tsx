import React from 'react';
import { Handle, Position } from 'react-flow-renderer';
import { Cached, Completed, Export, Failed, Folder, Lock, Running } from './icons';

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
          className={data.selected ? styles.stepBody : styles.stepBody}
          // style={
          //   data.status === 'completed'
          //     ? { borderColor: '#4ade80' }
          //     : data.status === 'failed'
          //       ? { borderColor: '#FF5C93' }
          //       : data.status === 'running'
          //         ? { borderColor: '#22BBDD' }
          //         : data.status === 'cached'
          //           ? { borderColor: '#4ade80' }
          //           : { borderColor: '#000' }
          // }
        >

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
