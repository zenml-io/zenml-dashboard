import React from 'react';
import cn from 'classnames';

import {
  FlexBox,
  Box,
  MaiotLogo,
  LinkBox,
  If,
} from '../../../../../components';

import { Menu } from './Menu';

import styles from './index.module.scss';

export const AuthenticatedSidebar: React.FC<{
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (val: boolean) => void;
}> = ({ mobileMenuOpen, setMobileMenuOpen }) => (
  <>
    <If condition={mobileMenuOpen}>
      {() => (
        <LinkBox
          onClick={() => setMobileMenuOpen(false)}
          className={cn('d-md-none', styles.dimmer)}
        />
      )}
    </If>
    <Box
      // paddingHorizontal="md"
      paddingTop="lg"
      className={cn(styles.sidebar, mobileMenuOpen && styles.mobileSidebarOpen)}
    >
      <FlexBox
        marginBottom="xxl"
        alignItems="center"
        justifyContent="center"
        className="d-md-none"
      >
        <MaiotLogo />
      </FlexBox>
      <Menu />
    </Box>
  </>
);
