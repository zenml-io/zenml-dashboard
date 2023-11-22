import React, { useState } from 'react';
import { iconColors, iconSizes, ID_MAX_LENGTH } from '../../../../../constants';
import { truncate, formatDateToDisplayOnTable } from '../../../../../utils';
import { useHistory, useSelector } from '../../../../hooks';
import { routePaths } from '../../../../../routes/routePaths';
import {
  FlexBox,
  Paragraph,
  icons,
  Tooltip,
  Box,
} from '../../../../components';
import { HeaderCol } from '../../../common/Table';
import { RunStatus } from '../RunStatus';
import { workspaceSelectors } from '../../../../../redux/selectors';
import { Run } from '../../../../../api/types';

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
  // height: '40px',
  border: '2px solid #f0ebfc',
  borderRadius: '5px',
  display: 'flex',
  paddingLeft: '8px',
  paddingRight: '8px',
  justifyContent: 'center',
  alignItems: 'center',
};
export const useHeaderCols = ({ runs }: { runs: Run[] }): HeaderCol[] => {
  const history = useHistory();
  const [showToolTip, setShowToolTip] = useState(null as any);
  const [selectedSubModelId, setSelectedSubModelId] = useState(null as any);
  const handleIdToHover = (id: string, subModelId: string) => {
    setShowToolTip(id);
    setSelectedSubModelId(subModelId);
  };
  const handleIdToLeave = () => {
    setShowToolTip(null);
    setSelectedSubModelId(null);
  };
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
      width: '15%',
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
      width: '25%',
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
                  {run?.body?.pipeline?.name && `${run?.body?.pipeline?.name}`}
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
                      <p
                        style={{
                          fontSize: 18,
                          fontWeight: 'bold',
                          fontFamily: 'Rubik',
                        }}
                      >
                        You Don't have access to this Pipeline.
                      </p>
                      <p
                        style={{
                          fontSize: 16,
                          color: '#666c78',
                          fontFamily: 'Rubik',
                        }}
                      >
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
                  {run?.body?.pipeline?.name && `${run?.body?.pipeline?.name}`}
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
        //   <div
        //     data-tip
        //     data-for={`${run?.body?.pipeline?.name}`}
        //     // data-for={`${run?.body?.pipeline?.name}  ${run?.body?.pipeline?.version}`}
        //   >
        //     <Paragraph
        //       size="small"
        //       style={{
        //         color: '#22BBDD',
        //         textDecoration: 'underline',
        //         zIndex: 100,
        //       }}
        //       onClick={(event) => {
        //         event.stopPropagation();
        //         history.push(
        //           routePaths.pipeline.configuration(
        //             run?.body?.pipeline?.id as string,
        //             selectedWorkspace,
        //           ),
        //         );
        //       }}
        //     >
        //       {`${run?.body?.pipeline?.name}`}
        //       {/* {`${run?.body?.pipeline?.name} ( v${run?.body?.pipeline?.version} )`} */}
        //     </Paragraph>
        //   </div>
        //   <Tooltip
        //     id={`${run?.body?.pipeline?.name}`}
        //     text={`${run?.body?.pipeline?.name}`}
        //     // id={`${run?.body?.pipeline?.name} ${run?.body?.pipeline?.version}`}
        //     // text={`${run?.body?.pipeline?.name} (${run?.body?.pipeline?.version})`}
        //   />
        // </FlexBox>
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
      width: '6.5%',
      renderRow: (run: Run) => <RunStatus run={run as any} />,
    },

    {
      render: () => (
        <Paragraph size="small" color="black" style={{ fontSize: '14px' }}>
          STACK NAME
        </Paragraph>
      ),
      width: '16%',
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
                      routePaths.pipeline.configuration(
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
                        You Don't have acces to this Stack.
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
            <div data-tip data-for={run?.body?.user?.name}>
              <FlexBox alignItems="center">
                <Paragraph size="small">{run?.body?.user?.name}</Paragraph>
              </FlexBox>
            </div>
            <Tooltip id={run?.body?.user?.name} text={run?.body?.user?.name} />
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
      width: '14%',
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
