import React, { useEffect, useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';

import { Box, FlexBox, PrimaryButton } from '../../../../components';

import styles from './index.module.scss';
import { replaceVersion } from '../../../../../utils/string';
import { checkUrlStatus } from '../../../../../utils/checkUrlStatus';

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

  const [defaultSdkDocsUrl] = useState(
    flavor?.sdkDocsUrl ? flavor?.sdkDocsUrl : flavor?.docsUrl,
  );
  const [is404, setIs404] = useState(false);

  useEffect(() => {
    const checkIfUrlExist = async () => {
      const check = await checkUrlStatus(defaultSdkDocsUrl);

      setIs404(check);
    };

    checkIfUrlExist();
  }, [flavor?.sdkDocsUrl]);
  const updatedSdkDocsUrl = replaceVersion(defaultSdkDocsUrl, version);

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
                src={is404 ? updatedSdkDocsUrl : defaultSdkDocsUrl}
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
