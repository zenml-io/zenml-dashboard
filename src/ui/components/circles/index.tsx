import React from 'react';
import cn from 'classnames';

import { FlexBox } from '..';

import styles from './index.module.scss';

type Sizes = 'xs' | 'sm' | 'md' | 'lg';
type Colors =
  | 'primary'
  | 'secondary'
  | 'red'
  | 'green'
  | 'grey'
  | 'lightestGrey'
  | 'orange'
  | 'mustard';

export const ColoredCircle: React.FC<{ color: Colors; size: Sizes }> = ({
  children,
  color,
  size,
}) => (
  <FlexBox
    justifyContent="center"
    alignItems="center"
    className={cn(styles.coloredCircle, styles[color], styles[size])}
  >
    {children}
  </FlexBox>
);
