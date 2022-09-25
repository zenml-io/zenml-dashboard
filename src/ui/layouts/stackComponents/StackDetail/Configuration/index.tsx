import React from 'react';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { okaidia } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { FlexBox, H4, GhostButton } from '../../../../components';

import { translate } from '../translate';

import styles from './index.module.scss';
import { useService } from './useService';

export const Configuration: React.FC<{ stackId: TId }> = ({ stackId }) => {
  const { downloadYamlFile, stackConfig } = useService({ stackId });

  return (
    <FlexBox.Column fullWidth>
      <FlexBox
        marginBottom="md"
        alignItems="center"
        justifyContent="space-between"
      >
        <H4 bold>{translate('configuration.title.text')}</H4>
        <GhostButton onClick={downloadYamlFile}>
          {translate('configuration.button.text')}
        </GhostButton>
      </FlexBox>
      <FlexBox className={styles.code}>
        <SyntaxHighlighter
          customStyle={{ width: '100%' }}
          wrapLines={true}
          language="yaml"
          style={okaidia}
        >
          {stackConfig}
        </SyntaxHighlighter>
      </FlexBox>
    </FlexBox.Column>
  );
};
