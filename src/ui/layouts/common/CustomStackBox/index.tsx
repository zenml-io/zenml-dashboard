import React from 'react';
import { Box, Paragraph, icons } from '../../../components';

import styles from './index.module.scss';
import { titleCase } from '../../../../utils/camelCase';
import ReactTooltip from 'react-tooltip';
import { iconColors } from '../../../../constants';

export const CustomStackBox: React.FC<{
  image: any;
  stackName: string;
  stackDesc: string;
  value?: any;
  onCheck: any;
  onViewConfig: any;
}> = ({ image, stackName, stackDesc, value, onCheck, onViewConfig }) => {
  return (
    <Box
      paddingHorizontal="sm2"
      paddingVertical="sm2"
      className={styles.stackBox}
    >
      <input
        type="radio"
        className={styles.checkbox}
        checked={value}
        onClick={onCheck}
      />

      <icons.config
        onClick={onViewConfig}
        className={styles.viewConfig}
        // size={iconSizes.sm}
        // style={{ height: '18px', width: '18px' }}
        color={iconColors.grey}
      />

      <Box className={styles.imageWrapper}>
        <Box className={styles.imageContainer}>
          <img src={image} alt="by Zenml" />
        </Box>
      </Box>

      <Box style={{ marginTop: '8px' }}>
        <div data-tip data-for={stackName}>
          <Paragraph className={styles.stackName}>
            {stackName?.length > 14 ? (
              <>{stackName?.slice(0, 15)}...</>
            ) : (
              stackName
            )}
          </Paragraph>
        </div>
        <ReactTooltip id={stackName} place="top" effect="solid">
          <Paragraph color="white">{stackName}</Paragraph>
        </ReactTooltip>
      </Box>

      <Box marginTop="xs">
        <div data-tip data-for={stackDesc}>
          <Paragraph className={styles.stackDesc}>
            {stackDesc?.length > 14 ? (
              <>{titleCase(stackDesc?.slice(0, 15))}...</>
            ) : (
              titleCase(stackDesc)
            )}
          </Paragraph>
        </div>
        <ReactTooltip id={stackDesc} place="top" effect="solid">
          <Paragraph color="white">{titleCase(stackDesc)}</Paragraph>
        </ReactTooltip>
      </Box>
    </Box>
  );
};
