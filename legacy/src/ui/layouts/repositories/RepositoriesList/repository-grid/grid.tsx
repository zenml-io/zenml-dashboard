import React, { useEffect } from 'react';
import styles from './repository-grid.module.scss';
import RepositoryCard from '../repository-card';
import { translate } from '../translate';
import { H3 } from '../../../../components';
import { Repository } from '../../../../../api/types';

interface RepositoryListProps {
  repositories: Repository[];
}

function RepositoryGrid({ repositories }: RepositoryListProps) {
  useEffect(() => {}, [repositories]);
  if (repositories.length < 1)
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <H3>{translate('emptyState.text')}</H3>
      </div>
    );
  return (
    <div className={styles.repositoryList} data-testid="repository_card">
      {repositories.map((repo) => (
        <RepositoryCard repository={repo} key={repo.id} />
      ))}
    </div>
  );
}

export default RepositoryGrid;
