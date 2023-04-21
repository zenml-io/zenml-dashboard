import React, { Fragment, useState } from 'react';
import {
  FlexBox,
  Box,
  EditField,
  Paragraph,
  Container,
  FullWidthSpinner,
  PrimaryButton,
  // MakeSecretField,
  // FormTextField,
  // icons,
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
  sessionSelectors,
  userSelectors,
  workspaceSelectors,
} from '../../../../../redux/selectors';
import {
  showToasterAction,
  stackComponentsActions,
} from '../../../../../redux/actions';
import { toasterTypes } from '../../../../../constants';
import { ToggleField } from '../../../common/FormElement';
import { routePaths } from '../../../../../routes/routePaths';
// import { routePaths } from '../../../../../routes/routePaths';

export const Configuration: React.FC<{ stackId: TId; loading?: boolean }> = ({
  stackId,
  loading,
}) => {
  const locationPath = useLocationPath();
  const history = useHistory();

  const { stackComponent, flavor } = useService({
    stackId,
  });
  const user = useSelector(userSelectors.myUser);
  const [fetching, setFetching] = useState(false);
  const authToken = useSelector(sessionSelectors.authenticationToken);
  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);
  const dispatch = useDispatch();
  const workspaces = useSelector(workspaceSelectors.myWorkspaces);
  const [inputFields, setInputFields] = useState([]) as any;
  const titleCase = (s: any) =>
    s.replace(/^_*(.)|_+(.)/g, (s: any, c: string, d: string) =>
      c ? c.toUpperCase() : ' ' + d.toUpperCase(),
    );

  const onCallApi = (updateConfig: any) => {
    // ;
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
    setFetching(true);
    axios
      .put(
        `${process.env.REACT_APP_BASE_API_URL}/components/${updateConfig.id}`,
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
        setInputFields([]);
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
  const onPressEnter = (
    event?: any,
    type?: string,
    elementName?: any,
    defaultValue?: any,
    index?: any,
  ) => {
    if (event.key === 'Enter') {
      // ;
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
        // ;
        updateConfig.configuration[elementName][unkownKey] = event.target.value;
        // delete updateConfig.configuration[elementName][defaultValue];
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
        // ;
        updateConfig.configuration[elementName][unkownKey] = event.target.value;
        // delete updateConfig.configuration[elementName][defaultValue];
      }
      console.log(updateConfig, 'asdasd');
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
      //    if (event) {
      //   setInputData({
      //     ...inputData,
      //     [toSnakeCase(label)]: {
      //       ...result,
      //     },
      //   });
      // }
      const keys = inputFields.map((object: any) => object.key);
      const value = inputFields.map((object: any) => object.value);
      var result: any = {};
      keys.forEach((key: any, i: any) => (result[key] = value[i]));
      updateConfig.configuration[elementName] = {
        ...updateConfig.configuration[elementName],
        ...result,
      };
      console.log(
        updateConfig.configuration[elementName],
        inputFields,
        'configur222ation',
      );
      onCallApi(updateConfig);
    }
  };

  const onChangeToggle = (value: any, type?: any, key?: any) => {
    const updateConfig = {
      ...stackComponent,
    };
    // ;
    if (type === 'share') {
      updateConfig.isShared = value;
    }
    if (type === 'other') {
      updateConfig.configuration[key] = value;
    }
    onCallApi(updateConfig);
  };

  // const handleAddFields = () => {
  //   const values = [...inputFields];
  //   values.push({ key: '', value: '' });
  //   setInputFields(values);
  // };
  const handleInputChange = (index: any, event: any, label: any, type: any) => {
    const values = [...inputFields];
    if (type === 'key') {
      values[index].key = event;
    } else {
      values[index].value = event;
    }
    setInputFields(values);
  };
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
            <Box marginTop="lg" style={{ width: '329px' }}>
              <EditField
                disabled
                // onKeyDown={(e: any) => onPressEnter(e, 'string', elementName)}
                // onChangeText={(e: any) => onPressEnter(e, 'string', elementName)}
                label={titleCase(elementName) + ' (Secret)'}
                optional={false}
                defaultValue={elementSchema}
                placeholder=""
                hasError={false}
                // className={styles.field}
              />
            </Box>
          ) : (
            <Box marginTop="lg">
              <EditField
                disabled
                // onKeyDown={(e: any) => onPressEnter(e, 'string', elementName)}
                // onChangeText={(e: any) => onPressEnter(e, 'string', elementName)}
                label={titleCase(elementName)}
                optional={false}
                defaultValue={elementSchema}
                placeholder=""
                hasError={false}
                // className={styles.field}
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
          <FlexBox marginTop="sm" fullWidth>
            <textarea
              disabled
              className={styles.textArea}
              defaultValue={JSON.stringify(mappedObject[elementName])}
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
    // if (typeof elementSchema === 'string') {
    //   return (
    //     <Box marginTop="lg">
    //       <EditField
    //         disabled
    //         onKeyDown={(e: any) => onPressEnter(e, 'string', elementName)}
    //         onChangeText={(e: any) => onPressEnter(e, 'string', elementName)}
    //         label={titleCase(elementName)}
    //         optional={false}
    //         defaultValue={elementSchema}
    //         placeholder=""
    //         hasError={false}
    //         // className={styles.field}
    //       />
    //     </Box>
    //   );
    // }
    if (flavor?.configSchema?.properties[elementName]?.type === 'object') {
      return (
        <Box marginTop="lg" style={{ width: '100%' }}>
          <Paragraph size="body" style={{ color: 'black' }}>
            <label htmlFor={elementName}>{titleCase(elementName)}</label>
          </Paragraph>
          {Object.keys(elementSchema).length < 1 && (
            <FlexBox.Row>
              <EditField
                disabled
                onKeyDown={(e: any) =>
                  onPressEnterForEmpty(
                    e,
                    'key',
                    elementName,
                    // index,
                  )
                }
                onChangeText={
                  (event: any) => {}
                  // handleInputChange(0, event, elementName, 'key')
                }
                label="Key"
                optional={false}
                // value={''}
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
                // optional={true}
                // value={''}
                placeholder=""
                hasError={false}
                className={styles.field}
              />
            </FlexBox.Row>
          )}
          {Object.entries(elementSchema).map(([key, value], index) => (
            <>
              <FlexBox.Row marginTop="lg">
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
                  // value={key}
                  placeholder=""
                  hasError={false}
                  className={styles.field}
                />
                <div style={{ width: '10%' }}></div>
                <EditField
                  disabled
                  // marginRight={'md'}
                  onKeyDown={(e: any) =>
                    onPressEnter(e, 'value', elementName, key, index)
                  }
                  onChangeText={(e: any) =>
                    onPressEnter(e, 'value', elementName, key, index)
                  }
                  label="Value"
                  // optional={true}
                  defaultValue={value}
                  // value={value}
                  placeholder=""
                  hasError={false}
                  className={styles.field}
                />
              </FlexBox.Row>
            </>
          ))}
          {inputFields.map((inputField: any, index: any) => (
            <FlexBox.Row key={`${inputField}~${index}`}>
              <Box marginTop="lg">
                <EditField
                  onKeyDown={(e: any) =>
                    onPressEnterForAddMore(
                      e,
                      'addMore',
                      elementName,
                      // index,
                    )
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
                    onPressEnterForAddMore(
                      e,
                      'addMore',
                      elementName,
                      // index,
                    )
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
          ))}
        </Box>
      );
    }

    if (flavor?.configSchema?.properties[elementName]?.type === 'array') {
      return (
        <Box marginTop="md">
          <Paragraph size="body" style={{ color: '#000' }}>
            <label htmlFor="key">{titleCase(elementName)}</label>
          </Paragraph>

          <FlexBox.Row>
            <div className="form-row">
              {mappedObject && mappedObject[elementName].length < 1 ? (
                <>
                  {' '}
                  <Fragment>
                    <div className="form-group col-sm-8">
                      <EditField
                        disabled
                        className={styles.field}
                        label={'Value'}
                        value={''}
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
                    ></div>
                  </Fragment>
                </>
              ) : (
                mappedObject[elementName]?.map((item: any, index: any) => (
                  <Fragment>
                    <div className="form-group col-sm-8">
                      <EditField
                        disabled
                        className={styles.field}
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
                    ></div>
                  </Fragment>
                ))
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
  // const values = [...flavor?.configSchema?.properties];

  let result = Object.keys(flavor?.configSchema?.properties).reduce(function (
    r: any,
    name: any,
  ) {
    return (
      (r[name] =
        flavor?.configSchema?.properties[name].type === 'string' &&
        flavor?.configSchema?.properties[name].default === undefined
          ? ''
          : flavor?.configSchema?.properties[name].default),
      r
    );
  },
  {});
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

  const mappedObject = {
    ...result,
    ...stackComponent?.configuration,
    // ...normalizeConfiguration,
  };
  console.log(mappedObject, 'mappedObjectmappedObjectmappedObject');
  // debugger;
  if (fetching) {
    return <FullWidthSpinner color="black" size="md" />;
  }
  return (
    <FlexBox.Column marginTop="xl" fullWidth>
      <FlexBox.Row flexDirection="column" style={{ width: '40%' }}>
        <Container>
          <Box>
            <EditField
              disabled
              onKeyDown={(e: any) => onPressEnter(e, 'name')}
              onChangeText={(e: any) => onPressEnter(e, 'name')}
              label={'Component Name'}
              optional={false}
              defaultValue={stackComponent.name}
              placeholder=""
              hasError={false}
              className={styles.field}
            />
          </Box>
        </Container>
        <Container>
          <Box marginTop="lg">
            <ToggleField
              value={stackComponent.isShared}
              onHandleChange={() =>
                onChangeToggle(!stackComponent.isShared, 'share')
              }
              label="Share Component with public"
              disabled={true}
            />
          </Box>
        </Container>
      </FlexBox.Row>
      <FlexBox.Row style={{ width: '40%' }}>
        <Container>
          {Object.keys(mappedObject).map((key, ind) => (
            <>{getFormElement(key, mappedObject[key])}</>
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
