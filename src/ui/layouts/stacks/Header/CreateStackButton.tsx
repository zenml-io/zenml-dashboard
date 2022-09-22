import React from 'react';
import { Box, PrimaryButton } from '../../../components';
import { useService } from './useService';

import { CommandPopup } from '../../common/CommandPopup';

export const CreateStackButton: React.FC = () => {
  const [createStackPopupOpen, setCreateStackPopupOpen] = React.useState<
    boolean
  >(false);

  const { currentWorkspace } = useService();

  const commandText = `zenml workspace set ${
    currentWorkspace && currentWorkspace.id
  }`;

  return (
    <Box
      style={{ position: 'relative' }}
      paddingVertical="sm"
      paddingHorizontal="sm"
    >
      <PrimaryButton onClick={() => setCreateStackPopupOpen(true)}>Create Stack</PrimaryButton>
      <CommandPopup
        commandText={commandText}
        open={createStackPopupOpen}
        setOpen={setCreateStackPopupOpen}
      />
    </Box>
  );
};
