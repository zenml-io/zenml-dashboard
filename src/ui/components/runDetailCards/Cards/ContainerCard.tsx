import React from 'react';
import DetailCard from '../DetailCard';
import styles from '../index.module.scss';
import { Paragraph } from '../../typographies';

interface ContainerCardProps {
  run: TRun;
}

function ContainerCard({ run }: ContainerCardProps) {
  const nonOrchestraotorImages =
    // @ts-ignore
    Object.entries(run.build?.images || {}).filter(
      ([key]) => key !== 'orchestrator',
    );
  return (
    <DetailCard isInitiallyOpen={true} heading="Container">
      <div>
        <Paragraph className={styles.card__key}>
          {/* @ts-ignore */}
          {run.build?.images?.orchestrator ? (
            <details>
              <summary className={styles.card__summary}>
                <Paragraph
                  style={{ display: 'inline' }}
                  className={styles.card__key}
                >
                  Orchestrator
                </Paragraph>
              </summary>
              <div className={styles.card__detailsContainer}>
                {/* @ts-ignore */}
                {Object.entries(run.build.images.orchestrator || {}).map(
                  ([key, value], i) => (
                    <div key={i}>
                      <Paragraph className={styles.card__key}>{key}</Paragraph>
                      <Paragraph className={styles.card__value}>
                        {/* @ts-ignore */}
                        {value.toString() || 'n/a'}
                      </Paragraph>
                    </div>
                  ),
                )}
              </div>
            </details>
          ) : (
            <div>
              <Paragraph className={styles.card__key}>Orchestrator</Paragraph>
              <Paragraph className={styles.card__value}>n/a</Paragraph>
            </div>
          )}
        </Paragraph>
      </div>
      {/* @ts-ignore */}
      {nonOrchestraotorImages.length > 0 &&
        nonOrchestraotorImages.map(([key, value], i) => (
          <details key={i}>
            <summary className={styles.card__summary}>
              <Paragraph
                style={{ display: 'inline' }}
                className={styles.card__key}
              >
                {key}
              </Paragraph>
            </summary>
            <div className={styles.card__detailsContainer}>
              {/* @ts-ignore */}
              {Object.entries(value || {}).map(([key, value], i) => (
                <div key={i}>
                  <Paragraph className={styles.card__key}>{key}</Paragraph>
                  <Paragraph className={styles.card__value}>
                    {/* @ts-ignore */}
                    {value.toString() || 'n/a'}
                  </Paragraph>
                </div>
              ))}
            </div>
          </details>
        ))}
      <div>
        <Paragraph className={styles.card__key}>is Local</Paragraph>
        <Paragraph className={styles.card__value}>
          {/* @ts-ignore */}
          {run.build?.is_local?.toString() || 'n/a'}
        </Paragraph>
      </div>
      <div>
        <Paragraph className={styles.card__key}>ZenML Version</Paragraph>
        <Paragraph className={styles.card__value}>
          {/* @ts-ignore */}
          {run.build?.zenml_version || 'n/a'}
        </Paragraph>
      </div>
      <div>
        <Paragraph className={styles.card__key}>Python Version</Paragraph>
        <Paragraph className={styles.card__value}>
          {/* @ts-ignore */}
          {run.build?.python_version || 'n/a'}
        </Paragraph>
      </div>
      <div>
        <Paragraph className={styles.card__key}>Checksum</Paragraph>
        <Paragraph className={styles.card__value}>
          {/* @ts-ignore */}
          {run.build?.checksum || 'n/a'}
        </Paragraph>
      </div>
    </DetailCard>
  );
}

export default ContainerCard;
