/* eslint-disable */


import React, { useEffect, useState } from 'react';
import { iconColors } from '../../../../constants';
import { organizationActions } from '../../../../redux/actions';
import { translate } from './translate';
import {
  Box,
  FlexBox,
  FormDropdownField,
  FormEmailField,
  H3,
  icons,
  LinkBox,
  Paragraph,
  PrimaryButton,
} from '../../../components';
import { useDispatch, useSelector } from '../../../hooks';
import { Popup } from '../../common/Popup';
import { organizationSelectors } from '../../../../redux/selectors';
import { fieldValidation } from '../../../../utils';

const emailHasError = (email: string, hasSubmittedWithErrors: boolean) =>
  (hasSubmittedWithErrors && email.trim() === '') ||
  (hasSubmittedWithErrors && !fieldValidation(email.trim()).isEmail());

const roleHasError = (role: string, hasSubmittedWithErrors: boolean) =>
  hasSubmittedWithErrors && role.trim() === '';

const emailErrorText = (email: string) =>
  email.trim() !== '' && !fieldValidation(email.trim()).isEmail()
    ? translate('popup.email.invalidEmail')
    : translate('popup.email.required');

export const InvitePopup: React.FC<{
  setPopupOpen: (attr: boolean) => void;
  setFetchingInvites: (attr: boolean) => void;
}> = ({ setPopupOpen, setFetchingInvites }) => {
  const [submitting, setSubmitting] = useState(false);
  const [hasSubmittedWithErrors, setHasSubmittedWithErrors] = useState(false);
  const [inviteMembers, setInviteMembers] = useState([
    { email: '', role: '', error: '', success: false },
  ]);

  const dispatch = useDispatch();

  const roles = useSelector(organizationSelectors.roles);

  const dropdownRoles = roles.map((role) => ({ label: role, value: role }));

  useEffect(() => {
    if (inviteMembers.length === 0) {
      setHasSubmittedWithErrors(false);

      setFetchingInvites(true);
      dispatch(
        organizationActions.getInvites({
          onSuccess: () => setFetchingInvites(false),
          onFailure: () => setFetchingInvites(false),
        }),
      );
      setPopupOpen(false);
      setInviteMembers([{ email: '', role: '', error: '', success: false }]);
    }
  }, [inviteMembers]);

  const inviteNewMembers = () => {
    setHasSubmittedWithErrors(true);

    let error = false;

    inviteMembers.forEach((inviteMember) => {
      if (
        emailHasError(inviteMember.email || '', true) ||
        roleHasError(inviteMember.role || '', true)
      ) {
        error = true;
      }
    });

    if (!error) {
      setSubmitting(true);
      const newInviteMembers: any[] = [];
      inviteMembers.forEach((inviteMember, index) => {
        dispatch(
          organizationActions.invite({
            email: inviteMember.email,
            onFailure: (errorText: string) => {
              const newInviteMember = {
                ...inviteMembers[index],
                error: errorText,
              };
              newInviteMembers[index] = newInviteMember;

              if (index + 1 === inviteMembers.length) {
                setSubmitting(false);
                setInviteMembers(
                  newInviteMembers.filter((m) => m.success === false),
                );
              }
            },
            onSuccess: () => {
              const newInviteMember = {
                ...inviteMembers[index],
                success: true,
              };
              newInviteMembers[index] = newInviteMember;

              if (index + 1 === inviteMembers.length) {
                setSubmitting(false);
                setInviteMembers(
                  newInviteMembers.filter((m) => m.success === false),
                );
              }
            },
          }),
        );
      });
    }
  };

  const addNewInviteMember = () => {
    setInviteMembers([
      ...inviteMembers,
      { email: '', role: '', error: '', success: false },
    ]);
  };

  const updateInviteEmail = (val: string, index: number) => {
    const memberToUpdate = { ...inviteMembers[index] };
    memberToUpdate.email = val;

    const newInviteMembers = [...inviteMembers];
    newInviteMembers[index] = memberToUpdate;
    setInviteMembers(newInviteMembers);
  };

  const updateInviteRole = (val: string, index: number) => {
    const memberToUpdate = { ...inviteMembers[index] };
    memberToUpdate.role = val;

    const newInviteMembers = [...inviteMembers];
    newInviteMembers[index] = memberToUpdate;
    setInviteMembers(newInviteMembers);
  };

  return (
    <Popup
      onClose={() => {
        dispatch(
          organizationActions.getInvites({
            onSuccess: () => setFetchingInvites(false),
            onFailure: () => setFetchingInvites(false),
          }),
        );
        setPopupOpen(false);
        setHasSubmittedWithErrors(false);

        setInviteMembers([{ email: '', role: '', error: '', success: false }]);
      }}
    >
      <FlexBox.Row alignItems="center" justifyContent="space-between">
        <H3 bold color="darkGrey">
          {translate('popup.title')}
        </H3>
      </FlexBox.Row>
      <Box marginTop="md">
        {inviteMembers.map((inviteMember, index) => (
          <Box key={index}>
            <FlexBox.Row marginBottom="md">
              <Box style={{ width: '65%' }}>
                <FormEmailField
                  label={translate('popup.email.label')}
                  placeholder={translate('popup.email.placeholder')}
                  value={inviteMember.email}
                  onChange={(val: string) => updateInviteEmail(val, index)}
                  error={{
                    hasError: emailHasError(
                      inviteMember.email || '',
                      hasSubmittedWithErrors,
                    ),
                    text: emailErrorText(inviteMember.email || ''),
                  }}
                />
              </Box>
              <Box style={{ width: '35%' }} marginLeft="md">
                <FormDropdownField
                  label={translate('popup.role.label')}
                  labelColor='#000'
                  placeholder={translate('popup.role.placeholder')}
                  value={inviteMember.role}
                  onChange={(value: any) => {
                    updateInviteRole(value, index);
                  }}
                  options={dropdownRoles || []}
                  error={{
                    hasError: roleHasError(
                      inviteMember.role || '',
                      hasSubmittedWithErrors,
                    ),
                    text: translate('popup.role.required'),
                  }}
                />
              </Box>
            </FlexBox.Row>
            {inviteMember.error && (
              <Box marginBottom="md">
                <Paragraph color="red">{inviteMember.error}</Paragraph>
              </Box>
            )}
          </Box>
        ))}
      </Box>
      {inviteMembers.length < 5 && (
        <Box marginTop="md">
          <LinkBox onClick={addNewInviteMember}>
            <FlexBox.Row alignItems="center">
              <icons.plus color={iconColors.primary} />
              <Box paddingLeft="sm">
                <Paragraph>{translate('popup.plus.text')}</Paragraph>
              </Box>
            </FlexBox.Row>
          </LinkBox>
        </Box>
      )}

      <FlexBox justifyContent="flex-end" marginTop="xl">
        <PrimaryButton
          disabled={submitting}
          loading={submitting}
          onClick={inviteNewMembers}
        >
          {translate('popup.button.text')}
        </PrimaryButton>
      </FlexBox>
    </Popup>
  );
};
