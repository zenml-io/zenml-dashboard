import React, { useState } from 'react';

import { FlexBox } from '../../../../components';
import { AuthenticatedHeader } from './AuthenticatedHeader';
import { AuthenticatedSidebar } from './AuthenticatedSidebar';

import styles from './index.module.scss';

export const AuthenticatedLayout: React.FC = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <AuthenticatedHeader setMobileMenuOpen={setMobileMenuOpen} />
      <FlexBox>
        <AuthenticatedSidebar
          setMobileMenuOpen={setMobileMenuOpen}
          mobileMenuOpen={mobileMenuOpen}
        />
        <FlexBox className={styles.content} flex={1}>
          {children}
        </FlexBox>
      </FlexBox>
    </>
  );
};
