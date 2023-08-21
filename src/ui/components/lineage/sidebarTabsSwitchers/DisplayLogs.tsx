import React, { useEffect, useRef, useState } from 'react';
import styles from '../index.module.scss';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { okaidia } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { fetchStepLogs } from '../../../layouts/runs/RunDetail/sidebarServices';
import { useSelector } from 'react-redux';
import { sessionSelectors } from '../../../../redux/selectors';
import { FullWidthSpinner } from '../../spinners';

type DisplayLogsProps = { selectedNode: any };

const DisplayLogs = ({ selectedNode }: DisplayLogsProps) => {
  const divRef = useRef<HTMLDivElement>(null);
  const authToken = useSelector(sessionSelectors.authenticationToken);
  const [logs, setLogs] = useState('');
  const [fetching, setFetching] = useState(true);

  async function fetchLogs(node: any) {
    const logs = await fetchStepLogs(node, authToken);
    setLogs(logs);
    setFetching(false);
  }

  useEffect(() => {
    if (selectedNode === null) return;
    fetchLogs(selectedNode.id).then(() => {
      setFetching(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (divRef.current) {
      const preElement = divRef.current.querySelector('pre');
      if (preElement) {
        preElement.scrollTop = preElement.scrollHeight;
      }
    }
  }, [fetching, logs]);

  useEffect(() => {
    let pollingInterval: NodeJS.Timeout;
    if (selectedNode === null) return;
    if (!fetching) {
      pollingInterval = setInterval(() => {
        fetchLogs(selectedNode.id);
      }, 2000);
    }
    return () => clearInterval(pollingInterval);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetching]);

  return (
    <>
      {fetching ? (
        <div className={styles.FullWidthSpinnerContainer}>
          <FullWidthSpinner color="black" size="md" />
          <p style={{ fontFamily: 'Rubik', fontSize: '14px' }}>
            Loading Logs, please wait...
          </p>
        </div>
      ) : (
        <div ref={divRef} className={styles.codeContainer}>
          <SyntaxHighlighter
            customStyle={{ width: '100%', height: '80%', fontSize: 16 }}
            wrapLines={true}
            language="text"
            style={okaidia}
          >
            {logs ? logs : 'No Logs Available'}
          </SyntaxHighlighter>
        </div>
      )}
    </>
  );
};

export default DisplayLogs;
