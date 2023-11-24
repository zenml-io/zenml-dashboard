import React from 'react';
import { Paragraph } from '../../../components';
import { pipelineSelectors } from '../../../../redux/selectors';
import { useSelector } from '../../../hooks';
import { Run } from '../../../../api/types';

export const PipelineName: React.FC<{ run: Run }> = ({ run }) => {
  const pipeline = useSelector(
    pipelineSelectors.pipelineForId(run.body?.pipeline?.id as string),
  );

  const name = pipeline.name;

  return <Paragraph size="small">{name}</Paragraph>;
};
