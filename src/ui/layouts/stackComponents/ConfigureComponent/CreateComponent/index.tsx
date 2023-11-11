import React, { Fragment, useEffect, useState } from 'react';
import styles from './index.module.scss';
import {
  Box,
  FlexBox,
  FormTextField,
  FullWidthSpinner,
  MakeSecretField,
  Paragraph,
  icons,
} from '../../../../components';

import { Form, TextField, ToggleField } from '../../../common/FormElement';
import {
  useDispatch,
  useHistory,
  useLocation,
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
} from '../../../../../redux/actions';
import { iconColors, toasterTypes } from '../../../../../constants';
import { routePaths } from '../../../../../routes/routePaths';
import { SidePopup } from '../SidePopup';
import { callActionForStackComponentsForPagination } from '../../Stacks/useService';
import { titleCase } from '../../../../../utils';

import ServicesSelectorComponent from '../../ServicesSelectorComponent';
import { useService } from '../../RegisterComponents/ListForAll/useService';
import axios from 'axios';

export const CreateComponent: React.FC<{
  flavor: any;
  state: any;
  fetching?: boolean;
  serviceConnectorResources?: any;
}> = ({ flavor, fetching, serviceConnectorResources, state }) => {
  const {
    dispatchStackComponentsData,
  } = callActionForStackComponentsForPagination();
  const location = useLocation();
  const authToken = useSelector(sessionSelectors.authenticationToken);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);
  const secrets = useSelector(secretSelectors.mySecrets);

  const user = useSelector(userSelectors.myUser);
  const workspaces = useSelector(workspaceSelectors.myWorkspaces);
  const [componentName, setComponentName] = useState('');
  const [isShared, setIsShared] = useState(true);
  const [inputData, setInputData] = useState({}) as any;
  const [inputFields, setInputFields] = useState() as any;
  const [inputArrayFields, setInputArrayFields] = useState() as any;
  const [secretOptionsWithKeys, setSecretOptionsWithKeys] = useState([]);
  const [selectedSecret, setSelectedSecret] = useState({}) as any;
  const [secretId, setSecretId] = useState('');
  const [secretIdArray, setSecretIdArray] = useState([]);
  const [connector, setConnector] = useState();
  const [connectorResourceId, setConnectorResourceId] = useState();
  const history = useHistory();
  const { version } = useService();

  useEffect(() => {
    if (state?.state?.routeFromComponent) {
      setIsShared(state?.state?.isShared);
      setInputFields(state?.state?.inputFields);
      setInputData(state?.state?.inputData);
      setComponentName(state?.state?.componentName);
      setSecretId(state?.state?.secretId);
      setSecretIdArray(state?.state?.secretIdArray);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);
  useEffect(() => {
    if (!state?.state?.routeFromComponent) {
      let setDefaultData = {};
      let setInputObjectType: any = [];
      let setInputArrayType: any = [];
      initForm(flavor.metadata.config_schema.properties);
      Object.keys(flavor.metadata.config_schema.properties).map((key, ind) => {
        const data = flavor.metadata.config_schema.properties[key];
        if (data.default && (data.type === 'string' || data.type === 'integer'))
          setDefaultData = {
            ...setDefaultData,
            [toSnakeCase(data.title)]: data.default,
          };
        else if (data.default && data.type === 'array') {
          setInputArrayType = {
            ...setInputArrayType,
            [toSnakeCase(data.title)]: [...data.default, ''],
          };
        } else if (
          flavor.metadata.config_schema.properties[key]?.additionalProperties &&
          flavor.metadata.config_schema.properties[key]?.additionalProperties
            ?.type !== 'string'
        ) {
          setDefaultData = {
            ...setDefaultData,
            [toSnakeCase(data.title)]: data.default,
          };
        }
        return null;
      });

      Object.keys(flavor.metadata.config_schema.properties).map((key, ind) => {
        const data = flavor.metadata.config_schema.properties[key];
        if (data.type === 'object') {
          if (
            flavor.metadata.config_schema.properties[key]
              ?.additionalProperties &&
            flavor.metadata.config_schema.properties[key]?.additionalProperties
              ?.type === 'string'
          ) {
            setInputObjectType.push({
              [key]: [{ key: '', value: '' }],
            });
          } else {
            setInputObjectType.push({
              [key]: [{ key: '', value: '' }],
            });
          }
        }
        return null;
      });
      setInputArrayFields(setInputArrayType);
      setInputFields(setInputObjectType);

      setInputData({ ...setDefaultData });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleAddFields = (name: any, index: any) => {
    const values = [...inputFields];

    values[index][name].push({ key: '', value: '' });

    setInputFields(values);
  };

  const handleRemoveFields = (parentIndex: any, childIndex: any, name: any) => {
    const values = [...inputFields];

    values[parentIndex][name].splice(childIndex, 1);
    setInputFields(values);
  };
  const toSnakeCase = (str: any) =>
    str &&
    str
      .match(
        /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g,
      )
      .map((x: any) => x.toLowerCase())
      .join('_');

  const secretOptions = secrets.map((item: any) => {
    return {
      label: `{{ ${item.name}.` as string,
      value: `{{ ${item.name}.` as string,
      id: item.id as string,
    };
  }) as any;

  function callActionForSecret(name: any, value: any, newEvent?: any) {
    setInputData({
      ...inputData,
      [name]: {
        value: value.value ? value.value : value,
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

  const handleInputChange = (
    parentIndex: any,
    childIndex: any,
    event: any,
    name: any,
    type: any,
  ) => {
    const values = [...inputFields];
    if (type === 'key') {
      values[parentIndex][name][childIndex].key = event;
    } else {
      values[parentIndex][name][childIndex].value = event;
    }
    setInputFields(values);
  };

  const initForm = (properties: any) => {
    let _formData: any = {};

    for (var key of Object.keys(properties)) {
      _formData[key] = '' as any;
    }

    setFormData(_formData);
  };

  const getFormElement = (elementName: any, elementSchema: any) => {
    const props = {
      name: elementName,
      label: elementSchema.title,
      default: elementSchema.default as any,
      sensitive: elementSchema.sensitive as boolean,
      additionalProperties: elementSchema?.additionalProperties?.type as any,
    };

    if (
      elementSchema.type === 'object' &&
      elementSchema.title &&
      (props.additionalProperties === undefined ||
        props.additionalProperties === 'string')
    ) {
      return (
        <Box marginTop="md">
          <Paragraph size="body" style={{ color: '#000' }}>
            <label htmlFor="key">{props.label}</label>
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
              {inputFields?.map((item: any, parentIndex: any) =>
                item[props.name]?.map((inputField: any, childIndex: any) => (
                  <Fragment key={`${inputField}~${childIndex}`}>
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
                        style={{ width: '13.75vw' }}
                      >
                        <FormTextField
                          onChange={(event: any) =>
                            handleInputChange(
                              parentIndex,
                              childIndex,
                              event,
                              props.name,
                              'key',
                            )
                          }
                          label={'Key'}
                          value={inputField?.key}
                          placeholder={''}
                        />
                      </Box>

                      <Box className="form-group" style={{ width: '13.75vw' }}>
                        <FormTextField
                          onChange={(event: any) =>
                            handleInputChange(
                              parentIndex,
                              childIndex,
                              event,
                              props.name,
                              'value',
                            )
                          }
                          label={'Value'}
                          value={inputField?.value}
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
                          {item[props.name].length > 1 && (
                            <button
                              className={styles.fieldButton}
                              style={{}}
                              type="button"
                              onClick={() =>
                                handleRemoveFields(
                                  parentIndex,
                                  childIndex,
                                  props.name,
                                )
                              }
                            >
                              <icons.delete color={iconColors.grey} />
                            </button>
                          )}

                          {childIndex === item[props.name].length - 1 && (
                            <button
                              className={styles.fieldButton}
                              type="button"
                              onClick={() =>
                                handleAddFields(props.name, parentIndex)
                              }
                            >
                              <icons.addNew color={iconColors.primary} />
                            </button>
                          )}
                        </div>
                      </div>
                    </Box>
                  </Fragment>
                )),
              )}
            </div>
            <div className="submit-button"></div>
            <br />
          </FlexBox.Row>
        </Box>
      );
    }

    if (
      elementSchema.type === 'object' &&
      elementSchema.title &&
      props.additionalProperties !== 'string'
    ) {
      return (
        <>
          {' '}
          <Box marginTop="sm">
            <Paragraph size="body" style={{ color: '#000' }}>
              <label htmlFor="key">{props.label}</label>
            </Paragraph>
          </Box>
          <FlexBox marginTop="sm" fullWidth>
            <textarea
              className={styles.textArea}
              defaultValue={JSON.stringify(inputData[props.name])}
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

                  setInputData({
                    ...inputData,
                    [props.name]: jsonObj,
                  });
                } catch (e) {}
              }}
            />
          </FlexBox>
        </>
      );
    }
    if (
      elementSchema.type === 'string' ||
      (elementSchema.type === 'integer' && elementSchema.title)
    ) {
      return (
        <>
          {props.sensitive ? (
            !connectorResourceId && (
              <Box marginTop="lg">
                <MakeSecretField
                  required={flavor?.metadata.config_schema?.required?.includes(
                    elementName,
                  )}
                  label={titleCase(props.name) + ' (Secret)'}
                  placeholder={''}
                  handleClick={() => {
                    if (secretId) {
                      const state = {
                        secretIdArray: secretIdArray,
                        secretId: secretId,
                        flavor: flavor.name,
                        routeFromComponent: true,
                        componentName: componentName,
                        isShared: isShared,
                        inputFields: inputFields,
                        inputData: inputData,
                        secretKey: props.name,
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
                        secretId: secretId,
                        secretIdArray: secretIdArray,
                        flavor: flavor.name,
                        routeFromComponent: true,
                        componentName: componentName,
                        isShared: isShared,
                        inputFields: inputFields,
                        inputData: inputData,
                        secretKey: props.name,
                        pathName: location.pathname,
                      };
                      history.push(
                        routePaths.secrets.registerSecrets(selectedWorkspace),
                        state,
                      );
                    }
                  }}
                  inputData={inputData}
                  value={
                    inputData[props.name]?.value
                      ? inputData[props.name]?.value
                      : inputData[props.name]?.length
                      ? inputData[props.name]
                      : ''
                  }
                  onChange={(val: string, newEvent: any) => {
                    if (!val) {
                      if (secretIdArray.length === 1) {
                      } else {
                        setSecretId('');
                      }
                    }
                    if (val.includes('{{')) {
                      callActionForSecret(props.name, val, newEvent);
                    } else {
                      setInputData({
                        ...inputData,
                        [props.name]: val,
                      });
                    }
                  }}
                  secretOnChange={(val: any, newEvent: any) => {
                    if (val?.value?.includes('}}')) {
                      setInputData({
                        ...inputData,
                        [props?.name]: val?.value?.includes('.')
                          ? val.value
                          : val,
                      });
                    } else if (val.value.includes('{{')) {
                      callActionForSecret(props.name, val, newEvent);
                    }
                  }}
                  dropdownOptions={
                    inputData[props?.name]?.value &&
                    inputData[props?.name]?.value.includes(
                      `${selectedSecret.name}.`,
                    )
                      ? secretOptionsWithKeys
                      : secretOptions
                  }
                  tooltipText='Start typing with "{{" to reference a secret for this field.'
                />
              </Box>
            )
          ) : props.name === 'authentication_secret' &&
            connectorResourceId ? null : (
            <TextField
              {...props}
              disabled={
                connectorResourceId &&
                elementName === flavor.connectorResourceIdAttr
              }
              required={flavor?.metadata.config_schema?.required?.includes(
                elementName,
              )}
              inputData={inputData}
              default={
                inputData[props.name]
                  ? inputData[props.name]
                  : props.default !== undefined
                  ? props.default
                  : ''
              }
              onHandleChange={(key: any, value: any) =>
                setInputData({ ...inputData, [key]: value })
              }
            />
          )}
        </>
      );
    }
    if (elementSchema.type === 'boolean' && elementSchema.title) {
      return (
        <Box marginTop="md">
          <ToggleField
            {...props}
            value={
              inputData[props.name] ? inputData[props.name] : props.default
            }
            onHandleChange={(event: any, value: any) => {
              setInputData({
                ...inputData,
                [props.name]: !inputData[props.name],
              });
            }}
          />
        </Box>
      );
    }
    if (elementSchema.type === 'array' && elementSchema.title) {
      return (
        <Box marginTop="md">
          <Paragraph size="body" style={{ color: '#000' }}>
            <label htmlFor="key">{props.label}</label>
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
              {inputArrayFields &&
                inputArrayFields[props?.name]?.map((item: any, index: any) => (
                  <Fragment>
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
                        style={{ width: '385px' }}
                      >
                        <FormTextField
                          onChange={(event: any) => {
                            const values = { ...inputArrayFields };
                            values[props.name][index] = event;
                            setInputArrayFields(values);
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
                          marginLeft: '-10px',
                        }}
                      >
                        {inputArrayFields[props.name].length > 1 && (
                          <button
                            className={styles.fieldButton}
                            style={{}}
                            type="button"
                            onClick={() => {
                              const values = { ...inputArrayFields };
                              values[props.name].splice(index, 1);
                              setInputArrayFields(values);
                            }}
                          >
                            <icons.delete color={iconColors.grey} />
                          </button>
                        )}
                        {index === inputArrayFields[props.name].length - 1 && (
                          <button
                            className={styles.fieldButton}
                            type="button"
                            onClick={() => {
                              const values = { ...inputArrayFields };
                              values[props.name].push('');
                              setInputArrayFields(values);
                            }}
                          >
                            <icons.addNew color={iconColors.primary} />
                          </button>
                        )}
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
  };

  const onSubmit = async (values: any) => {
    const requiredField = flavor?.metadata.config_schema?.required?.filter(
      (item: any) => inputData[item],
    );
    if (
      requiredField?.length !== flavor?.metadata.config_schema?.required?.length
    ) {
      dispatch(
        showToasterAction({
          description: 'Required Field is Empty',
          type: toasterTypes.failure,
        }),
      );
      return false;
    }
    if (!componentName) {
      dispatch(
        showToasterAction({
          description: 'Required Field is Empty',
          type: toasterTypes.failure,
        }),
      );
      return false;
    }
    const { id }: any = workspaces.find(
      (item) => item.name === selectedWorkspace,
    );
    const tempFinal: any = {};
    inputFields.forEach((ar: any) => {
      const keys = Object.keys(ar);
      keys.forEach((key) => {
        tempFinal[key] = {};

        ar[key].forEach((nestedArr: any) => {
          if (nestedArr.key || nestedArr.value) {
            tempFinal[key] = {
              ...tempFinal[key],
              [nestedArr.key]: nestedArr.value,
            };
          } else {
            if (
              tempFinal[key] !== undefined &&
              Object.keys(tempFinal[key]).length === 0
            ) {
              delete tempFinal[key];
            }
          }
        });
      });
    });

    let final: any = {};
    inputFields.forEach((ar: any) => {
      const keys = Object.keys(ar);
      keys.forEach((key) => {
        final[key] = {};

        ar[key].forEach((nestedArr: any) => {
          if (final[key]?.hasOwnProperty(nestedArr.key)) {
            dispatch(
              showToasterAction({
                description: 'Key already exists.',
                type: toasterTypes.failure,
              }),
            );
            return (final = {});
          } else {
            if (nestedArr.key || nestedArr.value) {
              final[key] = {
                ...final[key],
                [nestedArr.key]: nestedArr.value,
              };
            } else {
              if (
                final[key] !== undefined &&
                Object.keys(final[key]).length === 0
              ) {
                delete final[key];
              }
            }
          }
        });
      });
    });
    if (Object.keys(tempFinal).length !== Object.keys(final).length) {
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

    for (const [, value] of Object.entries(inputData) as any) {
      if (value.id) {
        return dispatch(
          showToasterAction({
            description: 'Invalid secret',
            type: toasterTypes.failure,
          }),
        );
      }
    }
    function removeEmptyValues(obj: any) {
      for (const [key, value] of Object.entries(obj)) {
        if (
          value === null ||
          value === undefined ||
          value === '' ||
          (typeof value === 'object' && Object.keys(value as any).length === 0)
        ) {
          delete obj[key];
        }
      }
      return obj;
    }

    const cleanedInputData = removeEmptyValues(inputData);

    const body: any = {
      user: user?.id,
      workspace: id,
      is_shared: isShared,
      name: componentName,
      type: flavor.body.type,
      flavor: flavor.name,
      configuration: { ...cleanedInputData, ...final, ...inputArrayFields },
    };
    if (connector && connector !== null) {
      body.connector = connector;
      body.connector_resource_id = connectorResourceId;
    }

    setLoading(true);
    await axios
      .post(
        `${process.env.REACT_APP_BASE_API_URL}/workspaces/${selectedWorkspace}/components`,
        // @ts-ignore
        { ...body },
        { headers: { Authorization: `Bearer ${authToken}` } },
      )
      .then((response) => {
        const id = response.data.id;
        setLoading(false);
        dispatch(
          showToasterAction({
            description: 'Component has been created successfully',
            type: toasterTypes.success,
          }),
        );
        dispatchStackComponentsData(1, 1);

        history.push(
          routePaths.stackComponents.configuration(
            flavor.body.type,
            id,
            selectedWorkspace,
          ),
        );
      })
      .catch((err) => {
        setLoading(false);
        if (err?.response?.status === 403) {
          dispatch(
            showToasterAction({
              description: err?.response?.data?.detail,
              type: toasterTypes.failure,
            }),
          );
        } else if (err?.response?.status === 409) {
          dispatch(
            showToasterAction({
              description: err?.response?.data?.detail[0].includes('Exists')
                ? `Component name already exists.`
                : err?.response?.data?.detail[0],
              type: toasterTypes.failure,
            }),
          );
        } else {
          dispatch(
            showToasterAction({
              description: err?.response?.data?.detail[0].includes('Exists')
                ? `Component name already exists.`
                : err?.response?.data?.detail[0],
              type: toasterTypes.failure,
            }),
          );
        }
      });
  };
  if (loading) {
    return <FullWidthSpinner color="black" size="md" />;
  }

  return (
    <Box>
      <FlexBox.Row style={{ width: '100%' }}>
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
          <Box marginTop="md">
            <ToggleField
              label={'Share Component with public'}
              default={isShared}
              value={isShared}
              onHandleChange={() => setIsShared(!isShared)}
            />
          </Box>
          {flavor.connectorResourceType && (
            <Box marginTop="md" style={{ width: '30vw' }}>
              <Paragraph size="body" style={{ color: '#000' }}>
                <label htmlFor="key">{'Connect to resource'}</label>
              </Paragraph>

              <Box marginTop="sm" style={{ width: '30vw' }}>
                <ServicesSelectorComponent
                  fetching={fetching}
                  inputData={inputData}
                  setInputData={setInputData}
                  connector={connector}
                  connectorResourceIdAttr={flavor.connectorResourceIdAttr}
                  setConnector={setConnector}
                  connectorResourceId={connectorResourceId}
                  setConnectorResourceId={setConnectorResourceId}
                  serviceConnectorResources={serviceConnectorResources}
                />
              </Box>
            </Box>
          )}

          <Form enableReinitialize initialValues={formData} onSubmit={onSubmit}>
            {Object.keys(flavor.metadata.config_schema.properties).map(
              (key, ind) => (
                <div key={key}>
                  {getFormElement(
                    key,
                    flavor.metadata.config_schema.properties[key],
                  )}
                </div>
              ),
            )}
          </Form>
        </Box>

        <SidePopup
          onClose={() => {}}
          flavor={flavor}
          action={onSubmit}
          version={version}
        />
      </FlexBox.Row>
    </Box>
  );
};
