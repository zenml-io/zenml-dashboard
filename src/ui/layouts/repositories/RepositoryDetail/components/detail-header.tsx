import React from 'react';
import styles from './detail-header.module.scss';
import moment from 'moment';

interface RepositoryDetailHeaderProps {
  repository: TRepository;
}

function RepositoryDetailHeader({ repository }: RepositoryDetailHeaderProps) {
  return (
    <div className={styles.detailHeader}>
      <div className={styles.detailHeader__imageContainer}></div>
      <div className={styles.defailHeader__header}>
        <h1 className={styles.detailHeader__header__heading}>
          {repository.name}
        </h1>
        <p className={styles.detailHeader__header__timestamp}>
          Published {moment(repository.created).fromNow()}
        </p>
      </div>
    </div>
  );
}

export default RepositoryDetailHeader;
