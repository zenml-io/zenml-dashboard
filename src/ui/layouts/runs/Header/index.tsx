import React from 'react';
import cn from 'classnames';

import { FlexBox, Box } from '../../../components';
import { Breadcrumbs } from '../../common/Breadcrumbs';
import { CompareRunsButton } from './CompareRunsButton';
import { CreateStackButton } from './CreateStackButton';
import { DocumentationLink } from './DocumentationLink';

import styles from './index.module.scss';

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
      {/* <Box marginRight="lg" className={styles.dynamicHeaderRight}>
        {renderRight && renderRight()}
      </Box> */}
      <CreateStackButton />
      <CompareRunsButton />
      <DocumentationLink />
    </FlexBox>
  </FlexBox>
);

export const Header = {
  DefaultHeader,
  HeaderWithButtons,
};

export default Header;
