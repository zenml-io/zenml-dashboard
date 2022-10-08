import React from 'react';
import ReactTooltip from 'react-tooltip';
import { runStatus, iconColors, iconSizes } from '../../../../../../constants';

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
  // const lastThreeRuns: any[] = ['failed', 'completed', 'running', 'cached'];
  return (
    <FlexBox alignItems="center">
      {lastThreeRuns.map((status: any, index: number) => (
        <Box key={index} paddingHorizontal="xs">
          {/* {console.log('status', run)} */}
          {/* {runStatus.COMPLETED} */}
          <>
            <div>
              <div data-tip data-for={status}>
                <If condition={status === runStatus.COMPLETED}>
                  {() => (
                    <ColoredCircle color="green" size="xs">
                      <icons.check
                        color={iconColors.white}
                        size={iconSizes.xs}
                      />
                    </ColoredCircle>
                  )}
                </If>
              </div>
              <ReactTooltip
                id={status}
                place="top"
                effect="solid"
                // backgroundColor={getBGColorFromInvoiceStatus(invoice.status)}
              >
                <Paragraph color="white">
                  {status}
                  {/* {truncate(pipeline.id, ID_MAX_LENGTH)} */}
                </Paragraph>
              </ReactTooltip>
            </div>

            <div>
              <div data-tip data-for={status}>
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
              </div>
              <ReactTooltip
                id={status}
                place="top"
                effect="solid"
                // backgroundColor={getBGColorFromInvoiceStatus(invoice.status)}
              >
                <Paragraph color="white">
                  {status}
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
              <div data-tip data-for={status}>
                <If condition={status === runStatus.FAILED}>
                  {() => (
                    <ColoredCircle color="red" size="xs">
                      <icons.close
                        color={iconColors.white}
                        size={iconSizes.xs}
                      />
                    </ColoredCircle>
                  )}
                </If>
              </div>
              <ReactTooltip
                id={status}
                place="top"
                effect="solid"
                // backgroundColor={getBGColorFromInvoiceStatus(invoice.status)}
              >
                <Paragraph color="white">
                  {status}
                  {/* {truncate(pipeline.id, ID_MAX_LENGTH)} */}
                </Paragraph>
              </ReactTooltip>
            </div>

            <div>
              <div data-tip data-for={status}>
                <If condition={status === runStatus.CACHED}>
                  {() => (
                    <ColoredCircle color="mustard" size="xs">
                      <icons.cached
                        color={iconColors.white}
                        size={iconSizes.xs}
                      />
                    </ColoredCircle>
                  )}
                </If>
              </div>
              <ReactTooltip
                id={status}
                place="top"
                effect="solid"
                // backgroundColor={getBGColorFromInvoiceStatus(invoice.status)}
              >
                <Paragraph color="white">
                  {status}
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
