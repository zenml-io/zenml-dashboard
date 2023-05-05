import React from 'react';
import DetailCard from '../DetailCard';
import { Paragraph } from '../../../../../components';
import styles from '../index.module.scss';

interface OrchestratorCardProps {
  run: TRun;
}

const OrchestratorCard = ({ run }: OrchestratorCardProps) => {
  return (
    <DetailCard isInitiallyOpen={true} heading="Orchestrator">
      <div>
        <Paragraph className={styles.card__key}>Orchestrator Run ID</Paragraph>
        <Paragraph className={styles.card__value}>
          {/* @ts-ignore */}
          {run.orchestratorRunId}
        </Paragraph>
      </div>
      <div>
        <Paragraph className={styles.card__key}>URL</Paragraph>
        <Paragraph className={styles.card__value}>
          {/* @ts-ignore */}
          {run.metadata?.orchestrator_url?.value || 'n/a'}
        </Paragraph>
      </div>
    </DetailCard>
  );
};

export default OrchestratorCard;
