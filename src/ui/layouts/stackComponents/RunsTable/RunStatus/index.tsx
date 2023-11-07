import React from 'react';
import { runStatus, iconColors, iconSizes } from '../../../../../constants';
import { FlexBox, icons, If, Tooltip } from '../../../../components';
import { Run } from '../../../../../api/types';

export const RunStatus: React.FC<{ run: Run }> = ({ run }) => {
  return (
    <>
      <FlexBox alignItems="center">
        <div data-tip data-for={run.body.status}>
          <If condition={run.body.status === runStatus.COMPLETED}>
            {() => (
              <div style={{ marginLeft: '-24px' }}>
                <icons.circleCheck
                  color={iconColors.lightGreen}
                  size={iconSizes.md}
                />
              </div>
            )}
          </If>
        </div>
        <Tooltip id={run.body.status} text={run.body.status} />
      </FlexBox>

      <FlexBox alignItems="center">
        <div
          data-tip
          data-for={run.body.status}
          style={{ margin: '0 auto 0 auto' }}
        >
          <If condition={run.body.status === runStatus.RUNNING}>
            {() => (
              <div style={{ marginLeft: '-24px' }}>
                <icons.inProgress
                  color={iconColors.orange}
                  size={iconSizes.md}
                />
              </div>
            )}
          </If>
        </div>
        <Tooltip id={run.body.status} text={run.body.status} />
      </FlexBox>

      <FlexBox alignItems="center">
        <div
          data-tip
          data-for={run.body.status}
          style={{ margin: '0 auto 0 auto' }}
        >
          <If condition={run.body.status === runStatus.FAILED}>
            {() => (
              <div style={{ marginLeft: '-24px' }}>
                <icons.failed color={iconColors.red} size={iconSizes.md} />
              </div>
            )}
          </If>
        </div>
        <Tooltip id={run.body.status} text={run.body.status} />
      </FlexBox>

      <FlexBox alignItems="center">
        <div
          data-tip
          data-for={run.body.status}
          style={{ margin: '0 auto 0 auto' }}
        >
          <If condition={run.body.status === runStatus.CACHED}>
            {() => (
              <div style={{ marginLeft: '-24px' }}>
                \
                <icons.cached
                  color={iconColors.butterflyBlue}
                  size={iconSizes.md}
                />
              </div>
            )}
          </If>
        </div>
        <Tooltip id={run.body.status} text={run.body.status} />
      </FlexBox>
    </>
  );
};
