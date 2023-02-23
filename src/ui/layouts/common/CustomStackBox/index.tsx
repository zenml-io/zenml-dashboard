import React, { useState } from 'react';
import { Box, Paragraph } from '../../../components';

import styles from './index.module.scss';

export const CustomStackBox: React.FC<{
  image: any;
  stackName: string;
  stackDesc: string;
}> = ({ image, stackName, stackDesc }) => {
  const [select, setSelect] = useState(false);

  return (
    <Box
      paddingHorizontal="sm2"
      paddingVertical="sm2"
      className={styles.stackBox}
    >
    <input type='checkbox' className={styles.checkbox} checked={select} onClick={() => setSelect(!select)} />
      <Box className={styles.imageWrapper}>
        <Box className={styles.imageContainer}>
            <img src={image} alt="by Zenml" />
        </Box>
      </Box>

      <Box style={{ marginTop: '8px' }}>
        <Paragraph className={styles.stackName}>
          {stackName}
        </Paragraph>
      </Box>

      <Box marginTop="xs">
        <Paragraph className={styles.stackDesc}>
          {stackDesc}
        </Paragraph>
      </Box>
    </Box>
  );
};