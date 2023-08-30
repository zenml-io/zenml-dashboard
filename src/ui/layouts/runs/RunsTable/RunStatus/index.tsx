import React from 'react';
import { runStatus, iconColors, iconSizes } from '../../../../../constants';
import { icons, If, FlexBox } from '../../../../components';
import { Run } from '../../../../../api/types';

export const RunStatus: React.FC<{ run: Run }> = ({ run }) => {
  return (
    <FlexBox justifyContent="center" style={{ marginLeft: '-24px' }}>
      <If condition={run.status === runStatus.COMPLETED}>
        {() => (
          <icons.circleCheck
            color={iconColors.lightGreen}
            size={iconSizes.md}
          />
        )}
      </If>
      <If condition={run.status === runStatus.RUNNING}>
        {() => (
          <icons.inProgress color={iconColors.orange} size={iconSizes.md} />
        )}
      </If>
      <If condition={run.status === runStatus.FAILED}>
        {() => <icons.failed color={iconColors.red} size={iconSizes.md} />}
      </If>
      <If condition={run.status === runStatus.CACHED}>
        {() => (
          <icons.cached color={iconColors.butterflyBlue} size={iconSizes.md} />
        )}
      </If>
    </FlexBox>
  );
};
