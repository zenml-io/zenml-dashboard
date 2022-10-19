import React from 'react';
import cn from 'classnames';

import { FlexBox, Box } from '../../../components';
import { Breadcrumbs } from '../../common/Breadcrumbs';

import { CreatePipelineButton } from './CreatePipelineButton';
import { DocumentationLink } from './DocumentationLink';

import styles from './index.module.scss';
import { constantCommandsToCreatePipeline } from '../../../../constants/constantCommands';

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
      <Box marginRight="lg">{renderRight && renderRight()}</Box>
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
        {renderRight && renderRight()}
      </Box>
      <CreatePipelineButton />

      <DocumentationLink
        text={constantCommandsToCreatePipeline.documentation}
      />
    </FlexBox>
  </FlexBox>
);

export const Header = {
  DefaultHeader,
  HeaderWithButtons,
};

export default Header;
