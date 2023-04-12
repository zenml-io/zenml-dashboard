import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { H3, Paragraph, PrimaryButton } from '../components';
import { Popup } from './common/Popup';
import { routePaths } from '../../routes/routePaths';
import { getGitHubRedirectURL } from './settings/ConnectHub';
import { hubConnectionPromptActionTypes } from '../../redux/actionTypes';
import { hubPromptSelectors } from '../../redux/selectors/hubPrompt';
import { useHistory } from '../hooks';

export const HubConnectPrompt: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const popupOpen = useSelector(hubPromptSelectors.showPopup);

  return popupOpen ? (
    <Popup
      onClose={() => dispatch({ type: hubConnectionPromptActionTypes.hide })}
    >
      <H3>Connect to the Hub</H3>

      <Paragraph>
        You need to connect to the Hub to perform this action.
      </Paragraph>

      <PrimaryButton
        onClick={async () => {
          const data = await getGitHubRedirectURL();

          history.push(`${routePaths.settings.personalDetails}?open=true`);

          dispatch({ type: hubConnectionPromptActionTypes.hide });

          window.open(data.authorization_url, '_blank');
        }}
        style={{ marginTop: 12 }}
      >
        Connect to Hub
      </PrimaryButton>
    </Popup>
  ) : null;
};
