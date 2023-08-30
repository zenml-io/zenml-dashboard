import React from 'react';
import { Paragraph } from '../../../components';
import { stackSelectors } from '../../../../redux/selectors';
import { useSelector } from '../../../hooks';
import { Run } from '../../../../api/types';

export const PipelineName: React.FC<{ run: Run }> = ({ run }) => {
  const stack = useSelector(stackSelectors.stackForId(run.stack?.id as string));

  const name = stack.name;

  return <Paragraph size="small">{name}</Paragraph>;
};
