import React, { useState } from 'react';

import { FlexBox, Box } from '../../../../components';
import { useLocationPath } from '../../../../hooks';
import { AuthenticatedHeader } from './AuthenticatedHeader';
import { AuthenticatedSidebar } from './AuthenticatedSidebar';
import styles from './index.module.scss';
export const AuthenticatedLayout = ({ breadcrumb, children }: any) => {
  const locationPath = useLocationPath();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(
    locationPath.includes('components') ? true : false,
  );
    
  return (
    <FlexBox>
      <AuthenticatedSidebar
        setMobileMenuOpen={setMobileMenuOpen}
        mobileMenuOpen={mobileMenuOpen}
      />

      <FlexBox flexDirection="column" className={styles.content} flex={1}>
        <Box>
          <AuthenticatedHeader
            breadcrumb={breadcrumb}
            setMobileMenuOpen={setMobileMenuOpen}
          />
        </Box>
        <FlexBox style={{position:'relative', overflow:'hidden', overflowY:'scroll'}}>{children}</FlexBox>
      </FlexBox>
    </FlexBox>
  );
};
