import React, { useState, useEffect } from 'react';
import styles from './index.module.scss';
import { Box, FlexBox, Paragraph, If, Row } from '../../../../components';
import OutsideClickHandler from 'react-outside-click-handler';

type RoleSelector = {
  allRoles: Array<any>;
  role: Array<any>;
  setAllRoles: any;
  setRole: any;
};

export const RoleSelector = ({
  allRoles,
  setAllRoles,
  role,
  setRole,
}: RoleSelector) => {
  const [rolesPopup, setRolesPopup] = useState(false);

  useEffect(() => {
    for (let index = 0; index < role?.length; index++) {
      const item = role[index];
      setAllRoles(allRoles?.filter((e) => e?.label !== item?.label));
    }
    // eslint-disable-next-line
  }, [role]);

  const handleChange = async (value: any) => {
    setRole([...role, value]);

    const index = allRoles?.indexOf(value);
    allRoles?.splice(index, 1);
  };

  const removeRoleBean = async (item: any) => {
    setRole(role?.filter((e) => e !== item));
    allRoles?.push(item);
  };

  return (
    <>
      <Paragraph className={styles.label}>Roles</Paragraph>
      <FlexBox>
        <Row>
          <div style={{ position: 'relative' }}>
            <div
              className={styles.addBean}
              onClick={() => setRolesPopup(!rolesPopup)}
            >
              <p>Add +</p>
            </div>
            <If condition={rolesPopup}>
              {() => (
                <OutsideClickHandler
                  onOutsideClick={() => setRolesPopup(false)}
                >
                  <Box padding="md" className={styles.rolesPopup}>
                    <Box marginTop="sm">
                      {allRoles?.map((option: any, index: number) => (
                        <Box
                          marginTop="sm"
                          onClick={() => handleChange(option)}
                          key={index}
                        >
                          <Paragraph className={styles.roleColor}>
                            {option.label.charAt(0).toUpperCase() +
                              option.label?.slice(1)}
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
            <div key={e?.label} className={styles.roleBean}>
              <p>
                {e?.label.charAt(0).toUpperCase() + e?.label?.slice(1)}{' '}
                <span onClick={() => removeRoleBean(e)}>x</span>
              </p>
            </div>
          ))}
        </Row>
      </FlexBox>
    </>
  );
};
