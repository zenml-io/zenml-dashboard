import React, { useState } from 'react';
import styles from './styles.module.scss';
import { dashboardKey } from './service';
import { icons } from '../../../../../components';

function DashboardBanner() {
  const [isDashboardBannerDismissed, setDashboardDismissed] = useState(
    !!sessionStorage.getItem(dashboardKey),
  );

  if (isDashboardBannerDismissed) return null;
  return (
    <aside className={styles.deploymentBanner}>
      <p className={styles.deploymentBanner__paragraph}>
        This dashboard interface will soon be updated. Click{' '}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.zenml.io/cloud"
        >
          here
        </a>{' '}
        for a preview!
      </p>
      <button
        className={styles.deploymentBanner__close}
        onClick={() => {
          sessionStorage.setItem(dashboardKey, 'true');
          setDashboardDismissed(true);
        }}
      >
        <icons.close />
      </button>
    </aside>
  );
}

export default DashboardBanner;
