import React, { useState } from 'react';
import styles from './index.module.scss';
import { useDispatch } from 'react-redux';
import { Box, FlexBox, H4, Paragraph, Separator } from '../../../components';
import { PopupSmall } from '../../common/PopupSmall';
import { translate } from './translate';
import { organizationActions } from '../../../../redux/actions/organizations/index';
import { showToasterAction } from '../../../../redux/actions/showToasterAction';
import { rolesSelectors } from '../../../../redux/selectors';
import { useSelector } from '../../../hooks';
import { RoleSelectorAPI } from './RoleSelector/RoleSelectorAPI';
import { formatDateToDisplayWithoutTime } from '../../../../utils';
import { getInitials } from '../../../../utils/name';

export const UpdateMember: React.FC<{
  member: TMember;
  setEditPopup: any;
  setShowPasswordUpdate: any;
  setUser: any;
}> = ({ member, setEditPopup, setShowPasswordUpdate, setUser }) => {
  const dispatch = useDispatch();
  const roles = useSelector(rolesSelectors.getRoles);

  const userFullName = member?.fullName || member?.fullName || member?.name;
  const userInitials = getInitials(userFullName as string);

  const [allRoles, setAllRoles] = useState(
    roles?.map((e) => {
      return { value: e.id, label: e.name };
    }),
  );

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
  };

  return (
    <PopupSmall width="370px" showCloseIcon={false} onClose={handleClose}>
      <FlexBox.Row alignItems="center" justifyContent="space-between">
        <H4 bold style={{ fontSize: '18px', fontWeight: 'bold' }}>
          {translate('updateMemberPopup.title')}
        </H4>
      </FlexBox.Row>

      <FlexBox.Row marginTop="lg" justifyContent="center">
        <Box className={styles.userImage}>
          <FlexBox
            justifyContent="center"
            alignItems="center"
            className={styles.sampleImage}
          >
            {userInitials}
          </FlexBox>
        </Box>
      </FlexBox.Row>

      <Box marginTop="md">
        <Box>
          <Paragraph className={styles.memberName}>
            {member?.fullName ? member?.fullName : member?.name}
          </Paragraph>
        </Box>

        <Box marginTop="lg">
          <RoleSelectorAPI
            allRoles={allRoles}
            setAllRoles={setAllRoles}
            memberId={member?.id}
          />
        </Box>

        <Box
          marginTop="lg"
          style={{
            fontFamily: 'Rubik',
            color: '#A1A4AB',
            fontSize: '14px',
            lineHeight: '17px',
          }}
        >
          <FlexBox.Row fullWidth justifyContent="space-between">
            <Box>Status</Box>
            <Box>{member.active ? <>Accepted</> : <>Pending</>}</Box>
          </FlexBox.Row>
          <FlexBox.Row marginTop="sm" fullWidth justifyContent="space-between">
            <Box>Created at</Box>
            <Box>{formatDateToDisplayWithoutTime(member.created)}</Box>
          </FlexBox.Row>
        </Box>
      </Box>

      <Box style={{ marginTop: '40px' }}>
        {member?.active && (
          <>
            <Box marginBottom="md">
              <Separator.LightNew />
            </Box>
            <FlexBox justifyContent="center" flexWrap marginBottom="md">
              <Paragraph
                style={{ cursor: 'pointer', color: '#443E99' }}
                onClick={() => {
                  setShowPasswordUpdate(true);
                  setUser(member);
                  handleClose();
                }}
              >
                Update Credentials
              </Paragraph>
            </FlexBox>
          </>
        )}

        <Box marginBottom="md">
          <Separator.LightNew />
        </Box>
        <FlexBox justifyContent="center" flexWrap>
          <Paragraph
            style={{ cursor: 'pointer', color: '#FF6666' }}
            onClick={onDelete}
          >
            Remove Member
          </Paragraph>
        </FlexBox>
      </Box>
    </PopupSmall>
  );
};
