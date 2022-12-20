import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Paragraph, Box, FlexBox } from '../../../../../../components';
import cn from 'classnames';
import styles from './MenuItem.module.scss';
import { camelCaseToParagraph } from '../../../../../../../utils';
// import { DEFAULT_PROJECT_NAME } from '../../../../../../../constants';

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

  // const url_string = window.location.href;
  // const url = new URL(url_string);
  // const projectName = url.searchParams.get('project');

  // const selectedProject = useSelector(projectSelectors.selectedProject);
  console.log(location, 'test111');
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
        style={{ height: '40px' }}
      >
        <Box
          className={cn(
            (to === location.pathname && !subItem) || innerItem
              ? styles.menuItemSideBox
              : styles.menuItemSideBoxUn,
          )}
        ></Box>

        <FlexBox style={{ width: '100%' }}>
          <Box paddingLeft={subItem ? 'xl' : 'md'}>
            <Icon />
          </Box>
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
