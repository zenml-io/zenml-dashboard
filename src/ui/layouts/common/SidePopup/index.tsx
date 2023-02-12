import React from 'react';
import OutsideClickHandler from 'react-outside-click-handler';

import {
  Box,
  FlexBox,
  H3,
  icons,
  LinkBox,
  Paragraph,
  PrimaryButton,
} from '../../../components';

import styles from './index.module.scss';

const Dimmer: React.FC = () => <Box className={styles.dimmer}></Box>;

export const SidePopup: React.FC<{ onClose: () => void; flavor?: any }> = ({
  children,
  flavor,
  onClose,
}) => (
  <>
    <Dimmer />
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
            <iframe
              title="ZenML - Organization Embed"
              style={{ border: '0px', height: '100vh', width: '100%' }}
              // src="https://zenml.hellonext.co/embed/home?no_header=true"
              src={flavor.docsUrl}
            ></iframe>
          </Box>

          <Box paddingVertical="lg" paddingHorizontal="xxxl">
            {children}
          </Box>

          <Box
            paddingVertical="lg"
            paddingHorizontal="md"
            className={styles.actionSection}
          >
            <FlexBox.Row justifyContent="space-between" alignItems="center">
              <Box>
                <LinkBox onClick={() => console.log('See Existing')}>
                  <Paragraph>See Existing</Paragraph>
                </LinkBox>
              </Box>
              <Box>
                <PrimaryButton>Select</PrimaryButton>
              </Box>
            </FlexBox.Row>
          </Box>
        </OutsideClickHandler>
      </Box>
    </FlexBox>
  </>
);
