import React from 'react';
import OutsideClickHandler from 'react-outside-click-handler';

import {
  Box,
  FlexBox,
  icons,
  LinkBox,
  Paragraph,
  PrimaryButton,
} from '../../../components';

import styles from './index.module.scss';
// import { routePaths } from '../../../../routes/routePaths';
// import { useHistory } from 'react-router-dom';
// import { useSelector } from '../../../hooks';
// import { workspaceSelectors } from '../../../../redux/selectors';

const Dimmer: React.FC = () => <Box className={styles.dimmer}></Box>;

export const SidePopup: React.FC<{
  onSeeExisting: () => void;
  onClose: () => void;
  flavor?: any;
  onSelectFlavor: any;
}> = ({ children, flavor, onClose, onSelectFlavor, onSeeExisting }) => (
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
          <Box paddingTop="sm">
            <iframe
              title="ZenML - Organization Embed"
              style={{ border: '0px', height: '100vh', width: '100%' }}
              // src="https://zenml.hellonext.co/embed/home?no_header=true"
              src={flavor?.sdkDocsUrl}
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
                <LinkBox onClick={onSeeExisting}>
                  <Paragraph>See Existing</Paragraph>
                </LinkBox>
              </Box>
              <Box>
                <PrimaryButton onClick={onSelectFlavor}>Select</PrimaryButton>
              </Box>
            </FlexBox.Row>
          </Box>
        </OutsideClickHandler>
      </Box>
    </FlexBox>
  </>
);
