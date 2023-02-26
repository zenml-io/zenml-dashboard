import React, { useState } from 'react';
import {
  FlexBox,
  Box,
  EditField,
  Paragraph,
  Container,
  FullWidthSpinner,
  icons,
} from '../../../../components';
import styles from './index.module.scss';
import { useService } from './useService';
import axios from 'axios';
import { useDispatch, useSelector } from '../../../../hooks';
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

export const Configuration: React.FC<{ stackId: TId }> = ({ stackId }) => {
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

  const handleAddFields = () => {
    const values = [...inputFields];
    values.push({ key: '', value: '' });
    setInputFields(values);
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
  const handleRemoveFields = (index: any) => {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
  };

  const getFormElement: any = (elementName: any, elementSchema: any) => {
    if (typeof elementSchema === 'string') {
      return (
        <Box marginVertical={'md'} style={{ width: '100%' }}>
          <EditField
            onKeyDown={(e: any) => onPressEnter(e, 'string', elementName)}
            onChangeText={(e: any) => onPressEnter(e, 'string', elementName)}
            label={titleCase(elementName)}
            optional={false}
            defaultValue={elementSchema}
            placeholder=""
            hasError={false}
            className={styles.field}
          />
        </Box>
      );
    }
    if (typeof elementSchema === 'object') {
      return (
        <Box marginVertical={'xl'} style={{ width: '100%' }}>
          <Paragraph size="body" style={{ color: 'black' }}>
            <label htmlFor={elementName}>{titleCase(elementName)}</label>
          </Paragraph>
          {Object.keys(elementSchema).length < 1 && (
            <FlexBox.Row>
              <EditField
                // disabled
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
                // disabled
                // marginRight={'md'}
                onKeyDown={(e: any) =>
                  onPressEnterForEmpty(
                    e,
                    'value',
                    elementName,
                    // index,
                  )
                }
                onChangeText={
                  (event: any) => {}
                  // handleInputChange(0, event, elementName, 'value')
                }
                label="Value"
                // optional={true}
                // value={''}
                placeholder=""
                hasError={false}
                className={styles.field}
              />
              <div
                className="col-sx-2 "
                style={{
                  justifyContent: 'space-between',
                  display: 'flex',
                  marginTop: '35px',
                }}
              >
                {/* <button className={styles.fieldButton} type="button"> */}
                <icons.plusCircle
                  onClick={() => handleAddFields()}
                  // className={styles.fieldButton}
                  color={iconColors.primary}
                />
                {/* </button> */}
              </div>
            </FlexBox.Row>
          )}
          {Object.entries(elementSchema).map(([key, value], index) => (
            <>
              <FlexBox.Row>
                <EditField
                  // disabled
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
                  // disabled
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
                />{' '}
                {index === Object.entries(elementSchema).length - 1 &&
                  !inputFields.length && (
                    <div
                      className="col-sx-2 "
                      style={{
                        justifyContent: 'space-between',
                        display: 'flex',
                        marginTop: '35px',
                        marginLeft: '5px',
                      }}
                    >
                      {/* <button
                        className={styles.fieldButton}
                        type="button"
                        
                      > */}
                      <icons.plusCircle
                        onClick={() => handleAddFields()}
                        color={iconColors.primary}
                      />
                      {/* </button> */}
                    </div>
                  )}
                {/* <div
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
                  ></div>
                </div> */}
              </FlexBox.Row>
            </>
          ))}
          {inputFields.map((inputField: any, index: any) => (
            // <div className="form-row">

            <FlexBox.Row key={`${inputField}~${index}`}>
              {console.log(inputFields, 'inputFieldsinputFields')}
              {/* <div className="form-group col-sm-6"> */}
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
                label={'Key'}
                className={styles.field}
                value={inputField?.key}
                placeholder={''}
              />
              <div style={{ width: '10%' }}></div>
              {/* </div> */}
              {/* <div className="form-group col-sm-5"> */}
              <EditField
                onKeyDown={(e: any) =>
                  onPressEnterForAddMore(
                    e,
                    'addMore',
                    elementName,
                    // index,
                  )
                }
                className={styles.field}
                onChangeText={(event: any) =>
                  handleInputChange(index, event, elementName, 'value')
                }
                label={'Value'}
                value={inputField?.value}
                placeholder={''}
              />
              {/* </div> */}
              <div
                className="col-sx-2 "
                style={{
                  justifyContent: 'space-between',
                  display: 'flex',
                  marginBottom: '10px',
                  // marginTop: '10px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: '5px',
                    marginLeft: '5px',
                  }}
                >
                  {/* <button
                    className={styles.fieldButton}
                    style={{}}
                    type="button"
                    // disabled={inputFields.length === 1}
                    onClick={() => handleRemoveFields(index)}
                  > */}
                  <icons.minusCircle
                    onClick={() => handleRemoveFields(index)}
                    color={iconColors.primary}
                  />
                  {/* </button> */}
                  {index === inputFields.length - 1 && (
                    // <button
                    //   className={styles.fieldButton}
                    //   type="button"
                    //   onClick={() => handleAddFields()}
                    // >
                    <icons.plusCircle
                      onClick={() => handleAddFields()}
                      color={iconColors.primary}
                    />
                    // </button>
                  )}
                </div>
              </div>
              {/* </div> */}
            </FlexBox.Row>
            // </div>
          ))}
        </Box>
      );
    }
    if (typeof elementSchema === 'boolean') {
      return (
        <Box marginVertical={'md'} style={{ width: '100%' }}>
          <Box>
            {console.log(elementSchema, elementName, 'asdasdasda2222sdasd')}
            <FlexBox.Row justifyContent="space-between">
              <Paragraph>{titleCase(elementName)}</Paragraph>
              <label className={styles.switch}>
                <input
                  type="checkbox"
                  defaultChecked={elementSchema}
                  onChange={() =>
                    onChangeToggle(!elementSchema, 'other', elementName)
                  }
                />
                <span className={`${styles.slider} ${styles.round}`}></span>
              </label>
            </FlexBox.Row>
          </Box>
        </Box>
      );
    }
  };

  if (flavor === undefined) {
    return <FullWidthSpinner color="black" size="md" />;
  }
  // const values = [...flavor?.config_schema?.properties];

  let result = Object.keys(flavor?.config_schema?.properties).reduce(function (
    r: any,
    name: any,
  ) {
    return (
      (r[name] =
        flavor?.config_schema?.properties[name].type === 'string' &&
        flavor?.config_schema?.properties[name].default === undefined
          ? ''
          : flavor?.config_schema?.properties[name].default),
      r
    );
  },
  {});

  const mappedObject = {
    ...result,
    ...stackComponent?.configuration,
  };

  if (fetching) {
    return <FullWidthSpinner color="black" size="md" />;
  }
  return (
    <FlexBox.Column marginTop="xl" fullWidth>
      <FlexBox.Row>
        <Container>
          <Box style={{ width: '79%' }}>
            <EditField
              // disabled
              onKeyDown={(e: any) => onPressEnter(e, 'name')}
              onChangeText={(e: any) => onPressEnter(e, 'name')}
              label={'Component Name'}
              optional={false}
              defaultValue={stackComponent.name}
              // value={stackComponent.name}
              placeholder=""
              hasError={false}
              className={styles.field}
            />
          </Box>
        </Container>
        <Container>
          <FlexBox.Row justifyContent="space-between" style={{ width: '70%' }}>
            <Paragraph>Share Component with public</Paragraph>
            <label className={styles.switch}>
              {console.log(stackComponent, 'asdasdasda2222122sdasd')}
              <input
                type="checkbox"
                defaultChecked={stackComponent.isShared}
                // checked={stackComponent.isShared}
                onChange={() =>
                  onChangeToggle(!stackComponent.isShared, 'share')
                }
              />
              <span className={`${styles.slider} ${styles.round}`}></span>
            </label>
          </FlexBox.Row>
        </Container>
      </FlexBox.Row>
      <FlexBox.Row style={{ width: '40%' }}>
        <Container>
          {/* <Row>
          <Col xs={5}>
         
          </Col>
          <Col xs={5} style={{ marginLeft: '100px' }}>
            <FlexBox.Row justifyContent="space-between">
              <Paragraph>Share Component with public</Paragraph>
              <label className={styles.switch}>
                <input type="checkbox" checked={stackComponent.isShared} />
                <span className={`${styles.slider} ${styles.round}`}></span>
              </label>
            </FlexBox.Row>
          </Col>
        </Row> */}

          {Object.keys(mappedObject).map((key, ind) => (
            // <Col xs={6} key={ind}>
            <>{getFormElement(key, mappedObject[key])}</>
            // </Col>
          ))}
        </Container>
      </FlexBox.Row>
    </FlexBox.Column>
  );
};
