import React, { useState } from 'react';
import { Box, Paragraph } from '../../../components';

import styles from './index.module.scss';

export const CustomFlavourBox: React.FC<{
  flavourName: string;
  flavourDesc: string;
  logoUrl: string;
  onSelectFlavor: any;
}> = ({ flavourName, flavourDesc, logoUrl, onSelectFlavor }) => {
  const [select, setSelect] = useState(false);
  const titleCase = (s: any) =>
    s.replace(/^_*(.)|_+(.)/g, (s: any, c: string, d: string) =>
      c ? c.toUpperCase() : ' ' + d.toUpperCase(),
    );
  return (
    <Box
      paddingHorizontal="sm2"
      paddingVertical="sm2"
      className={styles.customFlavourBox}
      onMouseEnter={() => setSelect(true)}
      onMouseLeave={() => setSelect(false)}
      style={{ background: select ? '#443E99' : '#fff' }}
      // style={{ background: '#fff' }}
      onClick={onSelectFlavor}
    >
      <Box className={styles.imageContainer}>
        {/* <label className={styles.custom_file_upload}> */}
        {/* <input type="file" name="img" accept="image/*" /> */}
        <img src={logoUrl} alt="imageAddIcon" />
        {/* </label> */}
      </Box>

      <Box style={{ marginTop: '12px' }}>
        <Paragraph
          className={styles.flavourName}
          style={{ color: select ? '#fff' : '#443E99' }}
        >
          {titleCase(flavourName)}
        </Paragraph>
      </Box>

      <Box marginTop="sm2" marginBottom="xxl2">
        <Paragraph
          className={styles.flavourDesc}
          style={{ color: select ? '#D8C6FC' : '#A8A8A8' }}
        >
          {flavourDesc.length < 35
            ? `${flavourDesc}`
            : `${flavourDesc.substring(0, 30)}...`}
        </Paragraph>
      </Box>
    </Box>
  );
};
