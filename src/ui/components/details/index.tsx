import React, { useEffect, useState } from 'react';
import { useService } from './useService';
import { LayoutFlow } from '../lineage';
import { FullWidthSpinner } from '../spinners';
import { useSelector } from '../../hooks';
import { sessionSelectors } from '../../../redux/selectors';
import axios from 'axios';
import Sidebar from '../lineage/Sidebar';

const styles = {
  container: { width: '100%', height: '100%' },
  dag: { width: '100%', height: '100%', marginTop: '2rem' },
};

export const Details: React.FC<{ runId: TId; fetching?: boolean }> = ({
  runId,
  fetching,
}) => {
  const [metadata, setMetaData] = useState([] as any);

  const authToken = useSelector(sessionSelectors.authenticationToken);

  const { graph } = useService({ runId });

  useEffect(() => {
    fetchMetaData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [runId]);

  const fetchMetaData = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_API_URL}/run-metadata?pipeline_run_id=${runId}&key=orchestrator_url`,
      {
        headers: {
          Authorization: `bearer ${authToken}`,
        },
      },
    );

    setMetaData(response?.data?.items); //Setting the response into state
    console.log("__UNAUTH DAG ", metadata)
    console.log("__UNAUTH graph ", graph)
    console.log("__UNAUTH details ", response)
  };

  
  if (fetching) {
    return <FullWidthSpinner color="black" size="md" />;
  }
  // console.log(metadata, 'metadatametadata');
  return (
    <div style={styles.container}>
     asdasdadsa
    </div>
  );
};
