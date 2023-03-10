import React from 'react';
import cn from 'classnames';

import { FlexBox, Box, Paragraph } from '../../../components';
import { Breadcrumbs } from '../../common/Breadcrumbs';

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
    className={cn(styles.header, 'd-none d-md-block')}
  >
    <FlexBox fullHeight alignItems="center">
      <Breadcrumbs breadcrumbs={breadcrumbs} />
    </FlexBox>
    <FlexBox alignItems="center">
      <Box marginRight="lg">
        <Paragraph style={{ fontSize: '14px', lineHeight: '17px', color: '#828282' }}>
          Check out our easy to read <a style={{ color: '#443E99' }} href={constantCommandsToCreateComponent.documentation} target='__blank'>document</a>    
        </Paragraph>
      </Box>
    </FlexBox>
  </FlexBox>
);

const HeaderWithButtons: React.FC<{
  breadcrumbs: TBreadcrumb[];
  renderRight?: () => JSX.Element;
}> = ({ breadcrumbs, renderRight }) => (
  <FlexBox
    marginTop="xl"
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
          Check out our easy to read <a style={{ color: '#443E99' }} href={constantCommandsToCreateComponent.documentation} target='__blank'>document</a>    
        </Paragraph>
      </Box>
      {/* <CreatePipelineButton />

      <DocumentationLink
        text={constantCommandsToCreateComponent.documentation}
      /> */}
    </FlexBox>
  </FlexBox>
);

export const Header = {
  DefaultHeader,
  HeaderWithButtons,
};

export default Header;
