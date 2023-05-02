import React from 'react';
import { Box, FlexBox } from '../../../../../../components';
import styles from './MenuItemExternal.module.scss';

export const MenuItemExternal: React.FC<{
  id?: any;
  subItem?: boolean;
  text: string;
  to: string;
  Icon: React.ComponentType;
}> = ({ id, text, to, Icon, subItem }) => {
  return (
    <Box id={id} className={styles.menuItem} style={{ marginLeft: '6px' }}>
      <FlexBox alignItems="center" paddingVertical="sm" marginVertical="sm">
        <FlexBox
          style={{ width: '100%', alignItems: 'center' }}
          flexDirection="column"
        >
          <a
            target="__blank"
            rel="noopener noreferrer"
            className={styles.link}
            href={to}
          >
            <Box>
              <Icon />
            </Box>
          </a>
        </FlexBox>
      </FlexBox>
    </Box>
  );
};
