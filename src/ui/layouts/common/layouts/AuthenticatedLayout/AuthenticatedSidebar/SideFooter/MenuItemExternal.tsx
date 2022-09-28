import React from 'react';
import { Paragraph, Box, FlexBox } from '../../../../../../components';
import styles from './MenuItemExternal.module.scss';

export const MenuItemExternal: React.FC<{
  subItem?: boolean;
  text: string;
  to: string;
  Icon: React.ComponentType;
}> = ({ text, to, Icon, subItem }) => {
  
  return (
    <Box className={styles.menuItem}>
      <FlexBox alignItems="center" paddingVertical="sm" marginVertical="sm">
        <FlexBox style={{ width: '100%' }}>

          <Box paddingLeft={subItem ? 'xl' : 'md'}><Icon /></Box>
         
          <Box paddingLeft="md">
          <a
            target="__blank" 
            rel="noopener noreferrer"
            className={styles.link}
            href={to}
          >
            <Paragraph color="darkGrey" size="small">
              {text}
            </Paragraph>
          </a>
          </Box>

        </FlexBox>
      </FlexBox>
    </Box>
  );
};
