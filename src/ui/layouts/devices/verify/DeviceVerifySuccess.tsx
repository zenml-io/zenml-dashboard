import React from 'react';
import styles from './index.module.scss';
import { iconColors } from '../../../../constants/icons';
import { H3, Paragraph, icons } from '../../../components';

export function DeviceVerifySuccess() {
  return (
    <div className={styles.verifySuccessContainer}>
      <icons.checkCircleFilled
        className={styles.verifySuccessContainer__icon}
        size="xxl"
        color={iconColors.green}
      />
      <div>
        <H3 className={styles.contentBox__heading}>
          You successfully added your device
        </H3>
        <Paragraph className={styles.contentBox__subHeading}>
          You may close this screen and return to your CLI.
        </Paragraph>
      </div>
    </div>
  );
}
