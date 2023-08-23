import React from 'react';

import { FlexBox, Box, Paragraph } from '../../../components';

import styles from './index.module.scss';
import { constantCommandsToCreatePipeline } from '../../../../constants/constantCommands';

const DefaultHeader: React.FC<{
  breadcrumbs: TBreadcrumb[];
  renderRight?: () => JSX.Element;
}> = ({ breadcrumbs, renderRight }) => (
  <FlexBox marginTop="xl" alignItems="center" justifyContent="space-between">
    <FlexBox fullHeight alignItems="center">
      <Paragraph
        style={{
          fontSize: '42px',
          fontWeight: 'bold',
          lineHeight: '48px',
          color: '#424240',
        }}
      >
        {breadcrumbs[0]?.name}
      </Paragraph>
    </FlexBox>
    <FlexBox alignItems="center">
      <Paragraph
        style={{
          fontSize: '16px',
          lineHeight: '17px',
          color: '#828282',
          marginTop: '20px',
        }}
      >
        Check out our easy to read{' '}
        <a
          style={{ color: '#443E99' }}
          href={constantCommandsToCreatePipeline.documentation}
          target="__blank"
        >
          docs
        </a>
      </Paragraph>
    </FlexBox>
  </FlexBox>
);

const HeaderWithButtons: React.FC<{
  breadcrumbs: TBreadcrumb[];
  title?: string;
  renderRight?: () => JSX.Element;
}> = ({ breadcrumbs, renderRight, title }) => (
  <div className="flex justify-between !px-4 border-b border-theme-border-moderate items-center !py-5">
    <h1 className="text-display-xs font-semibold">{title}</h1>

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
