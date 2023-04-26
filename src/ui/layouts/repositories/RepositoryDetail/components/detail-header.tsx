import React from 'react';
import styles from './detail-header.module.scss';
import moment from 'moment';

interface RepositoryDetailHeaderProps {
  repository: TRepository;
}

function RepositoryDetailHeader({ repository }: RepositoryDetailHeaderProps) {
  return (
    <div className={styles.detailHeader}>
      <img
        src={repository.logo_url}
        className={styles.detailHeader__imageContainer}
      ></img>
      <div className={styles.detailHeader__header}>
        <h1 className={styles.detailHeader__header__heading}>
          {repository.name}
        </h1>
        <p className={styles.detailHeader__header__timestamp}>
          Published {moment(repository.created).fromNow()}
        </p>
        <p className={styles.detailHeader__header__timestamp}>
          {repository.user.name}
        </p>
      </div>
    </div>
  );
}

export default RepositoryDetailHeader;
