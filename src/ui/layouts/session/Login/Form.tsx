import React from 'react';
import {
  Box,
  FormEmailField,
  FormPasswordField,
  PrimaryButton,
} from '../../../components';
import { translate } from './translate';
import { useService } from './useService';
import { useEnterKeyPress } from '../../../hooks';

export const Form: React.FC = () => {
  const {
    login,
    hasSubmittedWithErrors,
    username,
    password,
    setUsername,
    setPassword,
    loading,
  } = useService();

  const submit = () => {
    login();
  };

  const BUTTON_DISABLED = username.trim() === '' || password.trim() === ''

  useEnterKeyPress(() => {
    if (!BUTTON_DISABLED) login();
  });

  return (
    <Box marginTop="xxl">
      <Box marginBottom="lg">
        <FormEmailField
          label={translate('form.username.label')}
          labelColor='#ffffff'
          placeholder={translate('form.username.placeholder')}
          value={username}
          onChange={(val: string) => setUsername(val)}
          error={{
            hasError: hasSubmittedWithErrors && username.trim() === '',
            text: translate('form.username.required'),
          }}
        />
      </Box>
      <Box marginBottom="xxl">
        <FormPasswordField
          label={translate('form.password.label')}
          labelColor='#ffffff'
          placeholder={translate('form.password.placeholder')}
          value={password}
          onChange={(val: string) => setPassword(val)}
          error={{
            hasError: hasSubmittedWithErrors && password.trim() === '',
            text: translate('form.password.required'),
          }}
        />
      </Box>
      <PrimaryButton
        style={{ width: '100%', backgroundColor: '#E8A562' }}
        loading={loading}
        disabled={BUTTON_DISABLED || loading}
        onClick={submit}
      >
        {translate('form.button.text')}
      </PrimaryButton>
    </Box>
  );
};
