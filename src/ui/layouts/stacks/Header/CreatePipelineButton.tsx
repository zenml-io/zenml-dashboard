import React from 'react';
import { translate } from './translate';
import { Box, PrimaryButton } from '../../../components';
import { useService } from './useService';

import { CommandPopup } from '../../common/CommandPopup';

export const CreatePipelineButton: React.FC = () => {
  const [createPipelinePopupOpen, setCreatePipelinePopupOpen] = React.useState<
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
      <PrimaryButton onClick={() => setCreatePipelinePopupOpen(true)}>
        {translate('createButton.text')}
      </PrimaryButton>
      <CommandPopup
        commandText={commandText}
        open={createPipelinePopupOpen}
        setOpen={setCreatePipelinePopupOpen}
      />
    </Box>
  );
};
