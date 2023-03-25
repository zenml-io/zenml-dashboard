import React from 'react';
import { runStatus, iconColors, iconSizes } from '../../../../../constants';
import { icons, If, FlexBox } from '../../../../components';

export const RunStatus: React.FC<{ run: TRun }> = ({ run }) => {
  return (
    <FlexBox justifyContent='center' style={{  marginLeft: '-24px' }}>
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
      <If condition={run.status === runStatus.RUNNING}>
        {() => (
          // <ColoredCircle color="secondary" size="xs">
          <icons.inProgress color={iconColors.orange} size={iconSizes.md} />
          // </ColoredCircle>
        )}
      </If>
      <If condition={run.status === runStatus.FAILED}>
        {() => (
          // <ColoredCircle color="red" size="xs">
          <icons.failed color={iconColors.red} size={iconSizes.md} />
          // </ColoredCircle>
        )}
      </If>
      <If condition={run.status === runStatus.CACHED}>
        {() => (
          // <ColoredCircle color="mustard" size="xs">
          <icons.cached color={iconColors.butterflyBlue} size={iconSizes.md} />
          // </ColoredCircle>
        )}
      </If>
    </FlexBox>
  );
};
