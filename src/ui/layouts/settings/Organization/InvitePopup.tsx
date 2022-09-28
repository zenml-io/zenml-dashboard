/* eslint-disable */
import React, { useState } from 'react';
import { toasterTypes } from '../../../../constants';
import { organizationActions, showToasterAction } from '../../../../redux/actions';
import { translate } from './translate';
import {
  Box,
  FlexBox,
  FormEmailField,
  CopyField,
  H3,
  PrimaryButton,
} from '../../../components';
import { useDispatch, useSelector } from '../../../hooks';
import { Popup } from '../../common/Popup';
import { fieldValidation } from '../../../../utils';
import { organizationSelectors } from '../../../../redux/selectors';

const emailHasError = (email: string, hasSubmittedWithErrors: boolean) =>
  (hasSubmittedWithErrors && email.trim() === '') ||
  (hasSubmittedWithErrors && !fieldValidation(email.trim()).isEmail());

const emailErrorText = (email: string) =>
  email.trim() !== '' && !fieldValidation(email.trim()).isEmail()
    ? translate('popup.email.invalidEmail')
    : translate('popup.email.required');

export const InvitePopup: React.FC<{
  setPopupOpen: (attr: boolean) => void;
}> = ({ setPopupOpen }) => {
 
  const [submitting, setSubmitting] = useState(false);
  const [hasSubmittedWithErrors, setHasSubmittedWithErrors] = useState(false);
  const [email, setEmail] = useState('')
  const [showTokField, setShowTokField] = useState(false)

  const dispatch = useDispatch();
  const invite = useSelector(organizationSelectors.invite);

  const inviteNewMembers = () => {
    setHasSubmittedWithErrors(true);

    let error = false;
    if (emailHasError(email || '', true)) {
        error = true;
    }

    if (!error) {
      setSubmitting(true);
      dispatch(
          organizationActions.invite({
            name: email,
            email: email,
            onFailure: (errorText: string) => {
              dispatch(
                showToasterAction({
                  description: errorText,
                  type: toasterTypes.failure,
                }),
              );
              setSubmitting(false);
            },
            onSuccess: () => {
              setShowTokField(true)
            }         
            }),
        );
     }
  };

  return (
    <Popup
      onClose={() => {
        setPopupOpen(false);
        setHasSubmittedWithErrors(false);
       }}
    >
      <FlexBox.Row alignItems="center" justifyContent="space-between">
        <H3 bold color="darkGrey">
          {showTokField ? translate('popup.invite.text') : translate('popup.title') }
        </H3>
      </FlexBox.Row>
      <Box marginTop="md">
          <Box>
            <FlexBox.Row marginBottom="md">
              <Box style={{ width: showTokField ? '100%' : '80%' }}>
                <FormEmailField
                  label={translate('popup.email.label')}
                  placeholder={translate('popup.email.placeholder')}
                  value={email}
                  onChange={(val: string) => setEmail(val)} 
                  error={{
                    hasError: emailHasError(email || '', hasSubmittedWithErrors),
                    text: emailErrorText(email || ''),
                  }}
                />
              </Box>
              
              {!showTokField && (
                <Box style={{ width: '10%', marginTop: '22px' }} marginLeft="md">
                  <PrimaryButton
                    disabled={submitting}
                    loading={submitting}
                    onClick={inviteNewMembers}
                  >
                    {translate('popup.button.text')}
                  </PrimaryButton>
                </Box>
              )}
            </FlexBox.Row>
            
            {showTokField && (
                <Box marginTop='lg'>
                  <CopyField
                    label={`Invitation Link - please send this to ${invite?.email} for this user to finish their registration`}
                    value={`${window.location.origin}/signup?user=${invite?.id}&email=${invite?.email}&token=${invite?.activationToken}`}
                    disabled
                  />
                </Box>
              )}
          </Box>
      </Box>
    </Popup>
  );
};