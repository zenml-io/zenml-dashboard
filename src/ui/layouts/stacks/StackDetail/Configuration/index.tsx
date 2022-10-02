import React from 'react';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { okaidia } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { FlexBox, Box, H4, GhostButton, icons } from '../../../../components';
import { iconColors, iconSizes } from '../../../../../constants';

import { useDispatch } from '../../../../hooks';
import { showToasterAction } from '../../../../../redux/actions';
import { toasterTypes } from '../../../../../constants';

import { translate } from '../translate';

import styles from './index.module.scss';
import { useService } from './useService';

export const Configuration: React.FC<{ stackId: TId }> = ({ stackId }) => {
  const dispatch = useDispatch();
  const { downloadYamlFile, stackConfig } = useService({ stackId });

  const handleCopy = () => {
    navigator.clipboard.writeText(stackConfig);
    dispatch(
      showToasterAction({
        description: 'Config copied to clipboard',
        type: toasterTypes.success,
      }),
    );
  };

  return (
    <FlexBox.Column fullWidth>
      <FlexBox
        marginBottom="md"
        alignItems="center"
        justifyContent="space-between"
      >
        <H4 bold>{translate('configuration.title.text')}</H4>
        <Box>
          <GhostButton
            style={{ marginRight: '10px' }}
            onClick={downloadYamlFile}
          >
            {translate('configuration.button.text')}
          </GhostButton>
          <GhostButton onClick={handleCopy}>
            <icons.copy color={iconColors.black} size={iconSizes.sm} />
          </GhostButton>
        </Box>
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
