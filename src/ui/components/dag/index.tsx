import React, { useEffect, useState } from 'react';
// import { useService } from './useService';
import { LayoutFlow } from '../lineage';
import { FullWidthSpinner } from '../spinners';
import { useDispatch } from 'react-redux';
import { runsActions } from '../../../redux/actions';

const styles = {
  container: { width: '100%', height: '100%' },
  dag: { width: '100%', height: '100%', marginTop: '2rem' },
};

export const DAG: React.FC<{
  runId: TId;
  fetching?: boolean;
  metadata?: any;
  graph?: any;
  runStatus?: string;
}> = React.memo(({ runId, fetching, metadata, graph, runStatus }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {}, [runId]); //eslint-disable-line

  if (fetching || loading) {
    return <FullWidthSpinner color="black" size="md" />;
  }
  const handleRefreshDAG = () => {
    setLoading(true);
    dispatch(
      runsActions.graphForRun({
        runId: runId,
        onSuccess: () => {
          setLoading(false);
        },
        onFailure: () => {
          setLoading(false);
        },
      }),
    );
  };

  return (
    <div style={styles.container}>
      <div style={styles.dag}>
        <LayoutFlow
          onRefreshDAG={handleRefreshDAG}
          graph={graph}
          runId={runId}
          metadata={metadata}
        />
        {/* {runStatus === 'running' && ( */}
        {/* <button
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
          onClick={() => {
            
          }}
        >
          Refresh
        </button> */}
        {/* )} */}
      </div>
    </div>
  );
});
