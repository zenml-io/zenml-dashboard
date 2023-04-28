import React, { useState } from 'react';
import styles from './index.module.scss';
import { toasterTypes } from '../../../../constants';
import { showToasterAction } from '../../../../redux/actions';
import {
  Box,
  FormTextField,
  FormPasswordField,
  PrimaryButton,
} from '../../../components';
import { useDispatch } from '../../../hooks';
import { translate } from './translate';
import { useService } from './useService';
import { useEnterKeyPress } from '../../../hooks';

export const Form: React.FC = () => {
  const dispatch = useDispatch();
  const [confirmPass, setConfirmPass] = useState('');

  const {
    signup,
    hasSubmittedWithErrors,
    username,
    fullName,
    password,
    setUsername,
    setFullName,
    setPassword,
    loading,
  } = useService();

  const submit = () => {
    if (password !== confirmPass) {
      dispatch(
        showToasterAction({
          description: 'Password not Matched',
          type: toasterTypes.failure,
        }),
      );
    } else {
      signup();
    }
  };

  const BUTTON_DISABLED =
    username.trim() === '' ||
    password.trim() === '' ||
    confirmPass.trim() === '';

  useEnterKeyPress(() => {
    if (!BUTTON_DISABLED) signup();
  });

  return (
    <Box>
      <Box marginBottom="lg">
        <FormTextField
          label={translate('form.username.label')}
          labelColor="#ffffff"
          placeholder={translate('form.username.placeholder')}
          value={username}
          onChange={(val: string) => setUsername(val)}
        />
      </Box>

      <Box marginBottom="lg">
        <FormTextField
          label={translate('form.fullname.label')}
          labelColor="#ffffff"
          placeholder={translate('form.fullname.placeholder')}
          value={fullName}
          onChange={(val: string) => setFullName(val)}
        />
      </Box>

      <Box marginBottom="lg">
        <FormPasswordField
          label={translate('form.password.label')}
          labelColor="#ffffff"
          placeholder={translate('form.password.placeholder')}
          value={password}
          onChange={(val: string) => setPassword(val)}
          error={{
            hasError: hasSubmittedWithErrors && password.trim() === '',
            text: translate('form.password.required'),
          }}
          showPasswordOption
        />
      </Box>
      <Box marginBottom="lg">
        <FormPasswordField
          label={translate('form.confirmPassword.label')}
          labelColor="#fff"
          placeholder={translate('form.confirmPassword.placeholder')}
          value={confirmPass}
          onChange={(val: string) => setConfirmPass(val)}
          error={{
            hasError: hasSubmittedWithErrors && confirmPass.trim() === '',
            text: translate('form.confirmPassword.required'),
          }}
          showPasswordOption
        />
      </Box>
      <PrimaryButton
        marginTop="md"
        className={styles.signUpButton}
        loading={loading}
        disabled={BUTTON_DISABLED || loading}
        onClick={submit}
      >
        {translate('form.button.text')}
      </PrimaryButton>
    </Box>
  );
};
