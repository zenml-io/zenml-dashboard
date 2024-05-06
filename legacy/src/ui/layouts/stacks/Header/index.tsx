import React from 'react';
import cn from 'classnames';
import { FlexBox, Box, Paragraph } from '../../../components';
import styles from './index.module.scss';
import { constantCommandsToCreateStack } from '../../../../constants/constantCommands';

const DefaultHeader: React.FC<{
  breadcrumbs: TBreadcrumb[];
  renderRight?: () => JSX.Element;
}> = ({ breadcrumbs, renderRight }) => (
  <FlexBox
    marginTop="xl"
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
    marginTop="xl"
    alignItems="center"
    justifyContent="space-between"
    className={styles.header2}
  >
    <FlexBox flexDirection="column" className="d-none d-md-flex">
      <Paragraph
        style={{
          fontSize: '42px',
          fontWeight: 'bold',
          lineHeight: '48px',
          color: '#424240',
          marginBottom: '8px',
        }}
      >
        {title}
      </Paragraph>
      <Paragraph>
        Don't have any MLOps infrastructure deployed? Learn how to{' '}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://docs.zenml.io/stacks-and-components/stack-deployment"
        >
          deploy a MLOps stack
        </a>{' '}
        from scratch.
      </Paragraph>
    </FlexBox>

    <FlexBox
      alignItems="end"
      flexWrap
      style={{ height: '100%' }}
      justifyContent="flex-end"
      className={styles.rightWrapper}
    >
      <Box className={styles.dynamicHeaderRight}>
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
            href={constantCommandsToCreateStack.documentation}
            target="__blank"
          >
            docs
          </a>
        </Paragraph>
      </Box>
    </FlexBox>
  </FlexBox>
);

export const Header = {
  DefaultHeader,
  HeaderWithButtons,
};

export default Header;
