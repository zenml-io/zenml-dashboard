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
          {run.metadata?.orchestrator_url?.value ? (
            <a
              rel="noopener noreferrer"
              // @ts-ignore
              href={run.metadata?.orchestrator_url?.value}
              target="_blank"
            >
              {/* @ts-ignore */}
              {run.metadata?.orchestrator_url?.value}
            </a>
          ) : (
            'n/a'
          )}
        </Paragraph>
      </div>
    </DetailCard>
  );
};

export default OrchestratorCard;
