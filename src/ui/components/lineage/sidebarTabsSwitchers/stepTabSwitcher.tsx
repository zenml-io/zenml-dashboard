import React, { useEffect, useRef, useState } from 'react'; //eslint-disable-line
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { okaidia } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Status_Completed } from '../icons';
import styles from '../index.module.scss';
import stepStyles from './artifact.module.scss';
import { FullWidthSpinner } from '../../spinners';
import { formatDateToDisplayOnTable } from '../../../../utils';
import DisplayLogs from './DisplayLogs';
import { Box, FlexBox, Paragraph, icons } from '../../index';
import { iconColors, iconSizes, toasterTypes } from '../../../../constants';
import { showToasterAction } from '../../../../redux/actions';
import { useDispatch } from '../../../hooks';
import JSONPretty from 'react-json-pretty';
import _ from 'lodash';

const stylesActive = {
  opacity: 1,
  transition: '',
  transform: '',
};
const stylesInActive = {
  opacity: 0.5,
  transition: '',
  transform: '',
};

const tabs = [
  {
    title: 'Details',
    case: '__DETAILS',
  },
  {
    title: 'Code',
    case: '__CODE',
  },
  {
    title: 'Logs',
    case: '__LOG',
  },
  {
    title: 'Configuration',
    case: '__CONFIGURATION',
  },
  {
    title: 'Metadata',
    case: '__METADATA',
  },
];

const StepnodeTabHeader: React.FC<any> = ({ node, fetching }) => {
  const [show, setShow] = useState('__DETAILS');
  const [dynamicWidth, setDynamicWidth] = useState<number | undefined>(79);
  const [dynamicLeft, setDynamicLeft] = useState<number | undefined>(21);
  const divRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    setDynamicLeft(divRefs.current[1]?.offsetLeft);
    setDynamicWidth(divRefs.current[1]?.offsetWidth);
  }, []); //eslint-disable-line

  useEffect(() => {
    setDynamicLeft(dynamicLeft);
    setDynamicWidth(dynamicWidth);
  }, [show, dynamicLeft, dynamicWidth]); //eslint-disable-line

  const handleClick = (divId: number) => {
    setDynamicLeft(divRefs.current[divId]?.offsetLeft);
    setDynamicWidth(divRefs.current[divId]?.offsetWidth);
  };

  const TabClickHandler = (tab: string) => {
    switch (tab) {
      case '__LOG':
        return setShow('__LOG');
      case '__DETAILS':
        return setShow('__DETAILS');
      case '__CODE':
        return setShow('__CODE');
      case '__CONFIGURATION':
        return setShow('__CONFIGURATION');
      case '__METADATA':
        return setShow('__METADATA');
      default:
        return '';
    }
  };

  const handleCopy = (text: any, stringify?: boolean) => {
    navigator.clipboard.writeText(stringify ? text : JSON.stringify(text));
    dispatch(
      showToasterAction({
        description: 'Config copied to clipboard',
        type: toasterTypes.success,
      }),
    );
  };

  const handleCopyAll = () => {
    navigator.clipboard.writeText(JSON.stringify(node?.config));
    dispatch(
      showToasterAction({
        description: 'Config copied to clipboard',
        type: toasterTypes.success,
      }),
    );
  };

  const configProgrammatically = `

  from zenml.client import Client
    
  run = Client().get_pipeline_run('${node?.id}')
  
  config = run.config
  `;

  const ConfigBox = ({
    name,
    config,
    stringify = false,
  }: {
    name: string;
    config: any;
    stringify?: boolean;
  }) => (
    <Box style={{ width: '100%', overflowY: 'hidden' }}>
      <div className="td_key">
        <label htmlFor={name}>{name}</label>
      </div>
      <Box marginTop={'sm'} className={styles.JSONPretty}>
        <icons.copy
          className={styles.copy}
          onClick={() => handleCopy(config, stringify)}
          color={iconColors.black}
          size={iconSizes.sm}
        />
        <JSONPretty
          style={{
            fontSize: '16px',
            fontFamily: 'Rubik',
          }}
          data={config}
        ></JSONPretty>
      </Box>
    </Box>
  );

  return (
    <>
      <div className="siderbar_header11">
        {tabs.map((tab, i) => {
          return (
            <span
              key={i}
              id={i.toString()}
              onClick={() => {
                handleClick(i + 1);
                TabClickHandler(tab.case);
              }}
              style={show === tab.case ? stylesActive : stylesInActive}
              ref={(el) => (divRefs.current[i + 1] = el)}
            >
              {tab.title}
            </span>
          );
        })}
      </div>
      <div
        className={`${stepStyles.underline}`}
        style={{
          marginLeft: `${dynamicLeft}px`,
          transition: 'all 300ms ease',
          width: `${dynamicWidth}px`,
        }}
      ></div>

      {fetching ? (
        <div
          style={{ minHeight: '100%' }}
          className={`${styles.FullWidthSpinnerContainer}`}
        >
          <FullWidthSpinner color="black" size="md" />
          <p style={{ fontFamily: 'Rubik', fontSize: '14px' }}>
            Loading Step. Please wait
          </p>
        </div>
      ) : (
        <>
          {show === '__DETAILS' && (
            <>
              <table cellSpacing="0" className="sidebar_table">
                <tbody>
                  <tr>
                    <td className="td_key">ID</td>
                    <td className="td_value">{node?.id}</td>
                  </tr>
                  <tr>
                    <td className="td_key">Name</td>
                    <td className="td_value">{node?.name}</td>
                  </tr>
                  <tr>
                    <td className="td_key">Status</td>
                    {node.body.status && node.body.status === 'completed' ? (
                      <>
                        <td className="td_value">
                          <FlexBox style={{ marginLeft: '5px', gap: '10px' }}>
                            <Paragraph
                              style={{
                                color: '#2ECC71',
                                fontSize: '12px',
                                fontWeight: 'bold',
                              }}
                            >
                              {node.body.status.charAt(0).toUpperCase() +
                                node.body.status.slice(1)}
                            </Paragraph>
                            {/* eslint-disable-next-line */}
                            <Status_Completed />
                          </FlexBox>
                        </td>
                        &nbsp;&nbsp;&nbsp;
                      </>
                    ) : (
                      <td className="td_value">{node.body.status}</td>
                    )}
                  </tr>
                  <tr>
                    <td className="td_key">Cache key</td>
                    <td className="td_value">{node?.metadata?.cache_key}</td>
                  </tr>
                  {node?.metadata?.original_step_run_id && (
                    <tr>
                      <td className="td_key">
                        (If cached) ID of original step
                      </td>
                      <td className="td_value">
                        {node?.metadata?.original_step_run_id || 'n/a'}
                      </td>
                    </tr>
                  )}
                  <tr>
                    <td className="td_key">Start time</td>
                    <td className="td_value">
                      {' '}
                      {formatDateToDisplayOnTable(node?.metadata?.start_time)}
                    </td>
                  </tr>
                  <tr>
                    <td className="td_key">End time</td>
                    <td className="td_value">
                      {formatDateToDisplayOnTable(node?.metadata?.end_time)}
                    </td>
                  </tr>
                  <tr>
                    {node.metadata.config.enable_artifact_metadata &&
                    node.metadata.config.enable_artifact_metadata ? (
                      <>
                        <td className="td_key">enable_artifact_metadata</td>
                        <td className="td_value">
                          {node?.metadata.config.enable_artifact_metadata}
                        </td>
                      </>
                    ) : (
                      <></>
                    )}
                  </tr>
                </tbody>
              </table>
            </>
          )}
          {show === '__CODE' && (
            <div className={styles.codeContainer}>
              <SyntaxHighlighter
                customStyle={{ width: '100%', height: '80%', fontSize: 20 }}
                wrapLines={true}
                language="python"
                style={okaidia}
              >
                {node.metadata.source_code ? node.metadata.source_code : ''}
              </SyntaxHighlighter>
            </div>
          )}
          {show === '__LOG' && <DisplayLogs selectedNode={node} />}

          {show === '__CONFIGURATION' && (
            <>
              <Box style={{ position: 'absolute', top: '3rem', right: '3rem' }}>
                <FlexBox
                  onClick={handleCopyAll}
                  style={{
                    borderRadius: '4px',
                    border: '1px solid #DADADA',
                    background: '#ECECEC',
                    padding: '8px 20px',
                    cursor: 'pointer',
                  }}
                >
                  <Paragraph>Copy</Paragraph>
                  <icons.copy
                    style={{ marginLeft: '10px' }}
                    color={iconColors.black}
                    size={iconSizes.sm}
                  />
                </FlexBox>
              </Box>

              <table cellSpacing="0" className="sidebar_table">
                <tbody>
                  <tr>
                    <td className="td_key">Caching</td>
                    <td className="td_value">
                      {node?.metadata.config?.enable_cache ? (
                        <>Enabled</>
                      ) : (
                        <>Disabled</>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td className="td_key">Artifact Metadata</td>
                    <td className="td_value">
                      {node?.metadata.config?.enable_artifact_metadata ? (
                        <>Enabled</>
                      ) : (
                        <>Disabled</>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td className="td_key">Artifact Visualization</td>
                    <td className="td_value">
                      {node?.metadata.config?.enable_artifact_visualization ? (
                        <>Enabled</>
                      ) : (
                        <>Disabled</>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td className="td_key">Failure Hook Source</td>
                    <td className="td_value">
                      {node?.metadata.config?.failure_hook_source ? (
                        <div style={{ marginLeft: '1px' }}>Enabled</div>
                      ) : node?.metadata.config?.failure_hook_source ===
                        null ? (
                        <div style={{ marginLeft: '1px' }}>Not Set</div>
                      ) : (
                        <div style={{ marginLeft: '1px' }}>Disabled</div>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td className="td_key">Success Hook Source</td>
                    <td className="td_value">
                      {node?.metadata.config?.success_hook_source ? (
                        <div style={{ marginLeft: '1px' }}>Enabled</div>
                      ) : node?.metadata.config?.success_hook_source ===
                        null ? (
                        <div style={{ marginLeft: '1px' }}>Not Set</div>
                      ) : (
                        <div style={{ marginLeft: '1px' }}>Disabled</div>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <ConfigBox
                      name="Settings"
                      config={node?.metadata.config?.settings}
                    />
                  </tr>
                  <tr>
                    <ConfigBox
                      name="Extra"
                      config={node?.metadata.config?.extra}
                    />
                  </tr>
                  <tr>
                    <ConfigBox
                      name="Parameters"
                      config={node?.metadata.config?.parameters}
                    />
                  </tr>
                  <tr>
                    <ConfigBox
                      name="Caching Parameters"
                      config={node?.metadata.config?.caching_parameters}
                    />
                  </tr>
                  <tr>
                    <ConfigBox
                      name="Get config programmatically"
                      config={configProgrammatically}
                      stringify
                    />
                  </tr>
                </tbody>
              </table>
            </>
          )}

          {show === '__METADATA' && (
            <>
              <table cellSpacing="0" className="sidebar_table">
                <tbody>
                  {_.isEmpty(node?.metadata) && (
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <Paragraph>No Metadata available</Paragraph>
                    </div>
                  )}

                  {Object.entries(node?.metadata?.run_metadata).length >= 0 &&
                    Object.entries(node?.metadata?.run_metadata)?.map(
                      (e: any) => (
                        <tr>
                          <td className="td_key">{e[1]?.key}</td>
                          <td className="td_value">{e[1]?.value}</td>
                        </tr>
                      ),
                    )}
                </tbody>
              </table>
            </>
          )}
        </>
      )}
    </>
  );
};

export default StepnodeTabHeader;
