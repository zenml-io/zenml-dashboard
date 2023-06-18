import React, { useState } from 'react';
import styles from './index.module.scss';
import { FlexBox, Box, Paragraph, Spinner, icons } from '../../../components';
import { ID_MAX_LENGTH, iconColors, iconSizes } from '../../../../constants';
import { truncate } from '../../../../utils';
import ReactTooltip from 'react-tooltip';

type ServicesSelector = {
  fetching?: boolean;
  setInputData?: any;
  inputData?: any;
  connector?: any;
  setConnector?: any;
  connectorResourceId?: any;
  setConnectorResourceId?: any;
  serviceConnectorResources?: any;
  connectorResourceIdAttr?: string;
  sensitiveFields?: any;
  defaultMappedConfig?: any;
};

const Index: React.FC<ServicesSelector> = ({
  setInputData,
  inputData,
  fetching,
  connector,
  setConnector,
  connectorResourceId,
  setConnectorResourceId,
  serviceConnectorResources,
  connectorResourceIdAttr,
  sensitiveFields,
  defaultMappedConfig,
}) => {
  const [showServices, setShowServices] = useState(false);

  const resourceTypeImage = serviceConnectorResources?.filter(
    (e: any) => e.id === connector,
  );
  console.log(defaultMappedConfig, inputData, 'fefefw');

  return (
    <Box>
      <Box
        className={styles.service_selector}
        onClick={() => setShowServices(!showServices)}
      >
        {connector ? (
          <FlexBox className={styles.service_selector_selected}>
            <Box marginRight="sm">
              {/* <img src={data?.logoUrl} alt={data?.name} /> */}
            </Box>
            {!fetching && (
              <Paragraph>
                <img
                  src={resourceTypeImage[0]?.connector_type?.logo_url}
                  alt={resourceTypeImage[0]?.connector_type.name}
                />{' '}
                &#91;{' '}
                {truncate(connector, ID_MAX_LENGTH) +
                  '-' +
                  resourceTypeImage[0]?.name}
                &#93; {connectorResourceId}
              </Paragraph>
            )}
          </FlexBox>
        ) : (
          <FlexBox alignItems="center">
            <Box marginRight="sm">
              <icons.notConnected />
            </Box>
            <Paragraph>{'<not connected>'}</Paragraph>
          </FlexBox>
        )}

        <Box>
          {fetching ? (
            <Spinner color={'black'} size={'xs'} />
          ) : (
            <icons.chevronDown color={iconColors.black} size={iconSizes.xs} />
          )}
        </Box>
      </Box>
      {showServices && (
        <>
          <Box className={styles.services_container}>
            <FlexBox className={styles.services}>
              <Box>
                <icons.notConnected />
              </Box>
              <Box
                marginLeft="sm"
                marginRight="xl"
                className={styles.servicesName}
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  setInputData({
                    ...defaultMappedConfig,
                    [connectorResourceIdAttr as string]: '',
                  });
                  setConnector(null);
                  setConnectorResourceId(null);
                  setShowServices(!showServices);
                }}
              >
                <Paragraph>{'<not connected>'}</Paragraph>
              </Box>
            </FlexBox>

            {serviceConnectorResources?.map((connectorItem: any) => (
              <Box>
                <FlexBox className={styles.services}>
                  <Box>
                    <img
                      src={connectorItem.connector_type.logo_url}
                      alt={connectorItem.connector_type.logo_url}
                    />
                  </Box>
                  <Box
                    aria-disabled
                    marginLeft="sm"
                    marginRight="xl"
                    className={styles.servicesName}
                    style={{
                      cursor: connectorItem?.error ? 'no-drop' : 'pointer',
                    }}
                    // onClick={() =>
                    //   handleShowIds(resource_type?.resource_type)
                    // }
                  >
                    {' '}
                    <Paragraph color="grey">
                      [{connectorItem.id} - {connectorItem.name}]
                    </Paragraph>
                  </Box>

                  {connectorItem?.error && (
                    <Box>
                      <div>
                        <div data-tip data-for={connectorItem?.id}>
                          <icons.alertTriangle
                            size={iconSizes.sm}
                            color={iconColors.mustard}
                            style={{ cursor: 'pointer' }}
                          />
                        </div>
                        <ReactTooltip
                          id={connectorItem?.id}
                          place="top"
                          effect="solid"
                        >
                          <Paragraph
                            color="white"
                            style={{ maxWidth: '400px' }}
                          >
                            {connectorItem?.error}
                          </Paragraph>
                        </ReactTooltip>
                      </div>
                    </Box>
                  )}
                </FlexBox>

                <Box style={{ position: 'relative' }}>
                  <div
                    style={{
                      borderLeft: '1px solid rgba(68, 62, 153, 0.3)',
                      marginLeft: '7px',
                    }}
                  >
                    {connectorItem?.resources?.map((item: any) => (
                      <>
                        {item.resource_ids !== null &&
                          item.resource_ids.map((id: any) => (
                            <FlexBox marginVertical="md">
                              <div
                                style={{
                                  position: 'absolute',
                                  bottom: '-10px',
                                  width: '5px',
                                  height: '5px',
                                  borderRadius: '100%',
                                  backgroundColor: 'rgba(68, 62, 153, 0.3)',
                                  marginLeft: '-3px',
                                }}
                              ></div>

                              <div
                                style={{
                                  marginTop: '15px',
                                  width: '50px',
                                  borderTop: '1px solid rgba(68, 62, 153, 0.3)',
                                }}
                              ></div>
                              <div
                                style={{
                                  marginTop: '8px',
                                  marginRight: '5px',
                                  marginLeft: '-2px',
                                  color: 'rgba(68, 62, 153, 0.3)',
                                }}
                              >
                                &#x27A4;
                              </div>
                              <Box
                                onClick={() => {
                                  if (sensitiveFields?.length) {
                                    sensitiveFields.map(
                                      (item: string) => delete inputData[item],
                                    );
                                    setInputData({
                                      ...inputData,
                                      [connectorResourceIdAttr as string]: id,
                                    });
                                  } else {
                                    setInputData({
                                      [connectorResourceIdAttr as string]: id,
                                    });
                                  }
                                  setConnector(connectorItem.id);
                                  setConnectorResourceId(id);
                                  setShowServices(!showServices);
                                }}
                                padding="xs"
                                style={{
                                  backgroundColor:
                                    connectorResourceId === id
                                      ? 'rgba(234, 234, 234, 0.5)'
                                      : '',
                                  border:
                                    connectorResourceId === id
                                      ? '1px dashed #000000'
                                      : '0px',
                                  borderRadius: '4px',
                                  cursor: 'pointer',
                                }}
                              >
                                <Paragraph>{id} </Paragraph>
                              </Box>
                            </FlexBox>
                          ))}
                      </>
                    ))}
                  </div>
                </Box>
              </Box>
            ))}
          </Box>
        </>
      )}
    </Box>
  );
};

export default Index;
