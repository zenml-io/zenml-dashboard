import React, { useState } from 'react';
import styles from './index.module.scss';
import { FlexBox, Box, icons, Paragraph, Spinner } from '../../../components';
import { iconColors, iconSizes } from '../../../../constants';
// import { verify } from 'crypto';

type ServicesSelector = {
  parent: boolean;
  setParent: any;
  resourceType: string;
  setResourceType: any;
  ids: any;
  setIds: any;
  data: any;
  resources?: any;
  verifying?: boolean;
};

const Index: React.FC<ServicesSelector> = ({
  parent,
  setParent,
  resourceType,
  setResourceType,
  ids,
  setIds,
  data,
  resources,
  verifying,
}) => {
  const [showServices, setShowServices] = useState(false);
  // const [showTypes, setShowTypes] = useState(false);
  // const [showIds, setShowIds] = useState(false);
  console.log(resources, data, 'datadata');
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

  const handleSelectIds = (id: string) => {
    if (ids?.includes(id)) {
      setIds(ids?.filter((e: string) => e !== id));
    } else {
      setIds([...ids, id]);
    }
  };

  return (
    <Box>
      <Box
        className={styles.service_selector}
        onClick={() => setShowServices(!showServices)}
      >
        <Box>
          {resourceType ? (
            <Box className={styles.service_selector_selected}>
              <Paragraph>
                {resourceType} -{' '}
                {ids.length === 0 ? (
                  <>&#91;all&#93;</>
                ) : (
                  ids?.map((e: string) => <>&#91;{e}&#93; </>)
                )}
              </Paragraph>
            </Box>
          ) : (
            <Box>
              <Paragraph>Select Resource</Paragraph>
            </Box>
          )}
        </Box>
        <Box>
          {verifying ? (
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
            <FlexBox className={styles.services}>
              <Box>
                <img src={data.logoUrl} alt={data.name} />
              </Box>
              <Box
                marginLeft="sm"
                marginRight="xl"
                className={styles.servicesName}
                // onClick={() => handleShowTypes(data?.name)}
              >
                <Paragraph>{data.name}</Paragraph>
              </Box>
              <Box>
                <input
                  type="checkbox"
                  className={styles.selectedBoxCheckbox}
                  // onClick={() => handleSelectService(data?.parent)}
                  // disabled={
                  //   resourceType !== '' && resourceType !== data?.parent
                  // }
                />
              </Box>
            </FlexBox>
            {/* Main Parent End  */}

            <div
              style={{
                position: 'absolute',
                bottom: '-5px',
                width: '5px',
                height: '5px',
                borderRadius: '100%',
                backgroundColor: 'rgba(68, 62, 153, 0.3)',
                marginLeft: '5px',
              }}
            ></div>

            <div
              style={{
                borderLeft: '1px solid rgba(68, 62, 153, 0.3)',
                marginLeft: '7px',
              }}
            >
              <div style={{ position: 'relative' }}>
                {data?.resourceTypes?.map((resource_type: any) => (
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
                          src={resource_type.logo_url}
                          alt={resource_type.resource_type}
                        />
                      </Box>
                      <Box
                        marginLeft="sm"
                        marginRight="xl"
                        className={styles.servicesName}
                        // onClick={() =>
                        //   handleShowIds(resource_type?.resource_type)
                        // }
                      >
                        <Paragraph>{resource_type.name}</Paragraph>
                      </Box>
                      <Box>
                        <input
                          type="checkbox"
                          className={styles.selectedBoxCheckbox}
                          // checked={parent === true}
                          onClick={() =>
                            resourceType === ''
                              ? setResourceType(resource_type?.resource_type)
                              : setResourceType('')
                          }
                          disabled={
                            resourceType !== '' &&
                            resourceType !== resource_type?.name
                          }
                        />
                      </Box>
                    </FlexBox>
                    {/* First Child End */}

                    <Box style={{ position: 'relative', marginLeft: '63px' }}>
                      <div
                        style={{
                          position: 'absolute',
                          bottom: '-5px',
                          width: '5px',
                          height: '5px',
                          borderRadius: '100%',
                          backgroundColor: 'rgba(68, 62, 153, 0.3)',
                          marginLeft: '5px',
                        }}
                      ></div>

                      <div
                        style={{
                          borderLeft: '1px solid rgba(68, 62, 153, 0.3)',
                          marginLeft: '7px',
                        }}
                      >
                        {resources &&
                          resources?.resources?.map((item: any) => (
                            <>
                              {/* Second Child Start */}
                              {item.resource_type ===
                                resource_type.resource_type &&
                                item.resource_ids !== null &&
                                item.resource_ids.map((id: any) => (
                                  <FlexBox marginVertical="md">
                                    <div
                                      style={{
                                        marginTop: '10px',
                                        width: '50px',
                                        borderTop:
                                          '1px solid rgba(68, 62, 153, 0.3)',
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
                                      marginLeft="sm"
                                      marginRight="xl"
                                      style={{ width: '200px' }}
                                    >
                                      <Paragraph>{id} </Paragraph>
                                    </Box>
                                    <Box>
                                      <input
                                        type="checkbox"
                                        className={styles.selectedBoxCheckbox}
                                        // checked={parent === true}
                                        onClick={() => handleSelectIds(id)}
                                        disabled={
                                          resourceType !== '' &&
                                          resourceType !== resource_type?.name
                                        }
                                      />
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
              </div>
            </div>
          </Box>
        </>
      )}
    </Box>
  );
};

export default Index;
