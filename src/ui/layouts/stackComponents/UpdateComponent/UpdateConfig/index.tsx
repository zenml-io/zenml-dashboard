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
  // icons,
} from '../../../../components';
import styles from './index.module.scss';
import { useService } from './useService';
import axios from 'axios';
import {
  useDispatch,
  // useHistory,
  // useLocationPath,
  useSelector,
} from '../../../../hooks';
import {
  sessionSelectors,
  userSelectors,
  workspaceSelectors,
} from '../../../../../redux/selectors';
import {
  showToasterAction,
  stackComponentsActions,
} from '../../../../../redux/actions';
import { iconColors, toasterTypes } from '../../../../../constants';
import { ToggleField } from '../../../common/FormElement';
// import { routePaths } from '../../../../../routes/routePaths';

export const UpdateConfig: React.FC<{ stackId: TId; loading?: boolean }> = ({
  stackId,
  loading,
}) => {
  // const locationPath = useLocationPath();
  // const history = useHistory();

  const { stackComponent, flavor } = useService({
    stackId,
  });
  const [componentName, setComponentName] = useState('');
  const [isShared, setIsShared] = useState() as any;
  const [mappedConfiguration, setMappedConfiguration] = useState() as any;
  const user = useSelector(userSelectors.myUser);
  const [fetching, setFetching] = useState(false);
  const authToken = useSelector(sessionSelectors.authenticationToken);
  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);
  const dispatch = useDispatch();
  const workspaces = useSelector(workspaceSelectors.myWorkspaces);
  // const [inputFields, setInputFields] = useState([]) as any;
  const titleCase = (s: any) =>
    s.replace(/^_*(.)|_+(.)/g, (s: any, c: string, d: string) =>
      c ? c.toUpperCase() : ' ' + d.toUpperCase(),
    );
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

    if (flavor) {
      let result = Object.keys(flavor?.configSchema?.properties).reduce(
        function (r: any, name: any) {
          return (
            (r[name] =
              flavor?.configSchema?.properties[name].type === 'string' &&
              flavor?.configSchema?.properties[name].default === undefined
                ? ''
                : flavor?.configSchema?.properties[name].default),
            r
          );
        },
        {},
      );

      const mappedObject = {
        ...result,
        ...stackComponent?.configuration,
        // ...normalizeConfiguration,
      };
      // debugger;
      setMappedConfiguration(mappedObject);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flavor]);
  const onSubmit = () => {
    // ;
    const { id }: any = workspaces.find(
      (item) => item.name === selectedWorkspace,
    );

    const body = {
      user: user?.id,
      workspace: id,
      is_shared: isShared,
      name: componentName,
      type: stackComponent.type,
      flavor: stackComponent.flavor,
      configuration: mappedConfiguration,
    };
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
            onSuccess: () => setFetching(false),
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
    if (typeof elementSchema === 'string') {
      return (
        <Box marginTop="lg">
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
          <FlexBox marginTop="sm" fullWidth>
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
    // if (flavor?.configSchema?.properties[elementName]?.type === 'object') {
    //   return (
    //     <Box marginTop="lg" style={{ width: '100%' }}>
    //       <Paragraph size="body" style={{ color: 'black' }}>
    //         <label htmlFor={elementName}>{titleCase(elementName)}</label>
    //       </Paragraph>
    //       {Object.keys(elementSchema).length < 1 && (
    //         <FlexBox.Row>
    //           <EditField
    //             // disabled
    //             onKeyDown={(e: any) =>
    //               onPressEnterForEmpty(
    //                 e,
    //                 'key',
    //                 elementName,
    //                 // index,
    //               )
    //             }
    //             onChangeText={
    //               (event: any) => {}
    //               // handleInputChange(0, event, elementName, 'key')
    //             }
    //             label="Key"
    //             optional={false}
    //             // value={''}
    //             placeholder=""
    //             hasError={false}
    //             className={styles.field}
    //           />

    //           <div style={{ width: '10%' }}></div>
    //           <EditField
    //             // disabled
    //             onKeyDown={(e: any) =>
    //               onPressEnterForEmpty(e, 'value', elementName)
    //             }
    //             onChangeText={(event: any) => {}}
    //             label="Value"
    //             // optional={true}
    //             // value={''}
    //             placeholder=""
    //             hasError={false}
    //             className={styles.field}
    //           />
    //           {/* <div
    //             className="col-sx-2 "
    //             style={{
    //               justifyContent: 'space-between',
    //               display: 'flex',
    //               marginTop: '35px',
    //               marginLeft: '5px',
    //             }}
    //           >
    //             <icons.plusCircle
    //               onClick={() => handleAddFields()}
    //               color={iconColors.primary}
    //             />
    //           </div> */}
    //         </FlexBox.Row>
    //       )}
    //       {Object.entries(elementSchema).map(([key, value], index) => (
    //         <>
    //           <FlexBox.Row marginTop="lg">
    //             <FormTextField
    //               onChange={
    //                 (event: any) => {}
    //                 // handleInputChange(
    //                 //   parentIndex,
    //                 //   childIndex,
    //                 //   event,
    //                 //   props.name,
    //                 //   'key',
    //                 // )
    //               }
    //               label={'Key'}
    //               value={key}
    //               placeholder={''}
    //             />
    //             {/* <EditField
    //               // disabled
    //               onKeyDown={(e: any) =>
    //                 onPressEnter(e, 'key', elementName, key)
    //               }
    //               onChangeText={(e: any) =>
    //                 onPressEnter(e, 'key', elementName, key, index)
    //               }
    //               label="Key"
    //               optional={false}
    //               defaultValue={key}
    //               // value={key}
    //               placeholder=""
    //               hasError={false}
    //               className={styles.field}
    //             /> */}
    //             <div style={{ width: '10%' }}></div>
    //             <FormTextField
    //               onChange={
    //                 (event: any) => {}
    //                 // handleInputChange(
    //                 //   parentIndex,
    //                 //   childIndex,
    //                 //   event,
    //                 //   props.name,
    //                 //   'value',
    //                 // )
    //               }
    //               label={'Value'}
    //               value={value as any}
    //               placeholder={''}
    //             />
    //             <div
    //               className="col-sx-2 "
    //               style={{
    //                 justifyContent: 'space-between',
    //                 display: 'flex',
    //                 marginTop: '20px',
    //               }}
    //             >
    //               <div
    //                 style={{
    //                   display: 'flex',
    //                   flexDirection: 'row',
    //                   justifyContent: 'space-between',
    //                   alignItems: 'center',
    //                 }}
    //               >
    //                 {/* {item[props.name].length > 1 && ( */}
    //                 <button
    //                   className={styles.fieldButton}
    //                   style={{}}
    //                   type="button"
    //                   // disabled={item[props.name].length === 1}
    //                   onClick={
    //                     () => {}
    //                     // handleRemoveFields(
    //                     //   parentIndex,
    //                     //   childIndex,
    //                     //   props.name,
    //                     // )
    //                   }
    //                 >
    //                   <icons.minusCircle color={iconColors.primary} />
    //                 </button>
    //                 {/* )} */}

    //                 {/* {childIndex === item[props.name].length - 1 && ( */}
    //                 <button
    //                   className={styles.fieldButton}
    //                   type="button"
    //                   onClick={
    //                     () => {
    //                       const values = {
    //                         ...mappedConfiguration[elementName],
    //                         '': '',
    //                       };
    //                       const finalValues = {
    //                         ...mappedConfiguration,
    //                         values,
    //                       };
    //                       setMappedConfiguration(finalValues);
    //                     }
    //                     // handleAddFields(props.name, parentIndex
    //                   }
    //                 >
    //                   <icons.plusCircle color={iconColors.primary} />
    //                 </button>
    //                 {/* )} */}
    //               </div>
    //             </div>
    //             {/* <EditField
    //               // disabled
    //               // marginRight={'md'}
    //               onKeyDown={(e: any) =>
    //                 onPressEnter(e, 'value', elementName, key, index)
    //               }
    //               onChangeText={(e: any) =>
    //                 onPressEnter(e, 'value', elementName, key, index)
    //               }
    //               label="Value"
    //               // optional={true}
    //               defaultValue={value}
    //               // value={value}
    //               placeholder=""
    //               hasError={false}
    //               className={styles.field}
    //             /> */}
    //             {/* {index === Object.entries(elementSchema).length - 1 &&
    //               !inputFields.length && (
    //                 <div
    //                   className="col-sx-2 "
    //                   style={{
    //                     justifyContent: 'space-between',
    //                     display: 'flex',
    //                     marginTop: '35px',
    //                     marginLeft: '5px',
    //                   }}
    //                 >
    //                   <icons.plusCircle
    //                     onClick={() => handleAddFields()}
    //                     color={iconColors.primary}
    //                   />
    //                 </div>
    //               )} */}
    //           </FlexBox.Row>
    //         </>
    //       ))}
    //       {inputFields.map((inputField: any, index: any) => (
    //         // <div className="form-row">

    //         <FlexBox.Row key={`${inputField}~${index}`}>
    //           {console.log(inputFields, 'inputFieldsinputFields')}
    //           {/* <div className="form-group col-sm-6"> */}
    //           <Box marginTop="lg">
    //             <EditField
    //               onKeyDown={(e: any) =>
    //                 onPressEnterForAddMore(
    //                   e,
    //                   'addMore',
    //                   elementName,
    //                   // index,
    //                 )
    //               }
    //               onChangeText={(event: any) =>
    //                 handleInputChange(index, event, elementName, 'key')
    //               }
    //               // disabled
    //               label={'Key'}
    //               className={styles.field}
    //               value={inputField?.key}
    //               placeholder={''}
    //             />
    //           </Box>

    //           <div style={{ width: '10%' }}></div>
    //           {/* </div> */}
    //           {/* <div className="form-group col-sm-5"> */}
    //           <Box marginTop="lg">
    //             <EditField
    //               onKeyDown={(e: any) =>
    //                 onPressEnterForAddMore(
    //                   e,
    //                   'addMore',
    //                   elementName,
    //                   // index,
    //                 )
    //               }
    //               // disabled
    //               className={styles.field}
    //               onChangeText={(event: any) =>
    //                 handleInputChange(index, event, elementName, 'value')
    //               }
    //               label={'Value'}
    //               value={inputField?.value}
    //               placeholder={''}
    //             />
    //           </Box>
    //           {/* </div> */}
    //           {/* <div
    //             className="col-sx-2 "
    //             style={{
    //               justifyContent: 'space-between',
    //               display: 'flex',
    //               marginBottom: '10px',
    //             }}
    //           >
    //             <div
    //               style={{
    //                 display: 'flex',
    //                 flexDirection: 'row',
    //                 justifyContent: 'space-between',
    //                 alignItems: 'center',
    //                 marginTop: '5px',
    //                 marginLeft: '5px',
    //               }}
    //             >
    //               <icons.minusCircle
    //                 onClick={() => handleRemoveFields(index)}
    //                 color={iconColors.primary}
    //               />

    //               {index === inputFields.length - 1 && (
    //                 <icons.plusCircle
    //                   onClick={() => handleAddFields()}
    //                   color={iconColors.primary}
    //                 />
    //               )}
    //             </div>
    //           </div> */}
    //         </FlexBox.Row>
    //       ))}
    //     </Box>
    //   );
    // }
    if (flavor?.configSchema?.properties[elementName]?.type === 'array') {
      return (
        <Box marginTop="md">
          <Paragraph size="body" style={{ color: '#000' }}>
            <label htmlFor="key">{titleCase(elementName)}</label>
          </Paragraph>

          <FlexBox.Row>
            <div className="form-row">
              {mappedConfiguration &&
                mappedConfiguration[elementName]?.map(
                  (item: any, index: any) => (
                    <Fragment>
                      <div className="form-group col-sm-8">
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
                      </div>
                      <div
                        className="col-sx-2 "
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
                              <icons.minusCircle color={iconColors.primary} />
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
                              <icons.plusCircle color={iconColors.primary} />
                            </button>
                          )}
                        </div>
                      </div>
                    </Fragment>
                  ),
                )}
              {/* {inputFields
              ?.filter((x: any) => x.hasOwnProperty(props.name))
              .map((inputField: any, index: any) => (
          
              ))} */}
            </div>
            <div className="submit-button"></div>
            <br />
          </FlexBox.Row>
        </Box>
      );
    }
    if (typeof elementSchema === 'boolean') {
      return (
        <Box marginTop={'lg'} style={{ width: '100%' }}>
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
    <FlexBox.Column marginTop="xl" fullWidth>
      <FlexBox.Row flexDirection="column" style={{ width: '40%' }}>
        <Container>
          <Box>
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
            style={{
              background: '#FFFFFF',
              boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)',
              borderRadius: '4px',
              color: '#443E99',
            }}
          >
            Save Changes
          </PrimaryButton>
        </Box>
      </FlexBox>
    </FlexBox.Column>
  );
};
