import React from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import { Box, FlexBox, icons, LinkBox } from '../../../components';
import styles from './index.module.scss';
import successTick from '../../../assets/successTick.png'


const Dimmer: React.FC = () => <Box className={styles.dimmer}></Box>;

export const SuccessPopup: React.FC<{ text: string, onClose: () => void }> = ({
  text,
  onClose, 
}) => (
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
          <Box paddingVertical="xl" paddingHorizontal="xxxl" marginTop='xl'>
            
            <FlexBox.Row justifyContent='center'>
              <img src={successTick} alt='success-tick' />
            </FlexBox.Row>

            <Box>
              <p>{text}</p>
            </Box>

          </Box>
        </OutsideClickHandler>
      </Box>
    </FlexBox>
  </>
);