import React, { useEffect } from 'react';
import axios from 'axios';
import { PrimaryButton } from '../../../components';
import { endpoints } from '../../../../api/endpoints';
import { SSOResponse } from '../../../../api/types';
import { useHistory, useLocation } from 'react-router-dom';
import { userActions } from '../../../../redux/actions';
import { useDispatch } from 'react-redux';

export function OauthHandler() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { search } = useLocation();

  const params = new URLSearchParams(search);
  const context = params.get('context');
  params.set('context', 'cloud');
  const loginUrl = `${process.env.REACT_APP_BASE_API_URL}${endpoints.login}`;
  const callbackUrl = `${window.location.origin}/login?${params.toString()}`;

  useEffect(() => {
    if (context === 'cloud') {
      handleLogin();
    }
  }, [context]);

  const handleLogin = async () => {
    try {
      const response = await axios.post<SSOResponse>(loginUrl, null, {
        withCredentials: true,
      });
      if (response.data.authorization_url) {
        window.location.href = `${
          response.data.authorization_url
        }?redirect=${encodeURIComponent(callbackUrl)}`;
        return;
      }
      if (response.data.access_token) {
        dispatch(userActions.getMy({}));
        history.push('/workspaces/default');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <PrimaryButton
      onClick={handleLogin}
      style={{ width: '100%', backgroundColor: '#E8A562' }}
    >
      Login with SSO
    </PrimaryButton>
  );
}
