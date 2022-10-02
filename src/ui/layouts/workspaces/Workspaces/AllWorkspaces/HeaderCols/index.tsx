import React from 'react';

import {
  iconColors,
  iconSizes,
  ID_MAX_LENGTH,
} from '../../../../../../constants';
import { translate } from '../../translate';
import { formatDateToDisplay, truncate } from '../../../../../../utils';
import { Box, FlexBox, icons, Paragraph } from '../../../../../components';
import { HeaderCol } from '../../../../common/Table';

export const useHeaderCols = (): HeaderCol[] => {
  return [
    {
      render: () => (
        <Paragraph size="small" color="grey">
          {translate('workspaceId.text')}
        </Paragraph>
      ),
      width: '10%',
      renderRow: (workspace: TWorkspace) => (
        <Paragraph size="small">
          {truncate(workspace.id, ID_MAX_LENGTH)}
        </Paragraph>
      ),
    },
    {
      render: () => (
        <Paragraph size="small" color="grey">
          {translate('workspaceName.text')}
        </Paragraph>
      ),
      width: '10%',
      renderRow: (workspace: TWorkspace) => (
        <Paragraph size="small">{workspace.name}</Paragraph>
      ),
    },
    {
      render: () => (
        <Paragraph size="small" color="grey">
          {translate('workspaceCreatedAt.text')}
        </Paragraph>
      ),
      width: '8%',
      renderRow: (workspace: TWorkspace) => (
        <FlexBox alignItems="center">
          <Box paddingRight="sm">
            <icons.calendar color={iconColors.grey} size={iconSizes.sm} />
          </Box>
          <Paragraph color="grey" size="tiny">
            {formatDateToDisplay(new Date(workspace.createdAt))}
          </Paragraph>
        </FlexBox>
      ),
    },
  ];
};
