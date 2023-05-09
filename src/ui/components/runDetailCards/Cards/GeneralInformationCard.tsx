import React from 'react';
import DetailCard from '../DetailCard';
import styles from '../index.module.scss';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { workspaceSelectors } from '../../../../redux/selectors';
import { Paragraph } from '../../typographies';
import { routePaths } from '../../../../routes/routePaths';
import { formatDateToDisplay } from '../../../../utils';

interface GeneralInformationCardProps {
  run: TRun;
}

const GeneralInformationCard = ({ run }: GeneralInformationCardProps) => {
  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);

  return (
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
              run.pipeline?.id || '',
              selectedWorkspace,
            )}
          >
            {run.pipeline?.name || ''}
          </Link>
        </Paragraph>
      </div>
      <div>
        <Paragraph className={styles.card__key}>User</Paragraph>
        <Paragraph className={styles.card__value}>{run.user?.name}</Paragraph>
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
        <Paragraph className={styles.card__key}>Run Name Template</Paragraph>
        <Paragraph className={styles.card__value}>
          {/* @ts-ignore */}
          {run.deployment?.run_name_template || 'n/a'}
        </Paragraph>
      </div>
    </DetailCard>
  );
};

export default GeneralInformationCard;
