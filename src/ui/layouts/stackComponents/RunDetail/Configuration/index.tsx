import React from 'react';

import { FlexBox } from '../../../../components';

import { useService } from './useService';

import { NonEditableRunConfig } from '../../../NonEditableRunConfig';
export const Configuration: React.FC<{ runId: TId }> = ({ runId }) => {
  const { run } = useService({ runId });

  return (
    <FlexBox.Column fullWidth>
      <NonEditableRunConfig
        runConfiguration={run.config}
      ></NonEditableRunConfig>
    </FlexBox.Column>
  );
};
