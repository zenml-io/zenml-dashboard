import React, { useState } from 'react';
import styles from './index.module.scss';
import { FlexBox, Box, Paragraph, Spinner, icons } from '../../../components';
import { ID_MAX_LENGTH, iconColors, iconSizes } from '../../../../constants';
import { truncate } from '../../../../utils';
// import { truncate } from 'lodash';
// import { iconColors, iconSizes } from '../../../../constants';
// import { verify } from 'crypto';

type ServicesSelector = {
  fetching?: boolean;
  setInputData?: any;
  inputData?: any;
  connector?: any;
  setConnector?: any;
  connectorResourceId?: any;
  setConnectorResourceId?: any;
  serviceConnectorResources?: any;
};
// connector={connector}
// setConnector={setConnector}
// connectorResourceId={connectorResourceId}
// setConnectorResourceId={setConnectorResourceId}
// serviceConnectorResources={serviceConnectorResources}
const Index: React.FC<ServicesSelector> = ({
  setInputData,
  inputData,
  fetching,
  connector,
  setConnector,
  connectorResourceId,
  setConnectorResourceId,
  serviceConnectorResources,
}) => {
  const [showServices, setShowServices] = useState(false);
  console.log(serviceConnectorResources, 'serviceConnectorResources');
  // const [showTypes, setShowTypes] = useState(false);
  // const [showIds, setShowIds] = useState(false);

  // const [typesToShow, setTypesToShow] = useState('');

  // const handleShowTypes = (service_name: string) => {
  //   setParent(service_name);
  //   setShowTypes(!showTypes);
  //   setParent(!parent);
  // };

  // const handleShowIds = (service_type: string) => {
  //   // setTypesToShow(service_type);
  //   setShowIds(!showIds);
  // };

  // const handleSelectIds = (id: string) => {
  //   setConnectorResourceId(id);

  // };

  // const handleSelectParent = () => {
  //   setParent(!parent);
  //   if (parent) {
  //     setResourceType([]);
  //   } else {
  //     const types = data?.resourceTypes?.map((e: any) => e.name);
  //     setResourceType(types);
  //   }
  // };
  // const handleSelectParent = () => {
  //   setParent(!parent);
  //   if (parent) {
  //     setResourceType([]);
  //   } else {
  //     const types = data?.resourceTypes?.map((e: any) => e.resource_type);
  //     setResourceType(types);
  //   }
  // };

  // const resourceTypeImage = data?.resourceTypes?.filter(
  //   (e: any) => e.name === resourceType[0],
  // );
  const resourceTypeImage = serviceConnectorResources?.filter(
    (e: any) => e.id === connector,
  );
  console.log(
    resourceTypeImage,
    serviceConnectorResources,
    connector,
    'connectorconnector',
  );

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
          <Box>
            <Paragraph>{'<not connected>'}</Paragraph>
          </Box>
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
            {/* Main Parent Start  */}

            {serviceConnectorResources?.map((connectorItem: any) => (
              <Box>
                {/* First Child Start */}
                <FlexBox className={styles.services}>
                  <div
                    style={{
                      marginTop: '10px',
                      width: '50px',
                      borderTop: '1px solid rgba(68, 62, 153, 0.3)',
                    }}
                  ></div>
                  <div
                    style={{
                      marginTop: '3px',
                      marginRight: '5px',
                      marginLeft: '-2px',
                      color: 'rgba(68, 62, 153, 0.3)',
                    }}
                  >
                    &#x27A4;
                  </div>

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
                    // onClick={() =>
                    //   handleShowIds(resource_type?.resource_type)
                    // }
                  >
                    {' '}
                    <Paragraph>
                      [{connectorItem.id} - {connectorItem.name}]ss
                    </Paragraph>
                  </Box>
                  <Box>
                    {/* <input
                          type="checkbox"
                          className={styles.selectedBoxCheckbox}
                          checked={resourceType?.includes(resource_type?.name)}
                          onClick={() =>
                            !resourceType?.includes(resource_type?.name)
                              ? setResourceType([resource_type?.name])
                              : setResourceType([])
                          }
                          disabled={
                            resourceType?.length > 0 &&
                            !resourceType?.includes(resource_type?.name)
                          }
                        /> */}
                    {/* <input
                          type="checkbox"
                          className={styles.selectedBoxCheckbox}
                          checked={resourceType?.includes(
                            resource_type?.resource_type,
                          )}
                          onClick={() =>
                            !resourceType?.includes(
                              resource_type?.resource_type,
                            )
                              ? setResourceType([resource_type?.resource_type])
                              : setResourceType([])
                          }
                          disabled={
                            resourceType?.length > 0 &&
                            !resourceType?.includes(
                              resource_type?.resource_type,
                            )
                          }
                        /> */}
                  </Box>
                </FlexBox>
                {/* First Child End */}

                <Box style={{ position: 'relative', marginLeft: '63px' }}>
                  <div
                    style={{
                      borderLeft: '1px solid rgba(68, 62, 153, 0.3)',
                      marginLeft: '7px',
                    }}
                  >
                    {connectorItem?.resources?.map((item: any) => (
                      <>
                        {/* Second Child Start */}
                        {item.resource_ids !== null &&
                          item.resource_ids.map((id: any) => (
                            <FlexBox marginVertical="md">
                              <div
                                style={{
                                  position: 'absolute',
                                  bottom: '-5px',
                                  width: '5px',
                                  height: '5px',
                                  borderRadius: '100%',
                                  backgroundColor: 'rgba(68, 62, 153, 0.3)',
                                  marginLeft: '-3px',
                                }}
                              ></div>

                              <div
                                style={{
                                  marginTop: '10px',
                                  width: '50px',
                                  borderTop: '1px solid rgba(68, 62, 153, 0.3)',
                                }}
                              ></div>
                              <div
                                style={{
                                  marginTop: '3px',
                                  marginRight: '5px',
                                  marginLeft: '-2px',
                                  color: 'rgba(68, 62, 153, 0.3)',
                                }}
                              >
                                &#x27A4;
                              </div>
                              <Box
                                onClick={() => {
                                  setConnector(connectorItem.id);
                                  setConnectorResourceId(id);
                                  setShowServices(!showServices);
                                  setInputData({ ...inputData, path: id });
                                }}
                                marginLeft="sm"
                                marginRight="xl"
                                style={{ width: '200px' }}
                              >
                                <Paragraph>{id} </Paragraph>
                              </Box>
                              <Box>
                                {/* <input
                                        type="checkbox"
                                        className={styles.selectedBoxCheckbox}
                                        checked={
                                          parent === true ||
                                          resourceType?.includes(
                                            resource_type?.resource_type,
                                          )
                                        }
                                        onClick={() => handleSelectIds(id)}
                                        disabled={
                                          (ids?.length > 0 &&
                                            !ids?.includes(id)) ||
                                          !resourceType?.includes(
                                            resource_type?.resource_type,
                                          )
                                        }
                                      /> */}
                                {/* <input
                                        type="checkbox"
                                        className={styles.selectedBoxCheckbox}
                                        checked={
                                          parent === true ||
                                          resourceType?.includes(
                                            resource_type?.name,
                                          )
                                        }
                                        onClick={() => handleSelectIds(id)}
                                        disabled={
                                          (ids?.length > 0 &&
                                            !ids?.includes(id)) ||
                                          !resourceType?.includes(
                                            resource_type?.name,
                                          )
                                        }
                                      /> */}
                              </Box>
                            </FlexBox>
                          ))}
                        {/* Second Child End */}
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
