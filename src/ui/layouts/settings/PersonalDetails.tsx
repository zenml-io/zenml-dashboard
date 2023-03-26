import React, { useState, useEffect } from 'react';
import styles from './index.module.scss';
import {
  Box,
  FlexBox,
  EditFieldSettings,
  Paragraph,
  // ColoredCircle
} from '../../components';
// import { icons } from '../../components';
// import { iconColors, iconSizes } from '../../../constants';
import { useRequestOnMount, useSelector } from '../../hooks';
import { userActions } from '../../../redux/actions';

import { sessionSelectors, userSelectors } from '../../../redux/selectors';
import { getTranslateByScope } from '../../../services';
import { PrimaryButton } from '../../components/buttons/index';
import { EmailPopup } from './EmailPopup';
import { PasswordPopup } from './PasswordPopup';
import { formatDateToDisplay } from '../../../utils';
import jwt_decode from 'jwt-decode';
import starsIcon from '../../assets/stars.svg';
import { getInitials } from '../../../utils/name';
import axios from 'axios';
import { ConnectHub } from './ConnectHub';

// TODO:
const hubIsConnected = false;

export const translate = getTranslateByScope('ui.layouts.PersonalDetails');

export const PersonalDetails: React.FC = () => {
  useRequestOnMount(userActions.getMy, {});
  const user = useSelector(userSelectors.myUser);
  const userFullName = user?.fullName || user?.fullName || user?.name;
  const userInitials = getInitials(userFullName as string);

  const [popupOpen, setPopupOpen] = useState(false);
  const [passwordPopupOpen, setPasswordPopupOpen] = useState(false);
  const [fullName, setFullName] = useState(user?.fullName);
  const [username, setUsername] = useState(user?.name);
  const [version, setVersion] = useState('');
  const [popupType, setPopupType] = useState('');
  // const [selectedImage, setSelectedImage] = useState<any>(userImage);

  const authToken = useSelector(sessionSelectors.authenticationToken);
  if (authToken) {
    var decoded: any = jwt_decode(authToken as any);
  }

  const getVersion = async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BASE_API_URL}/version`,
    );
    setVersion(data);
  };

  useEffect(() => {
    getVersion();
  });

  if (!user) return null;

  // const previewImage = (e: any) => {
  //   const objectUrl = URL.createObjectURL(e.files[0]);
  //   setSelectedImage(objectUrl);
  // };

  const handlePopup = (e: any, text: any) => {
    if (e.key === 'Enter') {
      setPopupType(text);
      setPopupOpen(true);
    }
  };

  return (
    <>
      {popupOpen && (
        <EmailPopup
          userId={user?.id}
          fullName={fullName}
          username={username}
          popupType={popupType}
          setPopupType={setPopupType}
          setPopupOpen={setPopupOpen}
        />
      )}
      {/* <Tour /> */}
      <FlexBox.Row
        style={{ marginLeft: '40px', width: '100%' }}
        justifyContent="space-between"
      >
        {/* user details in left column */}
        <Box marginTop="lg" style={{ width: '25%' }}>
          <Box marginBottom="lg" className={styles.imageContainer}>
            <FlexBox
              justifyContent="center"
              alignItems="center"
              className={styles.sampleImage}
            >
              {userInitials}
            </FlexBox>

            {/* <img src={selectedImage} alt='userImage' /> */}
            {/* <div className={styles.imageUploader}>
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
                </div> */}
          </Box>

          <Box marginTop="lg">
            <EditFieldSettings
              disabled={!decoded.permissions.includes('me')}
              label={translate('form.fullName.label')}
              labelColor="#828282"
              defaultValue={user?.fullName}
              placeholder={translate('form.fullName.placeholder')}
              value={fullName ? fullName : ''}
              onChangeText={(val: string) => setFullName(val)}
              onKeyDown={(e: any) => handlePopup(e, 'full Name')}
            />
          </Box>

          <Box marginTop="lg">
            <EditFieldSettings
              disabled={!decoded.permissions.includes('me')}
              label={translate('form.username.label')}
              labelColor="#828282"
              defaultValue={user.name}
              placeholder={translate('form.username.placeholder')}
              value={username ? username : ''}
              onChangeText={(val: string) => setUsername(val)}
              onKeyDown={(e: any) => handlePopup(e, 'Username')}
            />
          </Box>

          <Box marginTop="lg">
            <Paragraph style={{ color: '#828282' }}>Roles</Paragraph>
            <FlexBox.Row>
              {user?.roles?.map((e: any) => (
                <div className={styles.roleBean}>
                  <p>{e?.name.charAt(0).toUpperCase() + e?.name?.slice(1)}</p>
                </div>
              ))}
            </FlexBox.Row>
          </Box>

          <Box marginTop="lg">
            <Paragraph style={{ color: '#828282' }}>Acivated</Paragraph>
            <div className={styles.date}>
              {formatDateToDisplay(user.created)}
            </div>
          </Box>

          <Box marginTop="xxxl" style={{ display: 'flex' }}>
            <PrimaryButton onClick={() => setPasswordPopupOpen(true)}>
              Update Password
            </PrimaryButton>

            {/* {fullName !== user.fullName && username !== user.name || !decoded.permissions.includes('me') && */}
          </Box>
        </Box>

        {/* right column */}
        <FlexBox
          flexDirection="column"
          justifyContent="space-between"
          marginTop="xl"
          marginRight="xl"
        >
          {/* versions */}
          <Box>
            <Box className={styles.appDetails}>
              <Box>
                <img src={starsIcon} alt="stars-icon" />
              </Box>
              <Paragraph className={styles.appDetailsText}>
                Open Source Version
              </Paragraph>
            </Box>
            <Box>
              <Paragraph className={styles.uiVersionText}>
                UI Version v{version}
              </Paragraph>
            </Box>
            <Box>
              <Paragraph className={styles.appVersionText}>
                ZenML v{version}
              </Paragraph>
            </Box>
          </Box>

          {!hubIsConnected && <ConnectHub />}
        </FlexBox>

        {passwordPopupOpen && (
          <PasswordPopup
            username={user?.name}
            user={user}
            isUpdate={false}
            setPopupOpen={setPasswordPopupOpen}
          />
        )}
      </FlexBox.Row>
    </>
  );
};
