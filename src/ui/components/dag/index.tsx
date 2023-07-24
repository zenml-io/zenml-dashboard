import React, { useEffect, useState } from 'react';
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
  const [togglePolling, setTogglePolling] = useState(false);
  const { graph, counter } = useService({ runId, togglePolling });

  useEffect(() => {}, [runId]); //eslint-disable-line

  if (fetching) {
    return <FullWidthSpinner color="black" size="md" />;
  }

  return (
    <div style={styles.container}>
      <div style={styles.dag}>
        <LayoutFlow graph={graph} runId={runId} metadata={metadata} />
        <button
          style={{
            color: '#443E99',
            position: 'sticky',
            bottom: '10px',
            zIndex: 10,
            fontFamily: 'Rubik',
            fontWeight: 'bold',
            fontSize: '16px',
            width: '185px',
            height: '51px',
            backgroundColor: 'rgb(241, 240, 255)',
            border: 'none',
            padding: '0.75rem',
            borderRadius: '0.5rem',
            cursor: 'pointer',
          }}
          onClick={() => setTogglePolling(!togglePolling)}
        >
          {!togglePolling
            ? 'Stop Auto Refresh ' + counter
            : 'Start Auto Refresh'}
        </button>
      </div>
    </div>
  );
};
