import React, { useState } from 'react'
import styles from './index.module.scss'
import {
  Box,
  FlexBox,
  Paragraph,
  If,
  Row
} from '../../../../components';
import OutsideClickHandler from 'react-outside-click-handler';

type RoleSelector = {
    allRoles: Array<any>,
    role: Array<any>,
    setAllRoles: any,
    setRole: any
}

export const RoleSelector = ({ allRoles, setAllRoles, role, setRole }: RoleSelector) => {
    
    const [rolesPopup, setRolesPopup] = useState(false);

    const handleChange = async (value: any) => {
       setRole([...role, value]);

       const index = allRoles?.indexOf(value);
       allRoles?.splice(index, 1)
    }
    
    const removeRoleBean = (item: any) => {
      const index = role?.indexOf(item);
      role?.splice(index, 1);
    }
      
  return (
    <>
        <Paragraph className={styles.label}>Roles</Paragraph>
        <FlexBox>
            <Row>
                <div style={{ position: 'relative' }}>
                    <div className={styles.addBean} onClick={() => setRolesPopup(!rolesPopup)}><p>Add +</p></div>
                    <If condition={rolesPopup}>
                        {() => (
                            <OutsideClickHandler
                            onOutsideClick={() => setRolesPopup(false)}
                            >
                            <Box
                                padding="md"
                                className={styles.rolesPopup}
                            >
                                <Box marginTop="sm">
                                {allRoles?.map((option: any, index: number) => (
                                    <Box
                                    marginTop="sm"
                                    onClick={() => handleChange(option)}
                                    key={index}
                                    >
                                    <Paragraph className={styles.roleColor}>
                                        {option.label.substring(0, 10)}
                                    </Paragraph>
                                    </Box>
                                ))}
                                </Box>
                            </Box>               
                            </OutsideClickHandler>
                        )}
                    </If>
                </div>           
                {role?.map((e: any) => (
                    <div className={styles.roleBean}>
                        <p>{e?.label} <span onClick={() => removeRoleBean(e)} >x</span></p>
                    </div>
                 ))}
            </Row>
        </FlexBox>
    </>
  )
}