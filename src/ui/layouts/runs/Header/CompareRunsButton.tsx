import React from 'react';
import { If, Box, GhostButton } from '../../../components';
import { useService } from './useService';
import { translate } from './translate';
import { CommandPopup } from '../../common/CommandPopup';

export const CompareRunsButton: React.FC = () => {
  const [compareRunsPopupOpen, setCompareRunsPopupOpen] = React.useState<
    boolean
  >(false);
  const { selectedRunIds, currentWorkspace } = useService();

  const commandText = `zenml workspace set ${
    currentWorkspace && currentWorkspace.id
  }`;

  return (
    <If condition={selectedRunIds.length > 1}>
      {() => (
        <Box
          style={{ position: 'relative' }}
          paddingVertical="sm"
          paddingHorizontal="sm"
        >
          <GhostButton onClick={() => setCompareRunsPopupOpen(true)}>
            {translate('compareButton.text')}
          </GhostButton>
          <CommandPopup
            commandText={commandText}
            open={compareRunsPopupOpen}
            setOpen={setCompareRunsPopupOpen}
          />
        </Box>
      )}
    </If>
  );
};
