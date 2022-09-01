import React, {useCallback} from 'react';
import ReactFlow, { Handle, Position } from 'react-flow-renderer';
import styles from './index.module.scss';

type ArtifactNodeData = {
  data: any
  // artifact_data_type: string
  // artifact_type: string
  // execution_id: string 
  // is_cached: string
  // name: string
  // parent_step_id: string
  // producer_step_id: string
};

const handleStyle = {
  width: "10px", // Does not work
  height: "10px",
  margin: "auto",
  background: "#ddd",
  borderRadius: "15px",
  border: "2px solid #ddd",
  boxShadow:
    "rgba(0, 0, 0, 0.2) 0px 1px 3px 0px, rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 2px 1px -1px"
}

const a = {
  display: "flex",
  backgroundColor: "#fff",
  transition: "all 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
  boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",
  border: "0px solid #bbb",
  fontSize: "10pt"
}
const style = {
  body: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#fff",
    transition: "all 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",
    border: "0px solid #bbb",
    fontSize: "10pt"
  },
  selected: {
    boxShadow: "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)"
  },
  title: {
    position: "relative",
    padding: "8px 32px",
    flexGrow: 1,
    backgroundColor: "#eee"
  },
  contentWrapper: {
    padding: "8px 0px"
  }
};

export const ArtifactNode = (data: ArtifactNodeData) => {
  const onChange = useCallback((evt) => {
    console.log(data);
  }, []);

  return (
    <>
      <Handle type="target" position={Position.Top} />
      <div style={a}>
        <label htmlFor="text">Artifact: {data.data.execution_id}</label>
        <input id="text" name="text" onChange={onChange} />
      </div>
      <Handle type="source" position={Position.Bottom} id="a" />
    </>
  );
}

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
