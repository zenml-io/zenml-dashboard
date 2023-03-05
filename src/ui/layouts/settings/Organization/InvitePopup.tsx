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
  GenerateTokenField,
  CopyField,
  H4,
  Separator,
  Paragraph
} from '../../../components';
import { useSelector, useDispatch } from '../../../hooks';
import { PopupSmall } from '../../common/PopupSmall';
import { RoleSelector } from './RoleSelector'
import {
  organizationSelectors,
  rolesSelectors,
  sessionSelectors,
} from '../../../../redux/selectors';
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
        
        <Box marginTop="lg">    
          <GenerateTokenField
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
          />
        </Box>

        <Box marginTop="lg">
            <CopyField
              label="Invitation Link"
              labelColor='rgba(66, 66, 64, 0.5)'
              value={`${window.location.origin}/signup?user=${invite?.id}&username=${name}&token=${invite?.activationToken}`}
              showTokField={showTokField}
              disabled
            />
        </Box>
   
        {!showTokField && ( 
          <Box marginTop='lg' marginBottom='xxxl' >   
            <RoleSelector
              allRoles={allRoles}
              role={role}
              setAllRoles={setAllRoles}
              setRole={setRole}  
            />
          </Box>
        )} 
        
        <Box style={{ marginTop: '62px' }}>
          <Box marginBottom="md">
            <Separator.LightNew />
          </Box>          
          <FlexBox justifyContent="center" flexWrap>
           <Paragraph style={{ cursor: 'pointer' }} onClick={() => setPopupOpen(false)}>Cancel</Paragraph>
            {/* {!showTokField && (
              <>
                <Box marginRight="sm">
                  <GhostButton onClick={() => setPopupOpen(false)}>
                    {translate('updateMemberPopup.cancelButton.text')}
                  </GhostButton>
                </Box>
                <Box>
                  <PrimaryButton
                    disabled={submitting}
                    loading={submitting}
                    onClick={inviteNewMembers}
                  >
                    {translate('popup.button.text')}
                  </PrimaryButton>
                </Box>
              </>
            )} */}
          </FlexBox>
        </Box>

      </PopupSmall>
    </>
  );
};