import React from 'react';
import styles from './styles.module.scss';

function DeploymentBanner() {
  return (
    <aside className={styles.deploymentBanner}>
      <p className={styles.deploymentBanner__paragraph}>
        ZenML is running locally. In order to run your pipelines in the cloud,
        you need to deploy ZenML. See the{' '}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://docs.zenml.io/platform-guide/set-up-your-mlops-platform/deploy-zenml"
        >
          {' '}
          docs
        </a>{' '}
        to learn how.
      </p>
    </aside>
  );
}

export default DeploymentBanner;
