import React, { memo } from 'react';
import { Handle, Position } from 'react-flow-renderer';
import { Data, Model, Schema, Service, Statistic, Analysis } from './icons';

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
      <Handle
        type="source"
        position={sourcePosition}
        className={styles.handle}
      />
    </>
  );
};

export default memo(ArtifactNode);
