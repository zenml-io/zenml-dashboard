import _ from 'lodash';
import React, { useState } from 'react';

import { iconColors, iconSizes, ID_MAX_LENGTH } from '../../../../../constants';
import { translate } from '../translate';
import {
  formatDateToDisplayOnTable,
  getInitialsFromEmail,
  truncate,
} from '../../../../../utils';
import {
  FlexBox,
  Paragraph,
  Box,
  icons,
  ColoredCircle,
  Tooltip,
} from '../../../../components';
import { HeaderCol } from '../../../common/Table';
import { RunStatus } from '../RunStatus';

import { SortingHeader } from '../SortingHeader';
import { Sorting, SortingDirection } from '../types';
import { useService } from './useService';
import { useHistory, useSelector } from '../../../../hooks';
import { routePaths } from '../../../../../routes/routePaths';
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

const innerBoxStyleEnable = {
  border: '2px solid #f0ebfc',
  borderRadius: '5px',
  display: 'flex',
  paddingLeft: '8px',
  paddingRight: '8px',
  backgroundColor: '#f0ebfc',
  justifyContent: 'center',
  alignItems: 'center',
};

const customToolTip = {
  border: '2px solid #f0ebfc',
  borderRadius: '5px',
  display: 'flex',
  padding: 16,
  // justifyContent: 'center',
  // alignItems: 'center',
  zIndex: 1000,
  backgroundColor: 'white',
  position: 'absolute',

  marginBottom: '200px',
};

const innerBoxStyleDisable = {
  // height: '30px',
  border: '2px solid #f0ebfc',
  borderRadius: '5px',
  display: 'flex',
  paddingLeft: '8px',
  paddingRight: '8px',
  justifyContent: 'center',
  alignItems: 'center',
};

export const useHeaderCols = ({
  isExpended,
  runs,
  setRuns,
  activeSorting,
  activeSortingDirection,
  setActiveSortingDirection,
  setActiveSorting,
  nestedRuns,
}: {
  isExpended?: boolean;
  runs: Run[];
  setRuns: (runs: Run[]) => void;
  activeSorting: Sorting | null;
  activeSortingDirection: SortingDirection | null;
  setActiveSortingDirection: (direction: SortingDirection | null) => void;
  setActiveSorting: (sorting: Sorting | null) => void;
  nestedRuns: boolean;
}): HeaderCol[] => {
  const { sortMethod } = useService({
    setActiveSortingDirection,
    setActiveSorting,
    setRuns,
    activeSorting,
    activeSortingDirection,
    runs,
  });

  const [showToolTip, setShowToolTip] = useState(null as any);
  const [selectedSubModelId, setSelectedSubModelId] = useState(null as any);
  const history = useHistory();

  const handleIdToHover = (id: string, subModelId: string) => {
    setShowToolTip(id);
    setSelectedSubModelId(subModelId);
  };
  const handleIdToLeave = () => {
    setShowToolTip(null);
    setSelectedSubModelId(null);
  };
  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);
  return nestedRuns
    ? [
        {
          render: () => (
            <SortingHeader
              onlyOneRow={runs.length === 1}
              sorting="id"
              sortMethod={sortMethod('id', {
                asc: (runs: Run[]) => _.orderBy(runs, ['id'], ['asc']),
                desc: (runs: Run[]) => _.orderBy(runs, ['id'], ['desc']),
              })}
              activeSorting={activeSorting}
              activeSortingDirection={activeSortingDirection}
            >
              <HeaderText text="RUN ID" margin="30px" />
            </SortingHeader>
          ),
          width: '15%',
          renderRow: (run: Run) => (
            <FlexBox alignItems="center">
              <div data-tip data-for={run.id}>
                <FlexBox.Row style={{ alignItems: 'center' }}>
                  {isExpended ? (
                    <icons.chevronDown
                      color={iconColors.grey}
                      size={iconSizes.xs}
                    />
                  ) : (
                    <icons.rightArrow
                      color={iconColors.grey}
                      size={iconSizes.xs}
                    />
                  )}
                  <Paragraph size="small">
                    {truncate(run.id, ID_MAX_LENGTH)}
                  </Paragraph>
                </FlexBox.Row>
              </div>
              <Tooltip id={run.id} text={truncate(run.id, ID_MAX_LENGTH)} />
            </FlexBox>
          ),
        },
        {
          render: () => (
            <SortingHeader
              onlyOneRow={runs.length === 1}
              sorting="name"
              sortMethod={sortMethod('name', {
                asc: (run: Run[]) => _.orderBy(run, ['name'], ['asc']),
                desc: (run: Run[]) => _.orderBy(run, ['name'], ['desc']),
              })}
              activeSorting={activeSorting}
              activeSortingDirection={activeSortingDirection}
            >
              <HeaderText text="RUN NAME" />
            </SortingHeader>
          ),
          width: '15%',
          renderRow: (run: any) => (
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
            <SortingHeader
              onlyOneRow={runs.length === 1}
              sorting="status"
              sortMethod={sortMethod('status', {
                asc: (runs: Run[]) => _.orderBy(runs, ['status'], ['asc']),
                desc: (runs: Run[]) => _.orderBy(runs, ['status'], ['desc']),
              })}
              activeSorting={activeSorting}
              activeSortingDirection={activeSortingDirection}
            >
              <div style={{ margin: '0 auto 0 auto', textAlign: 'center' }}>
                <HeaderText text="STATUS" margin="-24px" />
              </div>
            </SortingHeader>
          ),
          width: '15%',
          renderRow: (run: Run) => <RunStatus run={run} />,
        },
        {
          render: () => (
            <SortingHeader
              onlyOneRow={runs.length === 1}
              sorting="created"
              sortMethod={sortMethod('created', {
                asc: (runs: Run[]) =>
                  _.orderBy(
                    runs,
                    (run: Run) =>
                      new Date(run?.body?.created as string).getTime(),
                    ['asc'],
                  ),
                desc: (runs: Run[]) =>
                  _.orderBy(
                    runs,
                    (run: Run) =>
                      new Date(run?.body?.created as string).getTime(),
                    ['desc'],
                  ),
              })}
              activeSorting={activeSorting}
              activeSortingDirection={activeSortingDirection}
            >
              <HeaderText text="CREATED" />
            </SortingHeader>
          ),
          width: '15%',
          renderRow: (run: any) => (
            <FlexBox style={{ alignItems: 'center' }}>
              <div data-tip data-for={formatDateToDisplayOnTable(run?.created)}>
                <FlexBox alignItems="center">
                  <Box paddingRight="sm">
                    <icons.calendar
                      color={iconColors.grey}
                      size={iconSizes.sm}
                    />
                  </Box>
                  <Paragraph color="grey" size="tiny">
                    {formatDateToDisplayOnTable(run?.created)}
                  </Paragraph>
                </FlexBox>
              </div>
              <Tooltip
                id={formatDateToDisplayOnTable(run?.created)}
                text={formatDateToDisplayOnTable(run?.created)}
              />
            </FlexBox>
          ),
        },
      ]
    : [
        {
          render: () => (
            <SortingHeader
              onlyOneRow={runs.length === 1}
              sorting="id"
              sortMethod={sortMethod('id', {
                asc: (runs: Run[]) => _.orderBy(runs, ['id'], ['asc']),
                desc: (runs: Run[]) => _.orderBy(runs, ['id'], ['desc']),
              })}
              activeSorting={activeSorting}
              activeSortingDirection={activeSortingDirection}
            >
              <HeaderText text="RUN ID" margin="30px" />
            </SortingHeader>
          ),
          testId: 'Id',
          width: '15%',
          renderRow: (run: Run) => (
            <FlexBox alignItems="center">
              <div data-tip data-for={run?.id}>
                <FlexBox.Row style={{ alignItems: 'center' }}>
                  {isExpended ? (
                    <icons.chevronDown
                      color={iconColors.grey}
                      size={iconSizes.xs}
                    />
                  ) : (
                    <icons.rightArrow
                      color={iconColors.grey}
                      size={iconSizes.xs}
                    />
                  )}
                  <Paragraph size="small" style={{ marginLeft: '20px' }}>
                    {truncate(run?.id, ID_MAX_LENGTH)}
                  </Paragraph>
                </FlexBox.Row>
              </div>
              <Tooltip id={run?.id} text={truncate(run?.id, ID_MAX_LENGTH)} />
            </FlexBox>
          ),
        },
        {
          render: () => (
            <SortingHeader
              onlyOneRow={runs.length === 1}
              sorting="name"
              sortMethod={sortMethod('name', {
                asc: (run: Run[]) => _.orderBy(run, ['name'], ['asc']),
                desc: (run: Run[]) => _.orderBy(run, ['name'], ['desc']),
              })}
              activeSorting={activeSorting}
              activeSortingDirection={activeSortingDirection}
            >
              <HeaderText text="RUN NAME" />
            </SortingHeader>
          ),
          testId: 'Name',
          width: '25%',
          renderRow: (run: Run) => (
            <div style={{ alignItems: 'center' }}>
              <div data-tip data-for={run?.name}>
                <Paragraph size="small">{run?.name}</Paragraph>
              </div>
              <Tooltip id={run?.name} text={run?.name} />
            </div>
          ),
        },
        {
          render: () => (
            <SortingHeader
              onlyOneRow={runs.length === 1}
              sorting="pipeline_id"
              sortMethod={sortMethod('pipeline_id', {
                asc: (run: Run[]) => _.orderBy(run, ['pipeline_id'], ['asc']),
                desc: (run: Run[]) => _.orderBy(run, ['pipeline_id'], ['desc']),
              })}
              activeSorting={activeSorting}
              activeSortingDirection={activeSortingDirection}
            >
              <HeaderText text="PIPELINE" />
            </SortingHeader>
          ),
          testId: 'Pipeline',
          width: '16%',
          renderRow: (run: Run) => (
            <FlexBox
              alignItems="center"
              onMouseEnter={() =>
                handleIdToHover(run?.id as any, run?.body?.pipeline?.id as any)
              }
              onMouseLeave={() => handleIdToLeave()}
              // style={{ position: 'relative' }}
            >
              {/* <div
                data-tip
                data-for={run?.body?.pipeline?.name}
                // data-for={run?.body?.pipeline?.name && run?.pipeline?.version}
              > */}
              {!run?.body?.pipeline?.permission_denied ? (
                <div
                  data-tip
                  data-for={run?.body?.pipeline?.name}
                  // data-for={run?.body?.pipeline?.name && run?.pipeline?.version}
                >
                  <Box style={innerBoxStyleEnable}>
                    <Paragraph
                      size="small"
                      style={{
                        color: '#3e238e',
                        // textDecoration: 'underline',
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
                      {run?.body?.pipeline?.name &&
                        `${run?.body?.pipeline?.name}`}
                      {/* `${run?.body?.pipeline?.name} ( v${run?.pipeline?.version} )`} */}
                    </Paragraph>
                  </Box>
                  <Tooltip
                    id={run?.body?.pipeline?.name}
                    text={`${run?.body?.pipeline?.name}`}
                    // id={run?.pipeline?.name && run?.pipeline?.version}
                    // text={`${run?.pipeline?.name} (v${run?.pipeline?.version})`}
                  />
                </div>
              ) : (
                <>
                  {showToolTip === run?.id &&
                    selectedSubModelId === run?.body?.pipeline?.id && (
                      <Box
                        style={customToolTip as any}
                        // style={innerBoxStyleDisable}
                      >
                        <div
                          style={{
                            width: '380px',
                          }}
                        >
                          <p style={{ fontSize: 18, fontWeight: 'bold' }}>
                            You Don't have access to this Pipeline.
                          </p>
                          <p style={{ fontSize: 16, color: '#666c78' }}>
                            Please contact your admin for further information
                            <br />
                            or to request access.
                            <br />
                            {`( ${run?.body?.pipeline?.name} )`}
                          </p>
                        </div>
                      </Box>

                      //   <Paragraph>You Don't have acces to this Stack.</Paragraph>
                      //   <Paragraph>
                      //     Please, contact with you Admin for further information
                      //     or to request access.
                      //   </Paragraph>
                      // </Box>
                    )}

                  <Box style={innerBoxStyleDisable}>
                    <icons.lock2
                      style={{ paddingRight: '5px' }}
                      color={iconColors.grey}
                      size={iconSizes.sm}
                    />
                    <Paragraph
                      size="small"
                      style={{
                        color: '#666c78',
                        // textDecoration: 'underline',
                        // zIndex: 100,
                      }}
                    >
                      {run?.body?.pipeline?.name &&
                        `${run?.body?.pipeline?.name}`}
                      {/* `${run?.body?.pipeline?.name} ( v${run?.pipeline?.version} )`} */}
                    </Paragraph>
                  </Box>
                </>
              )}

              {/* </div>
              <Tooltip
                id={run?.body?.pipeline?.name}
                text={`${run?.body?.pipeline?.name}`}
                // id={run?.pipeline?.name && run?.pipeline?.version}
                // text={`${run?.pipeline?.name} (v${run?.pipeline?.version})`}
              /> */}
            </FlexBox>
          ),
        },

        {
          render: () => (
            <SortingHeader
              onlyOneRow={runs.length === 1}
              sorting="status"
              sortMethod={sortMethod('status', {
                asc: (runs: Run[]) => _.orderBy(runs, ['status'], ['asc']),
                desc: (runs: Run[]) => _.orderBy(runs, ['status'], ['desc']),
              })}
              activeSorting={activeSorting}
              activeSortingDirection={activeSortingDirection}
            >
              <div style={{ margin: '0 auto 0 auto', textAlign: 'center' }}>
                <HeaderText text="STATUS" margin="-24px" />
              </div>
            </SortingHeader>
          ),
          testId: 'Status',
          width: '6.5%',
          renderRow: (run: Run) => <RunStatus run={run} />,
        },
        {
          render: () => (
            <SortingHeader
              onlyOneRow={runs.length === 1}
              sorting="stack_id"
              sortMethod={sortMethod('stack_id', {
                asc: (run: Run[]) => _.orderBy(run, ['stack_id'], ['asc']),
                desc: (run: Run[]) => _.orderBy(run, ['stack_id'], ['desc']),
              })}
              activeSorting={activeSorting}
              activeSortingDirection={activeSortingDirection}
            >
              <HeaderText text="STACK NAME" />
            </SortingHeader>
          ),
          width: '16%',
          testId: 'stack_name',
          renderRow: (run: Run) => (
            <FlexBox
              alignItems="center"
              onMouseEnter={() =>
                handleIdToHover(run?.id as any, run?.body?.stack?.id as any)
              }
              onMouseLeave={() => handleIdToLeave()}
              // style={{ position: 'relative' }}
            >
              {/* <div
              data-tip
              data-for={run?.body?.pipeline?.name}
              // data-for={run?.body?.pipeline?.name && run?.pipeline?.version}
            > */}
              {!run?.body?.stack?.permission_denied ? (
                <div
                  data-tip
                  data-for={run?.body?.stack?.name}
                  // data-for={run?.body?.pipeline?.name && run?.pipeline?.version}
                >
                  <Box style={innerBoxStyleEnable}>
                    <Paragraph
                      size="small"
                      style={{
                        color: '#3e238e',
                        // textDecoration: 'underline',
                        zIndex: 100,
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
                      {run?.body?.pipeline?.name && `${run?.body?.stack?.name}`}
                      {/* `${run?.body?.pipeline?.name} ( v${run?.pipeline?.version} )`} */}
                    </Paragraph>
                  </Box>
                  <Tooltip
                    id={run?.body?.stack?.name}
                    text={`${run?.body?.stack?.name}`}
                    // id={run?.pipeline?.name && run?.pipeline?.version}
                    // text={`${run?.pipeline?.name} (v${run?.pipeline?.version})`}
                  />
                </div>
              ) : (
                <>
                  {showToolTip === run?.id &&
                    selectedSubModelId === run?.body?.stack?.id && (
                      <Box
                        style={customToolTip as any}
                        // style={innerBoxStyleDisable}
                      >
                        <div
                          style={{
                            width: '380px',
                          }}
                        >
                          <p style={{ fontSize: 18, fontWeight: 'bold' }}>
                            You Don't have access to this Stack.
                          </p>
                          <p style={{ fontSize: 16, color: '#666c78' }}>
                            Please contact your admin for further information
                            <br />
                            or to request access.
                            <br />
                            {`( ${run?.body?.stack?.name} )`}
                          </p>
                        </div>
                      </Box>

                      //   <Paragraph>You Don't have acces to this Stack.</Paragraph>
                      //   <Paragraph>
                      //     Please, contact with you Admin for further information
                      //     or to request access.
                      //   </Paragraph>
                      // </Box>
                    )}

                  <Box style={innerBoxStyleDisable}>
                    <icons.lock2
                      style={{ paddingRight: '5px' }}
                      color={iconColors.grey}
                      size={iconSizes.sm}
                    />
                    <Paragraph
                      size="small"
                      style={{
                        color: '#666c78',
                        // textDecoration: 'underline',
                        // zIndex: 100,
                      }}
                    >
                      {run?.body?.stack?.name && `${run?.body?.stack?.name}`}
                      {/* `${run?.body?.pipeline?.name} ( v${run?.pipeline?.version} )`} */}
                    </Paragraph>
                  </Box>
                </>
              )}

              {/* </div>
            <Tooltip
              id={run?.body?.pipeline?.name}
              text={`${run?.body?.pipeline?.name}`}
              // id={run?.pipeline?.name && run?.pipeline?.version}
              // text={`${run?.pipeline?.name} (v${run?.pipeline?.version})`}
            /> */}
            </FlexBox>
            // <FlexBox alignItems="center">
            //   <div data-tip data-for={run?.body?.stack?.name}>
            //     <Paragraph
            //       size="small"
            //       style={{
            //         color: '#22BBDD',
            //         textDecoration: 'underline',
            //         cursor: 'pointer',
            //       }}
            //       onClick={(event) => {
            //         event.stopPropagation();
            //         history.push(
            //           routePaths.stack.configuration(
            //             run?.body?.stack?.id as string,
            //             selectedWorkspace,
            //           ),
            //         );
            //       }}
            //     >
            //       {run?.body?.stack?.name}
            //     </Paragraph>
            //   </div>
            //   <Tooltip
            //     id={run?.body?.stack?.name}
            //     text={run?.body?.stack?.name}
            //   />
            // </FlexBox>
          ),
        },
        {
          render: () => (
            <SortingHeader
              onlyOneRow={runs.length === 1}
              sorting="user_id"
              sortMethod={sortMethod('user_id', {
                asc: (run: Run[]) => _.orderBy(run, ['user_id'], ['asc']),
                desc: (run: Run[]) => _.orderBy(run, ['user_id'], ['desc']),
              })}
              activeSorting={activeSorting}
              activeSortingDirection={activeSortingDirection}
            >
              <HeaderText text={translate('author.text')} />
            </SortingHeader>
          ),
          testId: 'Author',
          width: '7.5%',
          renderRow: (run: Run) => {
            const initials = getInitialsFromEmail(
              run?.body?.user?.name as string,
            );
            return (
              <FlexBox alignItems="center">
                <div data-tip data-for={run?.body?.user?.name}>
                  <FlexBox alignItems="center">
                    <Box paddingRight="sm">
                      <ColoredCircle color="secondary" size="sm">
                        {initials}
                      </ColoredCircle>
                    </Box>
                    <Paragraph size="small">{run?.body?.user?.name}</Paragraph>
                  </FlexBox>
                </div>
                <Tooltip
                  id={run?.body?.user?.name}
                  text={run?.body?.user?.name}
                />
              </FlexBox>
            );
          },
        },
        {
          render: () => (
            <SortingHeader
              onlyOneRow={runs.length === 1}
              sorting="created"
              sortMethod={sortMethod('created', {
                asc: (runs: Run[]) =>
                  _.orderBy(
                    runs,
                    (run: Run) =>
                      new Date(run.body?.created as string).getTime(),
                    ['asc'],
                  ),
                desc: (runs: Run[]) =>
                  _.orderBy(
                    runs,
                    (run: Run) =>
                      new Date(run.body?.created as string).getTime(),
                    ['desc'],
                  ),
              })}
              activeSorting={activeSorting}
              activeSortingDirection={activeSortingDirection}
            >
              <HeaderText text={translate('createdAt.text')} />
            </SortingHeader>
          ),
          width: '14%',
          testId: 'created_at',
          renderRow: (run: Run) => (
            <FlexBox alignItems="center">
              <div
                data-tip
                data-for={formatDateToDisplayOnTable(run.body?.created)}
              >
                <FlexBox alignItems="center">
                  <Paragraph color="grey" size="tiny">
                    {formatDateToDisplayOnTable(run.body?.created)}
                  </Paragraph>
                </FlexBox>
              </div>
              <Tooltip
                id={formatDateToDisplayOnTable(run.body?.created)}
                text={formatDateToDisplayOnTable(run.body?.created)}
              />
            </FlexBox>
          ),
        },
      ];
};
