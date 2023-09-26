import React from 'react';
import { runStatus, iconColors, iconSizes } from '../../../../../constants';
import { FlexBox, icons, If, Tooltip } from '../../../../components';

const Element = ({
  run,
  condition,
  icon,
}: {
  run: TRun;
  condition: boolean;
  icon: React.ReactNode;
}) => (
  <FlexBox alignItems="center">
    <div data-tip data-for={run?.status} style={{ margin: '0 auto 0 auto' }}>
      <If condition={condition}>
        {() => <div style={{ marginLeft: '-24px' }}>{icon}</div>}
      </If>
    </div>
    <Tooltip id={run?.status} text={run?.status} />
  </FlexBox>
);

export const RunStatus: React.FC<{ run: TRun }> = ({ run }) => {
  return (
    <>
      <Element
        run={run}
        condition={run?.status === runStatus.COMPLETED}
        icon={
          <icons.circleCheck
            color={iconColors.lightGreen}
            size={iconSizes.md}
          />
        }
      />

      <Element
        run={run}
        condition={run?.status === runStatus.RUNNING}
        icon={
          <icons.inProgress color={iconColors.orange} size={iconSizes.md} />
        }
      />

      <Element
        run={run}
        condition={run?.status === runStatus.FAILED}
        icon={<icons.failed color={iconColors.red} size={iconSizes.md} />}
      />

      <Element
        run={run}
        condition={run?.status === runStatus.CACHED}
        icon={
          <icons.cached color={iconColors.butterflyBlue} size={iconSizes.md} />
        }
      />
    </>
  );
};
