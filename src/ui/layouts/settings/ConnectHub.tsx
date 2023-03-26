import React, { useState } from 'react';
import axios from 'axios';

import { Box, FormTextField, Paragraph, PrimaryButton } from '../../components';
import { useSelector } from 'react-redux';
import { sessionSelectors } from '../../../redux/selectors';
import { BASE_API_URL, HUB_API_URL } from '../../../api/constants';
import { Popup } from '../common/Popup';

const getGitHubRedirectURL = () =>
  axios.get(`${HUB_API_URL}/user/auth/github/authorize`);

export const ConnectHub: React.FC = () => {
  const [token, setToken] = useState('');
  const [popupOpen, setPopupOpen] = useState(false);
  const authToken = useSelector(sessionSelectors.authenticationToken);

  return (
    <>
      <PrimaryButton
        onClick={async () => {
          const { data } = await getGitHubRedirectURL();
          setPopupOpen(true);
          window.open(data.authorization_url, '_blank');
        }}
        style={{ marginLeft: 'auto' }}
      >
        Connect Hub
      </PrimaryButton>

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
              // TODO: confirm actual endpoint and payload
              axios.post(
                `${BASE_API_URL}/save-github-token`,
                { token },
                { headers: { Authorization: `Bearer ${authToken}` } },
              );
            }}
          >
            Save token
          </PrimaryButton>
        </Popup>
      )}
    </>
  );
};
