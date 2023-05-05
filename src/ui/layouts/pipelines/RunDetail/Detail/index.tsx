import React, { memo } from 'react';
import { useService } from './useService';
import styles from './index.module.scss';
import { Paragraph } from '../../../../components';
import DetailCard from './DetailCard';
import { formatDateToDisplay } from '../../../../../utils';
import { Link } from 'react-router-dom';
import { routePaths } from '../../../../../routes/routePaths';
import { useSelector } from 'react-redux';
import { workspaceSelectors } from '../../../../../redux/selectors';

export const Details: React.FC<{ runId: TId }> = memo(({ runId }) => {
  const { run } = useService({ runId });

  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);

  console.log(run);
  return (
    <div className={styles.mainContainer}>
      <div>
        <DetailCard isInitiallyOpen={true} heading="General Information">
          <div>
            <Paragraph className={styles.card__key}>Name</Paragraph>
            <Paragraph className={styles.card__value}>{run.name}</Paragraph>
          </div>
          <div>
            <Paragraph className={styles.card__key}>Pipeline</Paragraph>
            <Paragraph className={styles.card__value}>
              <Link
                to={routePaths.pipeline.configuration(
                  run.pipeline.id,
                  selectedWorkspace,
                )}
              >
                {run.pipeline.name}
              </Link>
            </Paragraph>
          </div>
          <div>
            <Paragraph className={styles.card__key}>User</Paragraph>
            <Paragraph className={styles.card__value}>
              {run.user.name}
            </Paragraph>
          </div>
          <div>
            <Paragraph className={styles.card__key}>Start Time</Paragraph>
            <Paragraph className={styles.card__value}>
              {/* @ts-ignore */}
              {formatDateToDisplay(run.startTime)}
            </Paragraph>
          </div>
          <div>
            <Paragraph className={styles.card__key}>End Time</Paragraph>
            <Paragraph className={styles.card__value}>
              {/* @ts-ignore */}
              {formatDateToDisplay(run.endTime)}
            </Paragraph>
          </div>
          <div>
            <Paragraph className={styles.card__key}>Status</Paragraph>
            <Paragraph className={styles.card__value}>{run.status}</Paragraph>
          </div>
          <div>
            <Paragraph className={styles.card__key}>Schedule</Paragraph>
            <Paragraph className={styles.card__value}>
              {/* @ts-ignore */}
              {run.deployment?.schedule || 'n/a'}
            </Paragraph>
          </div>
          <div>
            <Paragraph className={styles.card__key}>
              Run Name Template
            </Paragraph>
            <Paragraph className={styles.card__value}>
              {/* @ts-ignore */}
              {run.deployment?.run_name_template || 'n/a'}
            </Paragraph>
          </div>
        </DetailCard>
      </div>
      <div>
        <DetailCard isInitiallyOpen={true} heading="Orchestrator">
          <div>
            <Paragraph className={styles.card__key}>
              Orchestrator Run ID
            </Paragraph>
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
      </div>
      <div>
        <DetailCard isInitiallyOpen={true} heading="Environment">
          <div>
            <Paragraph className={styles.card__key}>Client Version</Paragraph>
            <Paragraph className={styles.card__value}>
              {/* @ts-ignore */}
              {run.client_version || 'n/a'}
            </Paragraph>
          </div>
          <div>
            <Paragraph className={styles.card__key}>Server Version</Paragraph>
            <Paragraph className={styles.card__value}>
              {/* @ts-ignore */}
              {run.server_version || 'n/a'}
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
                {Object.entries(run.clientEnvironment || {}).map(
                  ([key, value]) => (
                    <div>
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
                  Orchestrator Environment
                </Paragraph>
              </summary>
              <div className={styles.card__detailsContainer}>
                {/* @ts-ignore */}
                {Object.entries(run.orchestrator_environment || {}).map(
                  ([key, value]) => (
                    <div>
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
        </DetailCard>
      </div>
    </div>
  );
});
