import React from 'react';
import ReactTooltip from 'react-tooltip';
import { runStatus, iconColors, iconSizes } from '../../../../../constants';
import {
  // ColoredCircle,
  FlexBox,
  icons,
  If,
  Paragraph,
} from '../../../../components';

export const RunStatus: React.FC<{ run: TRun }> = ({ run }) => {
  return (
    <>
      <FlexBox alignItems="center">
        <div data-tip data-for={run.status}>
          <If condition={run.status === runStatus.COMPLETED}>
            {() => (
              // <ColoredCircle color="green" size="xs">
              <icons.circleCheck
                color={iconColors.lightGreen}
                size={iconSizes.md}
              />
              // </ColoredCircle>
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
              // <ColoredCircle color="secondary" size="xs">
              <icons.inProgress color={iconColors.orange} size={iconSizes.md} />
              // </ColoredCircle>
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
            {() => (
              // <ColoredCircle color="red" size="xs">
              <icons.close color={iconColors.red} size={iconSizes.md} />
              // </ColoredCircle>
            )}
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
              // <ColoredCircle color="mustard" size="xs">
              <icons.cached
                color={iconColors.butterflyBlue}
                size={iconSizes.md}
              />
              // </ColoredCircle>
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
