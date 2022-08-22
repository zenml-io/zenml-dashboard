import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Box,
  FlexBox,
  GhostButton,
  H3,
  icons,
  LinkBox,
  Paragraph,
  PrimaryButton,
} from '../../../components';
import { Popup } from '../../common/Popup/index';
import { translate } from './translate';
import { organizationActions } from '../../../../redux/actions/organizations/index';
import { showToasterAction } from '../../../../redux/actions/showToasterAction';

export const DeleteInvite: React.FC<{ invite: TInvite }> = ({ invite }) => {
  const [popupOpen, setPopupOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const dispatch = useDispatch();

  const onDelete = () => {
    setSubmitting(true);
    dispatch(
      organizationActions.deleteInvite({
        id: invite.id,
        onSuccess: () => {
          setPopupOpen(false);
          setSubmitting(false);
          dispatch(organizationActions.getInvites({}));
          dispatch(
            showToasterAction({
              type: 'success',
              description: translate('deleteInvitePopup.successToaster'),
            }),
          );
        },
        onFailure: () => {
          setSubmitting(false);

          dispatch(
            showToasterAction({
              type: 'failure',
              description: translate('deleteInvitePopup.errorToaster'),
            }),
          );
        },
      }),
    );
  };

  return (
    <>
      {popupOpen && (
        <Popup onClose={() => setPopupOpen(false)}>
          <FlexBox.Row alignItems="center" justifyContent="space-between">
            <H3 bold color="darkGrey">
              {translate('deleteInvitePopup.title')}
            </H3>
          </FlexBox.Row>
          <Box marginTop="md">
            <Paragraph>{translate('deleteInvitePopup.text')}</Paragraph>
          </Box>
          <FlexBox justifyContent="flex-end" marginTop="xl" flexWrap>
            <Box marginRight="sm" marginBottom="md">
              <GhostButton onClick={() => setPopupOpen(false)}>
                {translate('deleteInvitePopup.cancelButton.text')}
              </GhostButton>
            </Box>
            <Box marginLeft="sm" marginRight="sm" marginBottom="md">
              <PrimaryButton
                disabled={submitting}
                loading={submitting}
                onClick={onDelete}
              >
                {translate('deleteInvitePopup.successButton.text')}
              </PrimaryButton>
            </Box>
          </FlexBox>
        </Popup>
      )}
      <Box>
        <LinkBox onClick={() => setPopupOpen(true)}>
          <icons.closeWithBorder />
        </LinkBox>
      </Box>
    </>
  );
};
