import React, { useEffect, useRef, useState, memo } from 'react';
import styles from './artifact.module.scss';
import { FullWidthSpinner } from '../../spinners';
import ArtifactVisualization from './ArtifactVisualization';

import { useDispatch } from 'react-redux';

import MetadataTab from './metadata';
import { Box, icons } from '../../index';
import { iconColors, iconSizes, toasterTypes } from '../../../../constants';
import { showToasterAction } from '../../../../redux/actions';
import JSONPretty from 'react-json-pretty';

const stylesActive = {
  opacity: 1,
};
const stylesInActive = {
  opacity: 0.5,
};

const artifactTabs = [
  {
    title: 'Details',
    case: '__DETAILS',
  },

  {
    title: 'Metadata',
    case: '__METADATA',
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
  const [show, setShow] = useState('__DETAILS');
  const [dynamicWidth, setDynamicWidth] = useState<number | undefined>(35);
  const [dynamicLeft, setDynamicLeft] = useState<number | undefined>(21);
  const parent = useRef<HTMLDivElement>(null);

  const divRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const dispatch = useDispatch();

  const TabClickHandler = (tab: string) => {
    switch (tab) {
      case '__METADATA':
        return setShow('__METADATA');
      case '__DETAILS':
        return setShow('__DETAILS');
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

  const handleCopy = (text: any) => {
    navigator.clipboard.writeText(text);

    dispatch(
      showToasterAction({
        description: 'Config copied to clipboard',
        type: toasterTypes.success,
      }),
    );
  };

  const ConfigBox = ({ name, config }: { name: string; config: any }) => (
    <Box style={{ width: '100%', overflowY: 'hidden' }}>
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

  const configSchema = `
from zenml.client import Client

artifact = Client().get_artifact('${node?.id}')
loaded_artifact = artifact.load()

`;

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
          {/* SHOW DETAILS */}
          {show === '__DETAILS' ? (
            <>
              <table className="sidebar_table">
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
                    <td className="td_key">Type</td>
                    <td className="td_value">{node?.body.type}</td>
                  </tr>
                  <tr>
                    <td className="td_key">Producer step</td>
                    <td className="td_value">
                      {node?.metadata.producer_step_run_id}
                    </td>
                  </tr>
                  <tr>
                    <td className="td_key" style={{ wordWrap: 'break-word' }}>
                      Artifact store
                    </td>
                    <td className="td_value">
                      {node?.metadata.artifact_store_id}
                    </td>
                  </tr>
                  <tr>
                    <ConfigBox name="URI" config={node?.body.uri} />
                  </tr>

                  <tr>
                    <ConfigBox
                      name="Materializer"
                      // config="zenml.materializers.built_in_materializer.BuilntinContainerMaterializer"
                      config={node?.metadata?.materializer?.module}
                    />
                  </tr>

                  <tr>
                    <ConfigBox
                      name="Load Artifact in Code"
                      config={configSchema}
                    />
                  </tr>
                </tbody>
              </table>
            </>
          ) : (
            ''
          )}

          {/* SHOW META */}
          {show === '__METADATA' ? (
            <MetadataTab metadata={node.metadata || {}} />
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
