import React, { memo } from 'react';
import { Handle, Position } from 'react-flow-renderer';
import { Cached, Completed, Export, Failed, Folder, Lock, Running } from './icons';

import styles from './index.module.scss';
import Sidebar from './Sidebar';
import { NodeProps } from 'react-flow-renderer';
// import { NodeProps } from './types';

const StepNode = ({
  data,
  targetPosition = Position.Top,
  sourcePosition = Position.Bottom,
}: NodeProps) => {




  if (data.selected) {
    console.log("_UNAUTH_SELECTED", data)
  }
  else {
    console.log("_UNAUTH_NOT_SELECTED", data)
  }


  return (
    <>
      {/* <Sidebar /> */}
      <div className={styles.stepMainContainer} style={{ borderRadius: 10 }}>
        <Handle
          type="target"
          position={targetPosition}
          className={styles.handle}
        />
        <div
          className={data.selected ? styles.stepBodySelected : styles.stepBody}
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
        <div className={styles.stepFooter}>
          <span style={{ padding: '2px', cursor: 'pointer' }} onClick={() => console.log("__EXPORT")}><Export /></span>
          <span style={{ padding: '2px', cursor: 'pointer' }} onClick={() => console.log("__FOLDER")}><Folder /></span>
          <span style={{ padding: '0px', cursor: 'pointer' }} onClick={() => console.log("__LOCK")}><Lock /></span>
        </div>
        <Handle
          type="source"
          position={sourcePosition}
          className={styles.handle}
        />
        {/* <Sidebar/> */}
      </div>
    </>
  );
};

export default StepNode;
