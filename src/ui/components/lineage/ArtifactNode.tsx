import React from 'react';
import { Handle, Position } from 'react-flow-renderer';
import { Data, Model, Schema, Service, Statistic, Analysis } from './icons';

import styles from './index.module.scss';
import { NodeProps } from 'react-flow-renderer';

const ArtifactNode = ({
  data,
  targetPosition = Position.Top,
  sourcePosition = Position.Bottom,
  onNodeSelection,
}: NodeProps) => {

  return (
    <>
      <Handle
        type="target"
        position={targetPosition}
        className={styles.handle}
      />
       {/* className={data.selected ? styles.stepBodySelected : styles.stepBody} */}
      <div className={data.selected ? styles.artifactBodySelected : styles.artifactBody}>
        {data.artifact_type === 'DataArtifact' ? (
          <Data />
        ) : data.artifact_type === 'DataAnalysisArtifact' ? (
          <Analysis />
        ) : data.artifact_type === 'ModelArtifact' ? (
          <Model />
        ) : data.artifact_type === 'SchemaArtifact' ? (
          <Schema />
        ) : data.artifact_type === 'ServiceArtifact' ? (
          <Service />
        ) : (
          <Statistic />
        )}
      </div>
      <div className={styles.artifactBottomText}>
        {data.name}
      </div>
      <Handle
        type="source"
        position={sourcePosition}
        className={styles.handle}
      />
    </>
  );
};

export default ArtifactNode;
