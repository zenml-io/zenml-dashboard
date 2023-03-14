import React, { useState, useEffect } from 'react'
import styles from './index.module.scss'
import {
  Box,
  FlexBox,
  Paragraph,
  If,
  Row
} from '../../../../components';
import { sessionSelectors } from '../../../../../redux/selectors';
import { useSelector, useDispatch } from '../../../../hooks';
import OutsideClickHandler from 'react-outside-click-handler';
import axios from 'axios';
import { organizationActions } from '../../../../../redux/actions';


type RoleSelector = {
    allRoles: Array<any>,
    setAllRoles: any,
    memberId: any,
}

export const RoleSelectorAPI = ({ allRoles, setAllRoles, memberId }: RoleSelector) => {

    const [rolesPopup, setRolesPopup] = useState(false);
    const authToken = useSelector(sessionSelectors.authenticationToken);
    const dispatch = useDispatch()
    const [role, setRole] = useState([])
   
    const getUserRoles = async () => {
        const { data } = await axios.get(`${process.env.REACT_APP_BASE_API_URL}/role_assignments?user_id=${memberId}`, { headers: { Authorization: `Bearer ${authToken}` } });
        return setRole(data?.items)
    }

    useEffect(() => {
        const getRole = async () => {
          await getUserRoles()
        }
        getRole()
        // eslint-disable-next-line
    }, [setRole])
    

    useEffect(() => {
        for (let index = 0; index < role?.length; index++) {
            const item = role[index] as any;
            setAllRoles(allRoles?.filter((e) => e?.label !== item?.role?.name))            
        }
        // eslint-disable-next-line
    }, [role])
    
    const handleChange = async (value: any) => {
       await axios.post(`${process.env.REACT_APP_BASE_API_URL}/role_assignments`, { user: memberId, role: value?.value }, { headers: { Authorization: `Bearer ${authToken}` } });    
       const { data } = await axios.get(`${process.env.REACT_APP_BASE_API_URL}/role_assignments?user_id=${memberId}`, { headers: { Authorization: `Bearer ${authToken}` } })
       setRole(data?.items);

       const index = allRoles?.indexOf(value);
       allRoles?.splice(index, 1)
       await dispatch(organizationActions.getMembers({}))
    }
    
    const removeRoleBean = async (item: any) => {
       await axios.delete(`${process.env.REACT_APP_BASE_API_URL}/role_assignments/${item?.id}`, { headers: { Authorization: `Bearer ${authToken}` } });
       const { data } = await axios.get(`${process.env.REACT_APP_BASE_API_URL}/role_assignments?user_id=${memberId}`, { headers: { Authorization: `Bearer ${authToken}` } })
       setRole(data?.items);
       allRoles?.push({ value: item.id, label: item?.role?.name })
       await dispatch(organizationActions.getMembers({}))
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
                                        {/* {option.label} */}
                                        {option?.label?.charAt(0).toUpperCase() + option?.label?.slice(1)}
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
                        <p>{e?.role?.name?.charAt(0)?.toUpperCase() + e?.role?.name?.slice(1)} <span onClick={() => removeRoleBean(e)} >x</span></p>
                        {/* <p>{e?.role?.name} <span onClick={() => removeRoleBean(e)}>x</span></p> */}
                    </div>
                 ))}
            </Row>
        </FlexBox>
    </>
  )
}