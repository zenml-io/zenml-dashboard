import React from 'react';
import DetailCard from '../DetailCard';
import styles from '../index.module.scss';
import { Paragraph } from '../../typographies';
import { Run } from '../../../../api/types';

interface OrchestratorCardProps {
  run: Run;
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
      {/* @ts-ignore */}
      {run.build?.images?.orchestrator && (
        <>
          <div>
            <Paragraph className={styles.card__key}>Image</Paragraph>
            <Paragraph className={styles.card__value}>
              {/* @ts-ignore */}
              {run.build?.images?.orchestrator?.image}
            </Paragraph>
          </div>
          {/* @ts-ignore */}
          {run.build?.images?.orchestrator?.dockerfile ? (
            <div>
              <details>
                <summary className={styles.card__summary}>
                  <Paragraph
                    style={{ display: 'inline' }}
                    className={styles.card__key}
                  >
                    Dockerfile
                  </Paragraph>
                </summary>
                <div className={styles.card__detailsContainer}>
                  {/* @ts-ignore */}
                  <Paragraph
                    style={{ whiteSpace: 'pre-wrap' }}
                    className={styles.card__value}
                  >
                    {/* @ts-ignore */}
                    {run.build?.images?.orchestrator?.dockerfile || 'n/a'}
                  </Paragraph>
                </div>
              </details>
            </div>
          ) : (
            <div>
              <Paragraph className={styles.card__key}>Dockerfile</Paragraph>
              <Paragraph
                style={{ whiteSpace: 'pre-wrap' }}
                className={styles.card__value}
              >
                n/a
              </Paragraph>
            </div>
          )}
          {/* @ts-ignore */}
          {run.build?.images?.orchestrator?.requirements ? (
            <div>
              <details>
                <summary className={styles.card__summary}>
                  <Paragraph
                    style={{ display: 'inline' }}
                    className={styles.card__key}
                  >
                    Requirements
                  </Paragraph>
                </summary>
                <div className={styles.card__detailsContainer}>
                  {/* @ts-ignore */}
                  <Paragraph
                    style={{ whiteSpace: 'pre-wrap' }}
                    className={styles.card__value}
                  >
                    {/* @ts-ignore */}
                    {run.build?.images?.orchestrator?.requirements || 'n/a'}
                  </Paragraph>
                </div>
              </details>
            </div>
          ) : (
            <div>
              <Paragraph className={styles.card__key}>Requirements</Paragraph>
              <Paragraph
                style={{ whiteSpace: 'pre-wrap' }}
                className={styles.card__value}
              >
                n/a
              </Paragraph>
            </div>
          )}
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
        </>
      )}
    </DetailCard>
  );
};

export default OrchestratorCard;
