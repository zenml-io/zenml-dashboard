import React from 'react';

import { routePaths } from '../../../../../../routes/routePaths';
import { LinkBox, SecondaryLink } from '../../../../../components';
import { useService } from './useService';

export const WorkspaceName: React.FC<{ pipeline: TPipeline }> = ({
  pipeline,
}) => {
  const { workspace } = useService({ pipeline });

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
