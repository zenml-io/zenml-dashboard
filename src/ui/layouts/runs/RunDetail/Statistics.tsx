import React from 'react';
import { LayoutFlow } from '../../../components';

import styles from './components.module.scss';

export const Statistics: React.FC<{ runId: TId }> = ({ runId }) => {
  return (
    <div className={styles.container}>
      <LayoutFlow />
    </div>
  );
};
