import React from 'react';
import { Box, Paragraph } from '../../../components';

import styles from './index.module.scss';
import imageAddIcon from '../../../assets/imageAddIcon.svg';

export const StackBox: React.FC<{
  showCheckbox?: boolean;
  image?: any;
  stackName?: string;
  stackDesc?: string;
}> = ({ showCheckbox, image, stackName, stackDesc }) => {
  const titleCase = (s: any) =>
    s.replace(/^_*(.)|_+(.)/g, (s: any, c: string, d: string) =>
      c ? c.toUpperCase() : ' ' + d.toUpperCase(),
    );

  return (
    <Box
      paddingHorizontal="sm2"
      paddingVertical="sm2"
      className={styles.stackBox}
    >
      {showCheckbox && <input type="checkbox" className={styles.checkbox} />}
      <Box className={styles.imageWrapper}>
        <Box className={styles.imageContainer}>
          <img
            src={image ? image : imageAddIcon}
            alt="by Zenml"
            style={{ height: '59px' }}
          />
        </Box>
      </Box>

      <Box style={{ marginTop: '8px' }}>
        <Paragraph className={styles.stackName}>{stackName}</Paragraph>
      </Box>

      <Box marginTop="xs">
        <Paragraph className={styles.stackDesc}>
          {titleCase(stackDesc && stackDesc?.slice(0, 15))}
        </Paragraph>
      </Box>
    </Box>
  );
};
