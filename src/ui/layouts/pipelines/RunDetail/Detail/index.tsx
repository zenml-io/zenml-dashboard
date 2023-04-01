import React from 'react';
import { useSelector } from 'react-redux';
import { runSelectors } from '../../../../../redux/selectors';

import {
  FlexBox,
} from '../../../../components';

import JsonDisplay from '../../../../components/lineage/JsonDisplay';
export const Details: React.FC<{ runId: TId }> = ({ runId }) => {

  const artifactData = useSelector(runSelectors.artifactData)
  return (
    <FlexBox fullWidth style={{overflow:'hidden'}}>
      <JsonDisplay data={artifactData.metadata} styles={{ width: "100%", margin: 20 }}/>
    </FlexBox>
  );
};
