import React from 'react';
import { runStatus, iconColors, iconSizes } from '../../../../constants';
import { Paragraph, Box, ColoredCircle, icons, If } from '../../../components';

import styles from './components.module.scss';

export const KeyValue: React.FC<{ label: string; width: string }> = ({
  label,
  children,
  width,
}) => (
  <Box
    className={styles.keyValue}
    style={{ flexBasis: width }}
    paddingRight="md"
    paddingBottom="md"
  >
    <Box paddingBottom="sm">
      <Paragraph size="small" color="grey">
        {label}
      </Paragraph>
    </Box>
    <Box>{children}</Box>
  </Box>
);

export const RunStatus: React.FC<{ run: TRun }> = ({ run }) => {
  if (run.status === runStatus.Running) return null;

  return (
    <>
      <If condition={run.status === runStatus.Succeeded}>
        {() => (
          <ColoredCircle color="green" size="xs">
            <icons.check color={iconColors.white} size={iconSizes.xs} />
          </ColoredCircle>
        )}
      </If>
      <If condition={run.status === runStatus.Failed}>
        {() => (
          <ColoredCircle color="red" size="xs">
            <icons.close color={iconColors.white} size={iconSizes.xs} />
          </ColoredCircle>
        )}
      </If>
    </>
  );
};
