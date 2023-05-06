import React from 'react';
import DetailCard from '../DetailCard';
import styles from '../index.module.scss';
import { Paragraph } from '../../typographies';

interface EnvironmentCardProps {
  run: TRun;
}

const EnvironmentCard = ({ run }: EnvironmentCardProps) => {
  return (
    <DetailCard isInitiallyOpen={true} heading="Environment">
      <div>
        <Paragraph className={styles.card__key}>Client Version</Paragraph>
        <Paragraph className={styles.card__value}>
          {/* @ts-ignore */}
          {run.clientVersion || 'n/a'}
        </Paragraph>
      </div>
      <div>
        <Paragraph className={styles.card__key}>Server Version</Paragraph>
        <Paragraph className={styles.card__value}>
          {/* @ts-ignore */}
          {run.serverVersion || 'n/a'}
        </Paragraph>
      </div>
      <div>
        <details>
          <summary className={styles.card__summary}>
            <Paragraph
              style={{ display: 'inline' }}
              className={styles.card__key}
            >
              Client Environment
            </Paragraph>
          </summary>
          <div className={styles.card__detailsContainer}>
            {/* @ts-ignore */}
            {Object.entries(run.clientEnvironment || {}).map(([key, value]) => (
              <div>
                <Paragraph className={styles.card__key}>{key}</Paragraph>
                <Paragraph className={styles.card__value}>
                  {/* @ts-ignore */}
                  {value}
                </Paragraph>
              </div>
            ))}
          </div>
        </details>
      </div>
      <div>
        <details>
          <summary className={styles.card__summary}>
            <Paragraph
              style={{ display: 'inline' }}
              className={styles.card__key}
            >
              Orchestrator Environment
            </Paragraph>
          </summary>
          <div className={styles.card__detailsContainer}>
            {/* @ts-ignore */}
            {Object.entries(run.orchestratorEnvironment || {}).map(
              ([key, value]) => (
                <div>
                  <Paragraph className={styles.card__key}>{key}</Paragraph>
                  <Paragraph className={styles.card__value}>
                    {/* @ts-ignore */}
                    {value || 'n/a'}
                  </Paragraph>
                </div>
              ),
            )}
          </div>
        </details>
      </div>
    </DetailCard>
  );
};

export default EnvironmentCard;
