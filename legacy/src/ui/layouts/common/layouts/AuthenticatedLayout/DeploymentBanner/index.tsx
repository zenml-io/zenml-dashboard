import React from 'react';
import styles from './styles.module.scss';

function DeploymentBanner() {
  return (
    <aside className={styles.deploymentBanner}>
      <p className={styles.deploymentBanner__paragraph}>
        ZenML is running locally. In order to run your pipelines in the cloud,
        you need to{' '}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://docs.zenml.io/user-guide/starter-guide/switch-to-production"
        >
          deploy ZenML yourself
        </a>
        , or get a hosted version with{' '}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://docs.zenml.io/deploying-zenml/zenml-cloud"
        >
          {' '}
          ZenML Cloud
        </a>
        .
      </p>
    </aside>
  );
}

export default DeploymentBanner;
