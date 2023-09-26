import React from 'react';
import { runStatus, iconColors, iconSizes } from '../../../../../../constants';
import { Box, FlexBox, icons, If, Tooltip } from '../../../../../components';
import { Pipeline } from '../../../../../../api/types';

function getID(pipelineID: string, index: number) {
  return `${pipelineID}-${index}`;
}

export const Status: React.FC<{ pipeline: Pipeline }> = ({ pipeline }) => {
  return (
    <FlexBox
      alignItems="center"
      justifyContent="center"
      style={{ marginLeft: '-16px' }}
    >
      {pipeline?.status?.map((item: any, index: number) => (
        <Box key={index}>
          <>
            <FlexBox alignItems="center">
              <div data-tip data-for={getID(pipeline.id, index)}>
                <If condition={item === runStatus.COMPLETED}>
                  {() => (
                    <div>
                      <icons.circleCheck
                        color={iconColors.lightGreen}
                        size={iconSizes.md}
                      />
                    </div>
                  )}
                </If>
              </div>
              <Tooltip id={getID(pipeline.id, index)} text={item} />
            </FlexBox>

            <FlexBox alignItems="center">
              <div data-tip data-for={getID(pipeline.id, index)}>
                <If condition={item === runStatus.RUNNING}>
                  {() => (
                    <div>
                      <icons.inProgress
                        color={iconColors.orange}
                        size={iconSizes.md}
                      />
                    </div>
                  )}
                </If>
              </div>
              <Tooltip id={getID(pipeline.id, index)} text={item} />
            </FlexBox>

            <FlexBox alignItems="center">
              <div data-tip data-for={getID(pipeline.id, index)}>
                <If condition={item === runStatus.FAILED}>
                  {() => (
                    <div>
                      <icons.failed
                        color={iconColors.red}
                        size={iconSizes.md}
                      />
                    </div>
                  )}
                </If>
              </div>
              <Tooltip id={getID(pipeline.id, index)} text={item} />
            </FlexBox>

            <FlexBox alignItems="center">
              <div data-tip data-for={getID(pipeline.id, index)}>
                <If condition={item === runStatus.CACHED}>
                  {() => (
                    <div>
                      <icons.cached
                        color={iconColors.butterflyBlue}
                        size={iconSizes.md}
                      />
                    </div>
                  )}
                </If>
              </div>
              <Tooltip id={getID(pipeline.id, index)} text={item} />
            </FlexBox>
          </>
        </Box>
      ))}
    </FlexBox>
  );
};
