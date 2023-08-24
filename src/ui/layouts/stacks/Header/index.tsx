import React from 'react';

import styles from './index.module.scss';
import { constantCommandsToCreateStack } from '../../../../constants/constantCommands';

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
        href={constantCommandsToCreateStack.documentation}
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
    <div className="hidden md:block">
      <h1 className="text-display-xs font-semibold ">{title}</h1>
      <p>
        Don't have any MLOps infrastructure deployed? Learn how to{' '}
        <a
          className="underline hover:!decoration-transparent duration-200 transition-all"
          target="_blank"
          rel="noopener noreferrer"
          href="https://docs.zenml.io/stacks-and-components/stack-deployment"
        >
          deploy a MLOps stack
        </a>{' '}
        from scratch.
      </p>
    </div>
    <div className={`${styles.dynamicHeaderRight} text-text-md`}>
      Check out our easy to read{' '}
      <a
        style={{ color: '#443E99' }}
        href={constantCommandsToCreateStack.documentation}
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
