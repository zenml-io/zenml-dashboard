import React, { memo } from 'react';
import { useService } from './useService';
import styles from './index.module.scss';
import GeneralInformationCard from './Cards/GeneralInformationCard';
import OrchestratorCard from './Cards/OrchestratorCard';
import EnvironmentCard from './Cards/EnvironmentCard';

export const Details: React.FC<{ runId: TId }> = memo(({ runId }) => {
  const { run } = useService({ runId });

  return (
    <div className={styles.mainContainer}>
      <div>
        <GeneralInformationCard run={run} />
      </div>
      <div>
        <OrchestratorCard run={run} />
      </div>
      <div>
        <EnvironmentCard run={run} />
      </div>
    </div>
  );
});
