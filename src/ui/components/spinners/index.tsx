import React from 'react';
import { Box, FlexBox } from '..';
import { joinClassNames } from '../../../utils';

import styles from './index.module.scss';

type Sizes = 'xs' | 'sm' | 'md' | 'lg';

type Colors = 'black' | 'white';

export const Spinner: React.FC<{ size: Sizes; color: Colors }> = ({
  size,
  color,
}) => (
  <Box
    className={joinClassNames(styles.spinner, styles[size], styles[color])}
  />
);

export const FullWidthSpinner: React.FC<{
  size: Sizes;
  color: Colors;
}> = ({ size, color }) => (
  <FlexBox
    data-testid="loader"
    fullWidth
    justifyContent="center"
    alignItems="center"
    marginTop="xxl"
    marginBottom="xxl"
  >
    <Spinner color={color} size={size} />
  </FlexBox>
);
