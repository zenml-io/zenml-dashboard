import React, { useState } from 'react';

import { FlexBox, Box } from '../../../../components';
import { AuthenticatedHeader } from './AuthenticatedHeader';
import { AuthenticatedSidebar } from './AuthenticatedSidebar';

import styles from './index.module.scss';

export const AuthenticatedLayout: React.FC = ({ children }) => { 
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
      <FlexBox>
        <AuthenticatedSidebar setMobileMenuOpen={setMobileMenuOpen} mobileMenuOpen={mobileMenuOpen} />
        <FlexBox flexDirection='column' className={styles.content} flex={1}>
          <Box><AuthenticatedHeader setMobileMenuOpen={setMobileMenuOpen} /></Box>
          <FlexBox>
            {children}
          </FlexBox>
        </FlexBox>
      </FlexBox>
  );
};
