import React from 'react';
import cn from 'classnames';

import {
  FlexBox,
  Box,
  MaiotLogoWhite,
  LinkBox,
  If,
} from '../../../../../components';

import { Menu } from './Menu';
import styles from './index.module.scss';
import { SideFooter } from './SideFooter';

export const AuthenticatedSidebar: React.FC<{
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (val: boolean) => void;
}> = ({ mobileMenuOpen, setMobileMenuOpen }) => {
  return (
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
      paddingTop="lg"
      className={cn(styles.sidebar, mobileMenuOpen && styles.mobileSidebarOpen)}
    >
      <FlexBox
        marginBottom="xxl" 
        alignItems="center"
        paddingLeft="lg"
        // justifyContent="center"
        // className="d-md-none"
      >
        <MaiotLogoWhite />
      </FlexBox>
      
      <FlexBox
        flexDirection='column'
        justifyContent='space-between'
        style={{ height: '90%' }}
      >
        <Box style={{ height: '100%', overflowY: 'auto' }}><Menu /></Box>
        <Box><SideFooter /></Box>
      </FlexBox>
    
    </Box>
  </>
)
}