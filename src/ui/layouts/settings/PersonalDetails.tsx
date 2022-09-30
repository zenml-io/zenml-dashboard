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
  organizationActions,
  sessionActions,
  showToasterAction,
  userActions,
} from '../../../redux/actions';

import { organizationSelectors, userSelectors } from '../../../redux/selectors';
import { getTranslateByScope } from '../../../services';
import { useDispatch } from 'react-redux';
import { toasterTypes } from '../../../constants';
import { PrimaryButton } from '../../components/buttons/index';
import { EmailPopup } from './EmailPopup';

export const translate = getTranslateByScope('ui.layouts.PersonalDetails');

export const PersonalDetails: React.FC = () => {
  useRequestOnMount(organizationActions.getMy, {});
  useRequestOnMount(userActions.getMy, {});
  const dispatch = useDispatch();

  const organization = useSelector(organizationSelectors.myOrganization);
  const user = useSelector(userSelectors.myUser);

  const [submitting, setSubmitting] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [fullName, setFullName] = useState(user?.fullName)
  const [username, setUsername] = useState(user?.name)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  if (!organization || !user) return null;

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
                description: translate('toasts.successful.text'),
                type: toasterTypes.success,
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
      <EmailPopup userId={user?.id} fullName={fullName} username={username} setPopupOpen={setPopupOpen} />
    )}
    <FlexBox.Column style={{ marginLeft: '40px' }} flex={1}>
        <Box marginTop="lg" >
          <Row>
            <Col lg={5}>
              <Box marginBottom="lg">
                <FormTextField
                  label={translate('form.fullName.label')}
                  labelColor='#000'
                  placeholder={translate('form.fullName.placeholder')}
                  value={fullName ? fullName : ''}
                  onChange={(val: string) => setFullName(val)}
                />
              </Box>

              <Box marginBottom="lg">
                <FormTextField
                  label={translate('form.username.label')}
                  labelColor="#000"
                  placeholder={translate('form.username.placeholder')}
                  value={username ? username : ''}
                  onChange={(val: string) => setUsername(val)}
                />
              </Box>

                <Box style={{ display: 'flex', justifyContent: 'end' }}>
                  <PrimaryButton style={{ width: '198px' }} onClick={() => setPopupOpen(true)} disabled={fullName === user.fullName && username === user.name} >
                    {translate('nameReset.label')}
                  </PrimaryButton>
                </Box>
            </Col>
          </Row>
        </Box>

        <Box marginBottom="xs" style={{ display: 'flex', justifyContent: 'end' }}>
          <PrimaryButton onClick={forgotPassword} style={{ width: '198px' }} loading={submitting} disabled={newPassword.trim() === '' || confirmPassword.trim() === ''}>
            {translate('passwordReset.button')}
          </PrimaryButton>
        </Box>
    
    </FlexBox.Column>
  </>
  );
};
