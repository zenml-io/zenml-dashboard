import React from 'react';
import { runStatus, iconColors, iconSizes } from '../../../../../constants';
import { ColoredCircle, icons, If } from '../../../../components';

export const RunStatus: React.FC<{ run: TRun }> = ({ run }) => {
  // debugger;
  // if (run.status === runStatus.Running) return null;

  return (
    <>
      <If condition={run.status === runStatus.Succeeded}>
        {() => (
          <ColoredCircle color="green" size="xs">
            <icons.check color={iconColors.white} size={iconSizes.xs} />
          </ColoredCircle>
        )}
      </If>
      <If condition={run.status === runStatus.Running}>
        {() => (
          <ColoredCircle color="orange" size="xs">
            {/* <icons.close color={iconColors.white} size={iconSizes.xs} /> */}
          </ColoredCircle>
        )}
      </If>
      <If condition={run.status === runStatus.Failed}>
        {() => (
          <ColoredCircle color="red" size="xs">
            <icons.close color={iconColors.white} size={iconSizes.xs} />
          </ColoredCircle>
        )}
      </If>
    </>
  );
};
