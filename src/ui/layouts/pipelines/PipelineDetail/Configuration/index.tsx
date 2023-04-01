import React, { useState } from 'react';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { okaidia } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Box, FlexBox, H4, GhostButton, icons, LayoutFlow } from '../../../../components';

import { useDispatch, useSelector } from '../../../../hooks';
import { showToasterAction } from '../../../../../redux/actions';
import { toasterTypes } from '../../../../../constants';
import { iconColors, iconSizes } from '../../../../../constants';

import { translate } from '../translate';
import styles from './index.module.scss';
import { useService } from './useService';
import { pipelineSelectors, runSelectors } from '../../../../../redux/selectors';

export const Configuration: React.FC<{ pipelineId: TId }> = ({
  pipelineId,
}) => {
  const { downloadYamlFile, pipelineConfig } = useService({ pipelineId });
  const [hover, setHover] = useState(false);
  const dispatch = useDispatch();
  const pipeline: TPipeline = useSelector(
    pipelineSelectors.pipelineForId(pipelineId),
  );
  // const graph = useSelector(pipelineSelectors.pipelineForId(pipeline.id));
  const graph = useSelector(runSelectors.graphByRunId(pipelineId));
  console.log("__UNAUTH_GRAPH", pipelineId)
  // const { runMetadata, runId } = graph;

  // console.log("")

  // const obj = {
  //   graph,
  //   runId,
  //   metadata: runMetadata
  // }
  // console.log("__UNAUTH_PIPELINE", obj.graph.edges);
  // console.log("__UNAUTH_PIPELINE_GRAPH", runMetadata);
  const handleCopy = () => {
    navigator.clipboard.writeText(pipelineConfig);
    dispatch(
      showToasterAction({
        description: 'Config copied to clipboard',
        type: toasterTypes.success,
      }),
    );
  };
  // console.log("__UNAUTH_PIPELINE", pipeline.runs);
  console.log("__UNAUTH_PIPELINE", pipelineConfig);
  // console.log("__UNAUTH_PIPELINE_graph", graph);


  return (
    <FlexBox.Column fullWidth>
      {/* <FlexBox
        marginBottom="md"
        alignItems="center"
        justifyContent="space-between"
      >
        <H4 bold>YAML ALI</H4>
        <Box>
          <GhostButton
            style={{ marginRight: '10px' }}
            onClick={downloadYamlFile}
          >
            {translate('configuration.button.text')}
          </GhostButton>

          <GhostButton
            onMouseEnter={() => {
              setHover(true);
            }}
            onMouseLeave={() => {
              setHover(false);
            }}
            onClick={handleCopy}
          >
            <icons.copy
              color={hover ? iconColors.white : iconColors.black}
              size={iconSizes.sm}
            />
          </GhostButton>
        </Box>
      </FlexBox> */}
      {/* <FlexBox className={styles.code}> */}
      <LayoutFlow graph={graph} />

      {/* <SyntaxHighlighter
          customStyle={{ width: '100%' }}
          wrapLines={true}
          language="yaml"
          style={okaidia}
        >
          {pipelineConfig}
        </SyntaxHighlighter> */}
      {/* </FlexBox> */}
    </FlexBox.Column>
  );
};
