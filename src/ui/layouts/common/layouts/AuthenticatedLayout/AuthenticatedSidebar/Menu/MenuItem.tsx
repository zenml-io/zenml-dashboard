import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Paragraph, Box, FlexBox } from '../../../../../../components';
import cn from 'classnames';
import styles from './MenuItem.module.scss';

export const MenuItem: React.FC<{
  subItem?: boolean;
  text: string;
  to: string;
  exact?: boolean;
  Icon: React.ComponentType;
  isActive?: ({ match, location }: { match: any; location: any }) => boolean;
}> = ({ text, to, exact = false, Icon, isActive, subItem }) => {
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
      <FlexBox alignItems="center" paddingVertical="sm" marginVertical="sm">
        <Box
          className={cn(
            to === location.pathname && !subItem
              ? styles.menuItemSideBox
              : null,
          )}
        ></Box>

        <FlexBox>
          <Box paddingLeft={subItem ? 'xl' : 'md'}>
            <Icon />
          </Box>
          <Box paddingLeft="md">
            <Paragraph color="darkGrey" size="small">
              {text}
            </Paragraph>
          </Box>
        </FlexBox>
      </FlexBox>
    </NavLink>
  );
};
