import React from 'react';
import cn from 'classnames';
import {
  FlexBox,
  Box,
  ZenMLLogoWhite,
  LinkBox,
  If,
} from '../../../../../components';
import { usePushRoute } from '../../../../../hooks';
import { Menu } from './Menu';
import styles from './index.module.scss';
import { SideHeader } from './SideHeader';
import { SideFooter } from './SideFooter';
import { DEFAULT_PROJECT_NAME } from '../../../../../../constants';

export const AuthenticatedSidebar: React.FC<{
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (val: boolean) => void;
}> = ({ mobileMenuOpen, setMobileMenuOpen }) => {
  const { push } = usePushRoute();

  const url_string = window.location.href; 
  const url = new URL(url_string);
  const projectName = url.searchParams.get("project");

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
        className={cn(
          styles.sidebar,
          mobileMenuOpen && styles.mobileSidebarOpen,
        )}
      >
        <FlexBox
          marginBottom="xxl"
          alignItems="center"
          paddingLeft="lg"
          style={{ cursor: 'pointer' }}
          onClick={() => push(`/?project=${projectName ? projectName : DEFAULT_PROJECT_NAME}`)}
        >
          <ZenMLLogoWhite />
        </FlexBox>

        <FlexBox
          flexDirection="column"
          justifyContent="space-between"
          style={{ height: '90%' }}
        >
          <Box>
            <SideHeader />
          </Box>
          <Box style={{ height: '100%', overflowY: 'auto' }}>
            <Menu />
          </Box>
          <Box>
            <SideFooter />
          </Box>
        </FlexBox>
      </Box>
    </>
  );
};
