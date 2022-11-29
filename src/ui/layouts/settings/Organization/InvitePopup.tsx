/* eslint-disable */
import React, { useState } from 'react';
import { toasterTypes } from '../../../../constants';
import {
  organizationActions,
  showToasterAction,
} from '../../../../redux/actions';
import { translate } from './translate';
import cn from 'classnames';
import {
  Box,
  FlexBox,
  FormTextField,
  CopyField,
  H3,
  PrimaryButton,
  Paragraph,
} from '../../../components';
import { useSelector, useDispatch } from '../../../hooks';
import { Popup } from '../../common/Popup';
import {
  organizationSelectors,
  rolesSelectors,
  sessionSelectors,
} from '../../../../redux/selectors';

import styles from './../../../../ui/components/inputs/index.module.scss';
import axios from 'axios';

export const InvitePopup: React.FC<{
  setPopupOpen: (attr: boolean) => void;
}> = ({ setPopupOpen }) => {
  const [submitting, setSubmitting] = useState(false);
  const [name, setName] = useState('');
  const [showTokField, setShowTokField] = useState(false);

  const dispatch = useDispatch();
  const invite = useSelector(organizationSelectors.invite);
  const roles = useSelector(rolesSelectors.getRoles);

  const [role, setrole] = useState('');
  const authToken = useSelector(sessionSelectors.authenticationToken);

  const inviteNewMembers = () => {
    if (role) {
      setSubmitting(true);
      dispatch(
        organizationActions.invite({
          name,
          onFailure: (errorText: string) => {
            debugger;
            dispatch(
              showToasterAction({
                description: errorText,
                type: toasterTypes.failure,
              }),
            );
            setSubmitting(false);
          },
          onSuccess: (user: any) => {
            const headers = {
              Authorization: `Bearer ${authToken}`,
            };
            axios
              .post(
                `${process.env.REACT_APP_BASE_API_URL}/users/${user.id}/roles?role_name_or_id=${role}`,
                {},
                { headers },
              )
              .then(() => {
                dispatch(organizationActions.getMembers({}));
                setSubmitting(false);
                setShowTokField(true);
              })
              .catch((errorText) => {
                dispatch(
                  showToasterAction({
                    description: errorText,
                    type: toasterTypes.failure,
                  }),
                );
                setShowTokField(true);
                setSubmitting(false);
              });
          },
        }),
      );
    } else {
      dispatch(
        showToasterAction({
          description: 'Select Role',
          type: toasterTypes.failure,
        }),
      );
    }
  };
  function handleChange(value: any) {
    setrole(value);
  }

  return (
    <Popup
      onClose={() => {
        setPopupOpen(false);
      }}
    >
      <FlexBox.Row alignItems="center" justifyContent="space-between">
        <H3 bold color="darkGrey">
          {showTokField
            ? translate('popup.invite.text')
            : translate('popup.title')}
        </H3>
      </FlexBox.Row>
      <Box marginTop="md">
        <Box>
          <FlexBox.Row marginBottom="md">
            <Box style={{ width: showTokField ? '100%' : '50%' }}>
              <FormTextField
                label={translate('popup.username.label')}
                labelColor="#000"
                placeholder={translate('popup.username.placeholder')}
                value={name}
                onChange={(val: string) => setName(val)}
                error={{
                  hasError: false,
                  text: '',
                }}
              />
            </Box>
            <Box marginLeft="md">
              <FlexBox.Column fullWidth>
                <Box paddingBottom="xs">
                  <Paragraph size="body" style={{ color: 'black' }}>
                    <label htmlFor={name}>{'Roles'}</label>
                  </Paragraph>
                </Box>
                <select
                  onChange={(e: any) => handleChange(e.target.value)}
                  value={role}
                  placeholder={'Roles'}
                  className={cn(styles.input)}
                  style={{
                    // borderTopRightRadius: 0,
                    // borderBottomRightRadius: 0,
                    width: '146px',
                    fontSize: '12px',
                    color: '#424240',
                  }}
                >
                  <option selected disabled value="">
                    {'Roles'}
                  </option>
                  {roles.map((option, index) => (
                    <option key={index} value={option.name}>
                      {option.name.toUpperCase()}
                    </option>
                  ))}
                </select>
              </FlexBox.Column>
            </Box>

            {!showTokField && (
              <Box style={{ width: '10%', marginTop: '27px' }} marginLeft="md">
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
            <Box marginTop="lg">
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
