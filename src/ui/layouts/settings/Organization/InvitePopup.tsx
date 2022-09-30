/* eslint-disable */
import React, { useState } from 'react';
import { toasterTypes } from '../../../../constants';
import { organizationActions, showToasterAction } from '../../../../redux/actions';
import { translate } from './translate';
import {
  Box,
  FlexBox,
  FormTextField,
  CopyField,
  H3,
  PrimaryButton,
} from '../../../components';
import { useSelector, useDispatch } from '../../../hooks';
import { Popup } from '../../common/Popup';
import { organizationSelectors } from '../../../../redux/selectors';

export const InvitePopup: React.FC<{ setPopupOpen: (attr: boolean) => void }> 
  = ({ setPopupOpen}) => {

  const [submitting, setSubmitting] = useState(false);
  const [name, setName] = useState('')
  const [showTokField, setShowTokField] = useState(false)

  const dispatch = useDispatch();
  const invite = useSelector(organizationSelectors.invite);

  const inviteNewMembers = () => {
    
      setSubmitting(true);
      dispatch(
          organizationActions.invite({
            name,
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
              dispatch(organizationActions.getMembers({}));
              setSubmitting(false);
              setShowTokField(true)
            }         
            }),
        );
  };


  return (
    <Popup
      onClose={() => {
        setPopupOpen(false);
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
                <FormTextField
                  label={translate('popup.username.label')}
                  labelColor='#000'
                  placeholder={translate('popup.username.placeholder')}
                  value={name}
                  onChange={(val: string) => setName(val)} 
                  error={{
                    hasError: false,
                    text: ''
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
                    label={`Invitation Link - please send this to ${name} for this user to finish their registration`}
                    value={`${window.location.origin}/signup?user=${invite?.id}&username=${name}&token=${invite?.activationToken}`}
                    disabled
                  />
                </Box>
              )}
          </Box>
      </Box>
    </Popup>
  );
};