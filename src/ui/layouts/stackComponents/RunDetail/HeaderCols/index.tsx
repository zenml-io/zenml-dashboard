import React from 'react';

import { iconColors, iconSizes, ID_MAX_LENGTH } from '../../../../../constants';

import { truncate, formatDateToDisplayOnTable } from '../../../../../utils';
import { useHistory, useSelector } from '../../../../hooks';
import { routePaths } from '../../../../../routes/routePaths';
import { FlexBox, Paragraph, icons } from '../../../../components';
import { HeaderCol } from '../../../common/Table';
import { RunStatus } from '../../RunsTable/RunStatus';

import ReactTooltip from 'react-tooltip';
import { workspaceSelectors } from '../../../../../redux/selectors';
import { Run } from '../../../../../api/types';

const HeaderText = ({ text, margin }: { text: string; margin?: string }) => (
  <Paragraph
    size="small"
    color="black"
    style={{ fontSize: '14px', marginLeft: margin }}
  >
    {text}
  </Paragraph>
);

export const useHeaderCols = ({ runs }: { runs: Run[] }): HeaderCol[] => {
  const history = useHistory();
  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);

  return [
    {
      render: () => <HeaderText text="RUN ID" margin="33px" />,
      width: '20%',
      renderRow: (run: Run) => (
        <FlexBox alignItems="center">
          <div data-tip data-for={run?.id}>
            <FlexBox.Row style={{ alignItems: 'center' }}>
              <icons.chevronDown color={iconColors.grey} size={iconSizes.xs} />

              <Paragraph size="small" style={{ marginLeft: '20px' }}>
                {truncate(run?.id, ID_MAX_LENGTH)}
              </Paragraph>
            </FlexBox.Row>
          </div>
          <ReactTooltip id={run?.id} place="top" effect="solid">
            <Paragraph color="white">{run?.id}</Paragraph>
          </ReactTooltip>
        </FlexBox>
      ),
    },
    {
      render: () => <HeaderText text="RUN NAME" />,
      width: '30%',
      renderRow: (run: Run) => (
        <div style={{ alignItems: 'center' }}>
          <div data-tip data-for={run?.name}>
            <Paragraph size="small">{run?.name}</Paragraph>
          </div>
          <ReactTooltip id={run?.name} place="top" effect="solid">
            <Paragraph color="white">{run?.name}</Paragraph>
          </ReactTooltip>
        </div>
      ),
    },
    {
      render: () => <HeaderText text="PIPELINE" />,
      width: '7.5%',
      renderRow: (run: Run) => (
        <FlexBox alignItems="center">
          <div
            data-tip
            data-for={run?.body.pipeline?.name}
            // data-for={run?.body.pipeline?.name && run?.body?.pipeline?.version}
          >
            <Paragraph
              size="small"
              style={{
                color: '#22BBDD',
                textDecoration: 'underline',
                zIndex: 100,
              }}
              onClick={(event) => {
                event.stopPropagation();
                history.push(
                  routePaths.pipeline.configuration(
                    run?.body?.pipeline?.id as string,
                    selectedWorkspace,
                  ),
                );
              }}
            >
              {run?.body?.pipeline?.name && `${run?.body?.pipeline?.name}`}
              {/* `${run?.body?.pipeline?.name} ( v${run?.body?.pipeline?.version} )`} */}
            </Paragraph>
          </div>
          <ReactTooltip
            id={run?.body?.pipeline?.name}
            // id={run?.body?.pipeline?.name && run?.body?.pipeline?.version}
            place="top"
            effect="solid"
          >
            <Paragraph color="white">
              {run?.body?.pipeline?.name}
              {/* {run?.body?.pipeline?.name} ( v{run?.body?.pipeline?.version} ) */}
            </Paragraph>
          </ReactTooltip>
        </FlexBox>
      ),
    },
    {
      render: () => <HeaderText text="STATUS" />,
      width: '7.5%',
      renderRow: (run: Run) => <RunStatus run={run} />,
    },

    {
      render: () => <HeaderText text="STACK NAME" />,
      width: '7.5%',
      renderRow: (run: Run) => (
        <FlexBox alignItems="center">
          <div data-tip data-for={run?.body?.stack?.name}>
            <Paragraph
              size="small"
              style={{
                color: '#22BBDD',
                textDecoration: 'underline',
                cursor: 'pointer',
              }}
              onClick={(event) => {
                event.stopPropagation();
                history.push(
                  routePaths.stack.configuration(
                    run?.body?.stack?.id as string,
                    selectedWorkspace,
                  ),
                );
              }}
            >
              {run?.body?.stack?.name}
            </Paragraph>
          </div>
          <ReactTooltip id={run?.body?.stack?.name} place="top" effect="solid">
            <Paragraph color="white">{run?.body?.stack?.name}</Paragraph>
          </ReactTooltip>
        </FlexBox>
      ),
    },

    {
      render: () => <HeaderText text="AUTHOR" />,
      width: '7.5%',
      renderRow: (run: Run) => {
        return (
          <FlexBox alignItems="center">
            <div data-tip data-for={run?.body.user?.name}>
              <FlexBox alignItems="center">
                <Paragraph size="small">{run?.body.user?.name}</Paragraph>
              </FlexBox>
            </div>
            <ReactTooltip id={run?.body.user?.name} place="top" effect="solid">
              <Paragraph color="white">{run?.body.user?.name}</Paragraph>
            </ReactTooltip>
          </FlexBox>
        );
      },
    },
    {
      render: () => <HeaderText text="CREATED AT" />,
      width: '20%',
      renderRow: (run: Run) => (
        <FlexBox alignItems="center">
          <div
            data-tip
            data-for={formatDateToDisplayOnTable(run?.body.created)}
          >
            <FlexBox alignItems="center">
              <Paragraph color="grey" size="tiny">
                {formatDateToDisplayOnTable(run?.body.created)}
              </Paragraph>
            </FlexBox>
          </div>
          <ReactTooltip
            id={formatDateToDisplayOnTable(run?.body.created)}
            place="top"
            effect="solid"
          >
            <Paragraph color="white">
              {formatDateToDisplayOnTable(run?.body.created)}
            </Paragraph>
          </ReactTooltip>
        </FlexBox>
      ),
    },
  ];
};
