import React, { useState } from 'react';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { okaidia } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Box, FlexBox, H4, GhostButton, icons } from '../../../../components';

import { useDispatch, useSelector } from '../../../../hooks';
import { showToasterAction } from '../../../../../redux/actions';
import { toasterTypes } from '../../../../../constants';
import { iconColors, iconSizes } from '../../../../../constants';

import { translate } from '../translate';
import styles from './index.module.scss';
import { useService } from './useService';
import { pipelineSelectors, runSelectors } from '../../../../../redux/selectors';
import { LayoutFlow } from '../../../../components/Yaml/index';



export const Configuration: React.FC<{ pipelineId: TId }> = ({
  pipelineId,
}) => {
  const { downloadYamlFile, pipelineConfig } = useService({ pipelineId });
  const [hover, setHover] = useState(false);
  const dispatch = useDispatch();
  const pipeline: TPipeline = useSelector(
    pipelineSelectors.pipelineForId(pipelineId),
  );
  // const graph = useSelector(runSelectors.graphByRunId(pipelineId));



  console.log("__UNAUTH_GRAPH", pipelineId)



  const handleCopy = () => {
    navigator.clipboard.writeText(pipelineConfig);
    dispatch(
      showToasterAction({
        description: 'Config copied to clipboard',
        type: toasterTypes.success,
      }),
    );
  };


  console.log("__UNAUTH_PIPELIN_SPEC -> ", pipeline.spec.steps);


  const edge = pipeline.spec.steps.map((item: any, index: number) => {


    // if()

    // const src = item.source.split(".");
    // const src_1 = src[src.length - 1];
    // console.log("src_1", src_1)
    // source: item.pipeline_parameter_name,

    return {
      id: item.pipeline_parameter_name+index,
      source: item.source.attribute !== undefined ? item.source.attribute : item. source,
      target: item.upstream_steps.length > 0 ? item.upstream_steps : "",
      type: "step"
    }
  })

  const node = pipeline.spec.steps.map((item: any, index: number) => ({
    id: item.pipeline_parameter_name,
    type: "step",
    data: {
      pipeline_parameter_name: item.pipeline_parameter_name,
    },
  }))

  // console.log("__NODE : ", node, "EDGE : ", edge)

  const graph = {
    edge,
    node
  }

  // const nodes = pipeline.spec.steps.map((item) => ({
  //   id: item.id,
  //   data: { label: item.label },
  //   position: { x: item.x, y: item.y },
  //   type: 'default',
  // }));

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
      {/* <LayoutFlow graph={graph} /> */}
      <H4 bold>{translate('configuration.title.text')}</H4>
      <SyntaxHighlighter
        customStyle={{ width: '100%', fontSize: 20 }}
        wrapLines={true}
        language="yaml"
        style={okaidia}
      >
        {pipelineConfig}
      </SyntaxHighlighter>
      <LayoutFlow graph={graph} />
      {/* </FlexBox> */}
    </FlexBox.Column>
  );
};
