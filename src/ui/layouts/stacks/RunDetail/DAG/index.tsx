import React from 'react';
import { useService } from './useService';
import { LayoutFlow } from '../../../../components';

import styles from '../components.module.scss';

export const DAG: React.FC<{ runId: TId }> = ({ runId }) => {
  const { graph } = useService({ runId });

  return (
    <div className={styles.container}>
      <div className={styles.dag}>
        <LayoutFlow graph={graph} />
      </div>
    </div>
  );
};
