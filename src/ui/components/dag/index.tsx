import React, { useEffect } from 'react';
import { useService } from './useService';
import { LayoutFlow } from '../lineage';
import { FullWidthSpinner } from '../spinners';
import { useSelector } from '../../hooks';
import { sessionSelectors } from '../../../redux/selectors';
import axios from 'axios';

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

  const authToken = useSelector(sessionSelectors.authenticationToken);
  useEffect(() => {
    fetchMetaData();
  }, [runId]); //eslint-disable-line

  const fetchMetaData = async () => {
    const response = await axios.get( //eslint-disable-line

      `${process.env.REACT_APP_BASE_API_URL}/run-metadata?pipeline_run_id=${runId}&key=orchestrator_url`,
      {
        headers: {
          Authorization: `bearer ${authToken}`,
        },
      },
    );

  };


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
