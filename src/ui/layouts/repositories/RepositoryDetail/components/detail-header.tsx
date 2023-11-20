import React from 'react';
import styles from './detail-header.module.scss';
import moment from 'moment';
import Fallback from '../../../../assets/plugin-fallback.svg';
import { ReactComponent as ArrowSquareOut } from '../../../../components/icons/assets/ArrowSquareOut.svg';
import { Repository } from '../../../../../api/types';

interface RepositoryDetailHeaderProps {
  repository: Repository;
}

function RepositoryDetailHeader({ repository }: RepositoryDetailHeaderProps) {
  return (
    <div className={styles.detailHeader}>
      <img
        src={repository?.body?.logo_url || Fallback}
        alt={`Logo for repository ${repository?.name}`}
        className={styles.detailHeader__imageContainer}
      ></img>
      <div className={styles.detailHeader__header}>
        <h1 className={styles.detailHeader__header__heading}>
          {repository?.name}
        </h1>
        <p className={styles.detailHeader__header__timestamp}>
          Published {moment(repository?.body?.created).fromNow()}
        </p>
        <div className={styles.detailHeader__footer}>
          <p className={styles.detailHeader__header__timestamp}>
            {repository?.body?.user?.name}
          </p>
          <a
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            href={`https://www.${
              repository?.body?.source?.attribute === 'GitHubCodeRepository'
                ? 'github'
                : 'gitlab'
            }.com/${repository?.metadata?.config?.owner}/${
              repository?.metadata?.config?.repository
            }`}
            className={styles.detailHeader__footer__link}
          >
            {repository?.body?.source?.attribute === 'GitHubCodeRepository'
              ? 'Github'
              : 'Gitlab'}{' '}
            <ArrowSquareOut
              className={styles.detailHeader__footer__link__icon}
            />
          </a>
        </div>
      </div>
    </div>
  );
}

export default RepositoryDetailHeader;
