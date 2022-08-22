import React from 'react';
import { NavLink } from 'react-router-dom';
import { Paragraph, Box, FlexBox } from '../../../../../../components';

import styles from './MenuItem.module.scss';

export const MenuItem: React.FC<{
  text: string;
  to: string;
  exact?: boolean;
  Icon: React.ComponentType;
  isActive?: ({ match, location }: { match: any; location: any }) => boolean;
}> = ({ text, to, exact = false, Icon, isActive }) => (
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
      paddingHorizontal="sm"
      paddingVertical="sm"
      marginVertical="sm"
    >
      <Box>
        <Icon />
      </Box>
      <Box paddingLeft="md">
        <Paragraph color="darkGrey" size="small">
          {text}
        </Paragraph>
      </Box>
    </FlexBox>
  </NavLink>
);
