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
  // const [edgeArr, setEdgeArr] = useState([]);
  const dispatch = useDispatch();
  const pipeline: TPipeline = useSelector(
    pipelineSelectors.pipelineForId(pipelineId),
  );
  // const graph = useSelector(runSelectors.graphByRunId(pipelineId));



  console.log("__UNAUTH_GRAPH", pipeline)



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

  let edgeArr: any = [];

  function upstremArrHandler(item: any) {
    const arr = item.upstream_steps.map((_item: any, index: number) => ({
      id: item.pipeline_parameter_name + index,
      target: item.source.attribute || "item.source",
      // source: item.upstream_steps[index] || item.upstream_steps[index],
      source: item.upstream_steps.length > 0 ? item.upstream_steps[index] : item.upstream_steps[0],
    }))
    // setEdgeArr(arr)
    edgeArr = [...arr, ...edgeArr]
    console.log("upstremArrHandler", edgeArr)

  }



  let edgeMap = pipeline.spec.steps.map((item: any, index: number) => {

    if (Array.isArray(item.upstream_steps) && item.upstream_steps.length > 1) {
      console.log("__ITEM", item?.source?.attribute)
      upstremArrHandler(item)
    }

    return {
      // id: item.pipeline_parameter_name + index,
      // targrt: item?.source?.attribute || "item.source",
      // source: item.upstream_steps[0] || item.upstream_steps[0],

      id: item.pipeline_parameter_name + Math.floor(Math.random() * 100),
      target: item.source.attribute !== undefined ? item.source.attribute : item.source,
      source: item.upstream_steps.length > 0 ? item.upstream_steps[0] : item.upstream_steps[index],
    }
  })
  // console.log("upstremArrHandler", edgeMap)


  const edge = [...edgeArr, ...edgeMap]

  // let mergedArray = Array.from(new Set(edgeArr.concat(edgeMap)));

  console.log("__NEW_EDGE", edge)


  const node = pipeline.spec.steps.map((item: any, index: number) => ({
    // id: item.source.attribute !== undefined ? item.source.attribute : item.source,
    // type: "step",
    // data: {
    //   pipeline_parameter_name: item.pipeline_parameter_name,
    id: item.source.attribute,
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
      <FlexBox
        marginBottom="md"
        alignItems="center"
        justifyContent="space-between"
      >
        {/* <H4 bold style={{marginLeft:20, marginTop:20}}>{translate('configuration.title.text')}</H4> */}


      </FlexBox>
      {/* <FlexBox className={styles.code}> */}
      {/* <LayoutFlow graph={graph} /> */}
      {/* <SyntaxHighlighter
        customStyle={{ width: '100%', fontSize: 20 }}
        wrapLines={true}
        language="yaml"
        style={okaidia}
      >
        {pipelineConfig}
      </SyntaxHighlighter> */}
      <LayoutFlow graph={graph} />
      {/* </FlexBox> */}
    </FlexBox.Column>
  );
};
