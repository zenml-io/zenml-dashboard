import React from 'react';
import { useService } from './useService';
import { UpdateConfig } from './UpdateConfig';

export interface StackDetailRouteParams {
  id: TId;
}

export const StackDetail: React.FC = () => {
  const { stack } = useService();

  return <UpdateConfig stack={stack} />;
};

export default StackDetail;
