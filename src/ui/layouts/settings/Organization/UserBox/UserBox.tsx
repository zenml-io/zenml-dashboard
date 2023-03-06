import React, { useState } from 'react'
import styles from './index.module.scss'

import { FlexBox, Box, Row, Paragraph } from '../../../../components'
import userImage from '../../../../assets/userImage.png'
import { UpdateMember } from '../UpdateMember'

const UserBox = ({ data, permission }: any) => {
  
    const [editPopup, setEditPopup] = useState(false)

 return (
    <>
    {permission && editPopup && <UpdateMember member={data} setEditPopup={setEditPopup} />}
               
    <FlexBox.Row onClick={() => setEditPopup(true)} className={styles.userBox} justifyContent='center' marginTop='lg'>

        <Box>
            <Box className={styles.imageContainer}>
                <img src={userImage} alt='userImage' />             
            </Box>

            <Box marginTop='sm'>
                <Paragraph className={styles.userName}>{data?.name}</Paragraph>
            </Box>
   
            <Box marginTop='sm' className={styles.rolesContainer}>
                <Row>
                    {data?.roles?.map((e: any, index: number) => (
                        <Paragraph className={styles.role} style={{ borderLeft: index % 2!==0 ? '1px solid #A1A4AB' : 'none' }}>{e.name}</Paragraph>
                    ))}
                </Row>
            </Box>

            {!data?.active && (
                <Box marginTop='sm' className={styles.pendingIndicator}>
                    <Paragraph className={styles.pendingText}>Pending</Paragraph>
                </Box>
            )}     
        </Box>

    </FlexBox.Row>
    </>
  )
}

export default UserBox