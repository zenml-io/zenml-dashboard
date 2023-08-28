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

export const useHeaderCols = ({ runs }: { runs: TRun[] }): HeaderCol[] => {
  const history = useHistory();
  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);

  return [
    {
      render: () => (
        <Paragraph
          size="small"
          color="black"
          style={{ fontSize: '14px', marginLeft: '33px' }}
        >
          RUN ID
        </Paragraph>
      ),
      width: '20%',
      renderRow: (run: TRun) => (
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
      render: () => (
        <Paragraph size="small" color="black" style={{ fontSize: '14px' }}>
          RUN NAME
        </Paragraph>
      ),
      width: '30%',
      renderRow: (run: TRun) => (
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
      render: () => (
        <Paragraph size="small" color="black" style={{ fontSize: '14px' }}>
          PIPELINE
        </Paragraph>
      ),
      width: '7.5%',
      renderRow: (run: TRun) => (
        <FlexBox alignItems="center">
          <div
            data-tip
            data-for={run?.pipeline?.name && run?.pipeline?.version}
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
                    run?.pipeline?.id,
                    selectedWorkspace,
                  ),
                );
              }}
            >
              {run?.pipeline?.name &&
                `${run?.pipeline?.name} ( v${run?.pipeline?.version} )`}
            </Paragraph>
          </div>
          <ReactTooltip
            id={run?.pipeline?.name && run?.pipeline?.version}
            place="top"
            effect="solid"
          >
            <Paragraph color="white">
              {run?.pipeline?.name} ( v{run?.pipeline?.version} )
            </Paragraph>
          </ReactTooltip>
        </FlexBox>
      ),
    },
    {
      render: () => (
        <Paragraph size="small" color="black" style={{ fontSize: '14px' }}>
          STATUS
        </Paragraph>
      ),
      width: '7.5%',
      renderRow: (run: TRun) => <RunStatus run={run} />,
    },

    {
      render: () => (
        <Paragraph size="small" color="black" style={{ fontSize: '14px' }}>
          STACK NAME
        </Paragraph>
      ),
      width: '7.5%',
      renderRow: (run: TRun) => (
        <FlexBox alignItems="center">
          <div data-tip data-for={run?.stack?.name}>
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
                    run?.stack?.id,
                    selectedWorkspace,
                  ),
                );
              }}
            >
              {run?.stack?.name}
            </Paragraph>
          </div>
          <ReactTooltip id={run?.stack?.name} place="top" effect="solid">
            <Paragraph color="white">{run?.stack?.name}</Paragraph>
          </ReactTooltip>
        </FlexBox>
      ),
    },

    {
      render: () => (
        <Paragraph size="small" color="black" style={{ fontSize: '14px' }}>
          AUTHOR
        </Paragraph>
      ),
      width: '7.5%',
      renderRow: (run: TRun) => {
        return (
          <FlexBox alignItems="center">
            <div
              data-tip
              data-for={
                run?.user?.full_name ? run?.user?.full_name : run?.user?.name
              }
            >
              <FlexBox alignItems="center">
                <Paragraph size="small">
                  {run?.user?.full_name
                    ? run?.user?.full_name
                    : run?.user?.name}
                </Paragraph>
              </FlexBox>
            </div>
            <ReactTooltip
              id={run?.user?.full_name ? run?.user?.full_name : run?.user?.name}
              place="top"
              effect="solid"
            >
              <Paragraph color="white">
                {run?.user?.full_name ? run?.user?.full_name : run?.user?.name}
              </Paragraph>
            </ReactTooltip>
          </FlexBox>
        );
      },
    },
    {
      render: () => (
        <Paragraph size="small" color="black" style={{ fontSize: '14px' }}>
          CREATED AT
        </Paragraph>
      ),
      width: '20%',
      renderRow: (run: TRun) => (
        <FlexBox alignItems="center">
          <div data-tip data-for={formatDateToDisplayOnTable(run?.created)}>
            <FlexBox alignItems="center">
              <Paragraph color="grey" size="tiny">
                {formatDateToDisplayOnTable(run?.created)}
              </Paragraph>
            </FlexBox>
          </div>
          <ReactTooltip
            id={formatDateToDisplayOnTable(run?.created)}
            place="top"
            effect="solid"
          >
            <Paragraph color="white">
              {formatDateToDisplayOnTable(run?.created)}
            </Paragraph>
          </ReactTooltip>
        </FlexBox>
      ),
    },
  ];
};
