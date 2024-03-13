/* eslint-disable */
import React, { useState } from 'react';
import styles from './index.module.scss';
import { toasterTypes } from '../../../../constants';
import {
  organizationActions,
  showToasterAction,
} from '../../../../redux/actions';
import { translate } from './translate';
import {
  Box,
  FlexBox,
  CopyField,
  H4,
  Separator,
  Paragraph,
  FormTextField,
  GhostButton,
} from '../../../components';
import { useSelector, useDispatch } from '../../../hooks';
import { PopupSmall } from '../../common/PopupSmall';
// import { RoleSelector } from './RoleSelector';
import {
  organizationSelectors,
  rolesSelectors,
  sessionSelectors,
} from '../../../../redux/selectors';
import userImage from '../../../assets/userImage.png';
import axios from 'axios';
import { RoleSelectorReadOnly } from './RoleSelector/RoleSelectorReadOnly';
import { ToggleField } from '../../common/FormElement';
import { titleCase } from '../../../../utils';

export const InvitePopup: React.FC<{
  setPopupOpen: (attr: boolean) => void;
}> = ({ setPopupOpen }) => {
  const [submitting, setSubmitting] = useState(false);
  const [name, setName] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [showTokField, setShowTokField] = useState(false);

  const dispatch = useDispatch();
  const invite: any = useSelector(organizationSelectors.invite);
  // const roles = useSelector(rolesSelectors.getRoles);
  const authToken = useSelector(sessionSelectors.authenticationToken);

  // const [role, setRole] = useState<Array<any>>([]);

  // const [allRoles, setAllRoles] = useState(
  //   roles?.map((e) => {
  //     return { value: e.id, label: e.name };
  //   }),
  // );

  const inviteNewMembers = () => {
    // if (role) {
    setSubmitting(true);
    dispatch(
      organizationActions.invite({
        is_admin: isAdmin,
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
          setSubmitting(false);
          setShowTokField(true);
          // const headers = {
          //   Authorization: `Bearer ${authToken}`,
          // };
          // try {
          //   for (let index = 0; index < role.length; index++) {
          //     const singleRole = role[index];
          //     await axios.post(
          //       `${process.env.REACT_APP_BASE_API_URL}/role_assignments`,
          //       // @ts-ignore
          //       { user: user.id, role: singleRole?.value },
          //       { headers },
          //     );
          //   }

          // }
          // catch (err) {
          // ;
          //   dispatch(
          //     showToasterAction({
          //       // @ts-ignore
          //       description: err.response?.data?.detail[1],
          //       type: toasterTypes.failure,
          //     }),
          //   );
          // }
          await dispatch(
            organizationActions.getMembers({ page: 1, size: 1000 }),
          );
        },
      }),
    );
    // }
    // else {
    //   dispatch(
    //     showToasterAction({
    //       description: 'Select Role',
    //       type: toasterTypes.failure,
    //     }),
    //   );
    // }
  };

  // const preRoles = role?.map((e: any) => {
  //   return { id: e?.value, name: e?.label };
  // });

  return (
    <>
      <PopupSmall
        onClose={() => setPopupOpen(false)}
        width="370px"
        showCloseIcon={false}
      >
        <FlexBox.Row alignItems="center" justifyContent="space-between">
          <H4 bold style={{ fontSize: '18px', fontWeight: 'bold' }}>
            {showTokField
              ? translate('popup.invite.text')
              : translate('popup.title')}
          </H4>
        </FlexBox.Row>

        <FlexBox.Row marginTop="lg" justifyContent="center">
          <Box className={styles.userImage}>
            <img src={userImage} alt="userImage" />
          </Box>
        </FlexBox.Row>

        <Box marginTop="md">
          <FormTextField
            label={translate('popup.username.label')}
            placeholder={translate('popup.username.placeholder')}
            value={name}
            onChange={(val: string) => setName(val)}
            disabled={showTokField}
          />
        </Box>
        <Box marginTop="md">
          <ToggleField
            value={isAdmin}
            onHandleChange={() =>
              setIsAdmin((prev) => {
                return !prev;
              })
            }
            label={titleCase('Admin')}
          />
        </Box>
        {/* 
        {!showTokField ? (
          <Box marginTop="lg">
            <RoleSelector
              allRoles={allRoles}
              role={role}
              setAllRoles={setAllRoles}
              setRole={setRole}
            />
          </Box>
        ) : (
          <Box marginTop="lg">
            <RoleSelectorReadOnly roles={preRoles} />
          </Box>
        )} */}

        <Box marginTop="lg" marginBottom="xxxl">
          <CopyField
            label="Invitation Link"
            value={`${window.location.origin}/signup?user=${invite?.id}&username=${name}&token=${invite?.body?.activation_token}`}
            showTokField={showTokField}
            disabled
          />
        </Box>

        <Box style={{ marginTop: '62px' }}>
          <Box marginBottom="md">
            <Separator.LightNew />
          </Box>
          <FlexBox justifyContent="center" flexWrap>
            {name && !showTokField ? (
              <Paragraph
                style={{ cursor: 'pointer', color: '#443E99' }}
                onClick={inviteNewMembers}
              >
                Generate Token
              </Paragraph>
            ) : (
              <Paragraph style={{ cursor: 'no-drop', color: '#A8A8A8' }}>
                Generate Token
              </Paragraph>
            )}
          </FlexBox>
        </Box>
      </PopupSmall>
    </>
  );
};
