import React from 'react';
import { iconColors, iconSizes, ID_MAX_LENGTH } from '../../../../../constants';
import { formatDateToDisplay, truncate } from '../../../../../utils';
import {
  Box,
  FlexBox,
  icons,
  LinkBox,
  Paragraph,
} from '../../../../components';
import { HeaderCol } from '../../../common/Table';
// import { Status } from './Status';
// import { WorkspaceName } from './WorkspaceName';
// import { UserName } from './UserName';

export const getHeaderCols = ({
  openStackIds,
  setOpenStackIds,
}: {
  openStackIds: TId[];
  setOpenStackIds: (ids: TId[]) => void;
}): HeaderCol[] => {
  return [
    {
      width: '2%',
      renderRow: (stack: TStack) => <></>,
    },

    {
      render: () => (
        <Paragraph size="small" color="black">
          STACK ID
        </Paragraph>
      ),
      width: '15%',
      renderRow: (stack: TStack) => (
        <Paragraph size="small">{truncate(stack.id, ID_MAX_LENGTH)}</Paragraph>
      ),
    },
    {
      render: () => (
        <Paragraph size="small" color="black">
          STACK NAME
        </Paragraph>
      ),
      width: '15%',
      renderRow: (stack: TStack) => (
        <Paragraph size="small">{stack.name}</Paragraph>
      ),
    },
    {
      render: () => (
        <Paragraph size="small" color="black">
          OWNER
        </Paragraph>
      ),
      width: '15%',
      renderRow: (stack: TStack) => (
        <Paragraph size="small">{stack.userName}</Paragraph>
      ),
    },
    {
      render: () => (
        <Paragraph size="small" color="black">
          CREATED AT
        </Paragraph>
      ),
      width: '15%',
      renderRow: (stack: TStack) => (
        <FlexBox alignItems="center">
          <Box paddingRight="sm">
            <icons.calendar color={iconColors.grey} size={iconSizes.sm} />
          </Box>
          <Paragraph color="grey" size="tiny">
            {formatDateToDisplay(stack.creationDate)}
          </Paragraph>
        </FlexBox>
      ),
    },
  ];
};
