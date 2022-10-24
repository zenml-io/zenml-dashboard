import React from 'react';
import { runStatus, iconColors, iconSizes } from '../../../../../constants';
import { ColoredCircle, icons, If } from '../../../../components';

export const RunStatus: React.FC<{ run: TRun }> = ({ run }) => {
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
          <ColoredCircle color="secondary" size="xs">
            <icons.inProgress color={iconColors.white} size={iconSizes.xs} />
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
      <If condition={run.status === runStatus.CACHED}>
        {() => (
          <ColoredCircle color="mustard" size="xs">
            <icons.cached color={iconColors.white} size={iconSizes.xs} />
          </ColoredCircle>
        )}
      </If>
    </>
  );
};
