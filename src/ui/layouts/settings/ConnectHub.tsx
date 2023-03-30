import React, { useState } from 'react';
import axios from 'axios';

import { Box, FormTextField, Paragraph, PrimaryButton } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { sessionSelectors } from '../../../redux/selectors';
import { BASE_API_URL, HUB_API_URL } from '../../../api/constants';
import { Popup } from '../common/Popup';
import { authoriseHubActionTypes } from '../../../redux/actionTypes';

const getGitHubRedirectURL = () =>
  axios.get(`${HUB_API_URL}/auth/github/authorize`);

export const ConnectHub: React.FC = () => {
  const [token, setToken] = useState('');
  const [popupOpen, setPopupOpen] = useState(false);
  const authToken = useSelector(sessionSelectors.authenticationToken);
  const dispatch = useDispatch();

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
              dispatch({
                type: authoriseHubActionTypes.success,
                payload: { access_token: token },
              });
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
