import React from 'react';
import styles from './index.module.scss';

export const SeparatorLight: React.FC = () => (
  <div className={styles.separatorLight} />
);

export const Separator = {
  Light: SeparatorLight,
};
