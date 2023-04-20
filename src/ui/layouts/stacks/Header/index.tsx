import React from 'react';
import cn from 'classnames';

import { FlexBox, Box, Paragraph } from '../../../components';

import styles from './index.module.scss';
import { constantCommandsToCreateStack } from '../../../../constants/constantCommands';
import { title } from 'process';

const DefaultHeader: React.FC<{
  breadcrumbs: TBreadcrumb[];
  renderRight?: () => JSX.Element;
}> = ({ breadcrumbs, renderRight }) => (
  <FlexBox
    marginTop="xl"
    // marginBottom="lg"
    alignItems="center"
    justifyContent="space-between"
    className={cn(styles.header, 'd-none d-md-block')}
  >
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
        style={{ fontSize: '16px', lineHeight: '17px', color: '#828282', marginTop: '20px' }}
      >
        Check out our easy to read{' '}
        <a
          style={{ color: '#443E99' }}
          href={constantCommandsToCreateStack.documentation}
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
  <FlexBox
    alignItems="center"
    justifyContent="space-between"
    className={styles.header}
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
        {title}
        {/* {breadcrumbs[0]?.name} */}
      </Paragraph>
    </FlexBox>
    <FlexBox
      alignItems="center"
      flexWrap
      justifyContent="flex-end"
      className={styles.rightWrapper}
    >
      <Box className={styles.dynamicHeaderRight}>
        <Paragraph
          style={{ fontSize: '16px', lineHeight: '17px', color: '#828282', marginTop: '20px' }}
        >
          Check out our easy to read{' '}
          <a
            style={{ color: '#443E99' }}
            href={constantCommandsToCreateStack.documentation}
            target="__blank"
          >
            docs
          </a>
        </Paragraph>
      </Box>
      {/* <CreateStackButton />

      <DocumentationLink text={constantCommandsToCreateStack.documentation} /> */}
    </FlexBox>
  </FlexBox>
);

export const Header = {
  DefaultHeader,
  HeaderWithButtons,
};

export default Header;
