import React, { useState, useEffect } from 'react';

import { FlexBox, Box } from '../../../../components';
import { useDispatch, useLocationPath } from '../../../../hooks';
import { AuthenticatedHeader } from './AuthenticatedHeader';
import { AuthenticatedSidebar } from './AuthenticatedSidebar';
import styles from './index.module.scss';
import { serverInfoActions } from '../../../../../redux/actions';

// export const AuthenticatedLayout: React.FC = ({ breadcrumb, children }) => {
// @ts-ignore
export const AuthenticatedLayout = ({ breadcrumb, children }: any) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(serverInfoActions.getServerInfo({}));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
        <FlexBox
          style={{
            position: 'relative',
            overflow: 'hidden',
            overflowY: 'scroll',
          }}
        >
          {children}
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
};
