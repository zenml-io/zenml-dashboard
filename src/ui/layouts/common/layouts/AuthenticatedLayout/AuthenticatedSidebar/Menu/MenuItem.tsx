import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Paragraph, Box, FlexBox } from '../../../../../../components';
import cn from 'classnames';
import styles from './MenuItem.module.scss';
import { camelCaseToParagraph } from '../../../../../../../utils';

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
      <FlexBox alignItems="center" marginVertical="sm" style={{ height: '40px' }}>
        <Box
          className={cn( 
            to === location.pathname && !subItem
              ? styles.menuItemSideBox
              : styles.menuItemSideBoxUn,
          )}
        ></Box>

        <FlexBox style={{ width: '100%' }}>
          <Box paddingLeft={subItem ? 'xl' : 'md'}><Icon /></Box>
          <Box paddingLeft="md">
            <Paragraph color="darkGrey" size="small">
              {camelCaseToParagraph(text)}
            </Paragraph>
          </Box>
        </FlexBox>
      </FlexBox>
    </NavLink>
  );
};
