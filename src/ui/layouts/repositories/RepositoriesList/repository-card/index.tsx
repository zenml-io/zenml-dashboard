import React from 'react';
import moment from 'moment';
import styles from './repository-card.module.scss';
import Fallback from '../../../../assets/plugin-fallback.svg';
import { routePaths } from '../../../../../routes/routePaths';
import { useSelector } from 'react-redux';
import { workspaceSelectors } from '../../../../../redux/selectors';
import { Repository } from '../../../../../api/types';
import { Link } from 'react-router-dom';

interface RepositoryCardProps {
  repository: Repository;
}

function RepositoryCard({ repository }: RepositoryCardProps) {
  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);
  return (
    <Link
      to={routePaths.repositories.overview(selectedWorkspace, repository.id)}
      className={styles.repositoryCard}
    >
      <img
        className={styles.repositoryCard__headerImage}
        src={repository.body?.logo_url || Fallback}
        alt={`Logo for repository ${repository.name}`}
      />
      <div className={styles.repositoryCard__body}>
        <h2 className={styles.repositoryCard__heading}>{repository.name}</h2>
        <div className={styles.repositoryCard__secondLine}>
          <p className={styles.repositoryCard__secondLine__description}>
            {repository.body?.user?.name}
          </p>
          <p className={styles.repositoryCard__secondLine__description}>
            {moment(repository.body?.created).fromNow()}
          </p>
        </div>

        <p
          className={styles.repositoryCard__secondLine__description}
          style={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {repository.metadata?.description || 'No Description provided'}
        </p>
      </div>
    </Link>
  );
}

export default RepositoryCard;
