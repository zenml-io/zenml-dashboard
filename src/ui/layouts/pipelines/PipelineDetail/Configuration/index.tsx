import React from 'react';
import { FlexBox } from '../../../../components';
import { useSelector } from '../../../../hooks';
import { pipelineSelectors } from '../../../../../redux/selectors';
import { LayoutFlow } from '../../../../components/Yaml/index';
// import {useService} from './useService'

export const Configuration: React.FC<{ pipelineId: TId }> = ({
  pipelineId,
}) => {
  const pipeline: TPipeline = useSelector(
    pipelineSelectors.pipelineForId(pipelineId),
  );

  let edgeArr: any = [];

  function upstremArrHandler(item: any) {
    const arr = item.upstream_steps.map((_item: any, index: number) => ({
      id: item.pipeline_parameter_name + index,
      target: item.source.attribute || 'item.source',
      source:
        item.upstream_steps.length > 0
          ? item.upstream_steps[index]
          : item.upstream_steps[0],
    }));
    edgeArr = [...arr, ...edgeArr];
  }

  let edgeMap = pipeline.spec.steps.map((item: any, index: number) => {
    if (Array.isArray(item.upstream_steps) && item.upstream_steps.length > 1) {
      upstremArrHandler(item);
    }

    return {
      id: item.pipeline_parameter_name + Math.floor(Math.random() * 100),
      target:
        item.source.attribute !== undefined
          ? item.source.attribute
          : item.source,
      source:
        item.upstream_steps.length > 0
          ? item.upstream_steps[0]
          : item.upstream_steps[index],
    };
  });

  const edge = [...edgeArr, ...edgeMap];

  const node = pipeline.spec.steps.map((item: any, index: number) => ({
    id: item.source.attribute,
    type: 'step',
    data: {
      pipeline_parameter_name: item.pipeline_parameter_name,
    },
  }));

  const graph = {
    edge,
    node,
  };

  return (
    <FlexBox.Column fullWidth>
      {/* <FlexBox
        marginBottom="md"
        alignItems="center"
        justifyContent="space-between"
        >
      </FlexBox> */}
      <LayoutFlow graph={graph} />
    </FlexBox.Column>
  );
};
