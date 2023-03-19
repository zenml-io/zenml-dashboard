import React from 'react';

import {

  FlexBox,

} from '../../../../components';

import { useService } from './useService';

import { NonEditableRunConfig } from '../../../NonEditableRunConfig';

export const Details: React.FC<{ runId: TId }> = ({ runId }) => {
  const { run } = useService({ runId });


  return (
    <FlexBox.Column fullWidth>
this is details
     
    </FlexBox.Column>
  );
};
