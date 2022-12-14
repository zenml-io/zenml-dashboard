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
  FormTextField,
  CopyField,
  H3,
  PrimaryButton,
  Paragraph,
  GhostButton
} from '../../../components';
import { useSelector, useDispatch } from '../../../hooks';
import { Popup } from '../../common/Popup';
import {
  organizationSelectors,
  rolesSelectors,
  sessionSelectors,
} from '../../../../redux/selectors';
import axios from 'axios';
import Select, { StylesConfig } from 'react-select'

export const InvitePopup: React.FC<{ 
  setPopupOpen: (attr: boolean) => void;
}> = ({ setPopupOpen }) => {
  const [submitting, setSubmitting] = useState(false);
  const [name, setName] = useState('');
  const [showTokField, setShowTokField] = useState(false);

  const dispatch = useDispatch();
  const invite = useSelector(organizationSelectors.invite);
  const roles = useSelector(rolesSelectors.getRoles);
  const authToken = useSelector(sessionSelectors.authenticationToken);

  const [role, setRole] = useState('');

  const allRoles = roles?.map((e) => {
    return { value: e.id, label: e.name }
  })

  const inviteNewMembers = () => {
    if (role) {
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
          onSuccess: async (user: any) => {
            const headers = {
              Authorization: `Bearer ${authToken}`,
            };
            
            try {
                for (let index = 0; index < role.length; index++) {
                  const singleRole = role[index];
                  await axios.post(`${process.env.REACT_APP_BASE_API_URL}/role_assignments`,
                                // @ts-ignore
                                { user: user.id, role: singleRole?.value },
                                { headers },
                  )
                }      
                setSubmitting(false);
                setShowTokField(true);
            } catch (err) {
                setSubmitting(false);
                setPopupOpen(false)
                dispatch(
                  showToasterAction({
                    // @ts-ignore
                    description: err.response?.data?.detail[1],
                    type: toasterTypes.failure,
                  }),
                );              
            }
            await dispatch(organizationActions.getMembers({}));
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
    setRole(value);
  }

  const colourStyles: StylesConfig<any> = {
    control: (styles: any) => ({ ...styles, width: '160px', fontSize: '12px', color: '#424240' }),
    option: (styles: any) => {
      return {
        ...styles,
        fontSize: '12px', color: '#424240'
      };
    }
  }

  return (
    <>
  
      <Popup onClose={() => setPopupOpen(false)} >
        <FlexBox.Row alignItems="center" justifyContent="space-between">
          <H3 bold color="darkGrey">{showTokField ? translate('popup.invite.text') : translate('popup.title')}</H3>
        </FlexBox.Row>
        
        <Box marginTop="lg">
            <FlexBox.Row alignItems='center' marginTop="md" style={{ width: '100%' }} >
              <Box style={{ width: showTokField ? '100%' : '70%' }}>
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

             {!showTokField && ( 
              <Box style={{ marginLeft: '20px' }}>
                <Paragraph size="body" style={{ color: 'black' }}><label htmlFor={name}>{'Roles'}</label></Paragraph>
                <Select 
                  options={allRoles} 
                  isMulti  
                  onChange={(e: any) => handleChange(e)}
                  value={role}
                  placeholder={'Roles'}
                  styles={colourStyles}
                  isClearable={false}
                />
              </Box>
             )} 
            </FlexBox.Row>
        </Box>


        {showTokField && (
          <Box marginTop="lg">
            <CopyField
              label={`Invitation Link - please send this to ${name} for this user to finish their registration`}
              value={`${window.location.origin}/signup?user=${invite?.id}&username=${name}&token=${invite?.activationToken}`}
              disabled
            />
          </Box>
        )}



        <FlexBox justifyContent="flex-end" marginTop="xl" flexWrap>
          {!showTokField && (
            <>
              <Box marginRight="sm" marginBottom="md">
                <GhostButton onClick={() => setPopupOpen(false)}>
                  {translate('updateMemberPopup.cancelButton.text')}
                </GhostButton>
              </Box>
              <Box marginBottom='md' >
                <PrimaryButton
                  disabled={submitting}
                  loading={submitting}
                  onClick={inviteNewMembers}
                >
                  {translate('popup.button.text')}
                </PrimaryButton>
              </Box>
            </>
          )}
        </FlexBox>
      
      </Popup>
    </>
  );
};