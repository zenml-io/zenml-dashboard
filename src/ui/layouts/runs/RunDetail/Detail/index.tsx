import React, { memo } from 'react';
import { useService } from './useService';
import styles from './index.module.scss';
import GeneralInformationCard from '../../../../components/runDetailCards/Cards/GeneralInformationCard';
import OrchestratorCard from '../../../../components/runDetailCards/Cards/OrchestratorCard';
import EnvironmentCard from '../../../../components/runDetailCards/Cards/EnvironmentCard';
import CodeCard from '../../../../components/runDetailCards/Cards/CodeCard';
import ContainerCard from '../../../../components/runDetailCards/Cards/ContainerCard';

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
        <CodeCard run={run} />
      </div>
      <div>
        <ContainerCard run={run} />
      </div>
      <div>
        <EnvironmentCard run={run} />
      </div>
    </div>
  );
});
