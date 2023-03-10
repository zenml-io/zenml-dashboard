import React, { useState, useEffect } from 'react';
import styles from './index.module.scss'
import { useDispatch } from 'react-redux';
import {
  Box,
  FlexBox,
  H4,
  Paragraph,
  Separator
} from '../../../components';
import { PopupSmall } from '../../common/PopupSmall';
import { translate } from './translate';
import { organizationActions } from '../../../../redux/actions/organizations/index';
import { showToasterAction } from '../../../../redux/actions/showToasterAction';

import { sessionSelectors, rolesSelectors } from '../../../../redux/selectors';
import { useSelector } from '../../../hooks';
import { RoleSelector } from './RoleSelector';
import { formatDateToDisplayWithoutTime } from '../../../../utils';
import userImage from '../../../assets/userImage.png'
import axios from 'axios';

export const UpdateMember: React.FC<{ member: any, setEditPopup: any, setShowPasswordUpdate: any, setUser: any }> = ({ member, setEditPopup, setShowPasswordUpdate, setUser }) => {
  
  // const dispatch = useDispatch();
  // const roles = useSelector(rolesSelectors.getRoles);
  
  // eslint-disable-next-line
  const [userRoles, setUserRoles] = useState<any>([])

  // const [allRoles, setAllRoles] = useState(roles?.map((e: any) => {
  //   return { value: e.id, label: e?.name };
  // }))

  // const preRole = member?.roles?.map((e: any) => {
  //   return { value: e.id, label: e.name };
  // });

  // const [role, setRole] = useState(preRole);
  
  // const authToken = useSelector(sessionSelectors.authenticationToken);
  
  const getUserRoles = async () => {
    const { data: { items } } = await axios.get(
      `${process.env.REACT_APP_BASE_API_URL}/role_assignments?user_id=42f60eb4-534e-4c50-ad0a-2a86b0649797`,
      { headers: { Authorization: `Bearer ${authToken}` } },
    );
    return items
  }

  useEffect(() => {
    const getRole = async () => {
      await getUserRoles().then((e) => setUserRoles(e))
    }
    getRole()
    // eslint-disable-next-line
  }, [])



  const preRole = member?.roles?.map((e: any) => {
    return { value: e.id, label: e.name };
  });
// eslint-disable-next-line
  const [username, setUsername] = useState('');
  // const [password, setPassword] = useState('');
  // const [submitting, setSubmitting] = useState(false);
  const [role, setRole] = useState(preRole);

  const dispatch = useDispatch();
  const roles = useSelector(rolesSelectors.getRoles);
  const authToken = useSelector(sessionSelectors.authenticationToken);
  // const authenticationToken = authToken ? authToken : '';

  const [allRoles, setAllRoles] = useState(roles?.map((e) => {
    return { value: e.id, label: e.name };
  }))

  useEffect(() => {
    setUsername(member?.name);
    // eslint-disable-next-line
  }, [member]);


  // const onUpdate = async () => {
  //   setSubmitting(true);
  //   try {
      // if (password) {
      //   await fetchApiWithAuthRequest({
      //     url: apiUrl(endpoints.users.updateUser(member.id)),
      //     method: httpMethods.put,
      //     authenticationToken,
      //     headers: {
      //       'Content-Type': 'application/json',
      //     },
      //     data: { name: username, password: password },
      //   });
      // } else {
      //   await fetchApiWithAuthRequest({
      //     url: apiUrl(endpoints.users.updateUser(member.id)),
      //     method: httpMethods.put,
      //     authenticationToken,
      //     headers: {
      //       'Content-Type': 'application/json',
      //     },
      //     data: { name: username },
      //   });
      // }

      // const { data: { items } } = await axios.get(
      //   `${process.env.REACT_APP_BASE_API_URL}/role_assignments?user_name_or_id=${member?.name}`,
      //   { headers: { Authorization: `Bearer ${authToken}` } },
      // );
        
      //   for (let index = 0; index < items?.length; index++) {
      //     const singleDelRole = items[index];
      //     await axios.delete(
      //       `${process.env.REACT_APP_BASE_API_URL}/role_assignments/${singleDelRole?.id}`,
      //       { headers: { Authorization: `Bearer ${authToken}` } },
      //     );
      //   }

      //   for (let index = 0; index < role.length; index++) {
      //     const singleRole = role[index];
      //     await axios.post(
      //       `${process.env.REACT_APP_BASE_API_URL}/role_assignments`,
      //       // @ts-ignore
      //       { user: member.id, role: singleRole?.value },
      //       { headers: { Authorization: `Bearer ${authToken}` } },
      //     );
      //   }

  //     setSubmitting(false);
  //     setEditPopup(false);
  //     dispatch(
  //       showToasterAction({
  //         description: 'User Updated',
  //         type: toasterTypes.success,
  //       }),
  //     );
  //     await dispatch(organizationActions.getMembers({}));
  //   } catch (err) {
  //     setSubmitting(false);
  //     setEditPopup(false);

  //     dispatch(
  //       showToasterAction({
  //         // @ts-ignore
  //         description: err?.response?.data?.detail,
  //         type: toasterTypes.failure,
  //       }),
  //     );
  //     dispatch(
  //       showToasterAction({
  //         // @ts-ignore
  //         description: err.response?.data?.detail[1],
  //         type: toasterTypes.failure,
  //       }),
  //     );
  //   }
  // };

  const onDelete = () => {
    dispatch(
      organizationActions.deleteInvite({
        id: member.id,
        onSuccess: () => {
          setEditPopup(false);
          dispatch(organizationActions.getMembers({}));
          dispatch(
            showToasterAction({
              type: 'success',
              description: translate('deleteMemberPopup.successToaster'),
            }),
          );
        },
        onFailure: (err) => {
          dispatch(
            showToasterAction({
              type: 'failure',
              description: err,
            }),
          );
        },
      }),
    );
  };

  const handleClose = () => {
    setEditPopup(false); 
    setRole(preRole)
  }

  return (
        <PopupSmall width='370px' showCloseIcon={false} onClose={handleClose}
        >
          <FlexBox.Row alignItems="center" justifyContent="space-between">
            <H4 bold style={{ fontSize: '18px', fontWeight: 'bold'}}>{translate('updateMemberPopup.title')}</H4>
          </FlexBox.Row>

          <FlexBox.Row marginTop="lg" justifyContent='center'>
            <Box className={styles.userImage}>
              <img src={userImage} alt='userImage' />
            </Box>
          </FlexBox.Row>
        
          <Box marginTop="md">
            <Box>
              <Paragraph className={styles.memberName}>{member?.fullName ? member?.fullName : member?.name}</Paragraph>
            </Box>

            <Box marginTop="lg">
              <RoleSelector 
                allRoles={allRoles}
                role={role}
                setAllRoles={setAllRoles}
                setRole={setRole}
                memberId={member?.id}
                useRealTime={true}    
              />
            </Box>

            <Box marginTop='lg' style={{ fontFamily: 'Rubik', color: '#A1A4AB', fontSize: '14px', lineHeight: '17px' }}>
                <FlexBox.Row fullWidth justifyContent='space-between'>
                  <Box>Status</Box>
                  <Box>{member.active ? <>Accepted</> : <>Pending</>}</Box>
                </FlexBox.Row>
                <FlexBox.Row marginTop='sm' fullWidth justifyContent='space-between'>
                  <Box>Created at</Box>
                  <Box>{formatDateToDisplayWithoutTime(member.created)}</Box>
                </FlexBox.Row>
            </Box>

          </Box>


          <Box style={{ marginTop: '40px' }}>
            <Box marginBottom="md">
              <Separator.LightNew />
            </Box>          
            <FlexBox justifyContent="center" flexWrap marginBottom="md">
              <Paragraph style={{ cursor: 'pointer', color: '#443E99' }} onClick={() => { setShowPasswordUpdate(true); setUser(member); handleClose() }}>Update Credentials</Paragraph>
            </FlexBox>
          
            <Box marginBottom="md">
              <Separator.LightNew />
            </Box>          
            <FlexBox justifyContent="center" flexWrap>
              <Paragraph style={{ cursor: 'pointer', color: '#FF6666' }} onClick={onDelete}>Remove Member</Paragraph>
            </FlexBox>
          </Box>
        </PopupSmall>
  );
};
