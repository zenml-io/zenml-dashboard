import React from 'react';
import { runStatus, iconColors, iconSizes } from '../../../../../constants';
import {
  FlexBox,
  icons,
  If,
  Tooltip,
} from '../../../../components';
import { Run } from '../../../../../api/types';

export const RunStatus: React.FC<{ run: Run }> = ({ run }) => {
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
        <Tooltip id={run.status} text={run.status} />
      </FlexBox>

      <FlexBox alignItems="center">
        <div data-tip data-for={run.status}>
          <If condition={run.status === runStatus.RUNNING}>
            {() => (
              <icons.inProgress color={iconColors.orange} size={iconSizes.md} />
            )}
          </If>
        </div>
        <Tooltip id={run.status} text={run.status} />
      </FlexBox>

      <FlexBox alignItems="center">
        <div data-tip data-for={run.status}>
          <If condition={run.status === runStatus.FAILED}>
            {() => <icons.close color={iconColors.red} size={iconSizes.md} />}
          </If>
        </div>
        <Tooltip id={run.status} text={run.status} />
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
        <Tooltip id={run.status} text={run.status} />
      </FlexBox>
    </>
  );
};
