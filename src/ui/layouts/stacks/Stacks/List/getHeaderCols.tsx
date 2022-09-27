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
  ColoredCircle,
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
      renderRow: (stack: TStack) => (
        <LinkBox
          onClick={(e: Event) => {
            e.stopPropagation();
            if (openStackIds.indexOf(stack.id) === -1) {
              setOpenStackIds([...openStackIds, stack.id]);
            } else {
              setOpenStackIds(
                openStackIds.filter((id: TId) => id !== stack.id),
              );
            }
          }}
        >
          <FlexBox justifyContent="center">
            <icons.chevronDown color={iconColors.grey} size={iconSizes.md} />
          </FlexBox>
        </LinkBox>
      ),
    },
    {
      render: () => (
        <Paragraph size="small" color="black">
          STACK ID
        </Paragraph>
      ),
      width: '8%',
      renderRow: (stack: TStack) => (
        <Paragraph size="small">{truncate(stack.id, ID_MAX_LENGTH)}</Paragraph>
      ),
    },
    {
      render: () => (
        <Paragraph size="small" color="black">
          SHARED
        </Paragraph>
      ),
      width: '8%',
      renderRow: (stack: TStack) => (
        <Box>
          <FlexBox
            justifyContent="center"
            style={{
              backgroundColor: stack.isShared ? '#47E08B' : '#FF5C93',
              borderRadius: '50%',
              height: '25px',
              width: '25px',
              paddingTop: '3px',
              textAlign: 'center',
            }}
          >
            {stack.isShared ? (
              <icons.check color={iconColors.white} size={iconSizes.sm} />
            ) : (
              <icons.close color={iconColors.white} size={iconSizes.sm} />
            )}
          </FlexBox>
        </Box>
      ),
    },
    {
      render: () => (
        <Paragraph size="small" color="black">
          STACK
        </Paragraph>
      ),
      width: '8%',
      renderRow: (stack: TStack) => (
        <Paragraph
          size="small"
          style={{ color: '#22BBDD', textDecoration: 'underline' }}
        >
          {stack.name}
        </Paragraph>
      ),
    },
    {
      render: () => (
        <Paragraph size="small" color="black">
          OWNER
        </Paragraph>
      ),
      width: '11%',
      renderRow: (stack: TStack) => {
        const initials = getInitialsFromEmail(stack.user.full_name);
        return (
          <FlexBox alignItems="center">
            <Box paddingRight="sm">
              <ColoredCircle color="secondary" size="sm">
                {initials}
              </ColoredCircle>
            </Box>
            <Paragraph size="small">{stack.user.full_name}</Paragraph>
          </FlexBox>
        );
      },
    },
    {
      render: () => (
        <Paragraph size="small" color="black">
          CREATED AT
        </Paragraph>
      ),
      width: '8%',
      renderRow: (stack: TStack) => (
        <FlexBox alignItems="center">
          <Box paddingRight="sm">
            <icons.calendar color={iconColors.grey} size={iconSizes.sm} />
          </Box>
          <Paragraph size="tiny">
            {formatDateToDisplay(stack.created)}
          </Paragraph>
        </FlexBox>
      ),
    },
  ];
};
