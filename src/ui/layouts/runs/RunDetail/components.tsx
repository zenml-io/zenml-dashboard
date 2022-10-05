import React from 'react';
import ReactTooltip from 'react-tooltip';
import { runStatus, iconColors, iconSizes } from '../../../../constants';
import {
  Paragraph,
  Box,
  ColoredCircle,
  icons,
  If,
  FlexBox,
} from '../../../components';

import styles from './components.module.scss';

export const KeyValue: React.FC<{ label: string; width: string }> = ({
  label,
  children,
  width,
}) => (
  <Box
    className={styles.keyValue}
    style={{ flexBasis: width }}
    paddingRight="md"
    paddingBottom="md"
  >
    <Box paddingBottom="sm">
      <Paragraph size="small" color="grey">
        {label}
      </Paragraph>
    </Box>
    <Box>{children}</Box>
  </Box>
);

export const RunStatus: React.FC<{ run: TRun }> = ({ run }) => {
  if (run.status === runStatus.Running) return null;

  return (
    <>
      <FlexBox alignItems="center">
        <div data-tip data-for={run.status}>
          <If condition={run.status === runStatus.COMPLETED}>
            {() => (
              <ColoredCircle color="green" size="xs">
                <icons.check color={iconColors.white} size={iconSizes.xs} />
              </ColoredCircle>
            )}
          </If>
        </div>
        <ReactTooltip
          id={run.status}
          place="top"
          effect="solid"
          // backgroundColor={getBGColorFromInvoiceStatus(invoice.status)}
        >
          <Paragraph color="white">
            {run.status}
            {/* {truncate(pipeline.id, ID_MAX_LENGTH)} */}
          </Paragraph>
        </ReactTooltip>
      </FlexBox>

      <FlexBox alignItems="center">
        <div data-tip data-for={run.status}>
          <If condition={run.status === runStatus.RUNNING}>
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
          id={run.status}
          place="top"
          effect="solid"
          // backgroundColor={getBGColorFromInvoiceStatus(invoice.status)}
        >
          <Paragraph color="white">
            {run.status}
            {/* {truncate(pipeline.id, ID_MAX_LENGTH)} */}
          </Paragraph>
        </ReactTooltip>
      </FlexBox>

      {/* <If condition={status === runStatus.FAILED}>
              {() => (
                <ColoredCircle color="red" size="xs">
                  <icons.close color={iconColors.white} size={iconSizes.xs} />
                </ColoredCircle>
              )}
            </If> */}

      <FlexBox alignItems="center">
        <div data-tip data-for={run.status}>
          <If condition={run.status === runStatus.FAILED}>
            {() => (
              <ColoredCircle color="red" size="xs">
                <icons.close color={iconColors.white} size={iconSizes.xs} />
              </ColoredCircle>
            )}
          </If>
        </div>
        <ReactTooltip
          id={run.status}
          place="top"
          effect="solid"
          // backgroundColor={getBGColorFromInvoiceStatus(invoice.status)}
        >
          <Paragraph color="white">
            {run.status}
            {/* {truncate(pipeline.id, ID_MAX_LENGTH)} */}
          </Paragraph>
        </ReactTooltip>
      </FlexBox>

      <FlexBox alignItems="center">
        <div data-tip data-for={run.status}>
          <If condition={run.status === runStatus.CACHED}>
            {() => (
              <ColoredCircle color="mustard" size="xs">
                <icons.cached color={iconColors.white} size={iconSizes.xs} />
              </ColoredCircle>
            )}
          </If>
        </div>
        <ReactTooltip
          id={run.status}
          place="top"
          effect="solid"
          // backgroundColor={getBGColorFromInvoiceStatus(invoice.status)}
        >
          <Paragraph color="white">
            {run.status}
            {/* {truncate(pipeline.id, ID_MAX_LENGTH)} */}
          </Paragraph>
        </ReactTooltip>
      </FlexBox>
    </>
  );
};
