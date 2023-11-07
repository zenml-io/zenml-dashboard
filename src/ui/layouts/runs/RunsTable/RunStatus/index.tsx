import React from 'react';
import { runStatus, iconColors, iconSizes } from '../../../../../constants';
import { FlexBox, icons, If, Tooltip } from '../../../../components';
import { Run } from '../../../../../api/types';

const Element = ({
  run,
  condition,
  icon,
}: {
  run: Run;
  condition: boolean;
  icon: React.ReactNode;
}) => (
  <FlexBox alignItems="center">
    <div
      data-tip
      data-for={run?.body.status}
      style={{ margin: '0 auto 0 auto' }}
    >
      <If condition={condition}>
        {() => <div style={{ marginLeft: '-24px' }}>{icon}</div>}
      </If>
    </div>
    <Tooltip id={run?.body.status} text={run?.body.status} />
  </FlexBox>
);

export const RunStatus: React.FC<{ run: Run }> = ({ run }) => {
  return (
    <>
      <Element
        run={run}
        condition={run?.body.status === runStatus.COMPLETED}
        icon={
          <icons.circleCheck
            color={iconColors.lightGreen}
            size={iconSizes.md}
          />
        }
      />

      <Element
        run={run}
        condition={run?.body.status === runStatus.RUNNING}
        icon={
          <icons.inProgress color={iconColors.orange} size={iconSizes.md} />
        }
      />

      <Element
        run={run}
        condition={run?.body.status === runStatus.FAILED}
        icon={<icons.failed color={iconColors.red} size={iconSizes.md} />}
      />

      <Element
        run={run}
        condition={run?.body.status === runStatus.CACHED}
        icon={
          <icons.cached color={iconColors.butterflyBlue} size={iconSizes.md} />
        }
      />
    </>
  );
};
