/* eslint-disable */

import { useState } from 'react';
import { Pipeline } from '../../../../../../api/types';
interface ServiceInterface {
  fetching: boolean;
  user: any;
}

export const useService = ({
  pipeline,
}: {
  pipeline: Pipeline;
}): ServiceInterface => {
  const [fetching, setFetching] = useState<boolean>(false);

  const user = pipeline.user;

  return { fetching, user };
};
