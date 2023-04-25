import React from 'react';
import styles from './styles.module.scss';

function DeploymentBanner() {
  return (
    <aside className={styles.deploymentBanner}>
      <p className={styles.deploymentBanner__paragraph}>
        You are running ZenML locally. In order to run MLOps workloads in the
        cloud, you first need to <pre>deploy ZenML</pre>. Check the{' '}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://docs.zenml.io/getting-started/deploying-zenml"
        >
          {' '}
          docs
        </a>{' '}
        to see how.
      </p>
    </aside>
  );
}

export default DeploymentBanner;
