import React, { Fragment, useEffect, useState } from 'react';
import {
  FlexBox,
  Box,
  // EditField,
  Paragraph,
  Container,
  FullWidthSpinner,
  PrimaryButton,
  FormTextField,
  icons,
  FormPasswordFieldVerify,
  FormDropdownField,
  // MakeSecretField,
  // EditField,
  // icons,
} from '../../../../components';
import styles from './index.module.scss';
import { useService } from './useService';
import axios from 'axios';
import {
  useDispatch,
  useHistory,
  // useLocation,
  // useLocationPath,
  // useHistory,
  // useLocationPath,
  useSelector,
} from '../../../../hooks';
import {
  // secretSelectors,
  sessionSelectors,
  userSelectors,
  workspaceSelectors,
} from '../../../../../redux/selectors';
import {
  // secretsActions,
  showToasterAction,
  // stackComponentsActions,
} from '../../../../../redux/actions';
import { iconColors, toasterTypes } from '../../../../../constants';
import { ToggleField } from '../../../common/FormElement';
import { routePaths } from '../../../../../routes/routePaths';
// import { es } from 'date-fns/locale';
// import { values } from 'lodash';
// import { routePaths } from '../../../../../routes/routePaths';

import ServicesSelectorComponent from '../../ServicesSelectorComponent/Disabled';

export const UpdateConfig: React.FC<{
  connectorId: TId;
  loading?: boolean;
  state: any;
}> = ({ connectorId, loading, state }) => {
  // const location = useLocation();
  // const locationPath = useLocationPath();
  // const history = useHistory();

  const { connector } = useService({
    connectorId,
  });
  console.log(connector, 'connectorconnector');
  const history = useHistory();
  const [connectorName, setConnectorName] = useState('');
  const [connectorDescription, setConnectorDescription] = useState(
    connector.connectorType.description,
  );
  const [connectorExpirationSeconds, setConnectorExpirationSeconds] = useState(
    connector.expirationSeconds,
  );
  const [labelsInputFields, setLabelsInputFields] = useState([]) as any;
  const [isShared, setIsShared] = useState() as any;
  const [mappedConfiguration, setMappedConfiguration] = useState() as any;
  const user = useSelector(userSelectors.myUser);
  const [fetching, setFetching] = useState(false);
  // const secrets = useSelector(secretSelectors.mySecrets);
  const authToken = useSelector(sessionSelectors.authenticationToken);
  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);
  const dispatch = useDispatch();
  // const [secretId, setSecretId] = useState('');
  // const [secretIdArray, setSecretIdArray] = useState([]);
  // const [secretOptionsWithKeys, setSecretOptionsWithKeys] = useState([]);
  // const [selectedSecret, setSelectedSecret] = useState({}) as any;
  const workspaces = useSelector(workspaceSelectors.myWorkspaces);
  const [inputFields, setInputFields] = useState([]) as any;
  const titleCase = (s: any) =>
    s.replace(/^_*(.)|_+(.)/g, (s: any, c: string, d: string) =>
      c ? c.toUpperCase() : ' ' + d.toUpperCase(),
    );
  const matchedAuthMethod = connector.connectorType.auth_methods.find(
    (item: any) => item?.auth_method === connector?.authMethod,
  );

  useEffect(() => {
    // const matchedAuthMethod = connector.connectorType.auth_methods.find(
    //   (item: any) => item?.auth_method === connector?.authMethod,
    // );
    function convertJSON(json: any) {
      const updatedObj = [];

      // Handle empty object case
      if (Object.keys(json).length === 0) {
        updatedObj.push({ key: '', value: '' });
        return updatedObj;
      }

      // Iterate over the object properties
      for (const key in json) {
        updatedObj.push({ key: key.trim(), value: json[key] });
      }

      return updatedObj;
    }
    const convertedJson = convertJSON(connector.labels);

    const configurationModifiedObj: any = {};

    // Iterate over the properties of obj1
    for (let prop in matchedAuthMethod.config_schema.properties) {
      // Check if the property exists in obj2
      if (connector.configuration.hasOwnProperty(prop)) {
        // Add the property to obj1 with the value from obj2
        configurationModifiedObj[prop] = {
          ...matchedAuthMethod.config_schema.properties[prop],
          default: connector.configuration[prop],
        };
      } else {
        // If the property does not exist in obj2, copy it as is
        configurationModifiedObj[prop] = {
          ...matchedAuthMethod.config_schema.properties[prop],
          default:
            matchedAuthMethod.config_schema.properties[prop].type === 'array'
              ? ['']
              : matchedAuthMethod.config_schema.properties[prop].type ===
                'object'
              ? { key: '', value: '' }
              : matchedAuthMethod.config_schema.properties[prop].type ===
                'boolean'
              ? false
              : '',
        };
      }
    }
    setConnectorName(connector.name);
    setLabelsInputFields(convertedJson as any);

    setIsShared(connector.isShared);

    setMappedConfiguration(configurationModifiedObj);
    // debugger;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connector]);
  console.log('convertedJson', labelsInputFields);

  // const secretOptions = secrets.map((item: any) => {
  //   return {
  //     label: `{{ ${item.name}.` as string,
  //     value: `{{ ${item.name}.` as string,
  //     id: item.id as string,
  //   };
  // }) as any;
  const onSubmit = () => {
    // ;
    const { id }: any = workspaces.find(
      (item) => item.name === selectedWorkspace,
    );
    if (!connectorName) {
      dispatch(
        showToasterAction({
          description: 'Required Field is Empty',
          type: toasterTypes.failure,
        }),
      );
      return false;
    }
    console.log(mappedConfiguration, 'asdasdasd');
    const payload: any = {};

    for (const key in mappedConfiguration) {
      if (mappedConfiguration.hasOwnProperty(key)) {
        payload[key] = mappedConfiguration[key].default;
      }
    }

    for (const field of matchedAuthMethod.config_schema.required) {
      if (!payload[field]) {
        dispatch(
          showToasterAction({
            description: 'Required Field is Empty',
            type: toasterTypes.failure,
          }),
        );
        return false;
      }
    }
    const labels: any = {};

    labelsInputFields.forEach((item: any) => {
      if (item.key !== '' || item.value !== '') {
        labels[item.key] = item.value;
      }
    });

    for (var key in labels) {
      if (key === '') {
        dispatch(
          showToasterAction({
            description: 'Key cannot be Empty.',
            type: toasterTypes.failure,
          }),
        );
        return false;
      } else if (labels[key] === '') {
        dispatch(
          showToasterAction({
            description: 'Value cannot be Empty.',
            type: toasterTypes.failure,
          }),
        );
        return false;
      }
    }
    const body = {
      user: user?.id,
      workspace: id,
      is_shared: isShared,
      name: connectorName,
      connector_type: connector.connectorType.connector_type,
      description: connector.description,
      auth_method: connector.authMethod,
      resource_types: connector.resourceTypes,
      configuration: { ...payload },
      labels: labels,
      resource_id: connector.resourceId,
      // type: stackComponent.type,
      // flavor: stackComponent.flavor,
      // configuration: { ...mappedConfiguration, ...final },
    };

    setFetching(true);
    axios
      .put(
        `${process.env.REACT_APP_BASE_API_URL}/service_connectors/${connector.id}`,
        // @ts-ignore
        body,
        { headers: { Authorization: `Bearer ${authToken}` } },
      )
      .then((response: any) => {
        // const id = response.data.id;

        setFetching(false);
        dispatch(
          showToasterAction({
            description: 'Connector has been updated successfully.',
            type: toasterTypes.success,
          }),
        );

        // setInputFields([]);
        // dispatch(
        //   stackComponentsActions.stackComponentForId({
        //     stackComponentId: stackComponent?.id,
        //     onSuccess: () => {
        //       setFetching(false);
        //       history.push(
        //         routePaths.stackComponents.configuration(
        //           locationPath.split('/')[4],
        //           stackComponent.id,
        //           selectedWorkspace,
        //         ),
        //       );
        //     },
        //     onFailure: () => setFetching(false),
        //   }),
        // );
        // dispatchStackData(1, 10);
        // history.push(routePaths.stacks.base);
        // dispatchStackComponentsData(1, 10);

        history.push(
          routePaths.connectors.configuration(
            // flavor.type,
            connector.id,
            selectedWorkspace,
          ),
        );
      })
      .catch((err) => {
        setFetching(false);
        // ;
        // setLoading(false);
        dispatch(
          showToasterAction({
            description: err?.response?.data?.detail[0],
            type: toasterTypes.failure,
          }),
        );
      });
  };

  // function callActionForSecret(name: any, value: any, newEvent?: any) {
  //   setMappedConfiguration({
  //     ...mappedConfiguration,
  //     [name]: {
  //       value: value.value ? value.value : value,
  //       id: value?.id ? value?.id : '',
  //     },
  //   });
  //   if (value?.id) {
  //     console.log('Asdasasd123123', secretIdArray);
  //     // debugger;
  //     setSecretId(value?.id);
  //     const listOfIds: any = [...secretIdArray];
  //     listOfIds.push(value.id);
  //     setSecretIdArray(listOfIds);
  //   }

  //   if (value?.value?.includes('.') || value?.value?.id) {
  //     dispatch(
  //       secretsActions.secretForId({
  //         secretId: value?.id,
  //         onSuccess: (res) => {
  //           setSelectedSecret(res);
  //           const secretOptionsWithKeys = Object.keys(res.values)?.map(
  //             (item: any) => {
  //               return {
  //                 label: `{{ ${res?.name}.${item} }}` as string,
  //                 value: `{{ ${res?.name}.${item} }}` as string,
  //               };
  //             },
  //           ) as any;
  //           setSecretOptionsWithKeys(secretOptionsWithKeys);
  //         },
  //         // onFailure: () => setFetching(false),
  //       }),
  //     );
  //   } else if (value?.includes('{{')) {
  //     dispatch(
  //       secretsActions.getMy({
  //         size: 10,
  //         workspace: selectedWorkspace,
  //         name: 'contains:' + value.replace(/[{ }]/g, ''),
  //       }),
  //     );
  //   }
  // }
  // const onPressEnter = (
  //   event?: any,
  //   type?: string,
  //   elementName?: any,
  //   defaultValue?: any,
  //   index?: any,
  // ) => {
  //   if (event.key === 'Enter') {
  //     // ;
  //     const updateConfig = {
  //       ...stackComponent,
  //     };
  //     if (type === 'string') {
  //       updateConfig.configuration[elementName] = event.target.value;
  //     }
  //     if (type === 'name') {
  //       updateConfig.name = event.target.value;
  //     }
  //     if (type === 'key') {
  //       updateConfig.configuration[elementName][event.target.value] =
  //         updateConfig.configuration[elementName][defaultValue];
  //       delete updateConfig.configuration[elementName][defaultValue];
  //     }
  //     if (type === 'value') {
  //       var unkownKey = Object.keys(updateConfig.configuration[elementName])[
  //         index
  //       ];
  //       // ;
  //       updateConfig.configuration[elementName][unkownKey] = event.target.value;
  //       // delete updateConfig.configuration[elementName][defaultValue];
  //     }
  //     onCallApi(updateConfig);
  //   }
  // };

  // const onPressEnterForEmpty = (event: any, type: any, elementName?: any) => {
  //   if (event.key === 'Enter') {
  //     const updateConfig = {
  //       ...stackComponent,
  //     };
  //     updateConfig.configuration[elementName] = { '': '' };
  //     if (type === 'key') {
  //       updateConfig.configuration[elementName][event.target.value] =
  //         updateConfig.configuration[elementName][''];
  //       delete updateConfig.configuration[elementName][''];
  //     }
  //     if (type === 'value') {
  //       var unkownKey = Object.keys(updateConfig.configuration[elementName])[0];
  //       // ;
  //       updateConfig.configuration[elementName][unkownKey] = event.target.value;
  //       // delete updateConfig.configuration[elementName][defaultValue];
  //     }
  //     console.log(updateConfig, 'asdasd');
  //     onCallApi(updateConfig);
  //   }
  // };
  // const onPressEnterForAddMore = (
  //   event: any,
  //   type?: any,
  //   elementName?: any,
  // ) => {
  //   if (event.key === 'Enter') {
  //     const updateConfig = {
  //       ...stackComponent,
  //     };
  //     //    if (event) {
  //     //   setInputData({
  //     //     ...inputData,
  //     //     [toSnakeCase(label)]: {
  //     //       ...result,
  //     //     },
  //     //   });
  //     // }
  //     const keys = inputFields.map((object: any) => object.key);
  //     const value = inputFields.map((object: any) => object.value);
  //     var result: any = {};
  //     keys.forEach((key: any, i: any) => (result[key] = value[i]));
  //     updateConfig.configuration[elementName] = {
  //       ...updateConfig.configuration[elementName],
  //       ...result,
  //     };
  //     console.log(
  //       updateConfig.configuration[elementName],
  //       inputFields,
  //       'configur222ation',
  //     );
  //     onCallApi(updateConfig);
  //   }
  // };

  // const onChangeToggle = (value: any, type?: any, key?: any) => {
  //   const updateConfig = {
  //     ...stackComponent,
  //   };
  //   // ;
  //   if (type === 'share') {
  //     updateConfig.isShared = value;
  //   }
  //   if (type === 'other') {
  //     updateConfig.configuration[key] = value;
  //   }
  //   onCallApi(updateConfig);
  // };

  // const handleAddFields = () => {
  //   const values = [...inputFields];
  //   values.push({ key: '', value: '' });
  //   setInputFields(values);
  // };
  // const handleInputChange = (index: any, event: any, label: any, type: any) => {
  //   const values = [...inputFields];
  //   if (type === 'key') {
  //     values[index].key = event;
  //   } else {
  //     values[index].value = event;
  //   }
  //   setInputFields(values);
  // };
  // const handleRemoveFields = (index: any) => {
  //   const values = [...inputFields];
  //   values.splice(index, 1);
  //   setInputFields(values);
  // };

  const getFormElement: any = (elementName: any, elementSchema: any) => {
    if (elementSchema.type === 'string') {
      console.log(
        mappedConfiguration,
        'mappedConfigurationmappedConfiguration',
      );
      return (
        <>
          {elementSchema?.format === 'password' ? (
            <Box marginTop="lg" style={{ width: '30vw' }}>
              <FormPasswordFieldVerify
                required={matchedAuthMethod?.config_schema?.required?.includes(
                  elementName,
                )}
                onChange={(e: any) => {
                  setMappedConfiguration((prevConfig: any) => ({
                    ...prevConfig, // Spread the previous user object
                    [elementName]: { ...prevConfig[elementName], default: e }, // Update the age property
                  }));
                  // setMappedConfiguration(...mappedConfiguration,
                  //   mappedConfiguration[elementName]: e,
                  // );
                }}
                placeholder=""
                label={titleCase(elementName)}
                value={mappedConfiguration[elementName].default}
                optional={false}
                defaultValue={elementSchema.default}
                error={{}}
              />
            </Box>
          ) : (
            <Box marginTop="lg" style={{ width: '30vw' }}>
              <FormTextField
                required={matchedAuthMethod?.config_schema?.required?.includes(
                  elementName,
                )}
                onChange={(e: any) => {
                  setMappedConfiguration((prevConfig: any) => ({
                    ...prevConfig, // Spread the previous user object
                    [elementName]: { ...prevConfig[elementName], default: e }, // Update the age property
                  }));
                  // setMappedConfiguration(...mappedConfiguration,
                  //   mappedConfiguration[elementName]: e,
                  // );
                }}
                placeholder=""
                label={titleCase(elementName)}
                value={mappedConfiguration[elementName].default}
              />
            </Box>
          )}
        </>
      );
    }

    // if (
    //   elementSchema.type === 'object'
    // ) {
    //   return (
    //     <>
    //       {' '}
    //       <Box marginTop="lg">
    //         <Paragraph size="body" style={{ color: '#000' }}>
    //           <label htmlFor="key">{titleCase(elementName)}</label>
    //         </Paragraph>
    //       </Box>
    //       <FlexBox marginTop="sm" fullWidth style={{ width: '30vw' }}>
    //         <textarea
    //           className={styles.textArea}
    //           defaultValue={JSON.stringify(mappedConfiguration[elementName])}
    //           onBlur={(e) => {
    //             const jsonStr = e.target.value;
    //             try {
    //               JSON.parse(jsonStr);
    //             } catch (e) {
    //               dispatch(
    //                 showToasterAction({
    //                   description: 'Invalid JSON.',
    //                   type: toasterTypes.failure,
    //                 }),
    //               );
    //             }
    //           }}
    //           onChange={(e) => {
    //             const jsonStr = e.target.value;
    //             try {
    //               const jsonObj = JSON.parse(jsonStr);

    //               setMappedConfiguration({
    //                 ...mappedConfiguration,
    //                 [elementName]: jsonObj,
    //               });
    //             } catch (e) {}
    //           }}
    //         />
    //       </FlexBox>
    //     </>
    //   );
    // }
    if (elementSchema.type === 'object') {
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
                      style={{ width: '13.7vw' }}
                    >
                      <FormTextField
                        onChange={(event: any) => {
                          const values = { ...inputFields };
                          values[elementName][index].key = event;
                          // values[name][childIndex].key = event;
                          // debugger;
                          setInputFields(values);
                        }}
                        label={'Key'}
                        value={item.key}
                        placeholder={''}
                      />
                    </Box>

                    <Box className="form-group" style={{ width: '13.7vw' }}>
                      <FormTextField
                        onChange={(event: any) => {
                          const values = { ...inputFields };
                          values[elementName][index].value = event;
                          // values[name][childIndex].key = event;
                          // debugger;
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
                            // disabled={item[props.name].length === 1}
                            onClick={
                              () => {
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
                              }
                              // handleRemoveFields(
                              //   parentIndex,
                              //   childIndex,
                              //   props.name,
                              // )
                            }
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
    if (elementSchema.type === 'array') {
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
                mappedConfiguration[elementName].default?.map(
                  (item: any, index: any) => (
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

                        <Box className="form-group" style={{ width: '28.3vw' }}>
                          <FormTextField
                            onChange={(event: any) => {
                              const values = [
                                ...mappedConfiguration[elementName].default,
                              ];
                              values[index] = event;
                              setMappedConfiguration((prevConfig: any) => ({
                                ...prevConfig, // Spread the previous user object
                                [elementName]: {
                                  ...prevConfig[elementName],
                                  default: values,
                                }, // Update the age property
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
                            {mappedConfiguration[elementName].default.length >
                              1 && (
                              <button
                                className={styles.fieldButton}
                                style={{}}
                                type="button"
                                // disabled={item[props.name].length === 1}
                                onClick={() => {
                                  const values = [
                                    ...mappedConfiguration[elementName].default,
                                  ];
                                  values.splice(index, 1);
                                  setMappedConfiguration((prevConfig: any) => ({
                                    ...prevConfig, // Spread the previous user object
                                    [elementName]: {
                                      ...prevConfig[elementName],
                                      default: values,
                                    }, // Update the age property
                                  }));
                                }}
                              >
                                <icons.delete color={iconColors.grey} />
                              </button>
                            )}
                            {index ===
                              mappedConfiguration[elementName].default.length -
                                1 && (
                              <button
                                className={styles.fieldButton}
                                type="button"
                                onClick={() => {
                                  const values = [
                                    ...mappedConfiguration[elementName].default,
                                  ];
                                  values.push('');
                                  setMappedConfiguration((prevConfig: any) => ({
                                    ...prevConfig, // Spread the previous user object
                                    [elementName]: {
                                      ...prevConfig[elementName],
                                      default: values,
                                    }, // Update the age property
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
    if (elementSchema.type === 'boolean') {
      return (
        <Box marginTop={'lg'} style={{ width: '30vw' }}>
          <Box>
            <ToggleField
              value={elementSchema.default}
              onHandleChange={
                () =>
                  setMappedConfiguration((prevConfig: any) => ({
                    ...prevConfig, // Spread the previous user object
                    [elementName]: {
                      ...prevConfig[elementName],
                      default: !prevConfig[elementName].default,
                    }, // Update the age property
                  }))
                // onChangeToggle(!elementSchema, 'other', elementName)
              }
              label={titleCase(elementName)}
              // disabled={true}
            />
          </Box>
        </Box>
      );
    }
  };
  if (loading) {
    return <FullWidthSpinner color="black" size="md" />;
  }

  // const values = [...flavor?.configSchema?.properties];
  // let result = Object.keys(flavor?.configSchema?.properties).reduce(function (
  //   r: any,
  //   name: any,
  // ) {
  //   return (
  //     (r[name] =
  //       flavor?.configSchema?.properties[name].type === 'string' &&
  //       flavor?.configSchema?.properties[name].default === undefined
  //         ? ''
  //         : flavor?.configSchema?.properties[name].default),
  //     r
  //   );
  // },
  // {});
  // function replaceNullWithEmptyString(obj: any) {
  //   for (let prop in obj) {
  //     if (obj[prop] === null) {
  //       obj[prop] = '';
  //     } else if (typeof obj[prop] === 'object') {
  //       replaceNullWithEmptyString(obj[prop]);
  //     }
  //   }
  //   return obj;
  // }

  // replaceNullWithEmptyString(stackComponent?.configuration);
  // for (const key in stackComponent?.configuration) {
  //   if (stackComponent?.configuration.hasOwnProperty(key)) {
  //     if (
  //       stackComponent?.configuration[key] === null &&
  //       flavor?.configSchema?.properties[key].default === undefined
  //     ) {
  //       stackComponent.configuration[key] = '';
  //     } else {
  //       stackComponent.configuration[key] =
  //         flavor?.configSchema?.properties[key].default;
  //     }
  //   }
  // }

  // let normalizeConfiguration = Object.keys(
  //   stackComponent?.configuration,
  // ).reduce(function (r: any, name: any) {
  //   if (stackComponent?.configuration[name] === null) {
  //     return (
  //       (r[name] =
  //         stackComponent?.configuration[name] === null &&
  //         flavor?.configSchema?.properties[name].default === undefined
  //           ? ''
  //           : flavor?.configSchema?.properties[name].default),
  //       r
  //     );
  //   } else {
  //     return {};
  //   }
  // }, {});

  // const mappedObject = {
  //   ...result,
  //   ...stackComponent?.configuration,
  //   // ...normalizeConfiguration,
  // };

  // debugger;
  if (fetching) {
    return <FullWidthSpinner color="black" size="md" />;
  }
  return (
    <FlexBox.Column marginTop="xl">
      <FlexBox.Row flexDirection="column">
        <Container>
          <Box style={{ width: '30vw' }}>
            <FormTextField
              onChange={(e: any) => {
                setConnectorName(e);
              }}
              required={true}
              placeholder="Component Name"
              label={'Component Name'}
              value={connectorName}
            />
            {/* <EditField
              // disabled
              onKeyDown={(e: any) => onPressEnter(e, 'name')}
              onChangeText={(e: any) => onPressEnter(e, 'name')}
              label={'Component Name'}
              optional={false}
              defaultValue={stackComponent.name}
              placeholder=""
              hasError={false}
              className={styles.field}
            /> */}
          </Box>
        </Container>
        <Container>
          <Box marginTop="lg" style={{ width: '30vw' }}>
            <FormTextField
              onChange={(e: any) => {
                setConnectorDescription(e);
              }}
              // disabled
              // onKeyDown={(e: any) => onPressEnter(e, 'name')}
              // onChangeText={(e: any) => onPressEnter(e, 'name')}
              label={'Description'}
              optional={false}
              value={connectorDescription}
              placeholder=""
              // hasError={false}
              // className={styles.field}
            />
          </Box>
        </Container>
        <Container>
          <Box marginTop="lg">
            <ToggleField
              label={'Share Component with public'}
              default={isShared}
              value={isShared}
              onHandleChange={
                (key: any, value: any) => setIsShared(!isShared)
                // setInputData({ ...inputData, ['is_shared']: value })
              }
            />
          </Box>
        </Container>
      </FlexBox.Row>

      <Box marginTop="lg" marginLeft="md" style={{ width: '30vw' }}>
        <FormDropdownField
          disabled
          label={'Authentication Method'}
          placeholder={''}
          value={
            connector?.connectorType?.auth_methods?.filter(
              (e: any) => e?.auth_method === connector?.authMethod,
            )[0]?.name
          }
          onChange={() => {}}
          options={[] as any}
          style={{ paddingLeft: '10px' }}
        />
      </Box>

      <FlexBox.Row style={{ width: '40%' }}>
        <Container>
          {mappedConfiguration &&
            Object.keys(mappedConfiguration)?.map((key, ind) => (
              <>{getFormElement(key, mappedConfiguration[key])}</>
            ))}
        </Container>
      </FlexBox.Row>
      {connectorExpirationSeconds !== null && (
        <Container>
          <Box marginTop="lg" style={{ width: '30vw' }}>
            <FormTextField
              onChange={(e: any) => {
                setConnectorExpirationSeconds(e);
              }}
              type="number"
              // disabled
              // onKeyDown={(e: any) => onPressEnter(e, 'name')}
              // onChangeText={(e: any) => onPressEnter(e, 'name')}
              label={'Expiration Seconds'}
              optional={false}
              value={connectorExpirationSeconds}
              placeholder=""
              // hasError={false}
              // className={styles.field}
            />
          </Box>
        </Container>
      )}

      <Box marginTop="lg" marginLeft={'md'} style={{ width: '30vw' }}>
        <ServicesSelectorComponent data={connector} />
      </Box>

      <Box marginTop="md" marginLeft={'md'} style={{ width: '30vw' }}>
        <Paragraph size="body" style={{ color: '#000' }}>
          <label htmlFor="key">Labels</label>
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
            {labelsInputFields?.map((item: any, index: any) => (
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
                    style={{ width: '13.7vw' }}
                  >
                    <FormTextField
                      onChange={(event: any) => {
                        const values = [...labelsInputFields];
                        values[index].key = event;
                        // values[name][childIndex].key = event;
                        // debugger;
                        setLabelsInputFields(values);
                      }}
                      label={'Key'}
                      value={item.key}
                      placeholder={''}
                    />
                  </Box>

                  <Box className="form-group" style={{ width: '13.7vw' }}>
                    <FormTextField
                      onChange={(event: any) => {
                        const values = [...labelsInputFields];
                        values[index].value = event;
                        // values[name][childIndex].key = event;
                        // debugger;
                        setLabelsInputFields(values);
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
                      {labelsInputFields.length > 1 && (
                        <button
                          className={styles.fieldButton}
                          style={{}}
                          type="button"
                          // disabled={item[props.name].length === 1}
                          onClick={
                            () => {
                              // setLabelsInputFields((prevState: any) => {
                              //   // Replace with the index of the object to remove

                              //   labelsInputFields.splice(index, 1);
                              // });
                              const values = [...labelsInputFields];
                              values.splice(index, 1);
                              // values[name][childIndex].key = event;
                              // debugger;
                              setLabelsInputFields(values);
                            }
                            //   // handleRemoveFields(
                            //   //   parentIndex,
                            //   //   childIndex,
                            //   //   props.name,
                            //   // )
                          }
                        >
                          <icons.delete color={iconColors.grey} />
                        </button>
                      )}

                      {index === labelsInputFields.length - 1 && (
                        <button
                          className={styles.fieldButton}
                          type="button"
                          onClick={() => {
                            const values = [...labelsInputFields];
                            values.push({ key: '', value: '' });
                            // values[name][childIndex].key = event;
                            // debugger;
                            setLabelsInputFields(values);
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
            onClick={
              () => {
                onSubmit();
              }
              // history.push(
              //   routePaths.secret.updateSecret(secret.id, selectedWorkspace),
              // )
            }
            // style={{
            //   background: '#FFFFFF',
            //   boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)',
            //   borderRadius: '4px',
            //   color: '#443E99',
            // }}
          >
            Save Changes
          </PrimaryButton>
        </Box>
      </FlexBox>
    </FlexBox.Column>
  );
};
