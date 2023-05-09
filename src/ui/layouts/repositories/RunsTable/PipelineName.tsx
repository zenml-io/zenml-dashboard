import React from 'react';
import { Paragraph } from '../../../components';
import { stackSelectors } from '../../../../redux/selectors';
import { useSelector } from '../../../hooks';

export const PipelineName: React.FC<{ run: TRun }> = ({ run }) => {
  const stack = useSelector(stackSelectors.stackForId(run.pipelineId));

  const name = stack.name;

  return <Paragraph size="small">{name}</Paragraph>;
};
