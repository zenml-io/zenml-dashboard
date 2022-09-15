import React from 'react';

import { routePaths } from '../../../../../../routes/routePaths';
import { LinkBox, SecondaryLink } from '../../../../../components';
import { useService } from './useService';

export const WorkspaceName: React.FC<{ stack: TStack }> = ({ stack }) => {
  const { workspace } = useService({ stack });

  return (
    <LinkBox
      onClick={(e: Event) => {
        e.stopPropagation();
      }}
    >
      <SecondaryLink
        size="small"
        text={workspace.name}
        route={routePaths.workspaces.list}
      />
    </LinkBox>
  );
};
