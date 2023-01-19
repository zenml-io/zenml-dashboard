import React from 'react';
import styles from './index.module.scss';

export const SeparatorLight: React.FC = () => (
  <div className={styles.separatorLight} />
);

export const SeparatorNew: React.FC = () => (
  <div className={styles.separatorNew} />
);

export const Separator = {
  Light: SeparatorLight,
  LightNew: SeparatorNew
};
