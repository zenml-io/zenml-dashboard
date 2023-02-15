import React from 'react';
import OutsideClickHandler from 'react-outside-click-handler';

import {
  Box,
  FlexBox,
  icons,
  LinkBox,
  PrimaryButton,
} from '../../../../components';

import styles from './index.module.scss';


export const SidePopup: React.FC<{
  onClose: () => void;
  action: any;
  flavor?: any;
}> = ({ children, action, flavor, onClose }) => (
    <FlexBox
      alignItems="center"
      justifyContent="center"
      className={styles.popupContainer}
    >
      <Box className={styles.popupClose}>
        <LinkBox onClick={onClose}>
          <icons.closeWithBorder />
        </LinkBox>
      </Box>

      <Box className={styles.sidePopup}>
        <OutsideClickHandler onOutsideClick={onClose}>
          <Box paddingLeft="md" paddingTop="sm">
            {/* <iframe
              title="ZenML - Organization Embed"
              style={{ border: '0px', height: '100vh', width: '100%' }}
              // src="https://zenml.hellonext.co/embed/home?no_header=true"
              src={flavor.docsUrl}
            ></iframe> */}
          </Box>

          <Box paddingVertical="lg" paddingHorizontal="xxxl">
            {children}
          </Box>

          <Box
            paddingVertical="lg"
            paddingHorizontal="md"
            className={styles.actionSection}
          >  
            <Box>
              <PrimaryButton onClick={action}>Register Stack Component</PrimaryButton>
            </Box>
          </Box>
        </OutsideClickHandler>
      </Box>
    </FlexBox>
);
