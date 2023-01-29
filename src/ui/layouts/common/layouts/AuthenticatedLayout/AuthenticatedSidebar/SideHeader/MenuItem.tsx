import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Box, FlexBox } from '../../../../../../components';
import cn from 'classnames';
import styles from './MenuItem.module.scss';
// import { DEFAULT_WORKSPACE_NAME } from '../../../../../../../constants';
// import { useSelector } from '../../../../../../hooks';
// import { workspaceSelectors } from '../../../../../../../redux/selectors';


// debugger;
export const MenuItem: React.FC<{
  subItem?: boolean;
  text: string;
  to: string;
  exact?: boolean;
  Icon: React.ComponentType;
  isActive?: ({ match, location }: { match: any; location: any }) => boolean;
}> = ({ text, to, exact = false, Icon, isActive, subItem }) => {
  // const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);
  let location = useLocation();
  return (
    <NavLink
      isActive={(match, location) => {
        if (!isActive) return !!match;
        return isActive({ match, location });
      }}
      activeClassName={styles.activeMenuItem}
      className={styles.menuItem}
      to={to}
      exact={exact}
    >
      <FlexBox
        alignItems="center"
        marginVertical="sm"
        style={{ height: '40px' }}
      >
        <Box
          className={cn(
            to === location.pathname && !subItem
              ? styles.menuItemSideBox
              : styles.menuItemSideBoxUn,
          )}
        ></Box>

        <FlexBox style={{ width: '100%', alignItems: 'center' }} flexDirection='column' >
          <Box><Icon /></Box>
        </FlexBox>
      </FlexBox>
    </NavLink>
  );
};
