import React from 'react';
import OutsideClickHandler from 'react-outside-click-handler';

import { Box, FlexBox, icons, LinkBox } from '../../../components';

import styles from './index.module.scss';

const Dimmer: React.FC = () => <Box className={styles.dimmer}></Box>;

export const PopupSmall: React.FC<{ width?: string, showCloseIcon?: any, onClose: any }> = ({
  children,
  width,
  showCloseIcon,
  onClose, 
}) => (
  <>
    <Dimmer />
    <FlexBox
      alignItems="center"
      justifyContent="center"
      className={styles.popupContainer}
    >
      <Box className={styles.popup} style={{ width }}>
        <OutsideClickHandler onOutsideClick={onClose}>
          {showCloseIcon && (
            <Box className={styles.popupClose}>
              <LinkBox onClick={onClose}>
                <icons.closeWithBorder />
              </LinkBox>
            </Box>
          )}
          <Box paddingVertical="lg" paddingHorizontal="lg">
            {children}
          </Box>
        </OutsideClickHandler>
      </Box>
    </FlexBox>
  </>
);