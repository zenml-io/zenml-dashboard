import React from 'react';
import OutsideClickHandler from 'react-outside-click-handler';

import {
  Box,
  FlexBox,
  H2,
  H3,
  H4,
  Paragraph,
  PrimaryButton,
  Spinner,
  // PrimaryButton,
  // Spinner,
} from '../../../../components';
import ReactMarkdown from 'react-markdown'
import styles from './index.module.scss';

export const SidePopup: React.FC<{
  data: any;
  onClose: () => void;
  action: any;
  flavor?: any;
  verifying?: boolean;
}> = ({ data, children, action, verifying, flavor, onClose }) => {
  window.onkeydown = function (event: any) {
    if (event.key === 'Esc' || event.key === 'Escape') {
      return onClose();
    }
  };
  return (
    <FlexBox
      alignItems="center"
      justifyContent="center"
      className={styles.popupContainer}
    >
      <Box className={styles.sidePopup}>
        <OutsideClickHandler onOutsideClick={onClose}>
          <Box
            paddingVertical="lg"
            marginBottom={'10xl'}
            paddingHorizontal="xxxl"
          >
            {children}

            <Box>
              <H2 color="primary" className={styles.title}>
                {data?.name}
              </H2>

              <Box marginTop="md">
                <Paragraph><ReactMarkdown>{data?.description}</ReactMarkdown></Paragraph>
              </Box>
            </Box>

            <Box marginTop="lg">
              <H3>Resource Types</H3>
              {data?.resourceTypes?.map((resourceType: any) => (
                <Box marginTop="md">
                  <H4 style={{ fontWeight: 'bold' }}>{resourceType?.name}</H4>
                  <Paragraph><ReactMarkdown>{resourceType?.description}</ReactMarkdown></Paragraph>
                </Box>
              ))}
            </Box>

            <Box marginTop="lg">
              <H3>Authentication Methods</H3>
              {data?.authMethods?.map((authMethod: any) => (
                <Box marginTop="md">
                  <H4 style={{ fontWeight: 'bold' }}>{authMethod?.name}</H4>
                  <Paragraph><ReactMarkdown>{authMethod?.description}</ReactMarkdown></Paragraph>
                </Box>
              ))}
            </Box>
          </Box>

          <Box
            paddingVertical="lg"
            paddingHorizontal="md"
            className={styles.actionSection}
          >
            <Box style={{}}>
              <div style={{ position: 'relative', height: '30px' }}>
                {console.log(verifying, 'verifyingverifying')}
                <PrimaryButton
                  disabled={verifying}
                  onClick={action}
                  style={{ position: 'fixed', right: '50px' }}
                >
                  {verifying ? (
                    <>
                      {' '}
                      Verifying <Spinner color={'white'} size={'xs'} />
                    </>
                  ) : (
                    'Create'
                  )}
                </PrimaryButton>
              </div>
            </Box>
          </Box>
        </OutsideClickHandler>
      </Box>
    </FlexBox>
  );
};
