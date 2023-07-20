import React from 'react';
import OutsideClickHandler from 'react-outside-click-handler';

import { Box, FlexBox, PrimaryButton } from '../../../../components';

import styles from './index.module.scss';
import { replaceVersion } from '../../../../../utils/string';

export const SidePopup: React.FC<{
  onClose: () => void;
  action: any;
  flavor?: any;
  version: string;
}> = ({ children, action, flavor, onClose, version }) => {
  window.onkeydown = function (event: any) {
    if (event.key === 'Esc' || event.key === 'Escape') {
      return onClose();
    }
  };

  const sdkDocsUrl = flavor?.sdkDocsUrl ? flavor?.sdkDocsUrl : flavor?.docsUrl;
  const updatedSdkDocsUrl = replaceVersion(sdkDocsUrl, version);
  return (
    <FlexBox
      alignItems="center"
      justifyContent="center"
      className={styles.popupContainer}
    >
      <Box className={styles.sidePopup}>
        <OutsideClickHandler onOutsideClick={onClose}>
          {version && (
            <Box paddingTop="sm">
              <iframe
                title="ZenML - Organization Embed"
                style={{
                  border: '0px',
                  height: '100vh',
                  width: '100%',
                  paddingBottom: '255px',
                }}
                // src="https://apidocs.zenml.io/0.35.0/"
                src={updatedSdkDocsUrl}
              ></iframe>
            </Box>
          )}

          <Box paddingVertical="lg" paddingHorizontal="xxxl">
            {children}
          </Box>

          <Box
            paddingVertical="lg"
            paddingHorizontal="md"
            className={styles.actionSection}
          >
            <Box style={{}}>
              <div style={{ position: 'relative', height: '30px' }}>
                <PrimaryButton
                  onClick={action}
                  style={{ position: 'fixed', right: '50px' }}
                >
                  Register Component
                </PrimaryButton>
              </div>
            </Box>
          </Box>
        </OutsideClickHandler>
      </Box>
    </FlexBox>
  );
};
