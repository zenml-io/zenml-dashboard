import React, { useState } from 'react';
import { Box, Paragraph } from '../../../components';

import styles from './index.module.scss';
import imageAddIcon from '../../../assets/imageAddIcon.svg';

export const FlavourBox: React.FC<{
  flavourName: string;
  flavourDesc: string;
}> = ({ flavourName, flavourDesc }) => {
  const [select, setSelect] = useState(false);
  const [selectedImage, setSelectedImage] = useState<any>(false);

  const previewImage = (e: any) => {
    const objectUrl = URL.createObjectURL(e.files[0]);
    setSelectedImage(objectUrl);
  };

  return (
    <Box
      paddingHorizontal="sm2"
      paddingVertical="sm2"
      className={styles.flavourBox}
      style={{ background: select ? '#443E99' : '#fff' }}
      onClick={() => setSelect(true)}
    >
      <Box className={styles.imageContainer}>
        {selectedImage ? (
          <img src={selectedImage} alt="by Zenml" />
        ) : (
          <label className={styles.custom_file_upload}>
            <input
              type="file"
              name="img"
              alt="by Zenml"
              accept="image/*"
              onChange={(e) => previewImage(e.target)}
            />
            <img src={imageAddIcon} alt="imageAddIcon" />
          </label>
        )}
      </Box>

      <Box style={{ marginTop: '12px' }}>
        <Paragraph
          className={styles.flavourName}
          style={{ color: select ? '#fff' : '#443E99' }}
        >
          {flavourName}
        </Paragraph>
      </Box>

      <Box marginTop="sm2" marginBottom="lg2">
        <Paragraph
          className={styles.flavourDesc}
          style={{ color: select ? '##D8C6FC' : '#A8A8A8' }}
        >
          {flavourDesc}
        </Paragraph>
      </Box>
    </Box>
  );
};
