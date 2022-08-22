import React from 'react';
import { fieldValidation } from '../../../../utils/validations';
import {
  Box,
  FormEmailField,
  FormPasswordField,
  SecondaryLink,
  PrimaryButton,
} from '../../../components';
import { translate } from './translate';
import { useService } from './useService';
import { routePaths } from '../../../../routes/routePaths';
import { useEnterKeyPress } from '../../../hooks';

const emailHasError = (email: string, hasSubmittedWithErrors: boolean) =>
  (hasSubmittedWithErrors && email.trim() === '') ||
  (hasSubmittedWithErrors && !fieldValidation(email.trim()).isEmail());

const emailErrorText = (email: string) =>
  email.trim() !== '' && !fieldValidation(email.trim()).isEmail()
    ? translate('form.email.invalidEmail')
    : translate('form.email.required');

export const Form: React.FC = () => {
  const {
    login,
    hasSubmittedWithErrors,
    email,
    password,
    setEmail,
    setPassword,
    loading,
  } = useService();

  const submit = () => {
    login();
  };

  const BUTTON_DISABLED = email.trim() === '' || password.trim() === '';

  useEnterKeyPress(() => {
    if (!BUTTON_DISABLED) login();
  });

  return (
    <Box marginTop="xxl">
      <Box marginBottom="lg">
        <FormEmailField
          label={translate('form.email.label')}
          placeholder={translate('form.email.placeholder')}
          value={email}
          onChange={(val: string) => setEmail(val)}
          error={{
            hasError: emailHasError(email, hasSubmittedWithErrors),
            text: emailErrorText(email),
          }}
        />
      </Box>
      <Box marginBottom="md">
        <FormPasswordField
          label={translate('form.password.label')}
          placeholder={translate('form.password.placeholder')}
          value={password}
          onChange={(val: string) => setPassword(val)}
          error={{
            hasError: hasSubmittedWithErrors && password.trim() === '',
            text: translate('form.password.required'),
          }}
        />
      </Box>
      <Box marginBottom="xxl">
        <SecondaryLink
          size="small"
          text={translate('forgotPassword.text')}
          route={routePaths.forgot}
        />
      </Box>
      <PrimaryButton
        loading={loading}
        disabled={BUTTON_DISABLED || loading}
        onClick={submit}
      >
        {translate('form.button.text')}
      </PrimaryButton>
    </Box>
  );
};
