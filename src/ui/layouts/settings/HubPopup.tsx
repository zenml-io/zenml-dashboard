import React, { useState } from 'react';
import axios from 'axios';

import {
  Box,
  FlexBox,
  H3,
  Paragraph,
  GhostButton,
  PrimaryButton,
} from '../../components';
import { Popup } from '../common/Popup';
import { HUB_API_URL } from '../../../api/constants';
import { useToaster } from '../../hooks';
import { useHubToken } from '../../hooks/auth';

export const HubPopup: React.FC<{
  description: string;
  payloadKey: string;
  payloadValue: string;
  closeHubPopup: () => void;
}> = ({ description, payloadKey, payloadValue, closeHubPopup }) => {
  const { successToast, failureToast } = useToaster();
  const hubToken = useHubToken();

  const [loading, setLoading] = useState(false);

  // loading
  const setField = async () => {
    setLoading(true);

    try {
      await axios.patch(
        `${HUB_API_URL}/users/me`,
        { [payloadKey]: payloadValue },
        { headers: { Authorization: `Bearer ${hubToken}` } },
      );

      closeHubPopup();
      successToast({ description: `Updated ${description}` });
    } catch (err) {
      failureToast({ description: `Error updating ${description}` });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Popup onClose={closeHubPopup}>
      <FlexBox.Row justifyContent="center">
        <H3 bold color="darkGrey">
          Change {description}
        </H3>
      </FlexBox.Row>

      <FlexBox.Row justifyContent="center">
        <Box marginTop="md">
          <Paragraph>
            Are you sure you want to change your {description}?
          </Paragraph>
        </Box>
      </FlexBox.Row>

      <FlexBox justifyContent="center" marginTop="xl" flexWrap>
        <Box marginRight="sm" marginBottom="md">
          <GhostButton style={{ width: '150px' }} onClick={closeHubPopup}>
            Cancel
          </GhostButton>
        </Box>

        <Box marginLeft="sm" marginRight="sm" marginBottom="md">
          <PrimaryButton
            style={{ width: '150px' }}
            onClick={setField}
            loading={loading}
          >
            Change {description}
          </PrimaryButton>
        </Box>
      </FlexBox>
    </Popup>
  );
};
