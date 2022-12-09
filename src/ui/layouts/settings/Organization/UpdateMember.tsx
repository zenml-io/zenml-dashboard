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
  FormTextField,
  FormPasswordField,
  PrimaryButton,
} from '../../../components';
import { Popup } from '../../common/Popup/index';
import { translate } from './translate';
import { organizationActions } from '../../../../redux/actions/organizations/index';
import { showToasterAction } from '../../../../redux/actions/showToasterAction';
import { iconColors } from '../../../../constants/icons';

import { toasterTypes } from '../../../../constants';
import { fetchApiWithAuthRequest } from '../../../../api/fetchApi';
import { endpoints } from '../../../../api/endpoints';
import { httpMethods } from '../../../../api/constants';
import { apiUrl } from '../../../../api/apiUrl';
import { sessionSelectors } from '../../../../redux/selectors/session';
import { useSelector } from '../../../hooks';


export const UpdateMember: React.FC<{ member: TInvite }> = ({ member }) => {

  const [username, setUsername] = useState(member?.name)
  const [password, setPassword] = useState('')
  const [popupOpen, setPopupOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const dispatch = useDispatch();

  const authToken = useSelector(sessionSelectors.authenticationToken);
  const authenticationToken = authToken ? authToken : '';

  const onUpdate = async () => {
    setSubmitting(true);

    try {
      await fetchApiWithAuthRequest({
        url: apiUrl(endpoints.users.updateUser(member.id)),
        method: httpMethods.put,
        authenticationToken,
        headers: {
          'Content-Type': 'application/json',
        },
        data: { name: username, password: password },
      });
      setSubmitting(false);
      setPopupOpen(false);
      dispatch(
        showToasterAction({
          description: 'User Updated',
          type: toasterTypes.success,
        }),
      );
      await dispatch(organizationActions.getMembers({}));    
    } catch (err) {
      setSubmitting(false);
      setPopupOpen(false);
      dispatch(
        showToasterAction({
          description: 'Something went wrong',
          type: toasterTypes.failure,
        }),
      );
    }
  };

  return (
    <>
      {popupOpen && (
        <Popup onClose={() => setPopupOpen(false)}>
          <FlexBox.Row alignItems="center" justifyContent="space-between">
            <H3 bold color="darkGrey">
              {translate('updateMemberPopup.title')}
            </H3>
          </FlexBox.Row>
          <Box marginTop="sm">
            <Paragraph>{`${translate('updateMemberPopup.text')} ${
              member?.name
            }.`}</Paragraph>
          </Box>

          <Box marginTop='lg'>
            <Box marginTop="md">
              <FormTextField
                label={translate('updateMemberPopup.form.username.label')}
                labelColor="#000"
                placeholder={translate('updateMemberPopup.form.username.placeholder')}
                value={username ? username : ''}
                onChange={(val: string) => setUsername(val)}
              />
            </Box>
            <Box marginTop="md">
              <FormPasswordField
                label={translate('updateMemberPopup.form.password.label')}
                labelColor="#000"
                placeholder={translate('updateMemberPopup.form.password.placeholder')}
                value={password}
                onChange={(val: string) => setPassword(val)}
                error={{
                  hasError: password.trim() === undefined,
                }}
                showPasswordOption
              />
              </Box>
          </Box>

          <FlexBox justifyContent="flex-end" marginTop="xl" flexWrap>
            <Box marginRight="sm" marginBottom="md">
              <GhostButton onClick={() => setPopupOpen(false)}>
                {translate('updateMemberPopup.cancelButton.text')}
              </GhostButton>
            </Box>
            <Box marginLeft="sm" marginRight="sm" marginBottom="md">
              <PrimaryButton
                disabled={submitting}
                loading={submitting}
                onClick={onUpdate}
              >
                {translate('updateMemberPopup.successButton.text')}
              </PrimaryButton>
            </Box>
          </FlexBox>
        </Popup>
      )}
      <Box>
        <LinkBox onClick={() => setPopupOpen(true)}>
          <icons.settings color={iconColors.grey} />
        </LinkBox>
      </Box>
    </>
  );
};
