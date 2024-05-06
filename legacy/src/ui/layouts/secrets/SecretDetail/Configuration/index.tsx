import React from 'react';

import {
  FlexBox,
  Box,
  FormTextField,
  FormDropdownField,
  PrimaryButton,
  FullWidthSpinner,
} from '../../../../components';
import SelectorDisabled from '../../Selector/SelectorDisabled';

import styles from './index.module.scss';
import { useService } from './useService';
import { routePaths } from '../../../../../routes/routePaths';
import { useHistory, useSelector } from '../../../../hooks';
import { workspaceSelectors } from '../../../../../redux/selectors';
import { Secret } from '../../../../../api/types';

export const Configuration: React.FC<{
  secretId: TId;
  tiles?: any;
  fetching?: boolean;
}> = ({ secretId, fetching }) => {
  const { secret }: { secret: Secret } = useService({ secretId });
  const history = useHistory();

  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);

  if (fetching) {
    return <FullWidthSpinner color="black" size="md" />;
  }

  return (
    <FlexBox.Column marginLeft="xl">
      <Box marginTop="lg" style={{ width: '30vw' }}>
        <FormTextField
          label={'Secret name'}
          labelColor="rgba(66, 66, 64, 0.5)"
          placeholder={'unique_secret_name'}
          value={secret?.name}
          disabled
          onChange={() => {}}
          style={{
            background: 'rgb(233, 234, 236)',
            border: 'none',
            borderRadius: '4px',
          }}
        />
      </Box>
      <Box marginTop="lg" style={{ width: '30vw' }}>
        <FormDropdownField
          label={'Scope'}
          labelColor="rgba(66, 66, 64, 0.5)"
          placeholder={'Choose a scope'}
          value={secret?.body?.scope || ''}
          onChange={() => {}}
          disabled
          options={[] as any}
          style={{
            paddingLeft: '10px',
            background: 'rgba(233, 234, 236, 0.5)',
            color: '#a1a4ab',
            border: 'none',
            borderRadius: '4px',
          }}
        />
      </Box>

      <Box marginTop="md">
        <SelectorDisabled inputFields={secret.body?.values} width="30vw" />
      </Box>

      <FlexBox
        style={{
          position: 'fixed',
          right: '0',
          bottom: '0',
          marginRight: '45px',
        }}
      >
        <Box marginBottom="lg">
          <PrimaryButton
            onClick={() =>
              history.push(
                routePaths.secret.updateSecret(secret.id, selectedWorkspace),
              )
            }
            className={styles.updateButton}
          >
            Update Secret
          </PrimaryButton>
        </Box>
      </FlexBox>
    </FlexBox.Column>
  );
};
