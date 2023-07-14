import React from 'react';
import { runStatus, iconColors, iconSizes } from '../../../../constants';
import {
  Paragraph,
  Box,
  icons,
  If,
  FlexBox,
  Tooltip,
} from '../../../components';

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
      <FlexBox alignItems="center">
        <div data-tip data-for={run.status}>
          <If condition={run.status === runStatus.COMPLETED}>
            {() => (
              // <ColoredCircle color="green" size="xs">
              <icons.check color={iconColors.white} size={iconSizes.md} />
              // </ColoredCircle>
            )}
          </If>
        </div>
        <Tooltip id={run.status} text={run.status} />
      </FlexBox>

      <FlexBox alignItems="center">
        <div data-tip data-for={run.status}>
          <If condition={run.status === runStatus.RUNNING}>
            {() => (
              // <ColoredCircle color="secondary" size="xs">
              <icons.inProgress color={iconColors.orange} size={iconSizes.md} />
              // </ColoredCircle>
            )}
          </If>
        </div>
        <Tooltip id={run.status} text={run.status} />
      </FlexBox>

      <FlexBox alignItems="center">
        <div data-tip data-for={run.status}>
          <If condition={run.status === runStatus.FAILED}>
            {() => (
              // <ColoredCircle color="red" size="xs">
              <icons.close color={iconColors.white} size={iconSizes.md} />
              // </ColoredCircle>
            )}
          </If>
        </div>
        <Tooltip id={run.status} text={run.status} />
      </FlexBox>

      <FlexBox alignItems="center">
        <div data-tip data-for={run.status}>
          <If condition={run.status === runStatus.CACHED}>
            {() => (
              // <ColoredCircle color="mustard" size="xs">
              <icons.cached color={iconColors.white} size={iconSizes.md} />
              // </ColoredCircle>
            )}
          </If>
        </div>
        <Tooltip id={run.status} text={run.status} />
      </FlexBox>
    </>
  );
};
