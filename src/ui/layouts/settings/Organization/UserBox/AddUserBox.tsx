import React from 'react';
import styles from './index.module.scss';

import { FlexBox, Box, Paragraph } from '../../../../components';
import imageAddIcon from '../../../../assets/imageAddIcon.svg';

const AddUserBox = () => {
  return (
    <FlexBox.Row
      className={styles.addUserBox}
      justifyContent="center"
      marginTop="lg"
    >
      <Box>
        <Box className={styles.imageContainer}>
          <img src={imageAddIcon} alt="userImage" />
        </Box>

        <Box marginTop="sm">
          <Paragraph className={styles.userName}>Add member</Paragraph>
        </Box>
      </Box>
    </FlexBox.Row>
  );
};

export default AddUserBox;
