import React from 'react';
import { Paragraph } from '../../../components';
import { pipelineSelectors } from '../../../../redux/selectors';
import { useSelector } from '../../../hooks';

export const PipelineName: React.FC<{ run: TRun }> = ({ run }) => {
  const pipeline = useSelector(pipelineSelectors.pipelineForId(run.pipelineId));

  const name = pipeline.name;

  return <Paragraph size="small">{name}</Paragraph>;
};
