import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import { iconColors } from '../../../../constants/icons';
import { organizationSelectors } from '../../../../redux/selectors';

export const DeleteMember: React.FC<{ member: TInvite }> = ({ member }) => {
  const [popupOpen, setPopupOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const dispatch = useDispatch();
  const membersPaginated = useSelector(
    organizationSelectors.myMembersPaginated,
  );
  useEffect(() => {
    const intervalId = setInterval(() => {
      //assign interval to a variable to clear it.
      dispatch(
        organizationActions.getMembers({
          page: membersPaginated.page,
          size: membersPaginated.size,
        }),
      );
    }, 5000);

    return () => clearInterval(intervalId); //This is important
  });
  const onDelete = () => {
    setSubmitting(true);
    dispatch(
      organizationActions.deleteInvite({
        id: member.id,
        onSuccess: () => {
          setPopupOpen(false);
          setSubmitting(false);
          dispatch(organizationActions.getMembers({}));
          dispatch(
            showToasterAction({
              type: 'success',
              description: translate('deleteMemberPopup.successToaster'),
            }),
          );
        },
        onFailure: (err) => {
          setSubmitting(false);
          dispatch(
            showToasterAction({
              type: 'failure',
              description: err,
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
              {translate('deleteMemberPopup.title')}
            </H3>
          </FlexBox.Row>
          <Box marginTop="md">
            <Paragraph>{`${translate('deleteMemberPopup.text')} ${
              member?.name
            }.`}</Paragraph>
          </Box>
          <FlexBox justifyContent="flex-end" marginTop="xl" flexWrap>
            <Box marginRight="sm" marginBottom="md">
              <GhostButton onClick={() => setPopupOpen(false)}>
                {translate('deleteMemberPopup.cancelButton.text')}
              </GhostButton>
            </Box>
            <Box marginLeft="sm" marginRight="sm" marginBottom="md">
              <PrimaryButton
                disabled={submitting}
                loading={submitting}
                onClick={onDelete}
              >
                {translate('deleteMemberPopup.successButton.text')}
              </PrimaryButton>
            </Box>
          </FlexBox>
        </Popup>
      )}
      <Box>
        <LinkBox onClick={() => setPopupOpen(true)}>
          <icons.closeWithBorder color={iconColors.grey} />
        </LinkBox>
      </Box>
    </>
  );
};
