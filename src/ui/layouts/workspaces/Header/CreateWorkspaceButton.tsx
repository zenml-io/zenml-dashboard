import React from 'react';
import { translate } from './translate';
import { Box, PrimaryButton } from '../../../components';

import { CommandPopup } from '../../common/CommandPopup';

export const CreateWorkspaceButton: React.FC = () => {
  const [
    createWorkspacePopupOpen,
    setCreateWorkspacePopupOpen,
  ] = React.useState<boolean>(false);

  const commandText = `zenml workspace create WORKSPACE_NAME`;

  return (
    <Box
      style={{ position: 'relative' }}
      paddingVertical="sm"
      paddingHorizontal="sm"
    >
      <PrimaryButton onClick={() => setCreateWorkspacePopupOpen(true)}>
        {translate('createButton.text')}
      </PrimaryButton>
      <CommandPopup
        commandText={commandText}
        open={createWorkspacePopupOpen}
        setOpen={setCreateWorkspacePopupOpen}
      />
    </Box>
  );
};
