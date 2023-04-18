import React, { Fragment } from 'react';
import {
  FlexBox,
  Box,
  EditField,
  Paragraph,
  FullWidthSpinner,
} from '../../components';
import { ToggleField } from '../common/FormElement';
import styles from './index.module.scss';
import { useService } from './useService';

export const NonEditableConfig: React.FC<{ details: any }> = ({ details }) => {
  const { flavor } = useService({
    details,
  });
  console.log(
    details?.configuration,
    'flavoflavorr',
    flavor?.config_schema?.properties,
  );

  const titleCase = (s: any) =>
    s.replace(/^_*(.)|_+(.)/g, (s: any, c: string, d: string) =>
      c ? c.toUpperCase() : ' ' + d.toUpperCase(),
    );

  const getFormElement: any = (elementName: any, elementSchema: any) => {
    if (flavor?.config_schema?.properties[elementName]?.type === 'string') {
      return (
        <>
          {flavor?.config_schema?.properties[elementName].sensitive ? (
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
      flavor?.config_schema?.properties[elementName]?.type === 'object' &&
      flavor?.config_schema?.properties[elementName]?.additionalProperties &&
      flavor?.config_schema?.properties[elementName]?.additionalProperties
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
              // onBlur={(e) => {
              //   const jsonStr = e.target.value;
              //   try {
              //     JSON.parse(jsonStr);
              //   } catch (e) {
              //     dispatch(
              //       showToasterAction({
              //         description: 'Invalid JSON.',
              //         type: toasterTypes.failure,
              //       }),
              //     );
              //   }
              // }}
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
    if (flavor?.config_schema?.properties[elementName]?.type === 'object') {
      return (
        <Box marginTop="lg" style={{ width: '100%' }}>
          <Paragraph size="body" style={{ color: 'black' }}>
            <label htmlFor={elementName}>{titleCase(elementName)}</label>
          </Paragraph>
          {Object.keys(elementSchema).length < 1 && (
            <FlexBox.Row>
              <EditField
                disabled
                // onKeyDown={(e: any) =>
                //   onPressEnterForEmpty(
                //     e,
                //     'key',
                //     elementName,
                //     // index,
                //   )
                // }
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
                // onKeyDown={(e: any) =>
                //   onPressEnterForEmpty(e, 'value', elementName)
                // }
                onChangeText={(event: any) => {}}
                label="Value"
                // optional={true}
                // value={''}
                placeholder=""
                hasError={false}
                className={styles.field}
              />
              {/* <div
                  className="col-sx-2 "
                  style={{
                    justifyContent: 'space-between',
                    display: 'flex',
                    marginTop: '35px',
                    marginLeft: '5px',
                  }}
                >
                  <icons.plusCircle
                    onClick={() => handleAddFields()}
                    color={iconColors.primary}
                  />
                </div> */}
            </FlexBox.Row>
          )}
          {Object.entries(elementSchema).map(([key, value], index) => (
            <>
              <FlexBox.Row marginTop="lg">
                <EditField
                  disabled
                  // onKeyDown={(e: any) =>
                  //   onPressEnter(e, 'key', elementName, key)
                  // }
                  // onChangeText={(e: any) =>{}
                  //   // onPressEnter(e, 'key', elementName, key, index)
                  // }
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
                  // onKeyDown={(e: any) =>
                  //   onPressEnter(e, 'value', elementName, key, index)
                  // }
                  // onChangeText={(e: any) =>
                  //   onPressEnter(e, 'value', elementName, key, index)
                  // }
                  label="Value"
                  // optional={true}
                  defaultValue={value}
                  // value={value}
                  placeholder=""
                  hasError={false}
                  className={styles.field}
                />
                {/* {index === Object.entries(elementSchema).length - 1 &&
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
                        <icons.plusCircle
                          onClick={() => handleAddFields()}
                          color={iconColors.primary}
                        />
                      </div>
                    )} */}
              </FlexBox.Row>
            </>
          ))}
        </Box>
      );
    }

    if (flavor?.config_schema?.properties[elementName]?.type === 'array') {
      return (
        <Box marginTop="md">
          <Paragraph size="body" style={{ color: '#000' }}>
            <label htmlFor="key">{titleCase(elementName)}</label>
          </Paragraph>

          <FlexBox.Row>
            <div className="form-row">
              {mappedObject &&
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
                  </Fragment>
                ))}
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
              onHandleChange={() => {}}
              label={titleCase(elementName)}
              disabled={true}
            />
          </Box>
        </Box>
      );
    }
  };

  if (flavor === undefined) {
    return <FullWidthSpinner color="black" size="md" />;
  }
  // const values = [...flavor?.config_schema?.properties];

  // let result = Object.keys(flavor?.config_schema?.properties).reduce(function (
  //   r: any,
  //   name: any,
  // ) {
  //   return (
  //     (r[name] =
  //       flavor?.config_schema?.properties[name].type === 'string' &&
  //       flavor?.config_schema?.properties[name].default === undefined
  //         ? ''
  //         : flavor?.config_schema?.properties[name].default),
  //     r
  //   );
  // },
  // {});
  // let normalizeConfiguration = Object.keys(details?.configuration).reduce(
  //   function (r: any, name: any) {
  //     if (details?.configuration[name] === null) {
  //       return (
  //         (r[name] =
  //           details?.configuration[name] === null &&
  //           flavor?.config_schema?.properties[name].default === undefined
  //             ? ''
  //             : flavor?.config_schema?.properties[name].default),
  //         r
  //       );
  //     } else {
  //       return {};
  //     }
  //   },
  //   {},
  // );
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

  // replaceNullWithEmptyString(details?.configuration);
  // let result = Object.keys(flavor?.config_schema?.properties).reduce(function (
  //   r: any,
  //   name: any,
  // ) {
  //   return (
  //     (r[name] =
  //       flavor?.config_schema?.properties[name].type === 'string' &&
  //       flavor?.config_schema?.properties[name].default === undefined
  //         ? ''
  //         : flavor?.config_schema?.properties[name].default),
  //     r
  //   );
  // },
  // {});

  const mappedObject = {
    // ...result,
    ...details?.configuration,
  };
  console.log(
    mappedObject,
    flavor?.config_schema?.properties,
    'asdasdasd2131232',
  );

  return (
    <FlexBox.Column marginTop="xl" fullWidth>
      <FlexBox.Row flexDirection="column">
        {/* <Container> */}
        <Box style={{ width: '80%' }}>
          <EditField
            disabled
            onChangeText={() => console.log('')}
            label={'Flavor Name'}
            optional={false}
            value={details.flavor}
            placeholder=""
            hasError={false}
            className={styles.field}
          />
        </Box>
        <Box marginTop="lg">
          <ToggleField
            name="Share Component with public"
            value={details.is_shared}
            onHandleChange={() => {}}
            label="Share Component with public"
            disabled={true}
          />
        </Box>
        {/* </Container> */}
        {/* <Container>
  
        </Container> */}
      </FlexBox.Row>
      <FlexBox.Row flexDirection="column">
        {/* <Container> */}
        {/* <Row>
          <Col xs={5}>
         
          </Col>
          <Col xs={5} style={{ marginLeft: '100px' }}>
            <FlexBox.Row justifyContent="space-between">
              <Paragraph>Share Component with public</Paragraph>
              <label className={styles.switch}>
                <input type="checkbox" checked={details.isShared} />
                <span className={`${styles.slider} ${styles.round}`}></span>
              </label>
            </FlexBox.Row>
          </Col>
        </Row> */}
        <Box style={{ width: '80%' }}>
          {Object.keys(mappedObject).map((key, ind) => (
            // <Col xs={6} key={ind}>
            <>{getFormElement(key, mappedObject[key])}</>
            // </Col>
          ))}
        </Box>
        {/* </Container> */}
      </FlexBox.Row>
    </FlexBox.Column>
  );
};
