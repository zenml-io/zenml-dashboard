import React, { useState } from 'react';
import { Box, Paragraph } from '../../../components';

import styles from './index.module.scss';
import imageAddIcon from '../../../assets/imageAddIcon.svg'

export const FlavourBox: React.FC<{ flavourName: string, flavourDesc: string }> = ({ flavourName, flavourDesc }) => {

  const [select, setSelect] = useState(false)

  return ( 
          <Box
            paddingHorizontal="sm2"
            paddingVertical="sm2"
            className={styles.flavourBox}
            style={{ background: select ? '#443E99' : '#fff' }}
            onClick={() => setSelect(true)}
          >
            <Box className={styles.imageContainer}>
              <input type="file" name="img" accept="image/*" />

              <label className={styles.custom_file_upload}>
                <input type="file"/>
                <img src={imageAddIcon} alt='imageAddIcon' />
              </label>
            </Box>

            <Box style={{ marginTop: '12px' }} >
              <Paragraph className={styles.flavourName} style={{ color: select ? '#fff' : '#443E99' }}>{flavourName}</Paragraph>
            </Box>

            <Box marginTop='sm2' marginBottom='lg2' >
              <Paragraph className={styles.flavourDesc} style={{ color: select ? '##D8C6FC' : '#A8A8A8' }}>{flavourDesc}</Paragraph>
            </Box>

          </Box>
  );
};
