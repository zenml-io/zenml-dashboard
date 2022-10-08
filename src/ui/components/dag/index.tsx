import React from 'react';
import { useService } from './useService';
import { LayoutFlow } from '../lineage';

const styles = {
  container: { width: '100%', height: '100%' },
  dag: { width: '100%', height: '100%', marginTop: '2rem' },
};

export const DAG: React.FC<{ runId: TId }> = ({ runId }) => {
  const { graph } = useService({ runId });

  console.log(graph);

  return (
    <div style={styles.container}>
      <div style={styles.dag}>
        <LayoutFlow graph={graph} />
      </div>
    </div>
  );
};
