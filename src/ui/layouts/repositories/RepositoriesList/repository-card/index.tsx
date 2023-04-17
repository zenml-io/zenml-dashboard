import React from 'react';
import styles from './repository-card.module.scss';
import Fallback from '../../../../assets/plugin-fallback.svg';
import { ReactComponent as ArrowSquareOut } from '../../../../components/icons/assets/ArrowSquareOut.svg';
import { routePaths } from '../../../../../routes/routePaths';
import { useSelector } from 'react-redux';
import { workspaceSelectors } from '../../../../../redux/selectors';

interface RepositoryCardProps {
  repository: TRepository;
}

function RepositoryCard({ repository }: RepositoryCardProps) {
  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);
  return (
    // TODO: Generate Link
    <a
      href={routePaths.repositories.detail(selectedWorkspace, repository.id)}
      className={styles.repositoryCard}
    >
      <img className={styles.repositoryCard__headerImage} src={Fallback} />
      <div className={styles.repositoryCard__body}>
        <h2 className={styles.repositoryCard__heading}>{repository.name}</h2>
        <p className={styles.repositoryCard__description}>
          {repository.user.name}
        </p>
        <div className={styles.repositoryCard__footer}>
          <div>Runs to add here</div>
          <a href="test" className={styles.repositoryCard__footer__link}>
            Github{' '}
            <ArrowSquareOut
              className={styles.repositoryCard__footer__link__icon}
            />
          </a>
        </div>
      </div>
    </a>
  );
}

export default RepositoryCard;
