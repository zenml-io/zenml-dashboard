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
}> = ({ children, flavor, onClose, onSelectFlavor, onSeeExisting }) => {
  window.onkeydown = function (event: any) {
    if (event.key === 'Esc' || event.key === 'Escape') {
      return onClose();
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
        <Box className={styles.popupClose}>
          <LinkBox onClick={onClose}>
            <icons.close />
          </LinkBox>
        </Box>

        <Box className={styles.sidePopup}>
          <OutsideClickHandler onOutsideClick={onClose}>
            <Box paddingTop="sm">
              <iframe
                title="ZenML - Organization Embed"
                style={{
                  // border: '0px',
                  // height: '100%',
                  // width: '100%',
                  paddingBottom: '270px',
                }}
                // src="https://apidocs.zenml.io/0.35.0/"
                src={flavor?.sdkDocsUrl ? flavor?.sdkDocsUrl : flavor?.docsUrl}
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
                    <Paragraph
                      style={{
                        fontSize: '16px',
                        textDecoration: 'underline',
                        color: '#443E99',
                      }}
                    >
                      See Existing
                    </Paragraph>
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
};
