import React from 'react';
import cn from 'classnames';

import { FlexBox, Box, Paragraph } from '../../../components';

import styles from './index.module.scss';
import { constantCommandsToCreateComponent } from '../../../../constants/constantCommands';

const DefaultHeader: React.FC<{
  breadcrumbs: TBreadcrumb[];
  renderRight?: () => JSX.Element;
}> = ({ breadcrumbs, renderRight }) => (
  <FlexBox
    marginTop="xl"
    alignItems="center"
    justifyContent="space-between"
    fullWidth
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
      <Box>
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
            href={constantCommandsToCreateComponent.documentation}
            target="__blank"
          >
            document
          </a>
        </Paragraph>
      </Box>
    </FlexBox>
  </FlexBox>
);

const HeaderWithButtons: React.FC<{
  breadcrumbs: TBreadcrumb[];
  title?: string;
  renderRight?: () => JSX.Element;
}> = ({ breadcrumbs, renderRight, title }) => (
  <FlexBox.Row
    marginTop="xl"
    alignItems="center"
    justifyContent="space-between"
    fullWidth
    className={styles.header2}
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
            href={constantCommandsToCreateComponent.documentation}
            target="__blank"
          >
            docs
          </a>
        </Paragraph>
      </Box>
    </FlexBox>
  </FlexBox.Row>
);

export const Header = {
  DefaultHeader,
  HeaderWithButtons,
};

export default Header;
