import React from 'react';
import ReactTooltip from 'react-tooltip';
import { runStatus, iconColors, iconSizes } from '../../../../../constants';
import { FlexBox, icons, If, Paragraph } from '../../../../components';

export const RunStatus: React.FC<{ run: TRun }> = ({ run }) => {
  return (
    <>
      <FlexBox alignItems="center">
        <div data-tip data-for={run.status}>
          <If condition={run.status === runStatus.COMPLETED}>
            {() => (
              <icons.circleCheck
                color={iconColors.lightGreen}
                size={iconSizes.md}
              />
            )}
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
            {() => <icons.close color={iconColors.red} size={iconSizes.md} />}
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
              <icons.cached
                color={iconColors.butterflyBlue}
                size={iconSizes.md}
              />
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
