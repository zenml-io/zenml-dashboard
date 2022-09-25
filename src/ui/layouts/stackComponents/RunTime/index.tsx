import React from 'react';
import { formateDateDifference } from '../../../../utils';
import { Paragraph } from '../../../components';
import { useService } from './useService';

export const RunTime: React.FC<{ run: TRun }> = ({ run }) => {
  const { endDate } = useService({ run });

  const dateDifference = formateDateDifference(endDate, run.kubeflowStartTime);

  return <Paragraph size="small">{dateDifference}</Paragraph>;
};
