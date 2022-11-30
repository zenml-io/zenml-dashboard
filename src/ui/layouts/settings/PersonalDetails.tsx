import React, { useState } from 'react';
import {
  Box,
  FlexBox,
  FormTextField,
  FormPasswordField,
  Row,
  Col,
} from '../../components';
import { useRequestOnMount, useSelector } from '../../hooks';
import {
  sessionActions,
  showToasterAction,
  userActions,
} from '../../../redux/actions';

import { sessionSelectors, userSelectors } from '../../../redux/selectors';
import { getTranslateByScope } from '../../../services';
import { useDispatch } from 'react-redux';
import { toasterTypes } from '../../../constants';
import { PrimaryButton } from '../../components/buttons/index';
import { EmailPopup } from './EmailPopup';
import { loginAction } from '../../../redux/actions/session/loginAction';
import jwt_decode from 'jwt-decode';

export const translate = getTranslateByScope('ui.layouts.PersonalDetails');

export const PersonalDetails: React.FC = () => {
  useRequestOnMount(userActions.getMy, {});
  const dispatch = useDispatch();

  const user = useSelector(userSelectors.myUser);

  const [submitting, setSubmitting] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [fullName, setFullName] = useState(user?.fullName);
  const [username, setUsername] = useState(user?.name);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const authToken = useSelector(sessionSelectors.authenticationToken);
  var decoded: any = jwt_decode(authToken as any);
  if (!user) return null;

  const forgotPassword = () => {
    if (newPassword !== confirmPassword) {
      dispatch(
        showToasterAction({
          description: 'Password not Matched',
          type: toasterTypes.failure,
        }),
      );
    } else {
      setSubmitting(true);
      dispatch(
        loginAction({
          password: currentPassword,
          username: username,
          onFailure: (errorText) => {
            dispatch(
              showToasterAction({
                description: 'Current Password is incorrect',
                type: toasterTypes.failure,
              }),
            );
            setSubmitting(false);
          },
          onSuccess: async () => {
            dispatch(
              sessionActions.forgotPassword({
                userId: user?.id,
                password: newPassword,
                onFailure: () => {
                  setSubmitting(false);
                  dispatch(
                    showToasterAction({
                      description: translate('toasts.failed.text'),
                      type: toasterTypes.failure,
                    }),
                  );
                },
                onSuccess: () => {
                  setSubmitting(false);
                  dispatch(
                    showToasterAction({
                      description: translate('toasts.successful.passwordText'),
                      type: toasterTypes.success,
                    }),
                  );
                  setNewPassword('');
                  setConfirmPassword('');
                  setCurrentPassword('');
                },
              }),
            );
          },
        }),
      );
    }
  };

  return (
    <>
      {popupOpen && (
        <EmailPopup
          userId={user?.id}
          fullName={fullName}
          username={username}
          setPopupOpen={setPopupOpen}
        />
      )}
      <FlexBox.Column style={{ marginLeft: '40px' }} flex={1}>
        <Box marginTop="lg">
          <Row>
            <Col lg={5}>
              <Box marginBottom="lg">
                <FormTextField
                  disabled={!decoded.permissions.includes('me')}
                  label={translate('form.fullName.label')}
                  labelColor="#000"
                  placeholder={translate('form.fullName.placeholder')}
                  value={fullName ? fullName : ''}
                  onChange={(val: string) => setFullName(val)}
                />
              </Box>

              <Box marginBottom="lg">
                <FormTextField
                  disabled={!decoded.permissions.includes('me')}
                  label={translate('form.username.label')}
                  labelColor="#000"
                  placeholder={translate('form.username.placeholder')}
                  value={username ? username : ''}
                  onChange={(val: string) => setUsername(val)}
                />
              </Box>

              <Box style={{ display: 'flex', justifyContent: 'end' }}>
                <PrimaryButton
                  style={{ width: '198px' }}
                  onClick={() => setPopupOpen(true)}
                  disabled={
                    fullName === user.fullName && username === user.name
                  }
                >
                  {translate('nameReset.label')}
                </PrimaryButton>
              </Box>
            </Col>
          </Row>
        </Box>

        <Box marginBottom="lg" marginTop="xl">
          <Row>
            <Col lg={5}>
              <Box marginBottom="lg">
                <FormPasswordField
                  disabled={!decoded.permissions.includes('me')}
                  label={translate('form.passwordChange.currentPassword.label')}
                  labelColor="#000"
                  placeholder={translate(
                    'form.passwordChange.currentPassword.placeholder',
                  )}
                  value={currentPassword}
                  onChange={(val: string) => setCurrentPassword(val)}
                  error={{
                    hasError: currentPassword.trim() === undefined,
                    text: translate(
                      'form.passwordChange.currentPassword.required',
                    ),
                  }}
                  showPasswordOption
                />
              </Box>
              <Box marginBottom="lg">
                <FormPasswordField
                  disabled={!decoded.permissions.includes('me')}
                  label={translate('form.passwordChange.newPassword.label')}
                  labelColor="#000"
                  placeholder={translate(
                    'form.passwordChange.newPassword.placeholder',
                  )}
                  value={newPassword}
                  onChange={(val: string) => setNewPassword(val)}
                  error={{
                    hasError: newPassword.trim() === undefined,
                    text: translate('form.passwordChange.newPassword.required'),
                  }}
                  showPasswordOption
                />
              </Box>
              <Box marginBottom="lg">
                <FormPasswordField
                  disabled={!decoded.permissions.includes('me')}
                  label={translate('form.passwordChange.confirmPassword.label')}
                  labelColor="#000"
                  placeholder={translate(
                    'form.passwordChange.confirmPassword.placeholder',
                  )}
                  value={confirmPassword}
                  onChange={(val: string) => setConfirmPassword(val)}
                  error={{
                    hasError: confirmPassword.trim() === undefined,
                    text: translate(
                      'form.passwordChange.confirmPassword.required',
                    ),
                  }}
                  showPasswordOption
                />
              </Box>

              <Box
                marginBottom="xs"
                style={{ display: 'flex', justifyContent: 'end' }}
              >
                <PrimaryButton
                  onClick={forgotPassword}
                  style={{ width: '198px' }}
                  loading={submitting}
                  disabled={
                    newPassword.trim() === '' || confirmPassword.trim() === ''
                  }
                >
                  {translate('passwordReset.button')}
                </PrimaryButton>
              </Box>
            </Col>
          </Row>
        </Box>
      </FlexBox.Column>
    </>
  );
};
