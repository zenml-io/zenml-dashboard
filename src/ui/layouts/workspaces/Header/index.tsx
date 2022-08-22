import React from 'react';
import cn from 'classnames';

import { FlexBox } from '../../../components';
import { Breadcrumbs } from '../../common/Breadcrumbs';
import { CreateWorkspaceButton } from './CreateWorkspaceButton';
import { DocumentationLink } from './DocumentationLink';

import styles from './index.module.scss';

const DefaultHeader: React.FC<{
  breadcrumbs: TBreadcrumb[];
}> = ({ breadcrumbs }) => (
  <FlexBox
    marginTop="xl"
    alignItems="center"
    justifyContent="space-between"
    className={cn(styles.header, 'd-none d-md-block')}
  >
    <FlexBox fullHeight alignItems="center">
      <Breadcrumbs breadcrumbs={breadcrumbs} />
    </FlexBox>
  </FlexBox>
);

const HeaderWithButtons: React.FC<{
  breadcrumbs: TBreadcrumb[];
}> = ({ breadcrumbs }) => (
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
      <CreateWorkspaceButton />
      <DocumentationLink />
    </FlexBox>
  </FlexBox>
);

export const Header = {
  DefaultHeader,
  HeaderWithButtons,
};

export default Header;
