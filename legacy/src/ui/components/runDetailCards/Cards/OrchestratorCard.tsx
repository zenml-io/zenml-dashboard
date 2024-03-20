import React, { useEffect, useState } from 'react';
import DetailCard from '../DetailCard';
import styles from '../index.module.scss';
import { Paragraph } from '../../typographies';
import { PipelineBuild, Run } from '../../../../api/types';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { sessionSelectors } from '../../../../redux/selectors';

interface OrchestratorCardProps {
  run: Run;
}

const OrchestratorCard = ({ run }: OrchestratorCardProps) => {
  const authToken = useSelector(sessionSelectors.authenticationToken);
  const [pipelineBuild, setPipelineBuild] = useState<PipelineBuild | null>(
    null,
  );
  async function fetchPipelineBuild(id: string) {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_API_URL}/pipeline_builds/${id}`,
        {
          headers: {
            Authorization: `bearer ${authToken}`,
          },
        },
      );
      setPipelineBuild(response.data);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    if (run.body?.build?.id) {
      fetchPipelineBuild(run.body?.build.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          {(run.metadata?.run_metadata?.orchestrator_url as {
            [key: string]: any;
          })?.body?.value ? (
            <a
              rel="noopener noreferrer"
              href={
                (run.metadata?.run_metadata?.orchestrator_url as {
                  [key: string]: any;
                })?.body?.value
              }
              target="_blank"
            >
              {
                (run.metadata?.run_metadata?.orchestrator_url as {
                  [key: string]: any;
                })?.body?.value
              }
            </a>
          ) : (
            'n/a'
          )}
        </Paragraph>
      </div>

      {pipelineBuild?.metadata?.images?.orchestrator && (
        <>
          <div>
            <Paragraph className={styles.card__key}>Image</Paragraph>
            <Paragraph className={styles.card__value}>
              {
                (pipelineBuild.metadata?.images?.orchestrator as {
                  [key: string]: any;
                })?.image
              }
            </Paragraph>
          </div>

          {(pipelineBuild.metadata?.images?.orchestrator as {
            [key: string]: any;
          })?.dockerfile   ? (
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
                    {(pipelineBuild.metadata?.images?.orchestrator as {
                      [key: string]: any;
                    })?.dockerfile || 'n/a'}
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
          {(pipelineBuild.metadata?.images?.orchestrator as {
            [key: string]: any;
          })?.requirements ? (
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
                    {(pipelineBuild.metadata?.images?.orchestrator as {
                      [key: string]: any;
                    })?.requirements || 'n/a'}
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
              {pipelineBuild.metadata?.zenml_version || 'n/a'}
            </Paragraph>
          </div>
          <div>
            <Paragraph className={styles.card__key}>Python Version</Paragraph>
            <Paragraph className={styles.card__value}>
              {pipelineBuild.metadata?.python_version || 'n/a'}
            </Paragraph>
          </div>
        </>
      )}
    </DetailCard>
  );
};

export default OrchestratorCard;
