import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'; //eslint-disable-line
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { okaidia } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Status_Completed } from '../icons';
import styles from '../index.module.scss';
import stepStyles from './artifact.module.scss';
import { FullWidthSpinner } from '../../spinners';
import { formatDateToDisplayOnTable } from '../../../../utils';

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
  //   {
  //     title: 'Logs',
  //     case: '__LOG',
  //   },
  {
    title: 'Attributes',
    case: '__ATTRIBUTE',
  },
  {
    title: 'Code',
    case: '__CODE',
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

const StepnodeTabHeader: React.FC<any> = ({ node, logs, fetching }) => {
  const [show, setShow] = useState('__ATTRIBUTE');
  const [dynamicWidth, setDynamicWidth] = useState<number | undefined>(79);
  const [dynamicLeft, setDynamicLeft] = useState<number | undefined>(21);
  const divRefs = useRef<(HTMLSpanElement | null)[]>([]);

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
      case '__ATTRIBUTE':
        return setShow('__ATTRIBUTE');
      case '__CODE':
        return setShow('__CODE');
      default:
        return '';
    }
  };
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
        <div className={`${styles.FullWidthSpinnerContainer}`}>
          <FullWidthSpinner color="black" size="md" />
          <p style={{ fontFamily: 'Rubik', fontSize: '14px' }}>
            Loading Step. Please wait
          </p>
        </div>
      ) : (
        <>
          {show === '__ATTRIBUTE' ? (
            <>
              <table cellSpacing="0" className="sidebar_table">
                <tbody>
                  <tr>
                    <td className="td_key">Name</td>
                    <td className="td_value ">{node?.name}</td>
                  </tr>
                  <tr>
                    <td className="td_key">Docstring</td>
                    <td className="td_value">{node?.docstring || 'n/a'}</td>
                  </tr>
                  <tr>
                    <td className="td_key">Pipeline run ID</td>
                    <td className="td_value">
                      {node?.pipeline_run_id || 'n/a'}
                    </td>
                  </tr>
                  <tr>
                    <td className="td_key">Original step run ID</td>
                    <td className="td_value">
                      {node?.original_step_run_id || 'n/a'}
                    </td>
                  </tr>
                  <tr>
                    <td className="td_key">Start time</td>
                    <td className="td_value">
                      {' '}
                      {formatDateToDisplayOnTable(node?.created)}
                    </td>
                  </tr>
                  <tr>
                    <td className="td_key">End time</td>
                    <td className="td_value">
                      {' '}
                      {formatDateToDisplayOnTable(node?.end_time)}
                    </td>
                  </tr>
                  <tr>
                    <td className="td_key">Status</td>
                    {node.status && node.status === 'completed' ? (
                      <>
                        <td
                          className="td_value"
                          style={{
                            color: '#2ECC71',
                            fontSize: 14,
                            fontWeight: 600,
                          }}
                        >
                          {node.status}
                        </td>
                        <td>
                          <Status_Completed /> {/*eslint-disable-line*/}
                        </td>
                        &nbsp;&nbsp;&nbsp;
                      </>
                    ) : (
                      <td className="td_value">{node.status}</td>
                    )}
                  </tr>
                  <tr>
                    <td className="td_key">Parent Step IDs</td>
                    <td className="td_value">
                      {node?.parent_step_ids.join(',') || 'n/a'}
                    </td>
                  </tr>
                  <tr>
                    <td className="td_key">Cache key</td>
                    <td className="td_value">{node?.cache_key}</td>
                  </tr>

                  <tr>
                    <td className="td_key">Cache enabled</td>
                    <td className="td_value">
                      {node?.enable_cache || 'false'}
                    </td>
                  </tr>
                  <tr>
                    {node.enable_artifact_metadata &&
                    node.enable_artifact_metadata ? (
                      <>
                        <td className="td_key">enable_artifact_metadata</td>
                        <td className="td_value">
                          {node?.enable_artifact_metadata}
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
                  {Object.entries(node?.input_artifacts).length >= 1 && (
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
                  {Object.entries(node?.input_artifacts || {}).map(
                    ([key, value]: any, i) => {
                      return (
                        <tr key={i}>
                          <details>
                            <summary
                              style={{ width: '100%' }}
                              className="td_key"
                            >
                              {key}
                            </summary>
                            <table>
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
                            </table>
                          </details>
                        </tr>
                      );
                    },
                  )}
                  {Object.entries(node?.output_artifacts).length >= 1 && (
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
                  {Object.entries(node?.output_artifacts || {}).map(
                    ([key, value]: any, i) => {
                      return (
                        <tr key={i}>
                          <details>
                            <summary
                              style={{ width: '100%' }}
                              className="td_key"
                            >
                              {key}
                            </summary>
                            <table>
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
                            </table>
                          </details>
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
          {/* {show === '__LOG' ? (
            <div className={styles.codeContainer}>
              <SyntaxHighlighter
                customStyle={{ width: '100%', height: '80%', fontSize: 16 }}
                wrapLines={true}
                language="python"
                style={okaidia}
              >
                {logs ? logs : 'No Logs Avaialable'}
              </SyntaxHighlighter>
            </div>
          ) : (
            ''
          )} */}
        </>
      )}
    </>
  );
};

export default StepnodeTabHeader;
