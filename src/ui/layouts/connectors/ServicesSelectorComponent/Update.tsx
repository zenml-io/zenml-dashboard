import React, { useState } from 'react';
import styles from './index.module.scss';
import { FlexBox, Box, icons, Paragraph, Spinner } from '../../../components';
import { iconColors, iconSizes } from '../../../../constants';
// import { verify } from 'crypto';

type ServicesSelector = {
  parent: boolean;
  setParent: any;
  resourceType: any;
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

  const handleSelectIds = (id: string) => {
    if (ids?.includes(id)) {
      setIds(ids?.filter((e: string) => e !== id));
    } else {
      setIds([...ids, id]);
    }
  };

  const handleSelectParent = () => {
    setParent(!parent);
    if (parent) {
      setResourceType([]);
    } else {
      const types = data?.resourceTypes?.map((e: any) => e.resource_type);
      setResourceType(types);
    }
  };

  // const resourceTypeImage = data?.resourceTypes?.filter(
  //   (e: any) => e.resource_type === resourceType[0],
  // );

  return (
    <Box>
      <Box
        className={styles.service_selector}
        onClick={() => setShowServices(!showServices)}
      >
        {parent ? (
          <FlexBox className={styles.service_selector_selected}>
            <Box marginRight="sm">
              <img src={data?.logoUrl} alt={data?.name} />
            </Box>
            <Paragraph>{data?.name}-&#91;all&#93;</Paragraph>
          </FlexBox>
        ) : (
          <Box>
            {resourceType?.length > 0 ? (
              <Box className={styles.service_selector_selected}>
                {resourceType?.map((e: any) => (
                  <FlexBox>
                    <Box>
                      <Paragraph>
                        {e} -{' '}
                        {ids.length === 0 ? (
                          <>&#91;all&#93;</>
                        ) : (
                          ids?.map((e: string) => <>&#91;{e}&#93; </>)
                        )}
                      </Paragraph>
                    </Box>
                  </FlexBox>
                ))}
              </Box>
            ) : (
              <Box>
                <Paragraph>Select Resource</Paragraph>
              </Box>
            )}
          </Box>
        )}
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
                  onClick={handleSelectParent}
                />
              </Box>
            </FlexBox>
            {/* Main Parent End  */}

            <div
              style={{
                borderLeft: '1px solid rgba(68, 62, 153, 0.3)',
                marginLeft: '7px',
              }}
            >
              <div style={{ position: 'relative' }}>
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
                        />
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
                                        position: 'absolute',
                                        bottom: '-5px',
                                        width: '5px',
                                        height: '5px',
                                        borderRadius: '100%',
                                        backgroundColor:
                                          'rgba(68, 62, 153, 0.3)',
                                        marginLeft: '-3px',
                                      }}
                                    ></div>

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
