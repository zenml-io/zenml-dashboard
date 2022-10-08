import _ from 'lodash';
import React from 'react';
// import cn from 'classnames';

// import styles from '../index.module.scss';
import { iconColors, iconSizes, ID_MAX_LENGTH } from '../../../../../constants';
import { translate } from '../translate';
import {
  formatDateToDisplay,
  getInitialsFromEmail,
  truncate,
} from '../../../../../utils';
import {
  FlexBox,
  Paragraph,
  // LinkBox,
  Box,
  icons,
  ColoredCircle,
} from '../../../../components';
import { HeaderCol } from '../../../common/Table';
import { RunStatus } from '../RunStatus';
// import { RunTime } from '../../RunTime';
// import { RunUser } from '../RunUser';
import { SortingHeader } from '../SortingHeader';
import { Sorting, SortingDirection } from '../types';
import { useService } from './useService';
import { useHistory } from '../../../../hooks';
import { routePaths } from '../../../../../routes/routePaths';
import ReactTooltip from 'react-tooltip';
// import { PipelineName } from '../PipelineName';

export const useHeaderCols = ({
  runs,
  setRuns,
  activeSorting,
  activeSortingDirection,
  setActiveSortingDirection,
  setActiveSorting,
  nestedRuns,
}: {
  runs: TRun[];
  setRuns: (runs: TRun[]) => void;
  activeSorting: Sorting | null;
  activeSortingDirection: SortingDirection | null;
  setActiveSortingDirection: (direction: SortingDirection | null) => void;
  setActiveSorting: (sorting: Sorting | null) => void;
  nestedRuns: boolean;
}): HeaderCol[] => {
  const {
    // toggleSelectRun,
    // isRunSelected,
    // selectRuns,
    // unselectRuns,
    // allRunsSelected,
    sortMethod,
  } = useService({
    setActiveSortingDirection,
    setActiveSorting,
    setRuns,
    activeSorting,
    activeSortingDirection,
    runs,
  });
  const history = useHistory();
  // debugger;
  return nestedRuns
    ? [
        {
          render: () => (
            <FlexBox justifyContent="center">
              <Paragraph size="small" color="grey">
                {/* <LinkBox
              onClick={() => {
                if (allRunsSelected(runs)) {
                  unselectRuns(runs);
                } else {
                  selectRuns(runs);
                }
              }}
              className={cn(
                styles.checkbox,
                allRunsSelected(runs) && styles.checkedCheckbox,
              )}
            /> */}
              </Paragraph>
            </FlexBox>
          ),
          width: '3%',
          renderRow: (run: TRun) => (
            <></>
            // <FlexBox justifyContent="center">
            //   <LinkBox
            //     onClick={(e: Event) => {
            //       e.stopPropagation();
            //       toggleSelectRun(run);
            //     }}
            //     className={cn(
            //       styles.checkbox,
            //       isRunSelected(run) && styles.checkedCheckbox,
            //     )}
            //   />
            // </FlexBox>
          ),
        },
        {
          render: () => (
            <SortingHeader
              sorting="id"
              sortMethod={sortMethod('id', {
                asc: (runs: TRun[]) => _.orderBy(runs, ['id'], ['asc']),
                desc: (runs: TRun[]) => _.orderBy(runs, ['id'], ['desc']),
              })}
              activeSorting={activeSorting}
              activeSortingDirection={activeSortingDirection}
            >
              <Paragraph size="small" color="grey">
                RUN ID
              </Paragraph>
            </SortingHeader>
          ),
          width: '15%',
          renderRow: (run: TRun) => (
            <FlexBox alignItems="center">
              <div data-tip data-for={run.id}>
                <Paragraph size="small">
                  {truncate(run.id, ID_MAX_LENGTH)}
                </Paragraph>
              </div>
              <ReactTooltip
                id={run.id}
                place="top"
                effect="solid"
                // backgroundColor={getBGColorFromInvoiceStatus(invoice.status)}
              >
                <Paragraph color="white">
                  {run.id}
                  {/* {truncate(pipeline.id, ID_MAX_LENGTH)} */}
                </Paragraph>
              </ReactTooltip>
            </FlexBox>
            //   <Paragraph size="small">
            //     {truncate(run.id, ID_MAX_LENGTH)}
            //   </Paragraph>
          ),
        },
        {
          render: () => (
            <Paragraph size="small" color="grey">
              RUN NAME
            </Paragraph>
          ),
          width: '15%',
          renderRow: (run: any) => (
            <div style={{ alignItems: 'center' }}>
              <div data-tip data-for={run.name}>
                <Paragraph size="small">{run.name}</Paragraph>
                {/* <Paragraph size="small">{pipeline.name}</Paragraph> */}
              </div>
              <ReactTooltip
                id={run.name}
                place="top"
                effect="solid"
                // backgroundColor={getBGColorFromInvoiceStatus(invoice.status)}
              >
                <Paragraph color="white">
                  {run.name}
                  {/* {translate(`tooltips.${invoice.status}`)} */}
                </Paragraph>
              </ReactTooltip>
            </div>
            //
          ),

          // <PipelineName run={run.pipeline.name} />,
        },

        {
          render: () => (
            <SortingHeader
              sorting="status"
              sortMethod={sortMethod('status', {
                asc: (runs: TRun[]) => _.orderBy(runs, ['status'], ['asc']),
                desc: (runs: TRun[]) => _.orderBy(runs, ['status'], ['desc']),
              })}
              activeSorting={activeSorting}
              activeSortingDirection={activeSortingDirection}
            >
              <Paragraph size="small" color="grey">
                STATUS
              </Paragraph>
            </SortingHeader>
          ),
          width: '15%',

          renderRow: (run: TRun) => <RunStatus run={run} />,
        },

        {
          render: () => (
            <SortingHeader
              sorting="createdAt"
              sortMethod={sortMethod('createdAt', {
                asc: (runs: TRun[]) =>
                  _.orderBy(
                    runs,
                    (run: TRun) => new Date(run.created).getTime(),
                    ['asc'],
                  ),
                desc: (runs: TRun[]) =>
                  _.orderBy(
                    runs,
                    (run: TRun) => new Date(run.created).getTime(),
                    ['desc'],
                  ),
              })}
              activeSorting={activeSorting}
              activeSortingDirection={activeSortingDirection}
            >
              <Paragraph size="small" color="grey">
                CREATED AT
              </Paragraph>
            </SortingHeader>
          ),
          width: '15%',
          renderRow: (run: any) => (
            <FlexBox style={{ alignItems: 'center' }}>
              <div data-tip data-for={formatDateToDisplay(run.created)}>
                <FlexBox alignItems="center">
                  <Box paddingRight="sm">
                    <icons.calendar
                      color={iconColors.grey}
                      size={iconSizes.sm}
                    />
                  </Box>
                  <Paragraph color="grey" size="tiny">
                    {formatDateToDisplay(run.created)}
                  </Paragraph>
                </FlexBox>
              </div>
              <ReactTooltip
                id={formatDateToDisplay(run.created)}
                place="top"
                effect="solid"
                // backgroundColor={getBGColorFromInvoiceStatus(invoice.status)}
              >
                <Paragraph color="white">
                  {run.created}
                  {/* {translate(`tooltips.${invoice.status}`)} */}
                </Paragraph>
              </ReactTooltip>
            </FlexBox>
          ),
        },
      ]
    : [
        {
          render: () => (
            <FlexBox justifyContent="center">
              <Paragraph size="small" color="grey">
                {/* <LinkBox
              onClick={() => {
                if (allRunsSelected(runs)) {
                  unselectRuns(runs);
                } else {
                  selectRuns(runs);
                }
              }}
              className={cn(
                styles.checkbox,
                allRunsSelected(runs) && styles.checkedCheckbox,
              )}
            /> */}
              </Paragraph>
            </FlexBox>
          ),
          width: '3%',
          renderRow: (run: TRun) => (
            <></>
            // <FlexBox justifyContent="center">
            //   <LinkBox
            //     onClick={(e: Event) => {
            //       e.stopPropagation();
            //       toggleSelectRun(run);
            //     }}
            //     className={cn(
            //       styles.checkbox,
            //       isRunSelected(run) && styles.checkedCheckbox,
            //     )}
            //   />
            // </FlexBox>
          ),
        },
        {
          render: () => (
            <SortingHeader
              sorting="id"
              sortMethod={sortMethod('id', {
                asc: (runs: TRun[]) => _.orderBy(runs, ['id'], ['asc']),
                desc: (runs: TRun[]) => _.orderBy(runs, ['id'], ['desc']),
              })}
              activeSorting={activeSorting}
              activeSortingDirection={activeSortingDirection}
            >
              <Paragraph size="small" color="grey">
                RUN ID
              </Paragraph>
            </SortingHeader>
          ),
          width: '15%',
          renderRow: (run: TRun) => (
            <FlexBox alignItems="center">
              <div data-tip data-for={run.id}>
                <Paragraph size="small">
                  {truncate(run.id, ID_MAX_LENGTH)}
                </Paragraph>
              </div>
              <ReactTooltip
                id={run.id}
                place="top"
                effect="solid"
                // backgroundColor={getBGColorFromInvoiceStatus(invoice.status)}
              >
                <Paragraph color="white">
                  {run.id}
                  {/* {truncate(pipeline.id, ID_MAX_LENGTH)} */}
                </Paragraph>
              </ReactTooltip>
            </FlexBox>
          ),
        },
        {
          render: () => (
            <Paragraph size="small" color="grey">
              RUN NAME
            </Paragraph>
          ),
          width: '15%',
          renderRow: (run: TRun) => (
            <div style={{ alignItems: 'center' }}>
              <div data-tip data-for={run.name}>
                <Paragraph size="small">{run.name}</Paragraph>
                {/* <Paragraph size="small">{pipeline.name}</Paragraph> */}
              </div>
              <ReactTooltip
                id={run.name}
                place="top"
                effect="solid"
                // backgroundColor={getBGColorFromInvoiceStatus(invoice.status)}
              >
                <Paragraph color="white">
                  {run.name}
                  {/* {translate(`tooltips.${invoice.status}`)} */}
                </Paragraph>
              </ReactTooltip>
            </div>
          ),

          // <PipelineName run={run.pipeline.name} />,
        },
        {
          render: () => (
            <Paragraph size="small" color="grey">
              PIPELINE NAME
            </Paragraph>
          ),
          width: '15%',
          renderRow: (run: TRun) => (
            <FlexBox alignItems="center">
              <div data-tip data-for={run.pipeline?.name}>
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
                      routePaths.pipeline.configuration(run.pipeline?.id),
                    );
                  }}
                >
                  {run.pipeline?.name}
                </Paragraph>
                {/* <Paragraph size="small">{pipeline.name}</Paragraph> */}
              </div>
              <ReactTooltip
                id={run.pipeline?.name}
                place="top"
                effect="solid"
                // backgroundColor={getBGColorFromInvoiceStatus(invoice.status)}
              >
                <Paragraph color="white">
                  {run.pipeline?.name}
                  {/* {translate(`tooltips.${invoice.status}`)} */}
                </Paragraph>
              </ReactTooltip>
            </FlexBox>

            // <Paragraph size="small">{run.pipeline?.name}</Paragraph>
          ),

          // <PipelineName run={run.pipeline.name} />,
        },

        {
          render: () => (
            <SortingHeader
              sorting="status"
              sortMethod={sortMethod('status', {
                asc: (runs: TRun[]) => _.orderBy(runs, ['status'], ['asc']),
                desc: (runs: TRun[]) => _.orderBy(runs, ['status'], ['desc']),
              })}
              activeSorting={activeSorting}
              activeSortingDirection={activeSortingDirection}
            >
              <Paragraph size="small" color="grey">
                STATUS
              </Paragraph>
            </SortingHeader>
          ),
          width: '15%',

          renderRow: (run: TRun) => <RunStatus run={run} />,
        },
        {
          render: () => (
            <Paragraph size="small" color="grey">
              STACK NAME
            </Paragraph>
          ),
          width: '15%',
          renderRow: (run: TRun) => (
            <FlexBox alignItems="center">
              <div data-tip data-for={run.stack?.name}>
                <Paragraph
                  size="small"
                  style={{
                    color: '#22BBDD',
                    textDecoration: 'underline',
                    cursor: 'pointer',
                  }}
                  onClick={(event) => {
                    event.stopPropagation();
                    history.push(routePaths.stack.configuration(run.stack?.id));
                  }}
                >
                  {run.stack?.name}
                </Paragraph>
                {/* <Paragraph size="small">{pipeline.name}</Paragraph> */}
              </div>
              <ReactTooltip
                id={run.stack?.name}
                place="top"
                effect="solid"
                // backgroundColor={getBGColorFromInvoiceStatus(invoice.status)}
              >
                <Paragraph color="white">
                  {run.stack?.name}
                  {/* {translate(`tooltips.${invoice.status}`)} */}
                </Paragraph>
              </ReactTooltip>
            </FlexBox>

            // <Paragraph size="small">{run.stack?.name}</Paragraph>
          ),

          // <PipelineName run={run.pipeline.name} />,
        },

        {
          render: () => (
            <Paragraph size="small" color="grey">
              {translate('author.text')}
            </Paragraph>
          ),
          width: '15%',
          renderRow: (run: TRun) => {
            const initials = getInitialsFromEmail(
              run.user.full_name ? run.user.full_name : run.user.name,
            );
            return (
              <FlexBox alignItems="center">
                <div
                  data-tip
                  data-for={
                    run.user.full_name ? run.user.full_name : run.user.name
                  }
                >
                  <FlexBox alignItems="center">
                    <Box paddingRight="sm">
                      <ColoredCircle color="secondary" size="sm">
                        {initials}
                      </ColoredCircle>
                    </Box>
                    <Paragraph size="small">
                      {run.user.full_name ? run.user.full_name : run.user.name}
                    </Paragraph>
                  </FlexBox>
                </div>
                <ReactTooltip
                  id={run.user.full_name ? run.user.full_name : run.user.name}
                  place="top"
                  effect="solid"
                  // backgroundColor={getBGColorFromInvoiceStatus(invoice.status)}
                >
                  <Paragraph color="white">
                    {run.user.full_name ? run.user.full_name : run.user.name}
                    {/* {translate(`tooltips.${invoice.status}`)} */}
                  </Paragraph>
                </ReactTooltip>
              </FlexBox>
            );
          },
          // (
          //   <Paragraph size="small">
          //     {run.user.full_name}
          //     {'asdasd'}
          //   </Paragraph>
          // ),

          // <RunUser run={run} />,
        },
        {
          render: () => (
            <SortingHeader
              sorting="createdAt"
              sortMethod={sortMethod('createdAt', {
                asc: (runs: TRun[]) =>
                  _.orderBy(
                    runs,
                    (run: TRun) => new Date(run.created).getTime(),
                    ['asc'],
                  ),
                desc: (runs: TRun[]) =>
                  _.orderBy(
                    runs,
                    (run: TRun) => new Date(run.created).getTime(),
                    ['desc'],
                  ),
              })}
              activeSorting={activeSorting}
              activeSortingDirection={activeSortingDirection}
            >
              <Paragraph size="small" color="grey">
                {translate('createdAt.text')}
              </Paragraph>
            </SortingHeader>
          ),
          width: '15%',
          renderRow: (run: TRun) => (
            <FlexBox alignItems="center">
              <div data-tip data-for={formatDateToDisplay(run.created)}>
                <FlexBox alignItems="center">
                  <Box paddingRight="sm">
                    <icons.calendar
                      color={iconColors.grey}
                      size={iconSizes.sm}
                    />
                  </Box>
                  <Paragraph color="grey" size="tiny">
                    {formatDateToDisplay(run.created)}
                  </Paragraph>
                </FlexBox>
              </div>
              <ReactTooltip
                id={formatDateToDisplay(run.created)}
                place="top"
                effect="solid"
                // backgroundColor={getBGColorFromInvoiceStatus(invoice.status)}
              >
                <Paragraph color="white">
                  {run.created}
                  {/* {translate(`tooltips.${invoice.status}`)} */}
                </Paragraph>
              </ReactTooltip>
            </FlexBox>
          ),
        },
      ];
};
