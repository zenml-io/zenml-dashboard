import React from 'react';
import DetailCard from '../DetailCard';
import styles from '../index.module.scss';
import { Paragraph } from '../../typographies';
import { Run } from '../../../../api/types';

interface EnvironmentCardProps {
  run: Run;
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
          {run.metadata.serverVersion || 'n/a'}
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
            {Object.entries(run.metadata.client_environment || {}).map(
              ([key, value], i) => (
                <div key={i}>
                  <Paragraph className={styles.card__key}>{key}</Paragraph>
                  <Paragraph className={styles.card__value}>
                    {/* @ts-ignore */}
                    {value}
                  </Paragraph>
                </div>
              ),
            )}
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
              Execution Environment
            </Paragraph>
          </summary>
          <div className={styles.card__detailsContainer}>
            {/* @ts-ignore */}
            {Object.entries(run.metadata.orchestrator_environment || {}).map(
              ([key, value], i) => (
                <div key={i}>
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
