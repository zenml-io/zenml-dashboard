/* eslint-disable */
import React, { useState } from 'react';
import styles from './index.module.scss'
import { toasterTypes } from '../../../../constants';
import {
  organizationActions,
  showToasterAction,
} from '../../../../redux/actions';
import { translate } from './translate';
import {
  Box,
  FlexBox,
  // GenerateTokenField,
  CopyField,
  H4,
  Separator,
  Paragraph,
  FormTextField
} from '../../../components';
import { useSelector, useDispatch } from '../../../hooks';
import { PopupSmall } from '../../common/PopupSmall';
import { RoleSelector } from './RoleSelector'
import {
  organizationSelectors,
  rolesSelectors,
  sessionSelectors,
} from '../../../../redux/selectors';
import userImage from '../../../assets/userImage.png'
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
  const authToken = useSelector(sessionSelectors.authenticationToken);

  const [role, setRole] = useState<any>([]);

  const [allRoles, setAllRoles] = useState(roles?.map((e) => {
    return { value: e.id, label: e.name }
  }))

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

  return (
    <>
      <PopupSmall onClose={() => setPopupOpen(false)} width='370px' showCloseIcon={false}>
        <FlexBox.Row alignItems="center" justifyContent="space-between">
          <H4 bold style={{ fontSize: '18px', fontWeight: 'bold'}}>{showTokField ? translate('popup.invite.text') : translate('popup.title')}</H4>
        </FlexBox.Row>

        <FlexBox.Row marginTop="lg" justifyContent='center'>
          <Box className={styles.userImage}>
           <img src={userImage} alt='userImage' />
          </Box>
        </FlexBox.Row>
        
        <Box marginTop="md">    
          <FormTextField 
            label={translate('popup.username.label')}
            labelColor="rgba(66, 66, 64, 0.5)"
            placeholder={translate('popup.username.placeholder')}
            value={name}
            onChange={(val: string) => setName(val)}
            disabled={showTokField}  
          />
          
          {/* <GenerateTokenField
            label={translate('popup.username.label')}
            labelColor="rgba(66, 66, 64, 0.5)"
            placeholder={translate('popup.username.placeholder')}
            value={name}
            onChange={(val: string) => setName(val)}
            handleClick={inviteNewMembers}
            loading={submitting}
            hideButton={showTokField}
            error={{
              hasError: false,
              text: '',
            }}
          /> */}
        </Box>

        {!showTokField && ( 
          <Box marginTop='lg'>   
            <RoleSelector
              allRoles={allRoles}
              role={role}
              setAllRoles={setAllRoles}
              setRole={setRole}  
            />
          </Box>
        )} 
        
        <Box marginTop="lg" marginBottom='xxxl'>
            <CopyField
              label="Invitation Link"
              labelColor='rgba(66, 66, 64, 0.5)'
              value={`${window.location.origin}/signup?user=${invite?.id}&username=${name}&token=${invite?.activationToken}`}
              showTokField={showTokField}
              disabled
            />
        </Box>
   
        <Box style={{ marginTop: '62px' }}>
          <Box marginBottom="md">
            <Separator.LightNew />
          </Box>          
          <FlexBox justifyContent="center" flexWrap marginBottom='md' >
            <Paragraph style={{ cursor: 'pointer', color: '#443E99' }} onClick={inviteNewMembers}>Generate Token</Paragraph>
          </FlexBox>
          <Box marginBottom="md">
            <Separator.LightNew />
          </Box>          
          <FlexBox justifyContent="center" flexWrap>
           <Paragraph style={{ cursor: 'pointer' }} onClick={() => setPopupOpen(false)}>Close</Paragraph>
          </FlexBox>
        </Box>

      </PopupSmall>
    </>
  );
};