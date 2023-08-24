import React, { useState, useEffect } from 'react';
import styles from './index.module.scss';
import {
  Box,
  FlexBox,
  EditFieldSettings,
  Paragraph,
  icons,
} from '../../components';
import { iconColors, iconSizes } from '../../../constants';
import { useRequestOnMount, useSelector } from '../../hooks';
import { userActions } from '../../../redux/actions';
import { sessionSelectors, userSelectors } from '../../../redux/selectors';
import { getTranslateByScope } from '../../../services';
import { GhostButton } from '../../components/buttons/index';
import { EmailPopup } from './EmailPopup';
import { PasswordPopup } from './PasswordPopup';
import { HubPopup } from './HubPopup';
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
  const [hubPopupState, setHubPopupState] = useState({ open: false } as
    | { open: false }
    | {
        open: true;
        description: string;
        payloadKey: string;
        payloadValue: string;
      });
  const [passwordPopupOpen, setPasswordPopupOpen] = useState(false);
  const [fullName, setFullName] = useState(userFullName ?? '');
  const [username, setUsername] = useState(user?.name ?? '');
  const [website, setWebsite] = useState(hubUser?.website ?? '');
  const [bio, setBio] = useState(hubUser?.bio ?? '');
  const [hubUserName, setHubUserName] = useState(hubUser?.username ?? '');
  const [version, setVersion] = useState('');
  const [popupType, setPopupType] = useState('');

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
  }, []);

  useEffect(() => {
    if (!hubUser) return;
    if (!website) setWebsite(hubUser.website);
    if (!bio) setBio(hubUser.bio);
    if (!hubUserName) setHubUserName(hubUser.username);
    // eslint-disable-next-line
  }, [hubUser]);

  if (!user) return null;

  const handlePopup = (e: { key: string }, text: any) => {
    setHubPopupState({ open: false });

    if (e.key === 'Enter') {
      setPopupType(text);
      setPopupOpen(true);
    }
  };
  const handleHubPopup = (
    description: string,
    payloadKey: string,
    payloadValue: string,
  ) => (e: { key: string }) => {
    setPopupOpen(false);
    if (e.key === 'Enter') {
      setHubPopupState({ open: true, description, payloadKey, payloadValue });
    }
  };

  return (
    <>
      {popupOpen ? (
        <EmailPopup
          userId={user?.id}
          fullName={fullName}
          username={username}
          popupType={popupType}
          setPopupType={setPopupType}
          setPopupOpen={setPopupOpen}
        />
      ) : hubPopupState.open && hubUser ? (
        <HubPopup
          {...hubPopupState}
          closeHubPopup={() => setHubPopupState({ open: false })}
        />
      ) : null}

      <FlexBox.Row
        style={{ marginLeft: '40px', width: '100%' }}
        justifyContent="space-between"
      >
        {/* user details in left column */}
        <Box marginVertical="lg" className={styles.imageContainer}>
          {/* commented out because its not working consistently across the entire app => different components at different places */}

          <FlexBox
            justifyContent="center"
            alignItems="center"
            className={styles.sampleImage}
          >
            {userInitials}
          </FlexBox>

          <Box marginTop="lg">
            <Paragraph
              style={{
                fontSize: '20px',
                fontWeight: 600,
                color: '#24292F',
                textAlign: 'center',
              }}
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
                style={{ marginLeft: '6px', width: '100%' }}
              >
                <Paragraph
                  size="small"
                  style={{
                    color: '#24292F',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  <span title={website}>{website}</span>
                </Paragraph>
              </a>
            </FlexBox>
          )}
        </Box>

        {/* form to update user details */}
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
              disabled={true}
              label={translate('form.hubUsername.label')}
              labelColor="#828282"
              placeholder={translate('form.hubUsername.placeholder')}
              value={hubUserName}
              onChangeText={setHubUserName}
              onKeyDown={(e: any) => handlePopup(e, 'Username')}
            />
          </Box>

          <Box marginTop="lg">
            <EditFieldSettings
              disabled={true}
              label="Website"
              labelColor="#828282"
              placeholder="Connect Hub first"
              value={website}
              onChangeText={setWebsite}
              optional={true}
              onKeyDown={handleHubPopup('website', 'website', website)}
            />
          </Box>

          <Box marginTop="lg">
            <EditFieldSettings
              disabled={true}
              label="Bio"
              labelColor="#828282"
              placeholder="Connect Hub first"
              value={bio}
              onChangeText={setBio}
              type="textarea"
              onKeyDown={handleHubPopup('bio', 'bio', bio)}
            />
          </Box>

          <Box marginTop="lg">
            <Paragraph style={{ color: '#828282' }}>Roles</Paragraph>
            <FlexBox.Row>
              {user?.roles?.map((e: any) => (
                <div key={e?.name} className={styles.roleBean}>
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
                UI Version v{process.env.REACT_APP_VERSION}
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
