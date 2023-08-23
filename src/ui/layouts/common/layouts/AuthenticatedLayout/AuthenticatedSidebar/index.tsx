import React from 'react';
import cn from 'classnames';
import { FlexBox, Box, LinkBox, If } from '../../../../../components';
import logo from '../../../../../assets/logo_small_color.svg';
import { useSelector } from '../../../../../hooks';
import { Menu } from './Menu';
import styles from './index.module.scss';
import { SideFooter } from './SideFooter';
import { DEFAULT_WORKSPACE_NAME } from '../../../../../../constants';
import { workspaceSelectors } from '../../../../../../redux/selectors';
import { Link } from 'react-router-dom';

export const AuthenticatedSidebar: React.FC<{
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (val: boolean) => void;
}> = ({ mobileMenuOpen, setMobileMenuOpen }) => {
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
      <div
        className={`flex border-r border-theme-border-moderate flex-col ${styles.sidebar}`}
      >
        <div className="flex border-b border-theme-border-moderate justify-center !py-2 !px-4 !bg-theme-surface-primary">
          <Link
            to={`/?workspace=${
              selectedWorkspace ? selectedWorkspace : DEFAULT_WORKSPACE_NAME
            }`}
          >
            <img alt="ZenML Logo" width={40} height={40} src={logo} />
          </Link>
        </div>
        <Box
          paddingTop="lg"
          className={cn(
            'bg-theme-surface-tertiary h-full z-10 w-[104px] p-2',
            mobileMenuOpen && styles.mobileSidebarOpen,
          )}
        >
          <FlexBox
            flexDirection="column"
            justifyContent="space-between"
            style={{ height: '90%' }}
          >
            <Box className="space-y-4 h-full py-2 overflow-y-auto">
              <Menu />
            </Box>
            <Box>
              <SideFooter />
            </Box>
          </FlexBox>
        </Box>{' '}
      </div>
    </>
  );
};
