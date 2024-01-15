import React, { useState } from 'react';
import styles from './index.module.scss';
import { FlexBox, Box, Paragraph } from '../../../../components';
import { UpdateMember } from '../UpdateMember';
import { TokenPopup } from '../tokenPopup';
import { getInitials } from '../../../../../utils/name';

const UserBox = ({ data, permission, setShowPasswordUpdate, setUser }: any) => {
  const [editPopup, setEditPopup] = useState(false);
  const [tokenPopup, setTokenPopup] = useState(false);

  const userFullName = data?.body.full_name ? data?.body.full_name : data?.name;
  const userInitials = getInitials(userFullName as string);

  const handleTokenPopup = (e: any) => {
    e.stopPropagation();
    setTokenPopup(true);
  };

  return (
    <>
      {editPopup && (
        <UpdateMember
          member={data}
          setEditPopup={setEditPopup}
          setShowPasswordUpdate={setShowPasswordUpdate}
          setUser={setUser}
        />
      )}
      {tokenPopup && (
        <TokenPopup
          id={data?.id}
          fullName={data?.metadata?.fullName}
          username={data?.name}
          active={data?.metadata?.active}
          // roles={data?.metadata?.roles}
          setTokenPopup={setTokenPopup}
        />
      )}

      <FlexBox.Row
        onClick={() => setEditPopup(true)}
        className={styles.userBox}
        justifyContent="center"
        marginTop="lg"
      >
        <Box style={{ width: '100%' }}>
          <Box className={styles.imageContainer}>
            <FlexBox
              justifyContent="center"
              alignItems="center"
              className={styles.sampleImage}
            >
              {userInitials}
            </FlexBox>
          </Box>

          <Box marginTop="sm">
            <Paragraph className={styles.userName}>
              {data?.body.full_name ? data?.body.full_name : data?.name}
            </Paragraph>
          </Box>
          {/* 
          <Box marginTop="sm" className={styles.rolesContainer}>
            <Row>
              {data?.metadata.roles?.map((e: any, index: number) => (
                <Paragraph
                  key={index}
                  className={styles.role}
                  style={{
                    borderLeft: index % 2 !== 0 ? '1px solid #A1A4AB' : 'none',
                  }}
                >
                  {e?.name.charAt(0).toUpperCase() + e?.name?.slice(1)}
                </Paragraph>
              ))}
            </Row>
          </Box> */}

          {!data?.body?.active && (
            <Box
              onClick={handleTokenPopup}
              marginTop="sm"
              className={styles.pendingIndicator}
            >
              <Paragraph className={styles.pendingText}>Pending</Paragraph>
            </Box>
          )}
        </Box>
      </FlexBox.Row>
    </>
  );
};

export default UserBox;
