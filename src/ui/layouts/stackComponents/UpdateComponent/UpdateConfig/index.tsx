import React, { Fragment, useEffect, useState } from 'react';
import {
  FlexBox,
  Box,
  Paragraph,
  Container,
  FullWidthSpinner,
  PrimaryButton,
  FormTextField,
  icons,
  MakeSecretField,
} from '../../../../components';
import styles from './index.module.scss';
import { useService } from './useService';
import axios from 'axios';
import {
  useDispatch,
  useHistory,
  useLocation,
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
  secretsActions,
  showToasterAction,
  stackComponentsActions,
} from '../../../../../redux/actions';
import { iconColors, toasterTypes } from '../../../../../constants';
import { ToggleField } from '../../../common/FormElement';
import { routePaths } from '../../../../../routes/routePaths';
import ServicesSelectorComponent from '../../ServicesSelectorComponent';

export const UpdateConfig: React.FC<{
  stackId: TId;
  loading?: boolean;
  state: any;
  serviceConnectorResources?: any;
  fetching?: boolean;
}> = ({ stackId, loading, state, serviceConnectorResources, fetching }) => {
  const location = useLocation();
  const locationPath = useLocationPath();

  const { stackComponent, flavor } = useService({
    stackId,
  }) as any;

  const history = useHistory();
  const [componentName, setComponentName] = useState('');
  const [isShared, setIsShared] = useState() as any;
  const [mappedConfiguration, setMappedConfiguration] = useState() as any;
  const [defaultMappedConfig, setDefaultMappedConfig] = useState() as any;
  const [sensitiveFields, setSensitiveFields] = useState() as any;

  const user = useSelector(userSelectors.myUser);
  const [componentLoading, setComponentLoading] = useState(false);
  const secrets = useSelector(secretSelectors.mySecrets);
  const authToken = useSelector(sessionSelectors.authenticationToken);
  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);
  const dispatch = useDispatch();
  const [secretId, setSecretId] = useState('');
  const [secretIdArray, setSecretIdArray] = useState([]);
  const [secretOptionsWithKeys, setSecretOptionsWithKeys] = useState([]);
  const [selectedSecret, setSelectedSecret] = useState({}) as any;
  const workspaces = useSelector(workspaceSelectors.myWorkspaces);
  const [inputFields, setInputFields] = useState() as any;
  const [connector, setConnector] = useState();
  const [connectorResourceId, setConnectorResourceId] = useState();

  const titleCase = (s: any) =>
    s.replace(/^_*(.)|_+(.)/g, (s: any, c: string, d: string) =>
      c ? c.toUpperCase() : ' ' + d.toUpperCase(),
    );
  useEffect(() => {
    if (state?.state?.routeFromEditComponent) {
      setMappedConfiguration(state.state.mappedConfiguration);
      setInputFields(state.state.inputFields);
      setSecretId(state?.state?.secretId);
      if (state?.state?.secretIdArray?.length) {
        setSecretIdArray(state?.state?.secretIdArray);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);
  useEffect(() => {
    setConnector(stackComponent?.connector?.id);
    setConnectorResourceId(stackComponent?.connectorResourceId);
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

    replaceNullWithEmptyString(stackComponent?.configuration);
    setComponentName(stackComponent?.name);

    setIsShared(stackComponent?.body.is_shared);

    function convertJSON(json: any) {
      const convertedJSON: any = {};

      for (const key in json) {
        if (Object.prototype.hasOwnProperty.call(json, key)) {
          if (
            flavor?.configSchema?.properties[key]?.additionalProperties &&
            flavor?.configSchema?.properties[key]?.additionalProperties
              ?.type !== 'string'
          ) {
          } else if (
            typeof json[key] === 'object' &&
            !Array.isArray(json[key])
          ) {
            const array = [];
            for (const prop in json[key]) {
              if (Object.prototype.hasOwnProperty.call(json[key], prop)) {
                array.push({ key: prop, value: json[key][prop] });
              }
            }
            convertedJSON[key] =
              array.length > 0 ? array : [{ key: '', value: '' }];
          } else if (Array.isArray(json[key])) {
            const array = [];
            for (let i = 0; i < json[key].length; i++) {
              if (typeof json[key][i] === 'object') {
                array.push(convertJSON(json[key][i]));
              } else {
                array.push(json[key][i]);
              }
            }
            convertedJSON[key] = array;
          } else if (typeof json[key] === 'object' || json[key] === undefined) {
            const emptyObject = [{ key: '', value: '' }];
            convertedJSON[key] = emptyObject;
          }
        }
      }

      return convertedJSON;
    }
    if (!state?.state?.routeFromEditComponent) {
      if (flavor) {
        let result = Object.keys(flavor?.configSchema?.properties || {}).reduce(
          function (r: any, name: any) {
            return (
              (r[name] =
                flavor?.configSchema?.properties[name]?.type === 'string' &&
                flavor?.configSchema?.properties[name]?.default === undefined
                  ? ''
                  : flavor?.configSchema?.properties[name]?.type === 'array' &&
                    !flavor?.configSchema?.properties[name]?.default?.length
                  ? ['']
                  : flavor?.configSchema?.properties[name]?.default),
              r
            );
          },
          {},
        );

        const mappedObject = {
          ...result,
          ...stackComponent?.configuration,
        };
        const convertedJson = convertJSON(mappedObject);
        setInputFields(convertedJson);
        setDefaultMappedConfig(mappedObject);
        setMappedConfiguration(mappedObject);
      }
    }

    function extractSensitiveKeys(obj: any) {
      const keys: any = [];

      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          const property = obj[key];
          if (
            property.sensitive === true ||
            property.title === 'Authentication Secret'
          ) {
            keys.push(key);
          }
        }
      }

      return keys;
    }
    const sensitiveFields = extractSensitiveKeys(
      flavor?.configSchema?.properties,
    );
    setSensitiveFields(sensitiveFields);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flavor]);

  const secretOptions = secrets.map((item: any) => {
    return {
      label: `{{ ${item.name}.` as string,
      value: `{{ ${item.name}.` as string,
      id: item.id as string,
    };
  }) as any;
  const onSubmit = () => {
    const { id }: any = workspaces.find(
      (item) => item.name === selectedWorkspace,
    );
    if (!componentName) {
      dispatch(
        showToasterAction({
          description: 'Required Field is Empty',
          type: toasterTypes.failure,
        }),
      );
      return false;
    }
    for (const [, value] of Object.entries(mappedConfiguration) as any) {
      if (value?.value) {
        return dispatch(
          showToasterAction({
            description: 'Invalid secret',
            type: toasterTypes.failure,
          }),
        );
      }
    }
    let tempFinal: any = {};

    Object.keys(inputFields).forEach((key) => {
      if (flavor?.configSchema?.properties[key].type !== 'array') {
        const newObj: any = {};
        inputFields[key].forEach((obj: any) => {
          if (obj.key !== undefined && (obj.key !== '' || obj.value !== '')) {
            if (newObj[obj.key] !== undefined) {
              dispatch(
                showToasterAction({
                  description: 'Key already exists.',
                  type: toasterTypes.failure,
                }),
              );
            } else {
              newObj[obj.key] = obj.value;
            }
          }
        });
        tempFinal[key] = newObj;
      }
    });
    const final: any = {};

    Object.keys(inputFields).forEach((key) => {
      if (flavor?.configSchema?.properties[key].type !== 'array') {
        const newObj: any = {};
        inputFields[key].forEach((obj: any) => {
          if (obj.key !== undefined && (obj.key !== '' || obj.value !== '')) {
            if (newObj[obj.key] !== undefined) {
              dispatch(
                showToasterAction({
                  description: 'Key already exists.',
                  type: toasterTypes.failure,
                }),
              );
            }
            newObj[obj.key] = obj.value;
          }
        });
        final[key] = newObj;
      }
    });

    const body: any = {
      user: user?.id,
      workspace: id,
      is_shared: isShared,
      name: componentName,
      type: stackComponent.body.type,
      flavor: stackComponent.body.flavor,
      configuration: { ...mappedConfiguration, ...final },
    };
    debugger;
    if (connector && connector !== null) {
      body.connector = connector;
      body.connector_resource_id = connectorResourceId;
    }

    if (JSON.stringify(tempFinal) !== JSON.stringify(final)) {
      return false;
    }

    for (const [key] of Object.entries(final)) {
      for (const [innerKey, innerValue] of Object.entries(final[key])) {
        if (!innerKey && innerValue) {
          return dispatch(
            showToasterAction({
              description: 'Key cannot be Empty.',
              type: toasterTypes.failure,
            }),
          );
        }
        if (!innerValue && innerKey) {
          return dispatch(
            showToasterAction({
              description: 'Value cannot be Empty.',
              type: toasterTypes.failure,
            }),
          );
        }
      }
    }
    setComponentLoading(true);
    axios
      .put(
        `${process.env.REACT_APP_BASE_API_URL}/components/${stackComponent.id}`,
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

        dispatch(
          stackComponentsActions.stackComponentForId({
            stackComponentId: stackComponent?.id,
            onSuccess: () => {
              setComponentLoading(false);
              history.push(
                routePaths.stackComponents.configuration(
                  locationPath.split('/')[4],
                  stackComponent.id,
                  selectedWorkspace,
                ),
              );
            },
            onFailure: () => setComponentLoading(false),
          }),
        );
      })
      .catch((err) => {
        setComponentLoading(false);
        dispatch(
          showToasterAction({
            description: err?.response?.data?.detail[0],
            type: toasterTypes.failure,
          }),
        );
      });
  };

  function callActionForSecret(name: any, value: any) {
    setMappedConfiguration({
      ...mappedConfiguration,
      [name]: {
        value: value?.value ? value?.value : value,
        id: value?.id ? value?.id : '',
      },
    });
    if (value?.id) {
      setSecretId(value?.id);
      const listOfIds: any = [...secretIdArray];
      listOfIds.push(value.id);
      setSecretIdArray(listOfIds);
    }

    if (value?.value?.includes('.') || value?.value?.id) {
      dispatch(
        secretsActions.secretForId({
          secretId: value?.id,
          onSuccess: (res) => {
            setSelectedSecret(res);
            const secretOptionsWithKeys = Object.keys(res.values)?.map(
              (item: any) => {
                return {
                  label: `{{ ${res?.name}.${item} }}` as string,
                  value: `{{ ${res?.name}.${item} }}` as string,
                };
              },
            ) as any;
            setSecretOptionsWithKeys(secretOptionsWithKeys);
          },
        }),
      );
    } else if (value?.includes('{{')) {
      dispatch(
        secretsActions.getMy({
          size: 10,
          workspace: selectedWorkspace,
          name: 'contains:' + value.replace(/[{ }]/g, ''),
        }),
      );
    }
  }

  const getFormElement: any = (elementName: any, elementSchema: any) => {
    if (flavor?.configSchema?.properties[elementName]?.type === 'string') {
      return (
        <>
          {flavor?.configSchema?.properties[elementName].sensitive ? (
            connectorResourceId === null && (
              <Box marginTop="lg" style={{ width: '30vw' }}>
                <MakeSecretField
                  required={flavor?.configSchema?.required?.includes(
                    elementName,
                  )}
                  label={titleCase(elementName) + ' (Secret)'}
                  placeholder={''}
                  handleClick={() => {
                    if (secretId) {
                      const state = {
                        secretIdArray: secretIdArray,
                        secretId: secretId,
                        flavor: flavor.name,
                        routeFromEditComponent: true,
                        componentName: componentName,
                        isShared: isShared,
                        mappedConfiguration: mappedConfiguration,
                        inputFields: inputFields,
                        secretKey: elementName,
                        pathName: location.pathname,
                      };
                      history.push(
                        routePaths.secret.updateSecret(
                          secretId,
                          selectedWorkspace,
                        ),
                        state,
                      );
                    } else {
                      const state = {
                        flavor: flavor.name,
                        routeFromEditComponent: true,
                        componentName: componentName,
                        isShared: isShared,
                        mappedConfiguration: mappedConfiguration,
                        inputFields: inputFields,
                        secretKey: elementName,
                        pathName: location.pathname,
                      };
                      history.push(
                        routePaths.secrets.registerSecrets(selectedWorkspace),
                        state,
                      );
                    }
                  }}
                  value={
                    mappedConfiguration[elementName]?.value
                      ? mappedConfiguration[elementName]?.value
                      : mappedConfiguration[elementName]?.length
                      ? mappedConfiguration[elementName]
                      : ''
                  }
                  onChange={(val: string, newEvent: any) => {
                    if (!val) {
                      if (secretIdArray?.length === 1) {
                      } else {
                        setSecretId('');
                      }
                    }
                    if (val.includes('{{')) {
                      callActionForSecret(elementName, val);
                    } else {
                      setMappedConfiguration({
                        ...mappedConfiguration,
                        [elementName]: val,
                      });
                    }
                  }}
                  secretOnChange={(val: any, newEvent: any) => {
                    if (val?.value?.includes('}}')) {
                      setMappedConfiguration({
                        ...mappedConfiguration,
                        [elementName]: val?.value?.includes('.')
                          ? val.value
                          : val,
                      });
                    } else if (val.value.includes('{{')) {
                      callActionForSecret(elementName, val);
                    }
                  }}
                  dropdownOptions={
                    mappedConfiguration[elementName]?.value &&
                    mappedConfiguration[elementName]?.value.includes(
                      `${selectedSecret.name}.`,
                    )
                      ? secretOptionsWithKeys
                      : secretOptions
                  }
                  tooltipText='Start typing with "{{" to reference a secret for this field.'
                />
              </Box>
            )
          ) : flavor?.configSchema?.properties[elementName].title ===
              'Authentication Secret' && connectorResourceId !== null ? null : (
            <Box marginTop="lg" style={{ width: '30vw' }}>
              <FormTextField
                disabled={
                  connectorResourceId &&
                  elementName === flavor.connector_resource_id_attr
                }
                onChange={(e: any) => {
                  setMappedConfiguration((prevConfig: any) => ({
                    ...prevConfig, // Spread the previous
                    [elementName]: e, // Update the
                  }));
                }}
                placeholder=""
                label={titleCase(elementName)}
                value={mappedConfiguration[elementName]}
              />
            </Box>
          )}
        </>
      );
    }

    if (
      flavor?.configSchema?.properties[elementName]?.type === 'object' &&
      flavor?.configSchema?.properties[elementName]?.additionalProperties &&
      flavor?.configSchema?.properties[elementName]?.additionalProperties
        .type !== 'string'
    ) {
      return (
        <>
          {' '}
          <Box marginTop="lg">
            <Paragraph size="body" style={{ color: '#000' }}>
              <label htmlFor="key">{titleCase(elementName)}</label>
            </Paragraph>
          </Box>
          <FlexBox marginTop="sm" fullWidth style={{ width: '30vw' }}>
            <textarea
              className={styles.textArea}
              defaultValue={JSON.stringify(mappedConfiguration[elementName])}
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
              onChange={(e) => {
                const jsonStr = e.target.value;
                try {
                  const jsonObj = JSON.parse(jsonStr);

                  setMappedConfiguration({
                    ...mappedConfiguration,
                    [elementName]: jsonObj,
                  });
                } catch (e) {}
              }}
            />
          </FlexBox>
        </>
      );
    }
    if (
      flavor?.configSchema?.properties[elementName]?.type === 'object' &&
      (flavor?.configSchema?.properties[elementName]?.additionalProperties
        ?.type === 'string' ||
        flavor?.configSchema?.properties[elementName]?.additionalProperties
          ?.type === undefined)
    ) {
      return (
        <Box marginTop="md">
          <Paragraph size="body" style={{ color: '#000' }}>
            <label htmlFor="key">{titleCase(elementName)}</label>
          </Paragraph>

          <FlexBox.Row style={{ position: 'relative' }}>
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
              {inputFields[elementName]?.map((item: any, index: any) => (
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

                    <Box
                      className="form-group"
                      marginRight="md"
                      style={{ width: '13.7vw' }}
                    >
                      <FormTextField
                        onChange={(event: any) => {
                          const values = { ...inputFields };
                          values[elementName][index].key = event;

                          setInputFields(values);
                        }}
                        label={'Key'}
                        value={item?.key}
                        placeholder={''}
                      />
                    </Box>

                    <Box className="form-group" style={{ width: '13.7vw' }}>
                      <FormTextField
                        onChange={(event: any) => {
                          const values = { ...inputFields };
                          values[elementName][index].value = event;

                          setInputFields(values);
                        }}
                        label={'Value'}
                        value={item?.value}
                        placeholder={''}
                      />
                    </Box>

                    <div
                      style={{
                        justifyContent: 'space-between',
                        display: 'flex',
                        marginTop: '20px',
                        marginLeft: '5px',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        {inputFields[elementName].length > 1 && (
                          <button
                            className={styles.fieldButton}
                            style={{}}
                            type="button"
                            onClick={() => {
                              setInputFields((prevState: any) => {
                                // Replace with the index of the object to remove
                                const newInputFields = [
                                  ...prevState[elementName],
                                ];
                                newInputFields.splice(index, 1);
                                return {
                                  ...prevState,
                                  [elementName]: newInputFields,
                                };
                              });
                            }}
                          >
                            <icons.delete color={iconColors.grey} />
                          </button>
                        )}

                        {index === inputFields[elementName].length - 1 && (
                          <button
                            className={styles.fieldButton}
                            type="button"
                            onClick={() => {
                              setInputFields((prevState: any) => ({
                                ...prevState,
                                [elementName]: [
                                  ...prevState[elementName],
                                  { key: '', value: '' },
                                ],
                              }));
                            }}
                          >
                            <icons.addNew color={iconColors.primary} />
                          </button>
                        )}
                      </div>
                    </div>
                  </Box>
                </Fragment>
              ))}
            </div>
            <div className="submit-button"></div>
            <br />
          </FlexBox.Row>
        </Box>
      );
    }
    if (flavor?.configSchema?.properties[elementName]?.type === 'array') {
      return (
        <Box marginTop="md">
          <Paragraph size="body" style={{ color: '#000' }}>
            <label htmlFor="key">{titleCase(elementName)}</label>
          </Paragraph>

          <FlexBox.Row style={{ position: 'relative' }}>
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
              {mappedConfiguration &&
                mappedConfiguration[elementName]?.map(
                  (item: any, index: any) => (
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

                        <Box className="form-group" style={{ width: '28.3vw' }}>
                          <FormTextField
                            onChange={(event: any) => {
                              const values = [
                                ...mappedConfiguration[elementName],
                              ];
                              values[index] = event;
                              setMappedConfiguration((prevConfig: any) => ({
                                ...prevConfig, // Spread the previous user object
                                [elementName]: values, // Update the age property
                              }));
                            }}
                            label={'Value'}
                            value={item}
                            placeholder={''}
                          />
                        </Box>
                        <div
                          style={{
                            justifyContent: 'space-between',
                            display: 'flex',
                            marginTop: '20px',
                            marginLeft: '5px',
                          }}
                        >
                          <div
                            style={{
                              display: 'flex',
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                            }}
                          >
                            {mappedConfiguration[elementName].length > 1 && (
                              <button
                                className={styles.fieldButton}
                                style={{}}
                                type="button"
                                onClick={() => {
                                  const values = [
                                    ...mappedConfiguration[elementName],
                                  ];
                                  values.splice(index, 1);
                                  setMappedConfiguration((prevConfig: any) => ({
                                    ...prevConfig, // Spread the previous user object
                                    [elementName]: values, // Update the age property
                                  }));
                                }}
                              >
                                <icons.delete color={iconColors.grey} />
                              </button>
                            )}
                            {index ===
                              mappedConfiguration[elementName].length - 1 && (
                              <button
                                className={styles.fieldButton}
                                type="button"
                                onClick={() => {
                                  const values = [
                                    ...mappedConfiguration[elementName],
                                  ];
                                  values.push('');
                                  setMappedConfiguration((prevConfig: any) => ({
                                    ...prevConfig, // Spread the previous user object
                                    [elementName]: values, // Update the age property
                                  }));
                                }}
                              >
                                <icons.addNew color={iconColors.primary} />
                              </button>
                            )}
                          </div>
                        </div>
                      </Box>
                    </Fragment>
                  ),
                )}
            </div>
            <div className="submit-button"></div>
            <br />
          </FlexBox.Row>
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
                setMappedConfiguration((prevConfig: any) => ({
                  ...prevConfig, // Spread the previous user object
                  [elementName]: !elementSchema, // Update the age property
                }))
              }
              label={titleCase(elementName)}
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

  if (componentLoading) {
    return <FullWidthSpinner color="black" size="md" />;
  }
  return (
    <FlexBox.Column marginTop="xl">
      <FlexBox.Row flexDirection="column">
        <Container>
          <Box style={{ width: '30vw' }}>
            <FormTextField
              onChange={(e: any) => {
                setComponentName(e);
              }}
              required={true}
              placeholder="Component Name"
              label={'Component Name'}
              value={componentName}
            />
          </Box>
        </Container>
        <Container>
          <Box marginTop="lg">
            <ToggleField
              label={'Share Component with public'}
              default={isShared}
              value={isShared}
              onHandleChange={(key: any, value: any) => setIsShared(!isShared)}
            />
          </Box>
        </Container>
        {flavor.connector_resource_type && (
          <Box marginTop="md" marginLeft="md" style={{ width: '30vw' }}>
            <Paragraph size="body" style={{ color: '#000' }}>
              <label htmlFor="key">{'Connect to resource'}</label>
            </Paragraph>

            <Box marginTop="sm" style={{ width: '30vw' }}>
              <ServicesSelectorComponent
                fetching={fetching}
                inputData={mappedConfiguration}
                setInputData={setMappedConfiguration}
                sensitiveFields={sensitiveFields}
                defaultMappedConfig={defaultMappedConfig}
                connectorResourceIdAttr={flavor.connector_resource_id_attr}
                connector={connector}
                setConnector={setConnector}
                connectorResourceId={connectorResourceId}
                setConnectorResourceId={setConnectorResourceId}
                serviceConnectorResources={serviceConnectorResources}
              />
            </Box>
          </Box>
        )}
      </FlexBox.Row>
      <FlexBox.Row style={{ width: '40%' }}>
        <Container>
          {mappedConfiguration &&
            Object.keys(mappedConfiguration)?.map((key, ind) => (
              <Fragment key={key}>
                {getFormElement(key, mappedConfiguration[key])}
              </Fragment>
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
            onClick={() => {
              onSubmit();
            }}
          >
            Save Changes
          </PrimaryButton>
        </Box>
      </FlexBox>
    </FlexBox.Column>
  );
};
