import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'; //eslint-disable-line
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

// const TextInput: React.FC<any> = ({ label, value }) => {
//   const [input, setInput] = useState('');

//   const handleChange = (event: any) => {
//     setInput(event.target.value);
//   };

//   useEffect(() => {
//     value(input);
//   }, [input]); //eslint-disable-line

//   return (
//     <div>
//       <p>{label}</p>
//       <input placeholder={label} onChange={(e) => handleChange(e)} />
//     </div>
//   );
// };
// USE GUIDE: JUST CREATE A STATE WHERE YOU USE THIS COMPONENT AND PASS THE "SET" METHOD IN VALUE
// const ToggleButton: React.FC<any> = ({ label, value }) => {
//   //eslint-disable-line
//   const [isActive, setIsActive] = useState(false);

//   const handleClick = () => {
//     setIsActive(!isActive);
//   };

//   useEffect(() => {
//     value(isActive);
//   }, [isActive]); //eslint-disable-line

//   return (
//     <button
//       className={`toggle-button ${isActive ? 'active' : ''}`}
//       onClick={handleClick}
//     >
//       <div className="toggle-button__thumb"></div>
//     </button>
//   );
// };

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
  // }, [show, dynamicLeft, dynamicWidth, node])//eslint-disable-line

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

  const handleCopy = (text: any) => {
    navigator.clipboard.writeText(JSON.stringify(text));

    dispatch(
      showToasterAction({
        description: 'Config copied to clipboard',
        type: toasterTypes.success,
      }),
    );
  };

  const ConfigBox = ({ name, config }: { name: string; config: any }) => (
    <Box style={{ width: '100%' }}>
      <div className="td_key">
        <label htmlFor={name}>{name}</label>
      </div>
      <Box marginTop={'sm'} className={styles.JSONPretty}>
        <icons.copy
          className={styles.copy}
          onClick={() => handleCopy(config)}
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
          {show === '__DETAILS' ? (
            <>
              <table cellSpacing="0" className="sidebar_table">
                <tbody>
                  <tr>
                    <td className="td_key">Name</td>
                    <td className="td_value">
                      <Paragraph>{node?.name}</Paragraph>
                    </td>
                  </tr>
                  {node?.docstring && (
                    <tr>
                      <td className="td_key">Docstring</td>
                      <td className="td_value">
                        <Paragraph>{node?.docstring || 'n/a'}</Paragraph>
                      </td>
                    </tr>
                  )}
                  {node?.pipeline_run_id && (
                    <tr>
                      <td className="td_key">Pipeline run ID</td>
                      <td className="td_value">
                        <Paragraph>{node?.pipeline_run_id || 'n/a'}</Paragraph>
                      </td>
                    </tr>
                  )}
                  {node?.original_step_run_id && (
                    <tr>
                      <td className="td_key">Original step run ID</td>
                      <td className="td_value">
                        <Paragraph>
                          {node?.original_step_run_id || 'n/a'}
                        </Paragraph>
                      </td>
                    </tr>
                  )}
                  <tr>
                    <td className="td_key">Start time</td>
                    <td className="td_value">
                      <Paragraph>
                        {' '}
                        {formatDateToDisplayOnTable(node?.created)}
                      </Paragraph>
                    </td>
                  </tr>
                  <tr>
                    <td className="td_key">End time</td>
                    <td className="td_value">
                      <Paragraph>
                        {formatDateToDisplayOnTable(node?.end_time)}
                      </Paragraph>
                    </td>
                  </tr>
                  <tr>
                    <td className="td_key">Status</td>
                    {node.status && node.status === 'completed' ? (
                      <>
                        <td
                          className="td_value"
                          style={{
                            marginLeft: '10px',
                          }}
                        >
                          <FlexBox justifyContent="end" style={{ gap: '10px' }}>
                            <Paragraph
                              style={{
                                color: '#2ECC71',
                                fontSize: '18px',
                                fontWeight: 'bold',
                              }}
                            >
                              {node.status}
                            </Paragraph>
                            {/* eslint-disable-next-line */}
                            <Status_Completed />
                          </FlexBox>
                        </td>
                        &nbsp;&nbsp;&nbsp;
                      </>
                    ) : (
                      <td className="td_value">
                        <Paragraph>{node.status}</Paragraph>
                      </td>
                    )}
                  </tr>
                  {node?.parent_step_ids.join(',') && (
                    <tr>
                      <td className="td_key">Parent Step IDs</td>
                      <td className="td_value">
                        <Paragraph>
                          {node?.parent_step_ids.join(',') || 'n/a'}
                        </Paragraph>
                      </td>
                    </tr>
                  )}
                  <tr>
                    <td className="td_key">Cache key</td>
                    <td className="td_value">
                      <Paragraph>{node?.cache_key}</Paragraph>
                    </td>
                  </tr>

                  <tr>
                    <td className="td_key">Cache enabled</td>
                    <td className="td_value">
                      <Paragraph>
                        {node?.config?.enable_cache !== null
                          ? node?.config?.enable_cache.toString()
                          : 'true'}
                      </Paragraph>
                    </td>
                  </tr>
                  <tr>
                    {node.config.enable_artifact_metadata &&
                    node.config.enable_artifact_metadata ? (
                      <>
                        <td className="td_key">enable_artifact_metadata</td>
                        <td className="td_value">
                          <Paragraph>
                            {node?.config.enable_artifact_metadata}
                          </Paragraph>
                        </td>
                      </>
                    ) : (
                      <></>
                    )}
                  </tr>
                  {/* <tr>
                                    <td className='td_key'>source</td>
                                    <td className='td_value'>{node?.step?.spec?.source}</td>
                                </tr> */}
                  {Object.entries(node?.inputs).length >= 1 && (
                    <tr>
                      <td
                        style={{ textDecoration: 'underline' }}
                        className="td_key"
                      >
                        Inputs
                      </td>
                      <td></td>
                    </tr>
                  )}
                  {Object.entries(node?.inputs || {}).map(
                    ([key, value]: any, i) => {
                      return (
                        <tr key={i}>
                          <div style={{ width: '100%' }}>
                            <details style={{ width: '100%' }}>
                              <summary className="td_key">{key}</summary>
                              <table>
                                <tbody>
                                  <tr>
                                    <td className="td_key">Name</td>
                                    <td
                                      style={{ lineHeight: 'unset' }}
                                      className="td_value"
                                    >
                                      <p className={stepStyles.truncate}>
                                        {value.name || 'n/a'}
                                      </p>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="td_key">Type</td>
                                    <td
                                      style={{ lineHeight: 'unset' }}
                                      className="td_value"
                                    >
                                      <p className={stepStyles.truncate}>
                                        {value.type || 'n/a'}
                                      </p>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="td_key">URI</td>
                                    <td
                                      style={{ lineHeight: 'unset' }}
                                      className="td_value"
                                    >
                                      <p
                                        style={{ lineHeight: 'unset' }}
                                        className={stepStyles.truncate}
                                      >
                                        {value.uri || 'n/a'}
                                      </p>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </details>
                          </div>
                        </tr>
                      );
                    },
                  )}
                  {Object.entries(node?.outputs).length >= 1 && (
                    <tr>
                      <td
                        style={{ textDecoration: 'underline' }}
                        className="td_key"
                      >
                        Outputs
                      </td>
                      <td></td>
                    </tr>
                  )}
                  {Object.entries(node?.outputs || {}).map(
                    ([key, value]: any, i) => {
                      return (
                        <tr key={i}>
                          <div style={{ width: '100%' }}>
                            <details>
                              <summary
                                style={{ width: '100%' }}
                                className="td_key"
                              >
                                {key}
                              </summary>
                              <table>
                                <tbody>
                                  <tr>
                                    <td className="td_key">Name</td>
                                    <td
                                      style={{ lineHeight: 'unset' }}
                                      className="td_value"
                                    >
                                      <p className={stepStyles.truncate}>
                                        {value.name || 'n/a'}
                                      </p>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="td_key">Type</td>
                                    <td
                                      style={{ lineHeight: 'unset' }}
                                      className="td_value"
                                    >
                                      <p
                                        style={{ lineHeight: 'unset' }}
                                        className={stepStyles.truncate}
                                      >
                                        {value.type || 'n/a'}
                                      </p>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="td_key">URI</td>
                                    <td
                                      style={{ lineHeight: 'unset' }}
                                      className="td_value"
                                    >
                                      <p
                                        style={{ lineHeight: 'unset' }}
                                        className={stepStyles.truncate}
                                      >
                                        {value.uri || 'n/a'}
                                      </p>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </details>
                          </div>
                        </tr>
                      );
                    },
                  )}
                </tbody>
              </table>
            </>
          ) : (
            ''
          )}
          {show === '__CODE' ? (
            <div className={styles.codeContainer}>
              <SyntaxHighlighter
                customStyle={{ width: '100%', height: '80%', fontSize: 20 }}
                wrapLines={true}
                language="python"
                style={okaidia}
              >
                {node.source_code ? node.source_code : ''}
              </SyntaxHighlighter>
            </div>
          ) : (
            ''
          )}
          {show === '__LOG' ? <DisplayLogs selectedNode={node} /> : ''}

          {show === '__CONFIGURATION' ? (
            <>
              <table cellSpacing="0" className="sidebar_table">
                <tbody>
                  <tr>
                    <td className="td_key">Caching</td>
                    <td className="td_value">
                      <Paragraph>
                        {node?.config?.enable_cache ? (
                          <>Enabled</>
                        ) : (
                          <>Disabled</>
                        )}
                      </Paragraph>
                    </td>
                  </tr>
                  <tr>
                    <td className="td_key">Artifact Metadata</td>
                    <td className="td_value">
                      <Paragraph>
                        {node?.config?.enable_artifact_metadata ? (
                          <>Enabled</>
                        ) : (
                          <>Disabled</>
                        )}
                      </Paragraph>
                    </td>
                  </tr>
                  <tr>
                    <td className="td_key">Artifact Visualization</td>
                    <td className="td_value">
                      <Paragraph>
                        {node?.config?.enable_artifact_visualization ? (
                          <>Enabled</>
                        ) : (
                          <>Disabled</>
                        )}
                      </Paragraph>
                    </td>
                  </tr>
                  <tr>
                    <ConfigBox
                      name="Failure Hook Source"
                      config={node?.config?.failure_hook_source}
                    />
                  </tr>
                  <tr>
                    <ConfigBox
                      name="Success Hook Source"
                      config={node?.config?.success_hook_source}
                    />
                  </tr>
                  <tr>
                    <ConfigBox
                      name="Settings"
                      config={node?.config?.settings}
                    />
                  </tr>
                  <tr>
                    <ConfigBox name="Extra" config={node?.config?.extra} />
                  </tr>
                  <tr>
                    <ConfigBox
                      name="Parameters"
                      config={node?.config?.parameters}
                    />
                  </tr>
                  <tr>
                    <ConfigBox
                      name="Caching Parameters"
                      config={node?.config?.caching_parameters}
                    />
                  </tr>
                </tbody>
              </table>
            </>
          ) : (
            ''
          )}

          {show === '__METADATA' ? (
            <>
              <table cellSpacing="0" className="sidebar_table">
                <tbody>
                  {Object.entries(node?.metadata).length >= 1 && (
                    <tr>
                      <td className="td_key">Key</td>
                      <td className="td_value">
                        <Paragraph>Value</Paragraph>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </>
          ) : (
            ''
          )}
        </>
      )}
    </>
  );
};

export default StepnodeTabHeader;
