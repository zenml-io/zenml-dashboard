import React from 'react';
import {
  FlexBox,
  Box,
  EditField,
  Paragraph,
  PrimaryButton,
} from '../../../../components';
import styles from './index.module.scss';

export const Configuration: React.FC<{ stackId: TId }> = ({ stackId }) => {
  const CheckBox = () => (
    <label className={styles.switch}>
      <input type="checkbox" />
      <span className={`${styles.slider} ${styles.round}`}></span>
    </label>
  );

  return (
    <FlexBox.Column fullWidth marginTop="xl">
      <FlexBox.Row>
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
      </FlexBox.Row>

      {/* <Box style={{ marginLeft: 'auto' }} marginRight='lg' ><PrimaryButton>Register Component</PrimaryButton></Box> */}
    </FlexBox.Column>
  );
};
