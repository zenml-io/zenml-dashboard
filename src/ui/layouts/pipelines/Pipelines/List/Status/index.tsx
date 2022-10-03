import React from 'react';
import { runStatus, iconColors, iconSizes } from '../../../../../../constants';

import {
  Box,
  ColoredCircle,
  FlexBox,
  icons,
  If,
} from '../../../../../components';
import { useService } from './useService';

export const Status: React.FC<{ pipeline: TPipeline }> = ({ pipeline }) => {
  // const { lastThreeRuns } = useService({ pipeline });
  const lastThreeRuns: any[] = ['failed', 'completed', 'running', 'cached'];
  return (
    <FlexBox alignItems="center">
      {lastThreeRuns.map((status: any, index: number) => (
        <Box key={index} paddingHorizontal="xs">
          {/* {console.log('status', run)} */}
          {/* {runStatus.COMPLETED} */}
          <>
            <If condition={status === runStatus.COMPLETED}>
              {() => (
                <ColoredCircle color="primary" size="xs">
                  <icons.check color={iconColors.white} size={iconSizes.xs} />
                </ColoredCircle>
              )}
            </If>
            <If condition={status === runStatus.RUNNING}>
              {() => (
                <ColoredCircle color="secondary" size="xs">
                  <icons.inProgress
                    color={iconColors.white}
                    size={iconSizes.xs}
                  />
                </ColoredCircle>
              )}
            </If>
            <If condition={status === runStatus.FAILED}>
              {() => (
                <ColoredCircle color="red" size="xs">
                  <icons.close color={iconColors.white} size={iconSizes.xs} />
                </ColoredCircle>
              )}
            </If>
            <If condition={status === runStatus.CACHED}>
              {() => (
                <ColoredCircle color="mustard" size="xs">
                  <icons.cached color={iconColors.white} size={iconSizes.xs} />
                </ColoredCircle>
              )}
            </If>
          </>
        </Box>
      ))}
    </FlexBox>
  );
};
