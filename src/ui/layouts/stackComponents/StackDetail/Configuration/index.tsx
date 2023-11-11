import React, { Fragment, useState } from 'react';
import {
  FlexBox,
  Box,
  EditField,
  Paragraph,
  Container,
  FullWidthSpinner,
  PrimaryButton,
} from '../../../../components';
import styles from './index.module.scss';
import { useService } from './useService';
import axios from 'axios';
import {
  useDispatch,
  useHistory,
  useLocationPath,
  useSelector,
} from '../../../../hooks';
import {
  secretSelectors,
  sessionSelectors,
  userSelectors,
  workspaceSelectors,
} from '../../../../../redux/selectors';
import {
  showToasterAction,
  stackComponentsActions,
} from '../../../../../redux/actions';
import { ID_MAX_LENGTH, toasterTypes } from '../../../../../constants';
import { ToggleField } from '../../../common/FormElement';
import { routePaths } from '../../../../../routes/routePaths';

import { truncate } from '../../../../../utils';
import { Flavor } from '../../../../../api/types';

export const Configuration: React.FC<{
  stackId: TId;
  flavor: Flavor | any;
  loading?: boolean;
  serviceConnectorResources?: any;
}> = ({ stackId, loading, serviceConnectorResources, flavor }) => {
  const locationPath = useLocationPath();
  const history = useHistory();

  const user = useSelector(userSelectors.myUser);
  const [componentfetching, setComponentFetching] = useState(false);
  const secrets = useSelector(secretSelectors.mySecrets);

  const authToken = useSelector(sessionSelectors.authenticationToken);
  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);
  const dispatch = useDispatch();
  const workspaces = useSelector(workspaceSelectors.myWorkspaces);

  const [inputFields, setInputFields] = useState([]) as any;
  const { stackComponent } = useService({
    stackId,
  }) as any;

  // if (loading) {
  //   return <FullWidthSpinner color="black" size="md" />;
  // }

  const titleCase = (s: any) =>
    s.replace(/^_*(.)|_+(.)/g, (s: any, c: string, d: string) =>
      c ? c.toUpperCase() : ' ' + d.toUpperCase(),
    );
  const onCallApi = (updateConfig: any) => {
    const { id }: any = workspaces.find(
      (item) => item.name === selectedWorkspace,
    );

    const body = {
      user: user?.id,
      workspace: id,
      is_shared: updateConfig.isShared,
      name: updateConfig.name,
      type: updateConfig.type,
      flavor: updateConfig.flavor,
      configuration: updateConfig.configuration,
    };
    setComponentFetching(true);
    axios
      .put(
        `${process.env.REACT_APP_BASE_API_URL}/components/${updateConfig.id}`,
        // @ts-ignore
        body,
        { headers: { Authorization: `Bearer ${authToken}` } },
      )
      .then((response: any) => {
        dispatch(
          showToasterAction({
            description: 'Component has been updated successfully.',
            type: toasterTypes.success,
          }),
        );
        setInputFields([]);
        dispatch(
          stackComponentsActions.stackComponentForId({
            stackComponentId: stackComponent?.id,
            onSuccess: () => setComponentFetching(false),
            onFailure: () => setComponentFetching(false),
          }),
        );
      })
      .catch((err) => {
        setComponentFetching(false);

        dispatch(
          showToasterAction({
            description: err?.response?.data?.detail[0],
            type: toasterTypes.failure,
          }),
        );
      });
  };
  const onPressEnter = (
    event?: any,
    type?: string,
    elementName?: any,
    defaultValue?: any,
    index?: any,
  ) => {
    if (event.key === 'Enter') {
      const updateConfig = {
        ...stackComponent,
      };
      if (type === 'string') {
        updateConfig.configuration[elementName] = event.target.value;
      }
      if (type === 'name') {
        updateConfig.name = event.target.value;
      }
      if (type === 'key') {
        updateConfig.configuration[elementName][event.target.value] =
          updateConfig.configuration[elementName][defaultValue];
        delete updateConfig.configuration[elementName][defaultValue];
      }
      if (type === 'value') {
        var unkownKey = Object.keys(updateConfig.configuration[elementName])[
          index
        ];

        updateConfig.configuration[elementName][unkownKey] = event.target.value;
      }
      onCallApi(updateConfig);
    }
  };

  const onPressEnterForEmpty = (event: any, type: any, elementName?: any) => {
    if (event.key === 'Enter') {
      const updateConfig = {
        ...stackComponent,
      };
      updateConfig.configuration[elementName] = { '': '' };
      if (type === 'key') {
        updateConfig.configuration[elementName][event.target.value] =
          updateConfig.configuration[elementName][''];
        delete updateConfig.configuration[elementName][''];
      }
      if (type === 'value') {
        var unkownKey = Object.keys(updateConfig.configuration[elementName])[0];

        updateConfig.configuration[elementName][unkownKey] = event.target.value;
      }

      onCallApi(updateConfig);
    }
  };
  const onPressEnterForAddMore = (
    event: any,
    type?: any,
    elementName?: any,
  ) => {
    if (event.key === 'Enter') {
      const updateConfig = {
        ...stackComponent,
      };

      const keys = inputFields.map((object: any) => object.key);
      const value = inputFields.map((object: any) => object.value);
      var result: any = {};
      keys.forEach((key: any, i: any) => (result[key] = value[i]));
      updateConfig.configuration[elementName] = {
        ...updateConfig.configuration[elementName],
        ...result,
      };
      onCallApi(updateConfig);
    }
  };

  const onChangeToggle = (value: any, type?: any, key?: any) => {
    const updateConfig = {
      ...stackComponent,
    };

    if (type === 'share') {
      updateConfig.isShared = value;
    }
    if (type === 'other') {
      updateConfig.configuration[key] = value;
    }
    onCallApi(updateConfig);
  };

  const handleInputChange = (index: any, event: any, label: any, type: any) => {
    const values = [...inputFields];
    if (type === 'key') {
      values[index].key = event;
    } else {
      values[index].value = event;
    }
    setInputFields(values);
  };

  const getFormElement: any = (elementName: any, elementSchema: any) => {
    if (
      flavor?.metadata?.config_schema?.properties[elementName]?.type ===
      'string'
    ) {
      const extracted = elementSchema.split(/\./)[0];
      const secretName = extracted.replace(/{{|}}|\./g, '').trim();
      const filteredSecret = secrets?.filter(
        (item) => item.name === secretName,
      );

      return (
        <>
          {flavor?.metadata?.config_schema?.properties[elementName]
            .sensitive ? (
            !stackComponent.metadata?.connector_resource_id && (
              <Box marginTop="lg" style={{ width: '30vw' }}>
                <EditField
                  disabled
                  viewSecretDetail={() => {
                    history.push(
                      routePaths.secret.configuration(
                        filteredSecret[0]?.id,
                        selectedWorkspace,
                      ),
                    );
                  }}
                  filteredSecretId={filteredSecret[0]?.id}
                  label={titleCase(elementName) + ' (Secret)'}
                  optional={false}
                  defaultValue={elementSchema}
                  placeholder=""
                  hasError={false}
                />
              </Box>
            )
          ) : flavor?.metadata?.config_schema?.properties[elementName].title ===
              'Authentication Secret' &&
            stackComponent.metadata?.connector_resource_id ? null : (
            <Box marginTop="lg" style={{ width: '30vw' }}>
              <EditField
                disabled
                label={titleCase(elementName)}
                optional={false}
                defaultValue={elementSchema}
                placeholder=""
                hasError={false}
              />
            </Box>
          )}
        </>
      );
    }
    if (
      flavor?.metadata?.config_schema?.properties[elementName]?.type ===
        'object' &&
      flavor?.metadata?.config_schema?.properties[elementName]
        ?.additionalProperties &&
      flavor?.metadata?.config_schema?.properties[elementName]
        ?.additionalProperties.type !== 'string'
    ) {
      return (
        <>
          {' '}
          <Box marginTop="lg">
            <Paragraph size="body" style={{ color: '#000' }}>
              <label htmlFor="key">{titleCase(elementName)}</label>
            </Paragraph>
          </Box>
          <FlexBox marginTop="sm" fullWidth>
            <textarea
              disabled
              className={styles.textArea}
              defaultValue={JSON.stringify(mappedObject[elementName])}
              style={{ width: '30vw' }}
              onBlur={(e) => {
                const jsonStr = e.target.value;
                try {
                  JSON.parse(jsonStr);
                } catch (e) {
                  dispatch(
                    showToasterAction({
                      description: 'Invalid JSON.',
                      type: toasterTypes.failure,
                    }),
                  );
                }
              }}
              onChange={(e) => {}}
            />
          </FlexBox>
        </>
      );
    }

    if (
      flavor?.metadata?.config_schema?.properties[elementName]?.type ===
      'object'
    ) {
      return (
        <Box marginTop="lg" style={{ width: '30vw' }}>
          <Paragraph size="body" style={{ color: 'black' }}>
            <label htmlFor={elementName}>{titleCase(elementName)}</label>
          </Paragraph>

          <Box style={{ position: 'relative' }}>
            {Object.keys(elementSchema || {}).length < 1 && (
              <>
                <div
                  style={{
                    position: 'absolute',
                    bottom: '-5px',
                    width: '5px',
                    height: '5px',
                    borderRadius: '100%',
                    backgroundColor: 'rgba(68, 62, 153, 0.3)',
                  }}
                ></div>

                <div
                  className="form-row"
                  style={{
                    borderLeft: '1px solid rgba(68, 62, 153, 0.3)',
                    marginLeft: '2px',
                  }}
                >
                  <FlexBox.Row
                    alignItems="center"
                    marginTop="sm"
                    style={{ width: '30vw' }}
                  >
                    <div
                      style={{
                        marginTop: '30px',
                        width: '35px',
                        borderTop: '1px solid rgba(68, 62, 153, 0.3)',
                      }}
                    ></div>
                    <div
                      style={{
                        marginTop: '30px',
                        marginRight: '5px',
                        marginLeft: '-2px',
                        color: 'rgba(68, 62, 153, 0.3)',
                      }}
                    >
                      &#x27A4;
                    </div>

                    <EditField
                      disabled
                      onKeyDown={(e: any) =>
                        onPressEnterForEmpty(e, 'key', elementName)
                      }
                      onChangeText={(event: any) => {}}
                      label="Key"
                      optional={false}
                      placeholder=""
                      hasError={false}
                      className={styles.field}
                    />
                    <div style={{ width: '10%' }}></div>
                    <EditField
                      disabled
                      onKeyDown={(e: any) =>
                        onPressEnterForEmpty(e, 'value', elementName)
                      }
                      onChangeText={(event: any) => {}}
                      label="Value"
                      placeholder=""
                      hasError={false}
                      className={styles.field}
                    />
                  </FlexBox.Row>
                </div>
              </>
            )}
          </Box>

          <Box style={{ position: 'relative' }}>
            {Object.entries(elementSchema || {}).map(([key, value], index) => (
              <React.Fragment key={index}>
                <div
                  style={{
                    position: 'absolute',
                    bottom: '-5px',
                    width: '5px',
                    height: '5px',
                    borderRadius: '100%',
                    backgroundColor: 'rgba(68, 62, 153, 0.3)',
                  }}
                ></div>

                <div
                  className="form-row"
                  style={{
                    borderLeft: '1px solid rgba(68, 62, 153, 0.3)',
                    marginLeft: '2px',
                  }}
                >
                  <FlexBox.Row
                    marginTop="lg"
                    alignItems="center"
                    style={{ width: '30vw' }}
                  >
                    <div
                      style={{
                        marginTop: '30px',
                        width: '15px',
                        borderTop: '1px solid rgba(68, 62, 153, 0.3)',
                      }}
                    ></div>
                    <div
                      style={{
                        marginTop: '30px',
                        marginRight: '5px',
                        marginLeft: '-2px',
                        color: 'rgba(68, 62, 153, 0.3)',
                      }}
                    >
                      &#x27A4;
                    </div>

                    <EditField
                      disabled
                      onKeyDown={(e: any) =>
                        onPressEnter(e, 'key', elementName, key)
                      }
                      onChangeText={(e: any) =>
                        onPressEnter(e, 'key', elementName, key, index)
                      }
                      label="Key"
                      optional={false}
                      defaultValue={key}
                      placeholder=""
                      hasError={false}
                      className={styles.field}
                    />
                    <div style={{ width: '10%' }}></div>
                    <EditField
                      disabled
                      onKeyDown={(e: any) =>
                        onPressEnter(e, 'value', elementName, key, index)
                      }
                      onChangeText={(e: any) =>
                        onPressEnter(e, 'value', elementName, key, index)
                      }
                      label="Value"
                      defaultValue={value}
                      placeholder=""
                      hasError={false}
                      className={styles.field}
                    />
                  </FlexBox.Row>
                </div>
              </React.Fragment>
            ))}
          </Box>

          <Box style={{ position: 'relative' }}>
            {inputFields.map((inputField: any, index: any) => (
              <React.Fragment key={index}>
                <div
                  style={{
                    position: 'absolute',
                    bottom: '-5px',
                    width: '5px',
                    height: '5px',
                    borderRadius: '100%',
                    backgroundColor: 'rgba(68, 62, 153, 0.3)',
                  }}
                ></div>

                <div
                  className="form-row"
                  style={{
                    borderLeft: '1px solid rgba(68, 62, 153, 0.3)',
                    marginLeft: '2px',
                  }}
                >
                  <FlexBox.Row
                    marginTop="lg"
                    alignItems="center"
                    style={{ width: '30vw' }}
                  >
                    <div
                      style={{
                        marginTop: '30px',
                        width: '15px',
                        borderTop: '1px solid rgba(68, 62, 153, 0.3)',
                      }}
                    ></div>
                    <div
                      style={{
                        marginTop: '30px',
                        marginRight: '5px',
                        marginLeft: '-2px',
                        color: 'rgba(68, 62, 153, 0.3)',
                      }}
                    >
                      &#x27A4;
                    </div>

                    <Box marginTop="lg">
                      <EditField
                        onKeyDown={(e: any) =>
                          onPressEnterForAddMore(e, 'addMore', elementName)
                        }
                        onChangeText={(event: any) =>
                          handleInputChange(index, event, elementName, 'key')
                        }
                        disabled
                        label={'Key'}
                        className={styles.field}
                        value={inputField?.key}
                        placeholder={''}
                      />
                    </Box>

                    <div style={{ width: '10%' }}></div>
                    <Box marginTop="lg">
                      <EditField
                        onKeyDown={(e: any) =>
                          onPressEnterForAddMore(e, 'addMore', elementName)
                        }
                        disabled
                        className={styles.field}
                        onChangeText={(event: any) =>
                          handleInputChange(index, event, elementName, 'value')
                        }
                        label={'Value'}
                        value={inputField?.value}
                        placeholder={''}
                      />
                    </Box>
                  </FlexBox.Row>
                </div>
              </React.Fragment>
            ))}
          </Box>
        </Box>
      );
    }

    if (
      flavor?.metadata?.config_schema?.properties[elementName]?.type === 'array'
    ) {
      return (
        <Box marginTop="md">
          <Paragraph size="body" style={{ color: '#000' }}>
            <label htmlFor="key">{titleCase(elementName)}</label>
          </Paragraph>

          <Box style={{ position: 'relative' }}>
            <div
              style={{
                position: 'absolute',
                bottom: '10px',
                width: '5px',
                height: '5px',
                borderRadius: '100%',
                backgroundColor: 'rgba(68, 62, 153, 0.3)',
              }}
            ></div>

            <div
              className="form-row"
              style={{
                borderLeft: '1px solid rgba(68, 62, 153, 0.3)',
                marginLeft: '2px',
              }}
            >
              {mappedObject &&
                mappedObject[elementName]?.map((item: any, index: any) => (
                  <Fragment key={index}>
                    <Box
                      style={{ display: 'flex', alignItems: 'center' }}
                      marginTop="sm"
                    >
                      <div
                        style={{
                          marginTop: '30px',
                          width: '15px',
                          borderTop: '1px solid rgba(68, 62, 153, 0.3)',
                        }}
                      ></div>
                      <div
                        style={{
                          marginTop: '30px',
                          marginRight: '5px',
                          marginLeft: '-2px',
                          color: 'rgba(68, 62, 153, 0.3)',
                        }}
                      >
                        &#x27A4;
                      </div>

                      <div className="form-group" style={{ width: '28.5vw' }}>
                        <EditField
                          disabled
                          className={styles.field}
                          label={'Value'}
                          value={item}
                          placeholder={''}
                        />
                      </div>
                      <div
                        style={{
                          justifyContent: 'space-between',
                          display: 'flex',
                          marginTop: '10px',
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                          }}
                        ></div>
                      </div>
                    </Box>
                  </Fragment>
                ))}
            </div>
            <div className="submit-button"></div>
            <br />
          </Box>
        </Box>
      );
    }
    if (typeof elementSchema === 'boolean') {
      return (
        <Box marginTop={'lg'} style={{ width: '30vw' }}>
          <Box>
            <ToggleField
              value={elementSchema}
              onHandleChange={() =>
                onChangeToggle(!elementSchema, 'other', elementName)
              }
              label={titleCase(elementName)}
              disabled={true}
            />
          </Box>
        </Box>
      );
    }
  };

  if (loading) {
    return <FullWidthSpinner color="black" size="md" />;
  }
  if (flavor === undefined) {
    return <FullWidthSpinner color="black" size="md" />;
  }

  let result = Object.keys(
    flavor?.metadata?.config_schema?.properties || {},
  ).reduce(function (r: any, name: any) {
    return (
      (r[name] =
        flavor?.metadata?.config_schema?.properties[name].type === 'string' &&
        flavor?.metadata?.config_schema?.properties[name].default === undefined
          ? ''
          : flavor?.metadata?.config_schema?.properties[name].default),
      r
    );
  }, {});
  function replaceNullWithEmptyString(obj: any) {
    for (let prop in obj) {
      if (obj[prop] === null) {
        obj[prop] = '';
      } else if (typeof obj[prop] === 'object') {
        replaceNullWithEmptyString(obj[prop]);
      }
    }
    return obj;
  }

  replaceNullWithEmptyString(stackComponent?.metadata?.configuration);

  const mappedObject = {
    ...result,
    ...stackComponent?.metadata?.configuration,
  };

  if (componentfetching) {
    return <FullWidthSpinner color="black" size="md" />;
  }
  return (
    <FlexBox.Column marginTop="xl">
      <FlexBox.Row flexDirection="column">
        <Container>
          <Box style={{ width: '30vw' }}>
            <EditField
              disabled
              onKeyDown={(e: any) => onPressEnter(e, 'name')}
              onChangeText={(e: any) => onPressEnter(e, 'name')}
              label={'Component Name'}
              optional={false}
              defaultValue={stackComponent?.name}
              placeholder=""
              hasError={false}
              className={styles.field}
            />
          </Box>
        </Container>
        <Container>
          {/* <Box marginTop="lg" style={{ width: '30vw' }}>
            <ToggleField
              value={stackComponent?.body.is_shared}
              onHandleChange={() =>
                onChangeToggle(!stackComponent?.body.is_shared, 'share')
              }
              label="Share Component with spublic"
              disabled={true}
            />
          </Box> */}
        </Container>
        {flavor?.metadata?.connector_resource_type && (
          <Box marginTop="md" marginLeft="md" style={{ width: '30vw' }}>
            <Box>
              <Paragraph size="body" style={{ color: '#000' }}>
                <label htmlFor="key">{'Connect to resource'}</label>
              </Paragraph>
              <Box
                marginTop="sm"
                className={styles.service_selector}
                style={{
                  justifyContent: 'start',
                  backgroundColor: 'rgba(168, 168, 168, 0.05)',
                  borderWidth: '0px',
                }}
              >
                {stackComponent?.connector ? (
                  <FlexBox className={styles.service_selector_selected}>
                    <Box marginRight="sm"></Box>

                    <Paragraph>
                      <img
                        className={styles.service_selector_image}
                        src={serviceConnectorResources?.logo_url}
                        alt={serviceConnectorResources?.name}
                      />{' '}
                      &#91;{' '}
                      {truncate(stackComponent?.connector.id, ID_MAX_LENGTH) +
                        '-' +
                        stackComponent.connector.name}
                      &#93; {stackComponent.connectorResourceId}
                    </Paragraph>
                  </FlexBox>
                ) : (
                  <Box>
                    <Paragraph>{'<not connected>'}</Paragraph>
                  </Box>
                )}
              </Box>
            </Box>
          </Box>
        )}
      </FlexBox.Row>
      <FlexBox.Row style={{ width: '40%' }}>
        <Container>
          {Object.keys(mappedObject).map((key, index) => (
            <React.Fragment key={index}>
              {getFormElement(key, mappedObject[key])}
            </React.Fragment>
          ))}
        </Container>
      </FlexBox.Row>

      <FlexBox
        style={{
          position: 'fixed',
          right: '0',
          bottom: '0',
          marginRight: '45px',
        }}
      >
        <Box marginBottom="lg">
          <PrimaryButton
            onClick={() =>
              history.push(
                routePaths.stackComponents.updateComponent(
                  locationPath.split('/')[4],
                  stackComponent.id,
                  selectedWorkspace,
                ),
              )
            }
            className={styles.updateButton}
          >
            Update Component
          </PrimaryButton>
        </Box>
      </FlexBox>
    </FlexBox.Column>
  );
};
