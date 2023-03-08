import React, { useState } from 'react';
import styles from './index.module.scss'
import {
  Box,
  FlexBox,
  EditField,
  Paragraph
} from '../../components';
import { icons } from '../../components';
import { iconColors, iconSizes } from '../../../constants';
import { useRequestOnMount, useSelector } from '../../hooks';
import {
  userActions,
} from '../../../redux/actions';

import { sessionSelectors, userSelectors } from '../../../redux/selectors';
import { getTranslateByScope } from '../../../services';
import { PrimaryButton } from '../../components/buttons/index';
import { EmailPopup } from './EmailPopup';
import { PasswordPopup } from './PasswordPopup';
import { formatDateToDisplay } from '../../../utils';
import jwt_decode from 'jwt-decode';
import userImage from '../../assets/userImage.png'
import starsIcon from '../../assets/stars.svg'
// import Tour from './Tour

export const translate = getTranslateByScope('ui.layouts.PersonalDetails');

export const PersonalDetails: React.FC = () => {
  useRequestOnMount(userActions.getMy, {});
  const user = useSelector(userSelectors.myUser);

  const [popupOpen, setPopupOpen] = useState(false);
  const [passwordPopupOpen, setPasswordPopupOpen] = useState(false);
  const [fullName, setFullName] = useState(user?.fullName);
  const [username, setUsername] = useState(user?.name);
  const [selectedImage, setSelectedImage] = useState<any>(userImage);

  const authToken = useSelector(sessionSelectors.authenticationToken);
  if (authToken) {
    var decoded: any = jwt_decode(authToken as any);
  }

  if (!user) return null;

  const previewImage = (e: any) => {
    const objectUrl = URL.createObjectURL(e.files[0]);
    setSelectedImage(objectUrl);
  };

  return (
    <>
      {popupOpen && (
        <EmailPopup
          userId={user?.id}
          fullName={fullName}
          username={username}
          setPopupOpen={setPopupOpen}
        /> 
      )}
      {/* <Tour /> */}
      <FlexBox.Row style={{ marginLeft: '40px', width: '100%' }} justifyContent='space-between'>
        <Box marginTop="lg" style={{ width: '25%' }}>
        
              <Box marginBottom="lg" className={styles.imageContainer}>
                <img src={selectedImage} alt='userImage' />             
                <div className={styles.imageUploader}>
                  <label className={styles.custom_file_upload}>
                    <input
                      type="file"
                      name="img"
                      alt="by Zenml"
                      accept="image/*"
                      onChange={(e) => previewImage(e.target)}
                    />
                    <icons.share size={iconSizes.lg} color={iconColors.grey} style={{ cursor: 'pointer' }}  />
                  </label>
                </div>
              </Box>

              <Box marginTop='lg'>
                <EditField 
                  disabled={!decoded.permissions.includes('me')}
                  label={translate('form.fullName.label')}
                  labelColor="#000"
                  placeholder={translate('form.fullName.placeholder')}
                  value={fullName ? fullName : ''}
                  onChangeText={(val: string) => setFullName(val)}
                />
              </Box>

              <Box marginTop='lg'>
                <EditField 
                  disabled={!decoded.permissions.includes('me')}
                  label={translate('form.username.label')}
                  labelColor="#000"
                  placeholder={translate('form.username.placeholder')}
                  value={username ? username : ''}
                  onChangeText={(val: string) => setUsername(val)}
                />
              </Box>

              <Box marginTop='lg'>
                <Paragraph>Roles</Paragraph>
                <FlexBox.Row>
                  {user?.roles?.map((e: any) => (
                    <div className={styles.roleBean}>
                      <p>{e?.name.charAt(0).toUpperCase() + e?.name?.slice(1)}</p>
                    </div>
                  ))}
                </FlexBox.Row>
              </Box>

              <Box marginTop='lg'>
                <Paragraph>Acivated</Paragraph>
                <div className={styles.date}>{formatDateToDisplay(user.created)}</div>
              </Box>

              <Box marginTop='xxxl' style={{ display: 'flex' }}>
                <PrimaryButton onClick={() => setPasswordPopupOpen(true)}>
                  Update Password
                </PrimaryButton>

                {/* {fullName !== user.fullName && username !== user.name || !decoded.permissions.includes('me') && */}
                {/* eslint-disable-next-line */}
                {fullName !== user?.fullName || username !== user?.name &&
                  (
                  <PrimaryButton onClick={() => setPopupOpen(true)} style={{ marginLeft: '10px' }}>
                    {translate('nameReset.label')}
                  </PrimaryButton>
                )}
              </Box>        

        </Box>

        <Box marginTop='xl' marginRight='xl'>
          <Box className={styles.appDetails}>
            <Box><img src={starsIcon} alt='stars-icon'/></Box>
            <Paragraph className={styles.appDetailsText}>Open Source Version</Paragraph>
          </Box>
          <Box>
            <Paragraph className={styles.uiVersionText}>UI Version v0.14.0</Paragraph>
          </Box>
          <Box>
            <Paragraph className={styles.appVersionText}>ZenML v0.14.0</Paragraph>
          </Box>
        </Box>

        {passwordPopupOpen && <PasswordPopup username={user?.name} user={user} setPopupOpen={setPasswordPopupOpen} />}
      </FlexBox.Row>
    </>
  );
};
