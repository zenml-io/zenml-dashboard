import React from 'react';
import { Box, Paragraph } from '../../../components';

import styles from './index.module.scss';

export const CustomFlavourBox: React.FC<{
  flavourName: string;
  flavourDesc: string;
  logoUrl: string;
  onSelectFlavor: any;
}> = ({ flavourName, flavourDesc, logoUrl, onSelectFlavor }) => {
  // const [select, setSelect] = useState(false);
  const formatText = (text: string) => {
    const removeUnderscore = text.replace('_', ' ');
    return removeUnderscore.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
      letter.toUpperCase(),
    );
  };
  return (
    <Box
      paddingHorizontal="sm2"
      paddingVertical="sm2"
      className={styles.customFlavourBox}
      // style={{ background: select ? '#443E99' : '#fff' }}
      style={{ background: '#fff' }}
      onClick={onSelectFlavor}
    >
      <Box className={styles.imageContainer}>
        {/* <label className={styles.custom_file_upload}> */}
        {/* <input type="file" name="img" accept="image/*" /> */}
        <img src={logoUrl} alt="imageAddIcon" />
        {/* </label> */}
      </Box>

      <Box style={{ marginTop: '12px' }}>
        <Paragraph className={styles.flavourName} style={{ color: '#443E99' }}>
          {formatText(flavourName)}
        </Paragraph>
      </Box>

      <Box marginTop="sm2" marginBottom="xxl2">
        <Paragraph className={styles.flavourDesc} style={{ color: '#A8A8A8' }}>
          {flavourDesc.length < 35
            ? `${flavourDesc}`
            : `${flavourDesc.substring(0, 30)}...`}
        </Paragraph>
      </Box>
    </Box>
  );
};
