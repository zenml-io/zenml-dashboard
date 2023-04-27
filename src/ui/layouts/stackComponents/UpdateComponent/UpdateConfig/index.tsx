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
  MakeSecretField,
  // EditField,
  // icons,
} from '../../../../components';
import styles from './index.module.scss';
import { useService } from './useService';
import axios from 'axios';
import {
  useDispatch,
  useHistory,
  useLocation,
  useLocationPath,
  // useHistory,
  // useLocationPath,
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
// import { values } from 'lodash';
// import { routePaths } from '../../../../../routes/routePaths';

export const UpdateConfig: React.FC<{
  stackId: TId;
  loading?: boolean;
  state: any;
}> = ({ stackId, loading, state }) => {
  const location = useLocation();
  const locationPath = useLocationPath();
  // const history = useHistory();

  const { stackComponent, flavor } = useService({
    stackId,
  });
  const history = useHistory();
  const [componentName, setComponentName] = useState('');
  const [isShared, setIsShared] = useState() as any;
  const [mappedConfiguration, setMappedConfiguration] = useState() as any;
  const user = useSelector(userSelectors.myUser);
  const [fetching, setFetching] = useState(false);
  const secrets = useSelector(secretSelectors.mySecrets);
  const authToken = useSelector(sessionSelectors.authenticationToken);
  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);
  const dispatch = useDispatch();
  const [secretOptionsWithKeys, setSecretOptionsWithKeys] = useState([]);
  const [selectedSecret, setSelectedSecret] = useState({}) as any;
  const workspaces = useSelector(workspaceSelectors.myWorkspaces);
  const [inputFields, setInputFields] = useState() as any;
  const titleCase = (s: any) =>
    s.replace(/^_*(.)|_+(.)/g, (s: any, c: string, d: string) =>
      c ? c.toUpperCase() : ' ' + d.toUpperCase(),
    );
  useEffect(() => {
    if (state?.state?.routeFromEditComponent) {
      setMappedConfiguration(state.state.mappedConfiguration);
      setInputFields(state.state.inputFields);
      // setIsShared(state?.state?.isShared);
      // setInputFields(state?.state?.inputFields);
      // setInputData(state?.state?.inputData);
      // setComponentName(state?.state?.componentName);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);
  useEffect(() => {
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
    setComponentName(stackComponent.name);

    setIsShared(stackComponent.isShared);

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
          } else if (
            typeof json[key] === 'object' &&
            (json[key] === {} || json[key].length === 0)
          ) {
            const emptyObject = [{ key: '', value: '' }];
            convertedJSON[key] = emptyObject;
          }
        }
      }

      return convertedJSON;
    }
    if (!state?.state?.routeFromEditComponent) {
      if (flavor) {
        let result = Object.keys(flavor?.configSchema?.properties).reduce(
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
        console.log(result, 'asdasdasd23232');
        const mappedObject = {
          ...result,
          ...stackComponent?.configuration,
          // ...normalizeConfiguration,
        };
        const convertedJson = convertJSON(mappedObject);
        setInputFields(convertedJson);

        setMappedConfiguration(mappedObject);
      }
    }
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
    // ;
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

    const body = {
      user: user?.id,
      workspace: id,
      is_shared: isShared,
      name: componentName,
      type: stackComponent.type,
      flavor: stackComponent.flavor,
      configuration: { ...mappedConfiguration, ...final },
    };
    console.log(tempFinal, final);

    if (JSON.stringify(tempFinal) !== JSON.stringify(final)) {
      return false;
    }

    for (const [key] of Object.entries(final)) {
      // console.log(`${key}: ${value}`);
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
    setFetching(true);
    axios
      .put(
        `${process.env.REACT_APP_BASE_API_URL}/components/${stackComponent.id}`,
        // @ts-ignore
        body,
        { headers: { Authorization: `Bearer ${authToken}` } },
      )
      .then((response: any) => {
        // const id = response.data.id;

        // setLoading(false);
        dispatch(
          showToasterAction({
            description: 'Component has been updated successfully.',
            type: toasterTypes.success,
          }),
        );

        // setInputFields([]);
        dispatch(
          stackComponentsActions.stackComponentForId({
            stackComponentId: stackComponent?.id,
            onSuccess: () => {
              setFetching(false);
              history.push(
                routePaths.stackComponents.configuration(
                  locationPath.split('/')[4],
                  stackComponent.id,
                  selectedWorkspace,
                ),
              );
            },
            onFailure: () => setFetching(false),
          }),
        );
        // dispatchStackData(1, 10);
        // history.push(routePaths.stacks.base);
        // dispatchStackComponentsData(1, 10);

        // history.push(
        //   routePaths.stackComponents.configuration(
        //     flavor.type,
        //     id,
        //     selectedWorkspace,
        //   ),
        // );
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

  function callActionForSecret(name: any, value: any, newEvent?: any) {
    setMappedConfiguration({
      ...mappedConfiguration,
      [name]: {
        value: value.value ? value.value : value,
        id: value?.id ? value?.id : '',
      },
    });

    // if (value === undefined) {
    //   return false;
    // }

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
          // onFailure: () => setFetching(false),
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
    if (flavor?.configSchema?.properties[elementName]?.type === 'string') {
      return (
        <>
          {flavor?.configSchema?.properties[elementName].sensitive ? (
            <Box marginTop="lg" style={{ width: '417px' }}>
              <MakeSecretField
                required={flavor?.configSchema?.required?.includes(elementName)}
                label={titleCase(elementName) + ' (Secret)'}
                placeholder={''}
                handleClick={() => {
                  const state = {
                    flavor: flavor.name,
                    routeFromEditComponent: true,
                    componentName: componentName,
                    isShared: isShared,
                    mappedConfiguration: mappedConfiguration,
                    inputFields: inputFields,
                    // inputFields: inputFields,

                    secretKey: elementName,
                    pathName: location.pathname,
                  };
                  history.push(
                    routePaths.secrets.registerSecrets(selectedWorkspace),
                    state,
                  );
                }}
                // inputData={inputData}
                value={
                  mappedConfiguration[elementName]?.value
                    ? mappedConfiguration[elementName]?.value
                    : // : inputData[props.name]
                    mappedConfiguration[elementName]?.length
                    ? mappedConfiguration[elementName]
                    : ''
                }
                onChange={(val: string, newEvent: any) => {
                  if (val.includes('{{')) {
                    callActionForSecret(elementName, val, newEvent);
                  } else {
                    setMappedConfiguration({
                      ...mappedConfiguration,
                      [elementName]: val,
                    });
                  }
                }}
                secretOnChange={(val: any, newEvent: any) => {
                  // debugger;
                  // setInputData({
                  //   ...inputData,
                  //   [props.name]: val.value.includes('.') ? val.value : val,
                  // });

                  if (val?.value?.includes('}}')) {
                    setMappedConfiguration({
                      ...mappedConfiguration,
                      [elementName]: val?.value?.includes('.')
                        ? val.value
                        : val,
                    });
                  } else if (val.value.includes('{{')) {
                    callActionForSecret(elementName, val, newEvent);
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
          ) : (
            <Box marginTop="lg" style={{ width: '417px' }}>
              <FormTextField
                onChange={(e: any) => {
                  setMappedConfiguration((prevConfig: any) => ({
                    ...prevConfig, // Spread the previous user object
                    [elementName]: e, // Update the age property
                  }));
                  // setMappedConfiguration(...mappedConfiguration,
                  //   mappedConfiguration[elementName]: e,
                  // );
                }}
                placeholder="Component Name"
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
          <Box marginTop="sm">
            <Paragraph size="body" style={{ color: '#000' }}>
              <label htmlFor="key">{titleCase(elementName)}</label>
            </Paragraph>
          </Box>
          <FlexBox marginTop="sm" fullWidth style={{ width: '417px' }}>
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
                      style={{ width: '184px' }}
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

                    <Box className="form-group" style={{ width: '184px' }}>
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

                        <Box className="form-group" style={{ width: '383px' }}>
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
                                // disabled={item[props.name].length === 1}
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
        <Box marginTop={'lg'} style={{ width: '450px' }}>
          <Box>
            <ToggleField
              value={elementSchema}
              onHandleChange={
                () =>
                  setMappedConfiguration((prevConfig: any) => ({
                    ...prevConfig, // Spread the previous user object
                    [elementName]: !elementSchema, // Update the age property
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
  if (flavor === undefined) {
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
  console.log(
    mappedConfiguration,
    flavor?.configSchema?.properties,
    'mappedObjectmappedObjectmappedObject',
  );
  // debugger;
  if (fetching) {
    return <FullWidthSpinner color="black" size="md" />;
  }
  return (
    <FlexBox.Column marginTop="xl">
      <FlexBox.Row flexDirection="column">
        <Container>
          <Box style={{ width: '417px' }}>
            <FormTextField
              onChange={(e: any) => {
                setComponentName(e);
              }}
              required={true}
              placeholder="Component Name"
              label={'Component Name'}
              value={componentName}
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
      <FlexBox.Row style={{ width: '40%' }}>
        <Container>
          {mappedConfiguration &&
            Object.keys(mappedConfiguration)?.map((key, ind) => (
              <>{getFormElement(key, mappedConfiguration[key])}</>
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
