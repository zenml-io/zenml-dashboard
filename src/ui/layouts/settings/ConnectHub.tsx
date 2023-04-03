import React, { useState } from 'react';
import axios from 'axios';

import {
  Box,
  FlexBox,
  FormTextField,
  GhostButton,
  Paragraph,
  PrimaryButton,
  TextButton,
} from '../../components';
import { useDispatch } from 'react-redux';
// import { useDispatch, useSelector } from 'react-redux';
// import { sessionSelectors } from '../../../redux/selectors';
import { HUB_API_URL } from '../../../api/constants';
import { Popup } from '../common/Popup';
import {
  authoriseHubActionTypes,
  disconnectHubActionTypes,
} from '../../../redux/actionTypes';
import GitHubLogo from '../../assets/GitHub_Logo.png';
import { useHubToken } from '../../hooks/auth';
import { useToaster } from '../../hooks';

const getGitHubRedirectURL = () =>
  axios.get(`${HUB_API_URL}/auth/github/authorize`);

export const ConnectHub: React.FC = () => {
  const [token, setToken] = useState('');
  const [popupOpen, setPopupOpen] = useState(false);
  // const authToken = useSelector(sessionSelectors.authenticationToken);
  const dispatch = useDispatch();
  const hubIsConnected = !!useHubToken();
  const { successToast } = useToaster();

  return hubIsConnected ? (
    <FlexBox flexDirection="column" alignItems="end">
      <Paragraph>Connected Hub via</Paragraph>
      <Box style={{ marginLeft: 'auto' }} marginBottom="sm">
        <img src={GitHubLogo} alt="GitHub" width="100px" />
      </Box>
      <TextButton
        onClick={() => {
          dispatch({ type: disconnectHubActionTypes.success });
          successToast({ description: 'Disconnected from Hub' });
        }}
      >
        Disconnect Hub
      </TextButton>
    </FlexBox>
  ) : (
    <>
      <FlexBox justifyContent="end">
        <GhostButton
          onClick={() => {
            window.open('https://docs.zenml.io', '_blank');
          }}
          style={{ marginLeft: 'auto', marginRight: '12px' }}
        >
          What is Hub?
        </GhostButton>

        <PrimaryButton
          onClick={async () => {
            const { data } = await getGitHubRedirectURL();
            setPopupOpen(true);
            window.open(data.authorization_url, '_blank');
          }}
        >
          Connect Hub
        </PrimaryButton>
      </FlexBox>

      {popupOpen && (
        <Popup onClose={() => setPopupOpen(false)}>
          <Paragraph>
            Enter the token that you got from GitHub in the input below and then
            save it.
          </Paragraph>
          <Box marginVertical="lg">
            <FormTextField
              label="GitHub token"
              value={token}
              onChange={setToken}
              placeholder="Your GitHub token"
            />
          </Box>
          <PrimaryButton
            onClick={() => {
              dispatch({
                type: authoriseHubActionTypes.success,
                payload: { access_token: token },
              });
              successToast({ description: 'Connected to Hub' });
              setPopupOpen(false);

              // TODO: confirm actual endpoint and payload
              // axios.post(
              //   `${BASE_API_URL}/save-github-token`,
              //   { token },
              //   { headers: { Authorization: `Bearer ${authToken}` } },
              // );
            }}
          >
            Save token
          </PrimaryButton>
        </Popup>
      )}
    </>
  );
};
