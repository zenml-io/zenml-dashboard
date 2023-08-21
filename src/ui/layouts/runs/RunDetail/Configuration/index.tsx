import React from 'react';
import { Box, FlexBox, Paragraph, icons } from '../../../../components';
import { iconColors, iconSizes, toasterTypes } from '../../../../../constants';
import JSONPretty from 'react-json-pretty';
import { useService } from './useService';
import { NonEditableRunConfig } from '../../../NonEditableRunConfigNew';
import { useDispatch } from '../../../../hooks';
import { showToasterAction } from '../../../../../redux/actions';
import styles from './index.module.scss';

export const Configuration: React.FC<{ runId: TId }> = ({ runId }) => {
  const { run } = useService({ runId });
  const dispatch = useDispatch();

  const configSchema = `
from zenml.client import Client

run = Client().get_pipeline_run('${runId}')

config = run.config

`;

  const handleCopy = () => {
    navigator.clipboard.writeText(configSchema);

    dispatch(
      showToasterAction({
        description: 'Config copied to clipboard',
        type: toasterTypes.success,
      }),
    );
  };

  const handleCopyAll = () => {
    navigator.clipboard.writeText(JSON.stringify(run.config));

    dispatch(
      showToasterAction({
        description: 'Config copied to clipboard',
        type: toasterTypes.success,
      }),
    );
  };

  return (
    <FlexBox fullWidth style={{ position: 'relative' }}>
      <Box style={{ width: '100%' }}>
        <NonEditableRunConfig
          runConfiguration={run.config}
        ></NonEditableRunConfig>
      </Box>

      <Box style={{ width: '100%' }}>
        <Box marginTop="lg" style={{ width: '90%' }}>
          <Paragraph size="body" style={{ color: 'black' }}>
            <label htmlFor="config">Get config programmatically</label>
          </Paragraph>
          <Box marginTop={'sm'} padding={'md'} className={styles.JSONPretty}>
            <icons.copy
              className={styles.copy}
              onClick={handleCopy}
              color={iconColors.black}
              size={iconSizes.sm}
            />
            <JSONPretty
              style={{
                fontSize: '16px',
                fontFamily: 'Rubik',
              }}
              data={configSchema}
            ></JSONPretty>
          </Box>
        </Box>
      </Box>

      <Box style={{ position: 'absolute', top: '-4rem', right: 0 }}>
        <FlexBox
          onClick={handleCopyAll}
          style={{
            borderRadius: '4px',
            border: '1px solid #DADADA',
            background: '#ECECEC',
            padding: '8px 20px',
            cursor: 'pointer',
          }}
        >
          <Paragraph>Copy</Paragraph>
          <icons.copy
            style={{ marginLeft: '10px' }}
            color={iconColors.black}
            size={iconSizes.sm}
          />
        </FlexBox>
      </Box>
    </FlexBox>
  );
};
