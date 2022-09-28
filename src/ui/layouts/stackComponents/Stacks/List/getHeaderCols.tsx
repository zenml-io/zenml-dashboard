import React from 'react';
import { iconColors, iconSizes, ID_MAX_LENGTH } from '../../../../../constants';
import {
  formatDateToDisplay,
  truncate,
  getInitialsFromEmail,
} from '../../../../../utils';
import {
  Box,
  FlexBox,
  icons,
  Paragraph,
  ColoredCircle,
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
      renderRow: (stackComponent: TStack) => <></>,
    },

    {
      render: () => (
        <Paragraph size="small" color="black" style={{ fontSize: '12px' }}>
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
        <Paragraph size="small" color="black" style={{ fontSize: '12px' }}>
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
        <Paragraph size="small" color="black" style={{ fontSize: '12px' }}>
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
        <Paragraph size="small" color="black" style={{ fontSize: '12px' }}>
          Shared
        </Paragraph>
      ),
      width: '15%',
      renderRow: (stackComponent: TStack) => (
        <Box>
          <FlexBox
            justifyContent="center"
            style={{
              borderRadius: '50%',
              height: '25px',
              width: '25px',
              paddingTop: '3px',
              textAlign: 'center',
            }}
          >
            {stackComponent.isShared ? (
              <icons.multiUser color={iconColors.white} size={iconSizes.sm} />
            ) : (
              <icons.singleUser color={iconColors.white} size={iconSizes.sm} />
            )}
          </FlexBox>
        </Box>
      ),
    },
    {
      render: () => (
        <Paragraph size="small" color="black" style={{ fontSize: '12px' }}>
          USER
        </Paragraph>
      ),
      width: '15%',
      renderRow: (stackComponent: TStack) => {
        const initials = getInitialsFromEmail(
          stackComponent.user.full_name
            ? stackComponent.user.full_name
            : stackComponent.user.name,
        );
        return (
          <FlexBox alignItems="center">
            <Box paddingRight="sm">
              <ColoredCircle color="secondary" size="sm">
                {initials}
                {console.log(stackComponent)}
              </ColoredCircle>
            </Box>
            <Paragraph size="small">
              {stackComponent.user.full_name
                ? stackComponent.user.full_name
                : stackComponent.user.name}
            </Paragraph>
          </FlexBox>
        );
      },
    },
    {
      render: () => (
        <Paragraph size="small" color="black" style={{ fontSize: '12px' }}>
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
