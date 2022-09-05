import React from 'react';
import { Handle, Position } from 'react-flow-renderer';

import styles from './index.module.scss';

type ArtifactNodeData = {
  data: any;
  // artifact_data_type: string
  // artifact_type: string
  // execution_id: string
  // is_cached: string
  // name: string
  // parent_step_id: string
  // producer_step_id: string
};

export const ArtifactNode = (data: ArtifactNodeData) => {
  return (
    <>
      <Handle type="target" position={Position.Top} className={styles.handle} />
      <div className={styles.artifactBody}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
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
        position={Position.Bottom}
        className={styles.handle}
      />
    </>
  );
};

// export const ArtifactNode = ({ ...data }) => {
//   return (
//     <div>
//       <div className={styles.customTitle}>{data.name}</div>
//       <Handle type="target" position={Position.Top} />
//       <div className={styles.contentWrapper}>
//         <div className={styles.io}>
//           <Handle
//             type="target"
//             id="i__data"
//             position={Position.Left}
//           />
//           {"Data"}
//         </div>
//         <Handle type="source" position={Position.Bottom} id="a" />
//         <Handle type="source" position={Position.Bottom} id="b" style={handleStyle} />
//       </div>
//     </div>
//   );
// };

// const title = {
//   padding: '8px 32px',
//   flexGrow: 1,
//   backgroundColor: '#4287f5',
// };
//
// const style = {
//   body: {
//     display: 'flex',
//     flexDirection: 'column',
//     backgroundColor: '#fff',
//     transition: 'all 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
//     boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
//     border: '0px solid #bbb',
//     fontSize: '10pt',
//   },
//   selected: {
//     boxShadow: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
//   },
//
//   contentWrapper: {
//     padding: '8px 0px',
//   },
//};

// const handleStyle = {
//   width: '10px', // Does not work
//   height: '10px',
//   margin: 'auto',
//   background: '#ddd',
//   borderRadius: '15px',
//   border: '2px solid #ddd',
//   boxShadow:
//     'rgba(0, 0, 0, 0.2) 0px 1px 3px 0px, rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 2px 1px -1px',
// };
