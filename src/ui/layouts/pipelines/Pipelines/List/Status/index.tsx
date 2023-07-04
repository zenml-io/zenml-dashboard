import React from 'react';
import ReactTooltip from 'react-tooltip';
import { runStatus, iconColors, iconSizes } from '../../../../../../constants';

import { Box, FlexBox, icons, If, Paragraph } from '../../../../../components';

function getID(pipelineID: string, index: number) {
  return `${pipelineID}-${index}`;
}

export const Status: React.FC<{ pipeline: TPipeline }> = ({ pipeline }) => {
  return (
    <FlexBox
      alignItems="center"
      justifyContent="center"
      style={{ marginLeft: '-16px' }}
    >
      {pipeline.status.map((item: any, index: number) => (
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
              <ReactTooltip
                id={getID(pipeline.id, index)}
                place="top"
                effect="solid"
              >
                <Paragraph color="white">{item}</Paragraph>
              </ReactTooltip>
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
              <ReactTooltip
                id={getID(pipeline.id, index)}
                place="top"
                effect="solid"
              >
                <Paragraph color="white">{item}</Paragraph>
              </ReactTooltip>
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
              <ReactTooltip
                id={getID(pipeline.id, index)}
                place="top"
                effect="solid"
              >
                <Paragraph color="white">{item}</Paragraph>
              </ReactTooltip>
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
              <ReactTooltip
                id={getID(pipeline.id, index)}
                place="top"
                effect="solid"
              >
                <Paragraph color="white">{item}</Paragraph>
              </ReactTooltip>
            </FlexBox>
          </>
        </Box>
      ))}
    </FlexBox>
  );
};
