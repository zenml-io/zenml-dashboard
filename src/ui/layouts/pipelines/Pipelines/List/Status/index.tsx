import React from 'react';
import { useHistory } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import { runStatus, iconColors, iconSizes } from '../../../../../../constants';
import { routePaths } from '../../../../../../routes/routePaths';

import {
  Box,
  ColoredCircle,
  FlexBox,
  icons,
  If,
  Paragraph,
} from '../../../../../components';
import { useService } from './useService';

export const Status: React.FC<{ pipeline: TPipeline }> = ({ pipeline }) => {
  const { lastThreeRuns } = useService({ pipeline });

  const history = useHistory();

  return (
    <FlexBox alignItems="center">
      {lastThreeRuns.map((item: any, index: number) => (
        <Box key={index} paddingHorizontal="xs">
          <>
            <div>
              <div data-tip data-for={item.status}>
                <If condition={item.status === runStatus.COMPLETED}>
                  {() => (
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        history.push(
                          routePaths.run.pipeline.statistics(
                            item.run.id,
                            item.run.pipeline_id,
                          ),
                        );
                      }}
                    >
                      <ColoredCircle color="green" size="xs">
                        <icons.check
                          color={iconColors.white}
                          size={iconSizes.xs}
                        />
                      </ColoredCircle>
                    </div>
                  )}
                </If>
              </div>
              <ReactTooltip id={item.status} place="top" effect="solid">
                <Paragraph color="white">
                  {item.status}
                  {/* {truncate(pipeline.id, ID_MAX_LENGTH)} */}
                </Paragraph>
              </ReactTooltip>
            </div>

            <div>
              <div data-tip data-for={item.status}>
                <If condition={item.status === runStatus.RUNNING}>
                  {() => (
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        history.push(
                          routePaths.run.pipeline.statistics(
                            item.run.id,
                            item.run.pipeline_id,
                          ),
                        );
                      }}
                    >
                      <ColoredCircle color="secondary" size="xs">
                        <icons.inProgress
                          color={iconColors.white}
                          size={iconSizes.xs}
                        />
                      </ColoredCircle>
                    </div>
                  )}
                </If>
              </div>
              <ReactTooltip id={item.runId} place="top" effect="solid">
                <Paragraph color="white">
                  {item.status}
                  {/* {truncate(pipeline.id, ID_MAX_LENGTH)} */}
                </Paragraph>
              </ReactTooltip>
            </div>

            {/* <If condition={status === runStatus.FAILED}>
              {() => (
                <ColoredCircle color="red" size="xs">
                  <icons.close color={iconColors.white} size={iconSizes.xs} />
                </ColoredCircle>
              )}
            </If> */}

            <div>
              <div data-tip data-for={item.runId}>
                <If condition={item.status === runStatus.FAILED}>
                  {() => (
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        history.push(
                          routePaths.run.pipeline.statistics(
                            item.run.id,
                            item.run.pipeline_id,
                          ),
                        );
                      }}
                    >
                      <ColoredCircle color="red" size="xs">
                        <icons.close
                          color={iconColors.white}
                          size={iconSizes.xs}
                        />
                      </ColoredCircle>
                    </div>
                  )}
                </If>
              </div>
              <ReactTooltip id={item.runId} place="top" effect="solid">
                <Paragraph color="white">
                  {item.status}
                  {/* {truncate(pipeline.id, ID_MAX_LENGTH)} */}
                </Paragraph>
              </ReactTooltip>
            </div>

            <div>
              <div data-tip data-for={item.runId}>
                <If condition={item.status === runStatus.CACHED}>
                  {() => (
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        history.push(
                          routePaths.run.pipeline.statistics(
                            item.run.id,
                            item.run.pipeline_id,
                          ),
                        );
                      }}
                    >
                      <ColoredCircle color="mustard" size="xs">
                        <icons.cached
                          color={iconColors.white}
                          size={iconSizes.xs}
                        />
                      </ColoredCircle>
                    </div>
                  )}
                </If>
              </div>
              <ReactTooltip id={item.runId} place="top" effect="solid">
                <Paragraph color="white">
                  {item.status}
                  {/* {truncate(pipeline.id, ID_MAX_LENGTH)} */}
                </Paragraph>
              </ReactTooltip>
            </div>
          </>
        </Box>
      ))}
    </FlexBox>
  );
};
