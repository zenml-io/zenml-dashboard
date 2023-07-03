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
from zenml import Client

run = Client().get_pipeline_run(${runId})
config = run.config

`;

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(configSchema));

    dispatch(
      showToasterAction({
        description: 'Config copied to clipboard',
        type: toasterTypes.success,
      }),
    );
  };

  return (
    <FlexBox fullWidth>
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
    </FlexBox>
  );
};
