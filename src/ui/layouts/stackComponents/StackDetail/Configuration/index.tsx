import React from 'react';
import {
  FlexBox,
  Box,
  EditField,
  Paragraph,
  // PrimaryButton,
} from '../../../../components';
import styles from './index.module.scss';
import { useService } from './useService';

export const Configuration: React.FC<{ stackId: TId }> = ({ stackId }) => {
  const { stackComponent } = useService({
    stackId,
  });
  console.log(stackComponent, 'stack222Component');
  const getFormElement = (elementName: any, elementSchema: any) => {
    // debugger;

    if (typeof elementSchema === 'string') {
      return (
        <Box style={{ width: '40%' }}>
          <EditField
            disabled
            onChangeText={() => console.log('')}
            label={elementName}
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
        <Box style={{ width: '40%' }}>
          <Paragraph size="body" style={{ color: 'black' }}>
            <label htmlFor={elementName}>{elementName}</label>
          </Paragraph>
          {Object.entries(elementSchema).map(([key, value]) => (
            <FlexBox.Row>
              <EditField
                disabled
                onChangeText={() => console.log('')}
                label="key"
                optional={false}
                value={key}
                placeholder=""
                hasError={false}
                className={styles.field}
              />
              <div style={{ width: '10%' }}></div>
              <EditField
                disabled
                marginRight={'md'}
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
        <Box style={{ width: '40%' }} marginVertical="md">
          <Box>
            <FlexBox.Row justifyContent="space-between">
              <Paragraph>{elementName}</Paragraph>
              <label className={styles.switch}>
                <input type="checkbox" checked={elementSchema} />
                <span className={`${styles.slider} ${styles.round}`}></span>
              </label>
            </FlexBox.Row>
          </Box>
        </Box>
      );
    }
  };

  return (
    <FlexBox.Column fullWidth marginTop="xl">
      <Box style={{ width: '40%' }}>
        <EditField
          disabled
          onChangeText={() => console.log('')}
          label={'Flavor Name'}
          optional={false}
          value={stackComponent.flavor}
          placeholder=""
          hasError={false}
          className={styles.field}
        />
      </Box>
      <Box style={{ width: '40%' }} marginVertical="md">
        <Box>
          <FlexBox.Row justifyContent="space-between">
            <Paragraph>Share Component with public</Paragraph>
            <label className={styles.switch}>
              <input type="checkbox" checked={stackComponent.isShared} />
              <span className={`${styles.slider} ${styles.round}`}></span>
            </label>
          </FlexBox.Row>
        </Box>
      </Box>
      {Object.keys(stackComponent?.configuration).map((key, ind) => (
        <div key={key}>
          {getFormElement(key, stackComponent?.configuration[key])}
        </div>
      ))}
      {/* <FlexBox.Row>
        <Box style={{ width: '40%' }}>
          <Box>
            <EditField
              onChangeText={() => console.log('')}
              label="Flavour Name"
              optional={false}
              value=""
              placeholder=""
              hasError={false}
              className={styles.field}
            />
          </Box>

          <Box>
            <EditField
              onChangeText={() => console.log('')}
              label="Item 1"
              optional={true}
              value=""
              placeholder=""
              hasError={false}
              className={styles.field}
            />
          </Box>
          <Box>
            <EditField
              onChangeText={() => console.log('')}
              label="Item 2"
              optional={true}
              value=""
              placeholder=""
              hasError={false}
              className={styles.field}
            />
          </Box>
          <Box>
            <EditField
              onChangeText={() => console.log('')}
              label="Item 3"
              optional={true}
              value=""
              placeholder=""
              hasError={false}
              className={styles.field}
            />
          </Box>
          <Box>
            <EditField
              onChangeText={() => console.log('')}
              label="Item 4"
              optional={true}
              value=""
              placeholder=""
              hasError={false}
              className={styles.field}
            />
          </Box>
        </Box>

        <Box style={{ width: '60%' }} marginTop="xl" marginHorizontal="xxl">
          <Box>
            <FlexBox.Row justifyContent="space-between">
              <Paragraph>Share Component with public</Paragraph> <CheckBox />
            </FlexBox.Row>
          </Box>
          <Box style={{ marginTop: '80px' }}>
            <FlexBox.Row justifyContent="space-between">
              <Paragraph>Auto Update</Paragraph> <CheckBox />
            </FlexBox.Row>
          </Box>
          <Box style={{ marginTop: '80px' }}>
            <FlexBox.Row justifyContent="space-between">
              <Paragraph>Notification update</Paragraph> <CheckBox />
            </FlexBox.Row>
          </Box>
        </Box>
      </FlexBox.Row> */}

      {/* <Box style={{ marginLeft: 'auto' }} marginRight='lg' ><PrimaryButton>Register Component</PrimaryButton></Box> */}
    </FlexBox.Column>
  );
};
