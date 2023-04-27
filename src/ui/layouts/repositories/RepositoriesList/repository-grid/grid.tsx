import React, { useEffect } from 'react';
import styles from './repository-grid.module.scss';
import RepositoryCard from '../repository-card';
import { H3 } from '../../../../components';

interface RepositoryListProps {
  repositories: TRepository[];
}

function RepositoryGrid({ repositories }: RepositoryListProps) {
  useEffect(() => {}, [repositories]);
  if (repositories.length < 1)
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <H3>No Repositories found</H3>
      </div>
    );
  return (
    <div className={styles.repositoryList}>
      {repositories.map((repo) => (
        <RepositoryCard repository={repo} key={repo.id} />
      ))}
    </div>
  );
}

export default RepositoryGrid;
