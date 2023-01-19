/* eslint-disable */

import { useState } from 'react';

interface ServiceInterface {
  fetching: boolean;
  user: any;
}

export const useService = ({
  pipeline,
}: {
  pipeline: TPipeline;
}): ServiceInterface => {
  const [fetching, setFetching] = useState<boolean>(false);

  const user = pipeline.user;

  return { fetching, user };
};
