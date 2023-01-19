import React from 'react';
import { LayoutFlow } from '../../../components';
import { CommandBox } from '../../common/CommandBox';
import { BASE_COMMAND } from './constants';

import styles from './components.module.scss';

export const Statistics: React.FC<{ runId: TId; stackId: TId }> = ({
  runId,
  stackId,
}) => {
  return (
    <div className={styles.container}>
      <CommandBox command={`${BASE_COMMAND} statistics ${stackId}:${runId}`} />
      <div className={styles.dag}>
        <LayoutFlow />
      </div>
    </div>
  );
};
