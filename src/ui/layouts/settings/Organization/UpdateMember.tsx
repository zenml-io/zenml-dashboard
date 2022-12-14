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
import { sessionSelectors, rolesSelectors } from '../../../../redux/selectors';
import { useSelector } from '../../../hooks';
import axios from 'axios'
import Select, { StylesConfig } from 'react-select'

export const UpdateMember: React.FC<{ member: any }> = ({ member }) => {

  const [username, setUsername] = useState(member?.name)
  const [password, setPassword] = useState('')
  const [popupOpen, setPopupOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [role, setRole] = useState('');

  const dispatch = useDispatch();
  const roles = useSelector(rolesSelectors.getRoles);
  const authToken = useSelector(sessionSelectors.authenticationToken);
  const authenticationToken = authToken ? authToken : '';

  const allRoles = roles?.map((e) => {
    return { value: e.id, label: e.name }
  })

  function handleChange(value: string) {
    setRole(value);
  }

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

      for (let index = 0; index < role.length; index++) {
        const singleRole = role[index];
        await axios.post(`${process.env.REACT_APP_BASE_API_URL}/role_assignments`,
                // @ts-ignore
                { user: member.id, role: singleRole?.value },
                { headers: { Authorization: `Bearer ${authToken}` }}
              )
      }
              
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
          // @ts-ignore
          description: err?.response?.data?.detail,
          type: toasterTypes.failure,
        }),
      );
      dispatch(
        showToasterAction({
          // @ts-ignore
          description: err.response?.data?.detail[1],
          type: toasterTypes.failure,
        }),
      )
    }
  };


  const colourStyles: StylesConfig<any> = {
    control: (styles: any) => ({ ...styles, width: '146px', fontSize: '12px', color: '#424240' }),
    option: (styles: any) => {
      return {
        ...styles,
        fontSize: '12px', color: '#424240'
      };
    }
  }


  return (
    <>
      {popupOpen && (
        <Popup onClose={() => setPopupOpen(false)}>
          
          <FlexBox.Row alignItems="center" justifyContent="space-between">
            <H3 bold color="darkGrey">{translate('updateMemberPopup.title')}</H3>
          </FlexBox.Row>
          <Box marginTop="sm"><Paragraph>{`${translate('updateMemberPopup.text')} ${member?.name}.`}</Paragraph></Box>

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

              <Box style={{ marginLeft: '20px' }}>
                <Paragraph size="body" style={{ color: 'black' }}><label htmlFor={username}>{'Roles'}</label></Paragraph>
                <Select options={allRoles} isMulti  onChange={(e: any) => handleChange(e)}
                  value={role}
                  placeholder={'Roles'}
                  styles={colourStyles}
                  isClearable={false}
                />
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
          <icons.edit color={iconColors.grey} />
        </LinkBox>
      </Box>
    </>
  );
};