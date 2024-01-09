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
          {run.metadata?.orchestrator_run_id}
        </Paragraph>
      </div>
      <div>
        <Paragraph className={styles.card__key}>URL</Paragraph>
        <Paragraph className={styles.card__value}>
         
          {(run.metadata?.run_metadata?.orchestrator_url as {[key: string]: any})?.body?.value ? (
            <a
              rel="noopener noreferrer"
              
              href={(run.metadata?.run_metadata?.orchestrator_url as {[key: string]: any})?.body?.value}
              target="_blank"
            >
              {(run.metadata?.run_metadata?.orchestrator_url as {[key: string]: any})?.body?.value.orchestrator_url?.value}
            </a>
          ) : (
            'n/a'
          )}
        </Paragraph>
      </div>
     
      {run.body?.build?.metadata?.images?.orchestrator && (
        <>
          <div>
            <Paragraph className={styles.card__key}>Image</Paragraph>
            <Paragraph className={styles.card__value}>
             
              {(run.body?.build?.metadata?.images?.orchestrator as {[key: string]: any})?.image}
            </Paragraph>
          </div>
         
          {run.body?.build?.metadata?.images?.dockerfile ? (
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
                  <Paragraph
                    style={{ whiteSpace: 'pre-wrap' }}
                    className={styles.card__value}
                  >
                    {(run.body?.build?.metadata?.images?.orchestrator as {[key: string]: any})?.dockerfile || 'n/a'}
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
          {(run.body?.build?.metadata?.images?.orchestrator as {[key: string]: any})?.requirements ? (
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
                  <Paragraph
                    style={{ whiteSpace: 'pre-wrap' }}
                    className={styles.card__value}
                  >
                    {(run.body?.build?.metadata?.images?.orchestrator as {[key: string]: any}) || 'n/a'}
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
              {run.body?.build?.metadata?.zenml_version || 'n/a'}
            </Paragraph>
          </div>
          <div>
            <Paragraph className={styles.card__key}>Python Version</Paragraph>
            <Paragraph className={styles.card__value}>
              {run.body?.build?.metadata?.python_version || 'n/a'}
            </Paragraph>
          </div>
        </>
      )}
    </DetailCard>
  );
};

export default OrchestratorCard;
