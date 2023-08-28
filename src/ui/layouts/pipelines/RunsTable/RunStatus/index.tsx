import React from 'react';
import { runStatus, iconColors, iconSizes } from '../../../../../constants';
import { FlexBox, icons, If, Tooltip } from '../../../../components';

export const RunStatus: React.FC<{ run: TRun }> = ({ run }) => {
  return (
    <>
      <FlexBox alignItems="center">
        <div
          data-tip
          data-for={run?.status}
          style={{ margin: '0 auto 0 auto' }}
        >
          <If condition={run?.status === runStatus.COMPLETED}>
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
        <Tooltip id={run?.status} text={run?.status} />
      </FlexBox>

      <FlexBox alignItems="center">
        <div
          data-tip
          data-for={run?.status}
          style={{ margin: '0 auto 0 auto' }}
        >
          <If condition={run?.status === runStatus.RUNNING}>
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
        <Tooltip id={run?.status} text={run?.status} />
      </FlexBox>

      <FlexBox alignItems="center">
        <div
          data-tip
          data-for={run?.status}
          style={{ margin: '0 auto 0 auto' }}
        >
          <If condition={run?.status === runStatus.FAILED}>
            {() => (
              <div style={{ marginLeft: '-24px' }}>
                <icons.failed color={iconColors.red} size={iconSizes.md} />
              </div>
            )}
          </If>
        </div>
        <Tooltip id={run?.status} text={run?.status} />
      </FlexBox>

      <FlexBox alignItems="center">
        <div
          data-tip
          data-for={run?.status}
          style={{ margin: '0 auto 0 auto' }}
        >
          <If condition={run?.status === runStatus.CACHED}>
            {() => (
              <div style={{ marginLeft: '-24px' }}>
                <icons.cached
                  color={iconColors.butterflyBlue}
                  size={iconSizes.md}
                />
              </div>
            )}
          </If>
        </div>
        <Tooltip id={run?.status} text={run?.status} />
      </FlexBox>
    </>
  );
};
