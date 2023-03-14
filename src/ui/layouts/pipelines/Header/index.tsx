import React from 'react';
import cn from 'classnames';

import { FlexBox, Box, Paragraph } from '../../../components';

import styles from './index.module.scss';
import { constantCommandsToCreatePipeline } from '../../../../constants/constantCommands';

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
        style={{ fontSize: '14px', lineHeight: '17px', color: '#828282' }}
      >
        Check out our easy to read{' '}
        <a
          style={{ color: '#443E99' }}
          href={constantCommandsToCreatePipeline.documentation}
          target="__blank"
        >
          document
        </a>
      </Paragraph>
    </FlexBox>
  </FlexBox>
);

const HeaderWithButtons: React.FC<{
  breadcrumbs: TBreadcrumb[];
  renderRight?: () => JSX.Element;
}> = ({ breadcrumbs, renderRight }) => (
  <FlexBox
    marginTop="xl"
    marginBottom="lg"
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
        {breadcrumbs[0]?.name}
      </Paragraph>
    </FlexBox>
    <FlexBox
      alignItems="center"
      flexWrap
      justifyContent="flex-end"
      className={styles.rightWrapper}
    >
      <Box marginRight="lg" className={styles.dynamicHeaderRight}>
        <Paragraph
          style={{ fontSize: '14px', lineHeight: '17px', color: '#828282' }}
        >
          Check out our easy to read{' '}
          <a
            style={{ color: '#443E99' }}
            href={constantCommandsToCreatePipeline.documentation}
            target="__blank"
          >
            document
          </a>
        </Paragraph>
      </Box>
      {/* <CreatePipelineButton /> */}

      {/* <DocumentationLink
        text={constantCommandsToCreatePipeline.documentation}
      /> */}
    </FlexBox>
  </FlexBox>
);

export const Header = {
  DefaultHeader,
  HeaderWithButtons,
};

export default Header;
