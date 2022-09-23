import React from 'react';
import { iconColors, iconSizes, ID_MAX_LENGTH } from '../../../../../constants';
import { formatDateToDisplay, truncate } from '../../../../../utils';
import { Box, FlexBox, icons, Paragraph } from '../../../../components';
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
      renderRow: (stackComponent: TStack) => <></>,
    },

    {
      render: () => (
        <Paragraph size="small" color="black">
          ID
        </Paragraph>
      ),
      width: '15%',
      renderRow: (stackComponent: TStack) => (
        <Paragraph size="small">
          {truncate(stackComponent.id, ID_MAX_LENGTH)}
        </Paragraph>
      ),
    },
    {
      render: () => (
        <Paragraph size="small" color="black">
          NAME
        </Paragraph>
      ),
      width: '15%',
      renderRow: (stackComponent: TStack) => (
        <Paragraph size="small">{stackComponent.name}</Paragraph>
      ),
    },
    {
      render: () => (
        <Paragraph size="small" color="black">
          FLAVOUR
        </Paragraph>
      ),
      width: '15%',
      renderRow: (stackComponent: TStack) => (
        <Paragraph size="small">{stackComponent.flavor}</Paragraph>
      ),
    },
    {
      render: () => (
        <Paragraph size="small" color="black">
          Shared
        </Paragraph>
      ),
      width: '15%',
      renderRow: (stackComponent: TStack) =>
        stackComponent.isShared ? (
          <icons.multiUser color={iconColors.primary} size={iconSizes.md} />
        ) : (
          <icons.singleUser color={iconColors.primary} size={iconSizes.md} />
        ),
      // <Paragraph size="small">{stackComponent.isShared}</Paragraph>
    },
    {
      render: () => (
        <Paragraph size="small" color="black">
          USER
        </Paragraph>
      ),
      width: '15%',
      renderRow: (stackComponent: TStack) => (
        <Paragraph size="small">{stackComponent.user.name}</Paragraph>
      ),
    },
    {
      render: () => (
        <Paragraph size="small" color="black">
          CREATED AT
        </Paragraph>
      ),
      width: '15%',
      renderRow: (stackComponent: TStack) => (
        <FlexBox alignItems="center">
          <Box paddingRight="sm">
            <icons.calendar color={iconColors.grey} size={iconSizes.sm} />
          </Box>
          <Paragraph color="grey" size="tiny">
            {formatDateToDisplay(stackComponent.createdAt)}
          </Paragraph>
        </FlexBox>
      ),
    },
  ];
};
