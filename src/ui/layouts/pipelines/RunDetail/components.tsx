import React from 'react';
import ReactTooltip from 'react-tooltip';
import { runStatus, iconColors, iconSizes } from '../../../../constants';
import { Paragraph, Box, icons, If, FlexBox } from '../../../components';

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
            {() => <icons.check color={iconColors.white} size={iconSizes.md} />}
          </If>
        </div>
        <ReactTooltip id={run.status} place="top" effect="solid">
          <Paragraph color="white">{run.status}</Paragraph>
        </ReactTooltip>
      </FlexBox>

      <FlexBox alignItems="center">
        <div data-tip data-for={run.status}>
          <If condition={run.status === runStatus.RUNNING}>
            {() => (
              <icons.inProgress color={iconColors.orange} size={iconSizes.md} />
            )}
          </If>
        </div>
        <ReactTooltip id={run.status} place="top" effect="solid">
          <Paragraph color="white">{run.status}</Paragraph>
        </ReactTooltip>
      </FlexBox>

      <FlexBox alignItems="center">
        <div data-tip data-for={run.status}>
          <If condition={run.status === runStatus.FAILED}>
            {() => <icons.close color={iconColors.white} size={iconSizes.md} />}
          </If>
        </div>
        <ReactTooltip id={run.status} place="top" effect="solid">
          <Paragraph color="white">{run.status}</Paragraph>
        </ReactTooltip>
      </FlexBox>

      <FlexBox alignItems="center">
        <div data-tip data-for={run.status}>
          <If condition={run.status === runStatus.CACHED}>
            {() => (
              <icons.cached color={iconColors.white} size={iconSizes.md} />
            )}
          </If>
        </div>
        <ReactTooltip id={run.status} place="top" effect="solid">
          <Paragraph color="white">{run.status}</Paragraph>
        </ReactTooltip>
      </FlexBox>
    </>
  );
};
