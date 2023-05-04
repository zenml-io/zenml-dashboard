import React, { memo } from 'react';
import { useService } from './useService';
import JsonDisplay from '../../../../components/lineage/JsonDisplay';
import styles from './index.module.scss';

export const Details: React.FC<{ runId: TId }> = memo(({ runId }) => {
  const { run } = useService({ runId });

  return (
    <div className={`${styles.mainContainer}`}>
      <JsonDisplay data={run} styles={{ width: '100%', padding: 20 }} />
    </div>
  );
});
