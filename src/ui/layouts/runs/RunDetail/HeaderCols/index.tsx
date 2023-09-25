import React from 'react';
import { iconColors, iconSizes, ID_MAX_LENGTH } from '../../../../../constants';
import { truncate, formatDateToDisplayOnTable } from '../../../../../utils';
import { useHistory, useSelector } from '../../../../hooks';
import { routePaths } from '../../../../../routes/routePaths';
import { FlexBox, Paragraph, icons, Tooltip } from '../../../../components';
import { HeaderCol } from '../../../common/Table';
import { RunStatus } from '../RunStatus';
import { workspaceSelectors } from '../../../../../redux/selectors';
import { Run } from '../../../../../api/types';

export const useHeaderCols = ({ runs }: { runs: Run[] }): HeaderCol[] => {
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
      renderRow: (run: Run) => (
        <FlexBox alignItems="center">
          <div data-tip data-for={run.id}>
            <FlexBox.Row style={{ alignItems: 'center' }}>
              <icons.chevronDown color={iconColors.grey} size={iconSizes.xs} />

              <Paragraph size="small" style={{ marginLeft: '20px' }}>
                {truncate(run.id, ID_MAX_LENGTH)}
              </Paragraph>
            </FlexBox.Row>
          </div>
          <Tooltip id={run.id} text={run.id} />
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
      renderRow: (run: Run) => (
        <div style={{ alignItems: 'center' }}>
          <div data-tip data-for={run.name}>
            <Paragraph size="small">{run.name}</Paragraph>
          </div>
          <Tooltip id={run.name} text={run.name} />
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
      renderRow: (run: Run) => (
        <FlexBox alignItems="center">
          <div
            data-tip
            data-for={`${run?.pipeline?.name}  ${run?.pipeline?.version}`}
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
                    run?.pipeline?.id as string,
                    selectedWorkspace,
                  ),
                );
              }}
            >
              {`${run?.pipeline?.name} ( v${run?.pipeline?.version} )`}
            </Paragraph>
          </div>
          <Tooltip
            id={`${run?.pipeline?.name} ${run?.pipeline?.version}`}
            text={`${run?.pipeline?.name} (${run?.pipeline?.version})`}
          />
        </FlexBox>
      ),
    },
    {
      render: () => (
        <Paragraph
          size="small"
          color="black"
          style={{ textAlign: 'center', fontSize: '14px', marginLeft: '-24px' }}
        >
          STATUS
        </Paragraph>
      ),
      width: '7.5%',
      renderRow: (run: Run) => <RunStatus run={run as any} />,
    },

    {
      render: () => (
        <Paragraph size="small" color="black" style={{ fontSize: '14px' }}>
          STACK NAME
        </Paragraph>
      ),
      width: '7.5%',
      renderRow: (run: Run) => (
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
                    run?.stack?.id as string,
                    selectedWorkspace,
                  ),
                );
              }}
            >
              {run?.stack?.name}
            </Paragraph>
          </div>
          <Tooltip id={run?.stack?.name} text={run?.stack?.name} />
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
      renderRow: (run: Run) => {
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
            <Tooltip
              id={run?.user?.full_name ? run?.user?.full_name : run?.user?.name}
              text={
                run?.user?.full_name ? run?.user?.full_name : run?.user?.name
              }
            />
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
      renderRow: (run: Run) => (
        <FlexBox alignItems="center">
          <div data-tip data-for={formatDateToDisplayOnTable(run.created)}>
            <FlexBox alignItems="center">
              <Paragraph color="grey" size="tiny">
                {formatDateToDisplayOnTable(run.created)}
              </Paragraph>
            </FlexBox>
          </div>
          <Tooltip
            id={formatDateToDisplayOnTable(run.created)}
            text={formatDateToDisplayOnTable(run.created)}
          />
        </FlexBox>
      ),
    },
  ];
};
