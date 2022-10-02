import React from 'react';
import { fieldValidation } from '../../../../utils/validations';
import { Box, FormEmailField, PrimaryButton } from '../../../components';
import { translate } from './translate';
import { useService } from './useService';
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
    forgot,
    hasSubmittedWithErrors,
    email,
    setEmail,
    loading,
  } = useService();

  const submit = () => {
    forgot();
  };

  const BUTTON_DISABLED = email.trim() === '';

  useEnterKeyPress(() => {
    if (!BUTTON_DISABLED) forgot();
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
