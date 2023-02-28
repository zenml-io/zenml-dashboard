import React from 'react';
import { Box, Paragraph } from '../../../components';

import styles from './index.module.scss';
import { titleCase } from '../../../../utils/camelCase';

export const CustomStackBox: React.FC<{
  image: any;
  stackName: string;
  stackDesc: string;
  value?: any;
  onCheck: any;
}> = ({ image, stackName, stackDesc, value, onCheck }) => {

  return (
    <Box
      paddingHorizontal="sm2" 
      paddingVertical="sm2"
      className={styles.stackBox}
    >
    <input type='checkbox' className={styles.checkbox} checked={value} onClick={onCheck} />
      <Box className={styles.imageWrapper}>
        <Box className={styles.imageContainer}>
          <img src={image} alt="by Zenml" />
        </Box>
      </Box>

      <Box style={{ marginTop: '8px' }}>
        <Paragraph className={styles.stackName}>{stackName?.slice(0, 15)}</Paragraph>
      </Box>

      <Box marginTop="xs">
        <Paragraph className={styles.stackDesc}>
          {titleCase(stackDesc?.slice(0, 15))}
        </Paragraph>
      </Box>
    </Box>
  );
};
