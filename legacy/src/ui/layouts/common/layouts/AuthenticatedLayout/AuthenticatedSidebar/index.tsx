import React from 'react';
import cn from 'classnames';
import {
  FlexBox,
  Box,
  LinkBox,
  If,
  ZenMLLogoSmall,
} from '../../../../../components';
import { usePushRoute, useSelector } from '../../../../../hooks';
import { Menu } from './Menu';
import styles from './index.module.scss';
import { SideHeader } from './SideHeader';
import { SideFooter } from './SideFooter';
import { DEFAULT_WORKSPACE_NAME } from '../../../../../../constants';
import { workspaceSelectors } from '../../../../../../redux/selectors';

export const AuthenticatedSidebar: React.FC<{
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (val: boolean) => void;
}> = ({ mobileMenuOpen, setMobileMenuOpen }) => {
  const { push } = usePushRoute();
  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);

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
          style={{ cursor: 'pointer', width: '100%', alignItems: 'center' }}
          flexDirection="column"
          onClick={() =>
            push(
              `/?workspace=${
                selectedWorkspace ? selectedWorkspace : DEFAULT_WORKSPACE_NAME
              }`,
            )
          }
        >
          <ZenMLLogoSmall />
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
