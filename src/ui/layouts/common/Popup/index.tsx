import React from 'react';
import OutsideClickHandler from 'react-outside-click-handler';

import { Box, FlexBox, icons, LinkBox } from '../../../components';

import styles from './index.module.scss';

const Dimmer: React.FC = () => <Box className={styles.dimmer}></Box>;

export const Popup: React.FC<{ onClose: () => void }> = ({
  children,
  onClose, 
}) => {
  window.onkeydown = function( event: any ) {
    if ( event.key === 'Esc' || event.key === 'Escape' ) {
      return  onClose()
    }
  };
return (
  <>
    <Dimmer />
    <FlexBox
      alignItems="center"
      justifyContent="center"
      className={styles.popupContainer}
    >
      <Box className={styles.popup}>
        <OutsideClickHandler onOutsideClick={onClose}>
          <Box className={styles.popupClose}>
            <LinkBox onClick={onClose}>
              <icons.closeWithBorder />
            </LinkBox>
          </Box>
          <Box paddingVertical="xl" paddingHorizontal="xxxl">
            {children}
          </Box>
        </OutsideClickHandler>
      </Box>
    </FlexBox>
  </>
);
}