import React from 'react';
import { fieldValidation } from '../../../../utils/validations';
import {
  Box,
  FormEmailField,
  FormPasswordField,
  FormTextField,
  Paragraph,
  PrimaryButton,
  ColoredSquare,
  FlexBox,
  TextInput,
  FormValidationError,
} from '../../../components';
import { translate } from './translate';
import { useService } from './useService';
import { useEnterKeyPress } from '../../../hooks';
import { getInitials } from '../../../../utils/name';

const fullNameHasError = (fullname: string, hasSubmittedWithErrors: boolean) =>
  hasSubmittedWithErrors && fullname.trim() === '';

const organizationNameHasError = (
  organizationName: string,
  hasSubmittedWithErrors: boolean,
) => hasSubmittedWithErrors && organizationName.trim() === '';

const emailHasError = (email: string, hasSubmittedWithErrors: boolean) =>
  (hasSubmittedWithErrors && email.trim() === '') ||
  (hasSubmittedWithErrors && !fieldValidation(email.trim()).isEmail());

const emailErrorText = (email: string) =>
  email.trim() !== '' && !fieldValidation(email.trim()).isEmail()
    ? translate('form.email.invalidEmail')
    : translate('form.email.required');

export const Form: React.FC = () => {
  const {
    signup,
    hasSubmittedWithErrors,
    email,
    password,
    fullname,
    setEmail,
    setPassword,
    setFullName,
    organizationName,
    setOrganizationName,
    loading,
    invite,
  } = useService();

  const submit = () => {
    signup();
  };

  const BUTTON_DISABLED =
    fullname.trim() === '' ||
    email.trim() === '' ||
    password.trim() === '' ||
    (organizationName.trim() === '' && !invite) ||
    (organizationName.trim() !== '' && !!invite);

  useEnterKeyPress(() => {
    if (!BUTTON_DISABLED) signup();
  });

  return (
    <Box marginTop="xxl">
      <Box marginBottom="lg">
        {invite ? (
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
        ) : (
          <FlexBox.Column fullWidth>
            <Box paddingBottom="xs">
              <Paragraph size="body" color="black">
                <label>{translate('form.organization.label')}</label>
              </Paragraph>
            </Box>
            <FlexBox.Row>
              <Box>
                <ColoredSquare
                  size="md"
                  color={
                    organizationName.trim() !== ''
                      ? 'secondary'
                      : 'lightestGrey'
                  }
                >
                  <Paragraph color="white">
                    {getInitials(organizationName)}
                  </Paragraph>
                </ColoredSquare>
              </Box>
              <FlexBox flex={1} marginLeft="sm">
                <TextInput
                  placeholder={translate('form.organization.placeholder')}
                  value={organizationName}
                  onChangeText={(val: string) => setOrganizationName(val)}
                  hasError={organizationNameHasError(
                    organizationName,
                    hasSubmittedWithErrors,
                  )}
                />
                <FormValidationError
                  text={translate('form.organization.required')}
                  hasError={organizationNameHasError(
                    organizationName,
                    hasSubmittedWithErrors,
                  )}
                />
              </FlexBox>
            </FlexBox.Row>
          </FlexBox.Column>
        )}
      </Box>
      <Box marginBottom="lg">
        <FormTextField
          label={translate('form.fullname.label')}
          placeholder={translate('form.fullname.placeholder')}
          value={fullname}
          onChange={(val: string) => setFullName(val)}
          error={{
            hasError: fullNameHasError(fullname, hasSubmittedWithErrors),
            text: translate('form.email.required'),
          }}
        />
      </Box>
      <Box marginBottom="lg">
        {!!invite ? (
          <Box>
            <Box paddingBottom="sm">
              <Paragraph size="body" color="black">
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
          showPasswordOption
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
