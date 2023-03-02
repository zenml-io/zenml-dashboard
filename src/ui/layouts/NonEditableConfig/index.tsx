import React from 'react';
import {
  FlexBox,
  Box,
  EditField,
  Paragraph,
  Container,
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
    if (typeof elementSchema === 'string') {
      return (
        <Box marginVertical={'md'} style={{ width: '100%' }}>
          <EditField
            disabled
            onChangeText={() => console.log('')}
            label={titleCase(elementName)}
            optional={false}
            value={elementSchema}
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
                disabled
                onChangeText={() => console.log('')}
                label="Key"
                optional={false}
                value={''}
                placeholder=""
                hasError={false}
                className={styles.field}
              />
              <div style={{ width: '10%' }}></div>
              <EditField
                disabled
                // marginRight={'md'}
                onChangeText={() => console.log('')}
                label="Value"
                // optional={true}
                value={''}
                placeholder=""
                hasError={false}
                className={styles.field}
              />
            </FlexBox.Row>
          )}
          {Object.entries(elementSchema).map(([key, value]) => (
            <FlexBox.Row>
              <EditField
                disabled
                onChangeText={() => console.log('')}
                label="Key"
                optional={false}
                value={key}
                placeholder=""
                hasError={false}
                className={styles.field}
              />
              <div style={{ width: '10%' }}></div>
              <EditField
                disabled
                // marginRight={'md'}
                onChangeText={() => console.log('')}
                label="Value"
                // optional={true}
                value={value}
                placeholder=""
                hasError={false}
                className={styles.field}
              />
            </FlexBox.Row>
          ))}
        </Box>
      );
    }
    if (typeof elementSchema === 'boolean') {
      return (
        <Box marginVertical={'md'} style={{ width: '100%' }}>
          <ToggleField 
            name={titleCase(elementName)} 
            value={elementSchema} 
            onHandleChange={() => {}} 
            label={titleCase(elementName)} 
            disabled={true}  
          />
          {/* <Box>
            <FlexBox.Row justifyContent="space-between">
              <Paragraph>{titleCase(elementName)}</Paragraph>
              <label className={styles.switch}>
                <input type="checkbox" checked={elementSchema} />
                <span className={`${styles.slider} ${styles.round}`}></span>
              </label>
            </FlexBox.Row>
          </Box> */}
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
    ...details?.configuration,
  };

  return (
    <FlexBox.Column marginTop="xl" fullWidth>
      <FlexBox.Row>
        <Container>
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
          {/* <FlexBox.Row justifyContent="space-between" style={{ width: '80%' }}>
            <Paragraph>Share Component with public</Paragraph>
            <label className={styles.switch}>
              <input type="checkbox" checked={details.is_shared} />
              <span className={`${styles.slider} ${styles.round}`}></span>
            </label>
          </FlexBox.Row> */}
          <ToggleField 
            name='Share Component with public'
            value={details.is_shared} 
            onHandleChange={() => {}} 
            label='Share Component with public'
            disabled={true}  
          />
        </Container>
        {/* <Container>
  
        </Container> */}
      </FlexBox.Row>
      <FlexBox.Row style={{ width: '80%' }}>
        <Container>
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
