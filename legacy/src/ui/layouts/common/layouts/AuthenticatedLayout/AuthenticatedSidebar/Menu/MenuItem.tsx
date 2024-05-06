import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Paragraph, Box, FlexBox } from '../../../../../../components';
import cn from 'classnames';
import styles from './MenuItem.module.scss';
import { camelCaseToParagraph } from '../../../../../../../utils';

export const MenuItem: React.FC<{
  innerItem?: boolean;
  subItem?: boolean;
  text: string;
  to: string;
  exact?: boolean;
  Icon: React.ComponentType;
  id?: any;
  isActive?: ({ match, location }: { match: any; location: any }) => boolean;
}> = ({ id, text, to, exact = false, Icon, isActive, subItem, innerItem }) => {
  let location = useLocation();

  return (
    <NavLink
      id={id}
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
        style={{ minHeight: '50px' }}
      >
        <Box
          className={cn(
            (to === location.pathname && !subItem) || innerItem
              ? styles.menuItemSideBox
              : styles.menuItemSideBoxUn,
          )}
        ></Box>

        <FlexBox
          style={{ width: '100%', alignItems: 'center' }}
          marginTop="md"
          flexDirection="column"
        >
          <Box>
            <Icon />
          </Box>
          <Box marginTop="sm" style={{ maxWidth: '80px' }}>
            <Paragraph
              color="darkGrey"
              size="small"
              style={{
                fontSize: '10px',
                lineHeight: '13px',
                textAlign: 'center',
              }}
            >
              {camelCaseToParagraph(text)}
            </Paragraph>
          </Box>
        </FlexBox>
      </FlexBox>
    </NavLink>
  );
};
