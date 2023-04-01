import React from 'react';

import { FlexBox } from '../../../../components';

import { useService } from './useService';

export const DAG: React.FC<{ runId: TId }> = ({ runId }) => {
  const { graph } = useService({ runId });
  console.log("__UNAUTH_PIP_RUN_GRAPH",graph)
  return <FlexBox.Column fullWidth>{graph?.rootStepId}</FlexBox.Column>;
};
