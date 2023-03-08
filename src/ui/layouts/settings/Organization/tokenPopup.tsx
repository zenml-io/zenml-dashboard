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
  FormTextField,
  Paragraph,
  CopyField,
  H4,
  Separator,
} from '../../../components';
import { useDispatch, useSelector } from '../../../hooks';
import { PopupSmall } from '../../common/PopupSmall';
import { organizationSelectors } from '../../../../redux/selectors';
import { RoleSelectorReadOnly } from './RoleSelector/RoleSelectorReadOnly';
import userImage from '../../../assets/userImage.png'


export const TokenPopup: React.FC<{
  id: string;
  username: string;
  active: boolean;
  roles: Array<any>;
  setTokenPopup: any;
}> = ({ id, username, active, roles, setTokenPopup }) => {
  
  const [submitting, setSubmitting] = useState(false);
  const [showTokField, setShowTokField] = useState(false);

  const dispatch = useDispatch();

  const inviteCode = useSelector(organizationSelectors.inviteForCode);

  const generateToken = () => {
    setSubmitting(true);
    dispatch(
      organizationActions.inviteByCode({
        username,
        onFailure: (errorText: string) => {
          dispatch(
            showToasterAction({
              description: errorText,
              type: toasterTypes.failure,
            }),
          );
          setSubmitting(false);
          setTokenPopup(false);
        },
        onSuccess: () => {
          setSubmitting(false);
          setShowTokField(true);
        },
      }),
    );
  };

  const onClose = () => {
    setShowTokField(false);
    setSubmitting(false);
    setTokenPopup(false);
  };

  return (
        <PopupSmall onClose={onClose} width='370px' showCloseIcon={false}>
          <FlexBox.Row alignItems="center" justifyContent="space-between">
            <H4 bold style={{ fontSize: '18px', fontWeight: 'bold'}}>{translate('popup.generateInviteModal.title')}</H4>  
          </FlexBox.Row>
        
          <FlexBox.Row marginTop="lg" justifyContent='center'>
            <Box className={styles.userImage}>
              <img src={userImage} alt='userImage' />
            </Box>
          </FlexBox.Row>
        
          <Box marginTop='md'>
            <FormTextField
              label={translate('popup.username.label')}
              labelColor="rgba(66, 66, 64, 0.5)"
              placeholder={translate('popup.username.placeholder')}
              value={username}
              disabled
            />
          </Box>

          <Box marginTop='lg'>
            <RoleSelectorReadOnly roles={roles} />
          </Box>              

          <Box marginTop="lg">
            <CopyField
              label="Invitation Link"
              labelColor='rgba(66, 66, 64, 0.5)'
              value={`${window.location.origin}/signup?user=${id}&username=${username}&token=${inviteCode}`}
              showTokField={showTokField}
              disabled
            />
          </Box>
          
          <Box style={{ marginTop: '62px' }}>
            <Box marginBottom="md">
              <Separator.LightNew />
            </Box>          
            <FlexBox justifyContent="center" flexWrap>
             <Paragraph style={{ cursor: 'pointer', color: '#443E99' }}  onClick={generateToken}>
                {submitting ? <>Generating</> : translate('popup.generateInviteModal.button.text')}
              </Paragraph>
            </FlexBox>
          </Box>

        </PopupSmall>
  );
};
