import React from 'react';
import styles from './styles.module.scss';

function DeploymentBanner() {
  return (
    <aside className={styles.deploymentBanner}>
      <p className={styles.deploymentBanner__paragraph}>
        You are running ZenML locally. See the{' '}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://docs.zenml.io/getting-started/deploying-zenml"
        >
          {' '}
          docs
        </a>{' '}
        for a deployment guide
      </p>
    </aside>
  );
}

export default DeploymentBanner;
