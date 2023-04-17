import React, { useEffect } from 'react';
import styles from './repository-grid.module.scss';
import RepositoryCard from '../repository-card';

interface RepositoryListProps {
  repositories: TRepository[];
}

function RepositoryGrid({ repositories }: RepositoryListProps) {
  useEffect(() => {}, [repositories]);
  return (
    <div className={styles.repositoryList}>
      {repositories.map((repo) => (
        <RepositoryCard repository={repo} key={repo.id} />
      ))}
    </div>
  );
}

export default RepositoryGrid;
