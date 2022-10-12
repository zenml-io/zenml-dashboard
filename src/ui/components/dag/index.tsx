import React from 'react';
import { useService } from './useService';
import { LayoutFlow } from '../lineage';
import { FullWidthSpinner } from '../spinners';

const styles = {
  container: { width: '100%', height: '100%' },
  dag: { width: '100%', height: '100%', marginTop: '2rem' },
};

export const DAG: React.FC<{ runId: TId; fetching?: boolean }> = ({
  runId,
  fetching,
}) => {
  const { graph } = useService({ runId });

  console.log('runId', graph, runId);
  if (fetching) {
    return <FullWidthSpinner color="black" size="md" />;
  }

  return (
    <div style={styles.container}>
      <div style={styles.dag}>
        <LayoutFlow runId={runId} graph={graph} />
      </div>
    </div>
  );
};
