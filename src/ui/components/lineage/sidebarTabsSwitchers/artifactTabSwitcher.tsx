import React, { useEffect, useRef, useState, memo } from 'react';
import JsonDisplay from '../JsonDisplay';
import styles from './artifact.module.scss';
import { FullWidthSpinner } from '../../spinners';
import ArtifactVisualization from './ArtifactVisualization';
import { Truncate } from '../../typographies';
import { Link } from 'react-router-dom';
import { routePaths } from '../../../../routes/routePaths';
import { useSelector } from 'react-redux';
import { workspaceSelectors } from '../../../../redux/selectors';
import { formatDateToDisplayOnTable } from '../../../../utils';

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
  console.log(node);

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
            <JsonDisplay
              data={node?.metadata}
              styles={{
                fontFamily: 'Rubik',
                overflowY: 'scroll',
                maxHeight: '90vh',
                width: '100%',
                margin: 20,
              }}
            />
          ) : (
            ''
          )}

          {/* SHOW ATTRIBUTE */}

          {show === '__ATTRIBUTE' ? (
            <>
              <table className="sidebar_table">
                <tbody>
                  <tr>
                    <td className="td_key">name</td>
                    <td className="td_value">{node?.name}</td>
                  </tr>
                  <tr>
                    <td className="td_key" style={{ wordWrap: 'break-word' }}>
                      artifact store id
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
                    <td className="td_key">created</td>
                    <td className="td_value">
                      {formatDateToDisplayOnTable(node?.created)}
                    </td>
                  </tr>
                  <tr>
                    <td className="td_key">materializer</td>
                    {/* <td className='td_value'>{typeof (node?.materializer) === 'object' ? <JsonDisplay data={node?.materializer} style={{ display: 'flex' }} /> : node?.materializer}</td> */}
                    <td className="td_value">
                      <tr>
                        <td className="td_key">module:</td>
                        <td className="td_value">
                          {node?.materializer?.module}
                        </td>
                      </tr>
                      <tr>
                        <td className="td_key">attribute</td>
                        <td className="td_value">
                          {node?.materializer?.attribute}
                        </td>
                      </tr>
                      <tr>
                        <td className="td_key">type</td>
                        <td className="td_value">{node?.materializer?.type}</td>
                      </tr>
                      {/* <tr>attribute: {node?.materializer?.attribute}</tr>
                                    <tr>type: {node?.materializer?.type}</tr> */}
                    </td>
                  </tr>
                  <tr>
                    <td className="td_key">producer step run id</td>
                    <td className="td_value">{node?.producer_step_run_id}</td>
                  </tr>
                  <tr>
                    <td className="td_key">type</td>
                    <td className="td_value">{node?.type}</td>
                  </tr>
                  <tr>
                    <td className="td_key">URI</td>
                    <td style={{ lineHeight: 'unset' }} className="td_value">
                      <Truncate maxLines={1}>
                        <span title={node?.uri}>{node?.uri}</span>
                      </Truncate>
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
