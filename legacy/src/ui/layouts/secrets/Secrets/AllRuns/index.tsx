import React from 'react';

import { useService } from './useService';

import { getTranslateByScope } from '../../../../../services';

export const translate = getTranslateByScope('ui.layouts.AllRuns');

export const AllRuns: React.FC = () => {
  const { fetching, runIds } = useService();

  return <></>;
};
