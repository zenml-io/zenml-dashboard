import React, { useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';

import {
  Box,
  FlexBox,
  icons,
  LinkBox,
  Paragraph,
  PrimaryButton,
} from '../../../../components';
import ReactMarkdown from 'react-markdown';
import styles from './index.module.scss';
// import { routePaths } from '../../../../routes/routePaths';
// import { useHistory } from 'react-router-dom';
// import { useSelector } from '../../../hooks';
// import { workspaceSelectors } from '../../../../redux/selectors';

const Dimmer: React.FC = () => <Box className={styles.dimmer}></Box>;

export const SidePopup: React.FC<{
  onSeeExisting: () => void;
  onClose: () => void;
  connectorType?: any;
  onSelectType?: any;
}> = ({ children, connectorType, onClose, onSelectType, onSeeExisting }) => {
  window.onkeydown = function (event: any) {
    if (event.key === 'Esc' || event.key === 'Escape') {
      return onClose();
    }
  };

  const [tab, setTab] = useState('Overview');
  const [serviceTypes, setServiceTypes] = useState(
    connectorType?.resourceTypes[0]?.name,
  );
  const [authMethod, setAuthMethod] = useState(
    connectorType?.authMethods[0]?.name,
  );
  const tabs = [
    { name: 'Overview' },
    { name: 'Service Types' },
    { name: 'Authentication Methods' },
  ];

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
            <Box marginVertical="lg" marginHorizontal="xxxl">
              <FlexBox>
                <Box className={styles.mainImage}>
                  <img src={connectorType?.logoUrl} alt={connectorType?.name} />
                </Box>
                <Box marginLeft="xl">
                  <Paragraph className={styles.title}>
                    {connectorType?.name}
                  </Paragraph>
                  <FlexBox marginTop="lg">
                    {connectorType?.resourceTypes?.map((e: any) => (
                      <Box
                        className={styles.resourceTypesImages}
                        marginLeft="sm"
                      >
                        <img src={e?.logo_url} alt={e?.name} />
                      </Box>
                    ))}
                  </FlexBox>
                </Box>
              </FlexBox>

              <Box marginTop="lg">
                <FlexBox>
                  {tabs?.map((e: any, index: number) => (
                    <Box
                      key={index}
                      tabIndex={index}
                      style={{
                        padding: '15px 20px',
                        cursor: 'pointer',
                        borderBottom: `2px solid ${
                          tab === e?.name ? '#443E99' : 'transparent'
                        }`,
                      }}
                      onClick={() => setTab(e?.name)}
                    >
                      <Paragraph
                        className={styles.tabName}
                        style={{
                          color: `${
                            tab === e?.name
                              ? '#443E99'
                              : 'rgba(66, 66, 64, 0.8)'
                          }`,
                        }}
                      >
                        {e.name}
                      </Paragraph>
                    </Box>
                  ))}
                </FlexBox>
              </Box>

              {tab === 'Overview' ? (
                <Box marginTop="lg" className={styles.descriptionWrapper}>
                  <Paragraph className={styles.description}>
                    <ReactMarkdown>{connectorType?.description}</ReactMarkdown>
                  </Paragraph>
                </Box>
              ) : tab === 'Service Types' ? (
                <Box marginTop="lg">
                  <FlexBox className={styles.beansWrapper}>
                    {connectorType?.resourceTypes?.map(
                      (e: any, index: number) => (
                        <Box
                          key={index}
                          tabIndex={index}
                          marginLeft="sm"
                          className={styles.bean}
                          style={{
                            background:
                              serviceTypes === e?.name
                                ? 'rgba(68, 62, 153, 0.1)'
                                : '#fff',
                            border: `1px solid ${
                              serviceTypes === e?.name ? '#443E99' : '#A8A8A8'
                            }`,
                          }}
                          onClick={() => setServiceTypes(e?.name)}
                        >
                          <Paragraph
                            style={{
                              color:
                                serviceTypes === e?.name
                                  ? '#443E99'
                                  : 'rgba(152, 149, 149, 0.8)',
                            }}
                          >
                            {e?.name}
                          </Paragraph>
                        </Box>
                      ),
                    )}
                  </FlexBox>

                  <Box className={styles.descriptionWrapper} marginTop="lg">
                    {connectorType?.resourceTypes?.map((e: any) => (
                      <>
                        {e?.name === serviceTypes && (
                          <Paragraph className={styles.description}>
                            <ReactMarkdown>{e?.description}</ReactMarkdown>
                          </Paragraph>
                        )}
                      </>
                    ))}
                  </Box>
                </Box>
              ) : tab === 'Authentication Methods' ? (
                <Box marginTop="lg">
                  <FlexBox className={styles.beansWrapper}>
                    {connectorType?.authMethods?.map(
                      (e: any, index: number) => (
                        <Box
                          key={index}
                          tabIndex={index}
                          marginLeft="sm"
                          className={styles.bean}
                          style={{
                            background:
                              authMethod === e?.name
                                ? 'rgba(68, 62, 153, 0.1)'
                                : '#fff',
                            border: `1px solid ${
                              authMethod === e?.name ? '#443E99' : '#A8A8A8'
                            }`,
                          }}
                          onClick={() => setAuthMethod(e?.name)}
                        >
                          <Paragraph
                            style={{
                              color:
                                authMethod === e?.name
                                  ? '#443E99'
                                  : 'rgba(152, 149, 149, 0.8)',
                            }}
                          >
                            {e?.name}
                          </Paragraph>
                        </Box>
                      ),
                    )}
                  </FlexBox>

                  <Box className={styles.descriptionWrapper} marginTop="lg">
                    {connectorType?.authMethods?.map((e: any) => (
                      <>
                        {e?.name === authMethod && (
                          <Paragraph className={styles.description}>
                            <ReactMarkdown>{e?.description}</ReactMarkdown>
                          </Paragraph>
                        )}
                      </>
                    ))}
                  </Box>
                </Box>
              ) : null}
            </Box>

            <Box
              paddingVertical="lg"
              paddingHorizontal="md"
              className={styles.actionSection}
            >
              <FlexBox.Row justifyContent="space-between" alignItems="flex-end">
                <PrimaryButton onClick={onSelectType}>Next</PrimaryButton>
              </FlexBox.Row>
            </Box>
          </OutsideClickHandler>
        </Box>
      </FlexBox>
    </>
  );
};
