import React, { useEffect } from 'react';
import axios from 'axios';
import { PrimaryButton } from '../../../components';
import { endpoints } from '../../../../api/endpoints';
import { SSOResponse } from '../../../../api/types';
import { useHistory, useLocation } from 'react-router-dom';
import {
  stackComponentsActions,
  userActions,
  workspacesActions,
} from '../../../../redux/actions';
import { useDispatch } from 'react-redux';
import { setIsloggedinWithCookie } from '../../../../redux/actions/session/loginAction';
import { DEFAULT_WORKSPACE_NAME } from '../../../../constants';
import { routePaths } from '../../../../routes/routePaths';

export function OauthHandler() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { search } = useLocation();

  const params = new URLSearchParams(search);
  const route = params.get('route');
  const loginUrl = `${process.env.REACT_APP_BASE_API_URL}${endpoints.login}`;
  const callbackUrl = `${window.location.origin}/login?${params.toString()}`;

  useEffect(() => {
    handleLogin(true);
  }, []);

  async function handleLogin(isInitial: boolean = false) {
    try {
      const response = await axios.post<SSOResponse>(loginUrl, null, {
        withCredentials: true,
      });
      if (response.data.authorization_url && !isInitial) {
        window.location.href = `${
          response.data.authorization_url
        }?redirect=${encodeURIComponent(callbackUrl)}`;
        return;
      }
      if (response.data.access_token) {
        dispatch(setIsloggedinWithCookie({ isLoggedinWithCookie: true }));
        dispatch(userActions.getMy({}));
        const workspaceFromUrl = window.location.search.split('/')[2];
        dispatch(
          workspacesActions.updateSelectedWorkspace({
            workspace: workspaceFromUrl || DEFAULT_WORKSPACE_NAME,
          }),
        );
        dispatch(stackComponentsActions.getTypes());
        dispatch(
          workspacesActions.getMy({
            selectDefault: false,
            selectedWorkspace: workspaceFromUrl
              ? workspaceFromUrl
              : DEFAULT_WORKSPACE_NAME,
          }),
        );
        history.push(route || routePaths.dashboard(DEFAULT_WORKSPACE_NAME));
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  }

  return (
    <PrimaryButton
      onClick={() => handleLogin(false)}
      style={{ width: '100%', backgroundColor: '#E8A562' }}
    >
      Login with SSO
    </PrimaryButton>
  );
}
