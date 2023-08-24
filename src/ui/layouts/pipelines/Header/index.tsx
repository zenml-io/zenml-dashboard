import React from 'react';

import styles from './index.module.scss';
import { constantCommandsToCreatePipeline } from '../../../../constants/constantCommands';

const DefaultHeader: React.FC<{
  breadcrumbs: TBreadcrumb[];
  renderRight?: () => JSX.Element;
}> = ({ breadcrumbs, renderRight }) => (
  <div className="flex justify-between !px-4 border-b bg-theme-surface-primary border-theme-border-moderate items-center !py-5">
    <h1 className="text-display-xs font-semibold hidden md:block">
      {breadcrumbs[0]?.name}
    </h1>

    <div className={`${styles.dynamicHeaderRight} text-text-md`}>
      Check out our easy to read{' '}
      <a
        style={{ color: '#443E99' }}
        href={constantCommandsToCreatePipeline.documentation}
        target="__blank"
      >
        docs
      </a>
    </div>
  </div>
);

const HeaderWithButtons: React.FC<{
  breadcrumbs: TBreadcrumb[];
  title?: string;
  renderRight?: () => JSX.Element;
}> = ({ breadcrumbs, renderRight, title }) => (
  <div className="flex justify-between !px-4 border-b bg-theme-surface-primary border-theme-border-moderate items-center !py-5">
    <h1 className="text-display-xs font-semibold hidden md:block">{title}</h1>

    <div className={`${styles.dynamicHeaderRight} text-text-md`}>
      Check out our easy to read{' '}
      <a
        style={{ color: '#443E99' }}
        href={constantCommandsToCreatePipeline.documentation}
        target="__blank"
      >
        docs
      </a>
    </div>
  </div>
);

export const Header = {
  DefaultHeader,
  HeaderWithButtons,
};

export default Header;
