import React from 'react';
import cn from 'classnames';

import { FlexBox, Box, Paragraph } from '../../../components';
import styles from './index.module.scss';
import { constantCommandsToCreateRuns } from '../../../../constants/constantCommands';

const DefaultHeader: React.FC<{
  breadcrumbs: TBreadcrumb[];
  renderRight?: () => JSX.Element;
}> = ({ breadcrumbs, renderRight }) => (
  <FlexBox
    marginTop="xl"
    marginBottom="lg"
    alignItems="center"
    justifyContent="space-between"
    className={cn(styles.header, 'd-none d-md-block')}
  >
    <FlexBox className="d-none d-md-flex">
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
    <FlexBox fullHeight alignItems="center"></FlexBox>
    <FlexBox alignItems="center">
      <Box marginRight="lg">{renderRight && renderRight()}</Box>
    </FlexBox>
  </FlexBox>
);

const HeaderWithButtons: React.FC<{
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
        href={constantCommandsToCreateRuns.documentation}
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
