import React from 'react';
import { runStatus, iconColors, iconSizes } from '../../../../../constants';
import { ColoredCircle, icons, If } from '../../../../components';

export const RunStatus: React.FC<{ run: TRun }> = ({ run }) => {
  // if (run.status === runStatus.Running) return null;

  return (
    <>
      <If condition={run.status === runStatus.COMPLETED}>
        {() => (
          <ColoredCircle color="green" size="xs">
            <icons.check color={iconColors.white} size={iconSizes.xs} />
          </ColoredCircle>
        )}
      </If>
      <If condition={run.status === runStatus.RUNNING}>
        {() => (
          <ColoredCircle color="orange" size="xs">
            {/* <icons.close color={iconColors.white} size={iconSizes.xs} /> */}
          </ColoredCircle>
        )}
      </If>
      <If condition={run.status === runStatus.FAILED}>
        {() => (
          <ColoredCircle color="red" size="xs">
            <icons.close color={iconColors.white} size={iconSizes.xs} />
          </ColoredCircle>
        )}
      </If>
    </>
  );
};
