import React, { useEffect, useState } from 'react';
// import { useService } from './useService';
import { LayoutFlow } from '../lineage';
import { FullWidthSpinner } from '../spinners';
import { useDispatch } from 'react-redux';
import { runsActions, showToasterAction } from '../../../redux/actions';
import { toasterTypes } from '../../../constants';
import { Box } from '../boxes';
import { H3 } from '../typographies';

const styles = {
  container: { width: '100%', height: '100%' },
  dag: { width: '100%', height: '100%', marginTop: '2rem' },
};

export const DAG: React.FC<{
  errorMessage?: any;
  runId: TId;
  fetching?: boolean;
  metadata?: any;
  graph?: any;
  runStatus?: string;
}> = React.memo(
  ({ errorMessage, runId, fetching, metadata, graph, runStatus }) => {
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
          onFailure: (res) => {
            dispatch(
              showToasterAction({
                description: res,
                type: toasterTypes.failure,
              }),
            );
            setLoading(false);
          },
        }),
      );
    };

    return (
      <div style={styles.container}>
        <div style={styles.dag}>
          {errorMessage?.includes('IllegalOperationError') ? (
            <Box
              style={{
                textAlign: 'center',
                maxWidth: '700px',
                margin: '0 auto',
              }}
              paddingVertical="xxl"
            >
              <H3>
                You Don't have access to this DAG. Please contact your admin for
                further information or to request access.
              </H3>
            </Box>
          ) : (
            errorMessage && (
              <Box
                style={{
                  textAlign: 'center',
                  maxWidth: '700px',
                  margin: '0 auto',
                }}
                paddingVertical="xxl"
              >
                <H3>Something went wrong!</H3>
              </Box>
            )
          )}

          {graph && Object.keys(graph).length > 0 ? (
            <LayoutFlow
              onRefreshDAG={handleRefreshDAG}
              graph={graph}
              runId={runId}
              metadata={metadata}
            />
          ) : null}
        </div>
      </div>
    );
  },
);
