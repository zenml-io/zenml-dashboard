import React, { useState, useEffect } from 'react';
import styles from './index.module.scss';
import {
  Box,
  FlexBox,
  EditFieldSettings,
  Paragraph,
  icons,
  // ColoredCircle
} from '../../components';
import { iconColors, iconSizes } from '../../../constants';
import { useRequestOnMount, useSelector } from '../../hooks';
import { userActions } from '../../../redux/actions';

import { sessionSelectors, userSelectors } from '../../../redux/selectors';
import { getTranslateByScope } from '../../../services';
import { GhostButton } from '../../components/buttons/index';
import { EmailPopup } from './EmailPopup';
import { PasswordPopup } from './PasswordPopup';
import { formatDateToDisplay } from '../../../utils';
import jwt_decode from 'jwt-decode';
import starsIcon from '../../assets/stars.svg';
import { getInitials } from '../../../utils/name';
import axios from 'axios';
import { ConnectHub } from './ConnectHub';
import { useHubUser } from '../../hooks/auth';

export const translate = getTranslateByScope('ui.layouts.PersonalDetails');

export const PersonalDetails: React.FC = () => {
  useRequestOnMount(userActions.getMy, {});
  const user = useSelector(userSelectors.myUser);
  const hubUser = useHubUser();
  const userFullName = user?.fullName || user?.name;
  const userInitials = getInitials(userFullName as string);

  const [popupOpen, setPopupOpen] = useState(false);
  const [passwordPopupOpen, setPasswordPopupOpen] = useState(false);
  const [fullName, setFullName] = useState(userFullName ?? '');
  const [username, setUsername] = useState(user?.name ?? '');
  const [website, setWebsite] = useState(hubUser?.website ?? '');
  const [bio, setBio] = useState(hubUser?.bio ?? '');
  const [version, setVersion] = useState('');
  const [popupType, setPopupType] = useState('');
  // const [selectedImage, setSelectedImage] = useState<any>(userImage);

  const authToken = useSelector(sessionSelectors.authenticationToken);
  // not sure what the actual data structure is here; need to fill this out in future
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const decoded: any = authToken ? jwt_decode(authToken) : undefined;

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
        <Box marginVertical="lg" className={styles.imageContainer}>
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

          <Box marginTop="lg">
            <Paragraph
              style={{ fontSize: '20px', fontWeight: 600, color: '#24292F' }}
            >
              {user?.fullName}
            </Paragraph>
          </Box>

          {website && (
            <FlexBox marginTop="md" alignItems="center">
              <icons.link color={iconColors.darkGrey} size={iconSizes.sm} />

              <a
                href={
                  // links need to be prefixed with the protocol or they'll be relative to the current site
                  website.startsWith('http') ? website : `//${website}`
                }
                style={{ marginLeft: '6px' }}
              >
                <Paragraph size="small" style={{ color: '#24292F' }}>
                  {website}
                </Paragraph>
              </a>
            </FlexBox>
          )}
        </Box>

        <Box style={{ flexGrow: 1 }} marginHorizontal="xl2">
          <Box marginTop="lg">
            <EditFieldSettings
              disabled={!decoded.permissions.includes('me')}
              label={translate('form.fullName.label')}
              labelColor="#828282"
              placeholder={translate('form.fullName.placeholder')}
              value={fullName}
              onChangeText={setFullName}
              onKeyDown={(e: any) => handlePopup(e, 'full Name')}
            />
          </Box>

          <Box marginTop="lg">
            <EditFieldSettings
              disabled={!decoded.permissions.includes('me')}
              label={translate('form.username.label')}
              labelColor="#828282"
              placeholder={translate('form.username.placeholder')}
              value={username}
              onChangeText={setUsername}
              onKeyDown={(e: any) => handlePopup(e, 'Username')}
            />
          </Box>

          <Box marginTop="lg">
            <EditFieldSettings
              disabled={!decoded.permissions.includes('me')}
              label="Website"
              labelColor="#828282"
              placeholder="Website"
              value={website}
              onChangeText={setWebsite}
              optional={true}
            />
          </Box>

          <Box marginTop="lg">
            <EditFieldSettings
              disabled={!decoded.permissions.includes('me')}
              label="Bio"
              labelColor="#828282"
              placeholder="Bio"
              value={bio}
              onChangeText={setBio}
              type="textarea"
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
            <Paragraph style={{ color: '#828282' }}>Created</Paragraph>
            <div className={styles.date}>
              {formatDateToDisplay(user.created)}
            </div>
          </Box>

          <FlexBox marginTop="xxxl" flexWrap>
            <GhostButton
              onClick={() => setPasswordPopupOpen(true)}
              style={{ marginBottom: '18px', marginRight: 'auto' }}
            >
              Update Password
            </GhostButton>

            <ConnectHub />
          </FlexBox>
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
