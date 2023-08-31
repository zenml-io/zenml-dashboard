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
} from '../../../../components';
import ReactMarkdown from 'react-markdown';
import styles from './index.module.scss';
import { Flavor } from '../../../../../api/types';

export const SidePopup: React.FC<{
  data: any;
  onClose: () => void;
  action: any;
  flavor?: Flavor;
  disabled?: boolean;
  verifying?: boolean;
}> = ({ data, children, action, verifying, flavor, onClose, disabled }) => {
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
            paddingBottom="lg"
            marginBottom={'10xl'}
            paddingHorizontal="xxxl"
            style={{ paddingTop: '20px' }}
          >
            {children}

            <Box>
              <H2 color="primary" className={styles.title}>
                {data?.name}
              </H2>

              <Box marginTop="md">
                <Paragraph>
                  <ReactMarkdown>{data?.description}</ReactMarkdown>
                </Paragraph>
              </Box>
            </Box>

            <Box marginTop="lg">
              <H3>Resource Types</H3>
              {data?.resourceTypes?.map((resourceType: any, index: number) => (
                <Box marginTop="md" key={index}>
                  <H4 style={{ fontWeight: 'bold' }}>{resourceType?.name}</H4>
                  <Paragraph>
                    <ReactMarkdown>{resourceType?.description}</ReactMarkdown>
                  </Paragraph>
                </Box>
              ))}
            </Box>

            <Box marginTop="lg">
              <H3>Authentication Methods</H3>
              {data?.authMethods?.map((authMethod: any, index: number) => (
                <Box marginTop="md" key={index}>
                  <H4 style={{ fontWeight: 'bold' }}>{authMethod?.name}</H4>
                  <Paragraph>
                    <ReactMarkdown>{authMethod?.description}</ReactMarkdown>
                  </Paragraph>
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
                <PrimaryButton
                  disabled={verifying || disabled}
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
