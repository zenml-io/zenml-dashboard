import React from 'react';
import cn from 'classnames';

import { FlexBox, Box, Paragraph } from '../../../components';
import { Breadcrumbs } from '../../common/Breadcrumbs';

import styles from './index.module.scss';
import { constantCommandsToCreateStack } from '../../../../constants/constantCommands';

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
      <Breadcrumbs breadcrumbs={breadcrumbs} />
    </FlexBox>
    <FlexBox alignItems="center">
      <Paragraph style={{ fontSize: '14px', lineHeight: '17px', color: '#828282' }}>
        Check out our easy to read <a style={{ color: '#443E99' }} href={constantCommandsToCreateStack.documentation} target='__blank'>document</a>    
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
      <Breadcrumbs breadcrumbs={breadcrumbs} />
    </FlexBox>
    <FlexBox
      alignItems="center"
      flexWrap
      justifyContent="flex-end"
      className={styles.rightWrapper}
    >
      <Box marginRight="lg" className={styles.dynamicHeaderRight}>
        <Paragraph style={{ fontSize: '14px', lineHeight: '17px', color: '#828282' }}>
          Check out our easy to read <a style={{ color: '#443E99' }} href={constantCommandsToCreateStack.documentation} target='__blank'>document</a>    
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
