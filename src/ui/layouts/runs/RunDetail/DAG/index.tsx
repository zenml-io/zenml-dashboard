import React from 'react';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { okaidia } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Box, FlexBox, H4, GhostButton, icons } from '../../../../components';

// import { translate } from '../translate';
import styles from './index.module.scss';
import { useService } from './useService';

export const DAG: React.FC<{ runId: TId }> = ({ runId }) => {
  const { graph } = useService({ runId });

  return <FlexBox.Column fullWidth>{graph?.rootStepId}</FlexBox.Column>;
};
