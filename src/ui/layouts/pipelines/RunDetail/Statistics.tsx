import React from 'react';
import { LayoutFlow } from '../../../components';

import styles from './components.module.scss';

export const Statistics: React.FC<{ runId: string; pipelineId: string }> = ({
  runId,
  pipelineId,
}) => (
  <div className={styles.container}>
    <LayoutFlow />
  </div>
);
