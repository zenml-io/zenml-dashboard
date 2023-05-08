import React, { useEffect, useRef, useState, memo } from 'react';
import styles from './artifact.module.scss';
import { FullWidthSpinner } from '../../spinners';
import ArtifactVisualization from './ArtifactVisualization';
import { Link } from 'react-router-dom';
import { routePaths } from '../../../../routes/routePaths';
import { useSelector } from 'react-redux';
import { workspaceSelectors } from '../../../../redux/selectors';

const stylesActive = {
  opacity: 1,
};
const stylesInActive = {
  opacity: 0.5,
};

const artifactTabs = [
  {
    title: 'Meta',
    case: '__META',
  },
  {
    title: 'Attributes',
    case: '__ATTRIBUTE',
  },
  {
    title: 'Visualization',
    case: '__VISUALIZATION',
  },
];

const ArtifactTabHeader = ({
  node,
  fetching,
}: {
  node: any;
  fetching: boolean;
}) => {
  const [show, setShow] = useState('__META');
  const [dynamicWidth, setDynamicWidth] = useState<number | undefined>(35);
  const [dynamicLeft, setDynamicLeft] = useState<number | undefined>(21);
  const parent = useRef<HTMLDivElement>(null);
  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);
  const divRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const TabClickHandler = (tab: string) => {
    switch (tab) {
      case '__META':
        return setShow('__META');
      case '__ATTRIBUTE':
        return setShow('__ATTRIBUTE');
      case '__VISUALIZATION':
        return setShow('__VISUALIZATION');
      default:
        return '';
    }
  };

  useEffect(() => {
    setDynamicLeft(divRefs.current[1]?.offsetLeft);
    setDynamicWidth(divRefs.current[1]?.offsetWidth);
  }, []);

  useEffect(() => {
    setDynamicLeft(dynamicLeft);
    setDynamicWidth(dynamicWidth);
  }, [show, dynamicLeft, dynamicWidth, node]);

  const handleClick = (divId: number) => {
    setDynamicLeft(divRefs.current[divId]?.offsetLeft);
    setDynamicWidth(divRefs.current[divId]?.offsetWidth);
  };

  return (
    <>
      <div className="siderbar_header11" ref={parent}>
        {artifactTabs.map((tab, i) => {
          return (
            <span
              key={i}
              style={show === tab.case ? stylesActive : stylesInActive}
              id={i.toString()}
              ref={(el) => (divRefs.current[i + 1] = el)}
              onClick={() => {
                handleClick(i + 1);
                TabClickHandler(tab.case);
              }}
            >
              {tab.title}
            </span>
          );
        })}
      </div>
      <div
        className={`${styles.underline}`}
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
            Loading Artifact. Please wait
          </p>
        </div>
      ) : (
        <>
          {/* SHOW META */}
          {show === '__META' ? (
            <table className="sidebar_table">
              <tbody>
                {Object.entries(node.metadata || {}).map(([_, value]: any) => (
                  <tr>
                    <td className="td_key">{value.key}</td>
                    <td className="td_value">{value.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            ''
          )}

          {/* SHOW ATTRIBUTE */}

          {show === '__ATTRIBUTE' ? (
            <>
              <table className="sidebar_table">
                <tbody>
                  <tr>
                    <td className="td_key">Name</td>
                    <td className="td_value">{node?.name}</td>
                  </tr>
                  <tr>
                    <td className="td_key">Type</td>
                    <td className="td_value">{node?.type}</td>
                  </tr>
                  <tr>
                    <td className="td_key">Producer step</td>
                    <td className="td_value">{node?.producer_step_run_id}</td>
                  </tr>
                  <tr>
                    <td className="td_key" style={{ wordWrap: 'break-word' }}>
                      Artifact store
                    </td>
                    <td className="td_value">
                      <Link
                        to={routePaths.stackComponents.configuration(
                          'artifact_store',
                          node?.artifact_store_id,
                          selectedWorkspace,
                        )}
                      >
                        {node?.artifact_store_id}
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td className="td_key">URI</td>
                    <td style={{ lineHeight: 'unset' }} className="td_value">
                      <p className={styles.truncate}>{node?.uri}</p>
                    </td>
                  </tr>
                  <tr>
                    <td className="td_key">Materializer</td>
                    {/* <td className='td_value'>{typeof (node?.materializer) === 'object' ? <JsonDisplay data={node?.materializer} style={{ display: 'flex' }} /> : node?.materializer}</td> */}
                    <td className="td_value">
                      <tr>
                        <td className="td_key">Module:</td>
                        <td className="td_value">
                          {node?.materializer?.module}
                        </td>
                      </tr>
                      <tr>
                        <td className="td_key">Attribute</td>
                        <td className="td_value">
                          {node?.materializer?.attribute}
                        </td>
                      </tr>
                      <tr>
                        <td className="td_key">Type</td>
                        <td className="td_value">{node?.materializer?.type}</td>
                      </tr>
                      {/* <tr>attribute: {node?.materializer?.attribute}</tr>
                                    <tr>type: {node?.materializer?.type}</tr> */}
                    </td>
                  </tr>
                </tbody>
              </table>
            </>
          ) : (
            ''
          )}
          {/* SHOW VISUALIZATION */}
          {show === '__VISUALIZATION' ? (
            <ArtifactVisualization node={node} fetching={fetching} />
          ) : (
            ''
          )}
        </>
      )}
    </>
  );
};

export default memo(ArtifactTabHeader);
