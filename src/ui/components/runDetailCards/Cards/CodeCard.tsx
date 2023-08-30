import React from 'react';
import DetailCard from '../DetailCard';
import styles from '../index.module.scss';
import { Paragraph } from '../../typographies';
import { useSelector } from 'react-redux';
import { workspaceSelectors } from '../../../../redux/selectors';
import { Link } from 'react-router-dom';
import { routePaths } from '../../../../routes/routePaths';
import { Run } from '../../../../api/types';

interface CodeCardProps {
  run: Run;
}

const CodeCard = ({ run }: CodeCardProps) => {
  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);
  return (
    <DetailCard isInitiallyOpen={true} heading="Code">
      <div>
        <Paragraph className={styles.card__key}>Code Repository</Paragraph>
        <Paragraph className={styles.card__value}>
          {/* @ts-ignore */}
          {run.deployment?.code_reference?.code_repository?.id ? (
            <Link
              to={routePaths.repositories.overview(
                selectedWorkspace,
                // @ts-ignore
                run.deployment?.code_reference?.code_repository?.id,
              )}
            >
              {/* @ts-ignore */}
              {run.deployment?.code_reference?.code_repository?.id}
            </Link>
          ) : (
            'n/a'
          )}
        </Paragraph>
      </div>
      <div>
        <Paragraph className={styles.card__key}>Git SHA</Paragraph>
        <Paragraph className={styles.card__value}>
          {/* @ts-ignore */}
          {run.gitSha || 'n/a'}
        </Paragraph>
      </div>
      <div>
        <Paragraph className={styles.card__key}>Number of steps</Paragraph>
        <Paragraph className={styles.card__value}>
          {/* @ts-ignore */}
          {run.numSteps || 'n/a'}
        </Paragraph>
      </div>
    </DetailCard>
  );
};

export default CodeCard;
