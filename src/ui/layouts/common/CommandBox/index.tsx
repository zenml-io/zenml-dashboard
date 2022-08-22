import React from 'react';
import { Paragraph, FlexBox } from '../../../components';

import styles from './index.module.scss';

export const CommandBox: React.FC<{ command: string }> = ({ command }) => (
  <FlexBox padding="md" fullWidth className={styles.command}>
    <Paragraph color="white">{command}</Paragraph>
  </FlexBox>
);
