import React from 'react';
import moment from 'moment';
import styles from './repository-card.module.scss';
import Fallback from '../../../../assets/plugin-fallback.svg';
import { ReactComponent as ArrowSquareOut } from '../../../../components/icons/assets/ArrowSquareOut.svg';
import { routePaths } from '../../../../../routes/routePaths';
import { useSelector } from 'react-redux';
import { workspaceSelectors } from '../../../../../redux/selectors';
import { Link } from 'react-router-dom';

interface RepositoryCardProps {
  repository: TRepository;
}

function RepositoryCard({ repository }: RepositoryCardProps) {
  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);
  return (
    // TODO: Check A11y for this construct
    <Link
      to={routePaths.repositories.detail(selectedWorkspace, repository.id)}
      className={styles.repositoryCard}
    >
      <img className={styles.repositoryCard__headerImage} src={Fallback} />
      <div className={styles.repositoryCard__body}>
        <h2 className={styles.repositoryCard__heading}>{repository.name}</h2>
        <div className={styles.repositoryCard__secondLine}>
          <p className={styles.repositoryCard__secondLine__description}>
            {repository.user.name}
          </p>
          <p className={styles.repositoryCard__secondLine__description}>
            {moment(repository.created).fromNow()}
          </p>
        </div>
        <div className={styles.repositoryCard__footer}>
          <div>Runs to add here</div>
          <a
            onClick={(e) => e.stopPropagation()}
            href={`https://www.${
              repository.source.attribute === 'GitHubCodeRepository'
                ? 'github'
                : 'gitlab'
            }.com/${repository.config.owner}/${repository.config.repository}`}
            className={styles.repositoryCard__footer__link}
          >
            {repository.source.attribute === 'GitHubCodeRepository'
              ? 'Github'
              : 'Gitlab'}{' '}
            <ArrowSquareOut
              className={styles.repositoryCard__footer__link__icon}
            />
          </a>
        </div>
      </div>
    </Link>
  );
}

export default RepositoryCard;
