import React from 'react';
import styles from './detail-header.module.scss';

interface RepositoryDetailHeaderProps {
  repository: TRepository;
}

function RepositoryDetailHeader({ repository }: RepositoryDetailHeaderProps) {
  return <div className={styles.detailHeader}>{repository.name}</div>;
}

export default RepositoryDetailHeader;
