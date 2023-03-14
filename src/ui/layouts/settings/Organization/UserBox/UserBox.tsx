import React, { useState } from 'react'
import styles from './index.module.scss'

import { FlexBox, Box, Row, Paragraph } from '../../../../components'
// import userImage from '../../../../assets/userImage.png'
import { UpdateMember } from '../UpdateMember'
import { TokenPopup } from '../tokenPopup'
import { getInitials } from '../../../../../utils/name';


const UserBox = ({ data, permission, setShowPasswordUpdate, setUser }: any) => {
  
    const [editPopup, setEditPopup] = useState(false)
    const [tokenPopup, setTokenPopup] = useState(false)

    const userFullName = data?.fullName || data?.fullName || data?.name;
    const userInitials = getInitials(userFullName as string);

    const handleTokenPopup = (e: any) => {
        e.stopPropagation() 
        setTokenPopup(true)
    }

 return (
    <>
    {permission && editPopup && <UpdateMember member={data} setEditPopup={setEditPopup} setShowPasswordUpdate={setShowPasswordUpdate} setUser={setUser} />}
    {permission && tokenPopup && <TokenPopup id={data?.id} fullName={data?.fullName} username={data?.name} active={data?.active} roles={data?.roles} setTokenPopup={setTokenPopup} />}
               
    <FlexBox.Row onClick={() => setEditPopup(true)} className={styles.userBox} justifyContent='center' marginTop='lg'>

        <Box>
            <Box className={styles.imageContainer}>
                {/* <img src={userImage} alt='userImage' /> */}
                <FlexBox
                  justifyContent="center"
                  alignItems="center"
                  className={styles.sampleImage}
                >
                  {userInitials}
                </FlexBox>
            </Box>

            <Box marginTop='sm'>
                <Paragraph className={styles.userName}>{data?.name}</Paragraph>
            </Box>
   
            <Box marginTop='sm' className={styles.rolesContainer}>
                <Row>
                    {data?.roles?.map((e: any, index: number) => (
                        <Paragraph className={styles.role} style={{ borderLeft: index % 2!==0 ? '1px solid #A1A4AB' : 'none' }}>
                            {e?.name.charAt(0).toUpperCase() + e?.name?.slice(1)}
                        </Paragraph>
                    ))}
                </Row>
            </Box>

            {!data?.active && (
                <Box onClick={handleTokenPopup} marginTop='sm' className={styles.pendingIndicator}>
                    <Paragraph className={styles.pendingText}>Pending</Paragraph>
                </Box>
            )}     
        </Box>

    </FlexBox.Row>
    </>
  )
}

export default UserBox