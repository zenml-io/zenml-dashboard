import React, { useState } from 'react';
import styles from './index.module.scss';
import { toasterTypes } from '../../../../constants';
import { showToasterAction } from '../../../../redux/actions';
import { fieldValidation } from '../../../../utils/validations';
import {
  Box,
  FormEmailField,
  FormPasswordField,
  Paragraph,
  PrimaryButton,
  ColoredSquare,
  FlexBox,
} from '../../../components';
import { useDispatch } from '../../../hooks';
import { translate } from './translate';
import { useService } from './useService';
import { useEnterKeyPress } from '../../../hooks';
import { getInitials } from '../../../../utils/name';

const emailHasError = (email: string, hasSubmittedWithErrors: boolean) =>
  (hasSubmittedWithErrors && email.trim() === '') ||
  (hasSubmittedWithErrors && !fieldValidation(email.trim()).isEmail());

const emailErrorText = (email: string) =>
  email.trim() !== '' && !fieldValidation(email.trim()).isEmail()
    ? translate('form.email.invalidEmail')
    : translate('form.email.required');

export const Form: React.FC = () => {

  const dispatch = useDispatch();
  const [confirmPass, setConfirmPass] = useState('')

  const {
    signup,
    hasSubmittedWithErrors,
    email,
    password,
    setEmail,
    setPassword,
    loading,
    invite,
  } = useService();

  const submit = () => {
    if (password !== confirmPass) {
      dispatch(showToasterAction({
          description: 'Password not Matched',
          type: toasterTypes.failure,
        }),
      )
    } else {
      signup();
    }
  };

  const BUTTON_DISABLED =
    email.trim() === '' ||
    password.trim() === ''

  useEnterKeyPress(() => {
    if (!BUTTON_DISABLED) signup();
  });

  return (
    <Box >
      <Box marginBottom="lg">
        {invite && (
          <Box>
            <Paragraph size="body" color="black">
              {translate('form.organization.label')}
            </Paragraph>
            <FlexBox.Row alignItems="center" marginTop="sm">
              <Box>
                <ColoredSquare size="md" color="secondary">
                  <Paragraph color="white">
                    {getInitials(invite.organizationName)}
                  </Paragraph>
                </ColoredSquare>
              </Box>
              <Box marginLeft="sm">
                <Paragraph bold>{invite.organizationName}</Paragraph>
              </Box>
            </FlexBox.Row>
          </Box>
        )} 
      </Box>
      <Box marginBottom="lg">
        {!!invite ? (
          <Box>
            <Box paddingBottom="sm">
              <Paragraph size="body" color="white">
                <label>{translate('form.email.label')}</label>
              </Paragraph>
            </Box>
            <Box>
              <Paragraph size="body" color="black">
                {email}
              </Paragraph>
            </Box>
          </Box>
        ) : (
          <FormEmailField
            label={translate('form.email.label')}
            labelColor='#ffffff'
            placeholder={translate('form.email.placeholder')}
            value={email} 
            onChange={(val: string) => setEmail(val)}
            error={{
              hasError: emailHasError(email, hasSubmittedWithErrors),
              text: emailErrorText(email),
            }}
          />
        )}
      </Box>
      <Box marginBottom="lg">
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
          showPasswordOption
        />
      </Box>
      <Box marginBottom="lg">
        <FormPasswordField
          label={translate('form.confirmPassword.label')}
          labelColor='#fff'
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
        marginTop='md'
        className={styles.signUpButton}
        loading={loading}
        disabled={BUTTON_DISABLED || loading}
        onClick={submit} >
        {translate('form.button.text')}
      </PrimaryButton>
    </Box>
  );
};
