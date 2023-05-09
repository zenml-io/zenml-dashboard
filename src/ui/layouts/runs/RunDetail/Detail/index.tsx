import React, { memo } from 'react';
import { useService } from './useService';
import styles from './index.module.scss';
import GeneralInformationCard from '../../../../components/runDetailCards/Cards/GeneralInformationCard';
import OrchestratorCard from '../../../../components/runDetailCards/Cards/OrchestratorCard';
import EnvironmentCard from '../../../../components/runDetailCards/Cards/EnvironmentCard';
import CodeCard from '../../../../components/runDetailCards/Cards/CodeCard';

export const Details: React.FC<{ runId: TId }> = memo(({ runId }) => {
  const { run } = useService({ runId });
  return (
    <div className={styles.mainContainer}>
      <GeneralInformationCard run={run} />
      <OrchestratorCard run={run} />
      <CodeCard run={run} />
      <EnvironmentCard run={run} />
    </div>
  );
});
