import React from 'react'
import styles from './index.module.scss'
import {
  FlexBox,
  Paragraph,
  Row
} from '../../../../components';

type RoleSelector = {
    roles: Array<any>,
}

export const RoleSelectorReadOnly = ({ roles }: RoleSelector) => { 
  return (
    <>
        <Paragraph className={styles.label}>Roles</Paragraph>
        <FlexBox>
            <Row>    
                {roles?.map((e: any) => (
                    <div className={styles.roleBean}>
                        <p>{e?.name}</p>
                    </div>
                 ))}
            </Row>
        </FlexBox>
    </>
  )
}