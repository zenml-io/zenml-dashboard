import React, { useState } from 'react';
import cn from 'classnames';
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
import { sessionSelectors, rolesSelectors } from '../../../../redux/selectors';
import { useSelector } from '../../../hooks';
import styles from './../../../../ui/components/inputs/index.module.scss';
// import axios from 'axios'

export const UpdateMember: React.FC<{ member: any }> = ({ member }) => {

  const [username, setUsername] = useState(member?.user?.name)
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
        url: apiUrl(endpoints.users.updateUser(member.user.id)),
        method: httpMethods.put,
        authenticationToken,
        headers: {
          'Content-Type': 'application/json',
        },
        data: { name: username, password: password },
      });


      // await axios.post(`${process.env.REACT_APP_BASE_API_URL}/role_assignments`,
      //           { user: member.user.id, role: role },
      //           { headers: { Authorization: `Bearer ${authToken}` }}
      //         )
              
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

  const roles = useSelector(rolesSelectors.getRoles);

  const [role, setRole] = useState('');

  function handleChange(value: string) {
    setRole(value);
  }


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
          <FlexBox.Row alignItems='center' marginTop="md" style={{ width: '100%' }} >
            <Box style={{ width: '80%' }}>
              <FormTextField
                label={translate('updateMemberPopup.form.username.label')}
                labelColor="#000"
                placeholder={translate('updateMemberPopup.form.username.placeholder')}
                value={username ? username : ''}
                onChange={(val: string) => setUsername(val)}
              />
            </Box>
            <Box style={{ marginLeft: '20px' }} >
              <Paragraph style={{ marginBottom: '10px' }} >role</Paragraph>
              <select
                onChange={(e: any) => handleChange(e.target.value)}
                value={role}
                placeholder={'Roles'}
                className={cn(styles.input)}
                style={{
                  width: '146px',
                  fontSize: '12px',
                  color: '#424240',
                }}
                >
                  <option selected disabled value="">
                    {'Roles'}
                  </option>
                  {roles.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.name.toUpperCase()}
                    </option>
                  ))}
                </select>
            </Box>
          </FlexBox.Row>

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
