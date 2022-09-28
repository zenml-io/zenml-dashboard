/* eslint-disable */
import React, { useState } from 'react';
import { toasterTypes } from '../../../../constants';
import {
  organizationActions,
  showToasterAction,
} from '../../../../redux/actions';
import { translate } from './translate';
import {
  Box,
  FlexBox,
  FormEmailField,
  Paragraph,
  CopyField,
  H3,
  PrimaryButton,
} from '../../../components';
import { useDispatch, useSelector } from '../../../hooks';
import { Popup } from '../../common/Popup';
import { organizationSelectors } from '../../../../redux/selectors';

export const TokenPopup: React.FC<{
  id: string;
  email: string;
  active: boolean;
}> = ({ id, email, active }) => {
  const [popupOpen, setPopupOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showTokField, setShowTokField] = useState(false);

  const dispatch = useDispatch();

  const inviteCode = useSelector(organizationSelectors.inviteForCode);

  const generateToken = () => {
    setSubmitting(true);
    dispatch(
      organizationActions.inviteByCode({
        username: email,
        onFailure: (errorText: string) => {
          dispatch(
            showToasterAction({
              description: errorText,
              type: toasterTypes.failure,
            }),
          );
          setSubmitting(false);
          setPopupOpen(false);
        },
        onSuccess: () => {
          setShowTokField(true);
        },
      }),
    );
  };

  const onClose = () => {
    setShowTokField(false);
    setSubmitting(false);
    setPopupOpen(false);
  };

  return (
    <>
      <Paragraph
        style={{ color: '#8045FF', cursor: 'pointer' }}
        onClick={() => setPopupOpen(true)}
      >
        {!active && 'Pending'}
      </Paragraph>

      {popupOpen && (
        <Popup onClose={onClose}>
          <FlexBox.Row alignItems="center" justifyContent="space-between">
            <H3 bold color="darkGrey">
              {translate('popup.generateInviteModal.title')}
            </H3>
          </FlexBox.Row>
          <Box marginTop="md">
            <Paragraph>{`${translate(
              'popup.generateInviteModal.text',
            )} ${email}`}</Paragraph>
          </Box>
          <Box marginTop="xl">
            <Box>
              <FlexBox.Row marginBottom="md">
                <Box style={{ width: showTokField ? '100%' : '70%' }}>
                  <FormEmailField
                    label={translate('popup.email.label')}
                    placeholder={translate('popup.email.placeholder')}
                    value={email}
                    disabled
                  />
                </Box>

                {!showTokField && (
                  <Box
                    style={{ width: '10%', marginTop: '22px' }}
                    marginLeft="md"
                  >
                    <PrimaryButton
                      disabled={submitting}
                      loading={submitting}
                      onClick={generateToken}
                    >
                      {translate('popup.generateInviteModal.button.text')}
                    </PrimaryButton>
                  </Box>
                )}
              </FlexBox.Row>

              {showTokField && (
                <Box marginTop="lg">
                  <CopyField
                    label={`Invitation Link - please send this to ${email} for this user to finish their registration`}
                    value={`${window.location.origin}/signup?user=${id}&email=${email}&token=${inviteCode}`}
                    disabled
                  />
                </Box>
              )}
            </Box>
          </Box>
        </Popup>
      )}
    </>
  );
};
