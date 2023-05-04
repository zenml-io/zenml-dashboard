import React, { useEffect } from 'react';
import { useService } from './useService';
import { LayoutFlow } from '../lineage';
import { FullWidthSpinner } from '../spinners';

const styles = {
  container: { width: '100%', height: '100%' },
  dag: { width: '100%', height: '100%', marginTop: '2rem' },
};

export const DAG: React.FC<{
  runId: TId;
  fetching?: boolean;
  metadata?: any;
}> = ({ runId, fetching, metadata }) => {
  const { graph } = useService({ runId });

  useEffect(() => {}, [runId]); //eslint-disable-line

  if (fetching) {
    return <FullWidthSpinner color="black" size="md" />;
  }

  return (
    <div style={styles.container}>
      <div style={styles.dag}>
        <LayoutFlow graph={graph} runId={runId} metadata={metadata} />
      </div>
    </div>
  );
};
