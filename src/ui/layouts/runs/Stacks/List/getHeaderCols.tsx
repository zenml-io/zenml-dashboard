import React from 'react';
import { iconColors, iconSizes, ID_MAX_LENGTH } from '../../../../../constants';
import { truncate, formatDateToDisplayOnTable } from '../../../../../utils';
import {
  Box,
  FlexBox,
  icons,
  LinkBox,
  Paragraph,
} from '../../../../components';
import { HeaderCol } from '../../../common/Table';

export const getHeaderCols = ({
  openStackIds,
  setOpenStackIds,
}: {
  openStackIds: TId[];
  setOpenStackIds: (ids: TId[]) => void;
}): HeaderCol[] => {
  return [
    {
      width: '3%',
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
            <icons.chevronDown color={iconColors.grey} size={iconSizes.sm} />
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
          STACK NAME
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
          SHARED
        </Paragraph>
      ),
      width: '8%',
      renderRow: (stack: TStack) => (
        <Box>
          <FlexBox
            justifyContent="center"
            style={{
              borderRadius: '50%',

              textAlign: 'center',
            }}
          >
            {stack.isShared ? (
              <icons.multiUser color={iconColors.white} size={iconSizes.md} />
            ) : (
              <icons.singleUser color={iconColors.white} size={iconSizes.md} />
            )}
          </FlexBox>
        </Box>
      ),
    },

    {
      render: () => (
        <Paragraph size="small" color="black">
          AUTHOR
        </Paragraph>
      ),
      width: '11%',
      renderRow: (stack: TStack) => {
        return (
          <FlexBox alignItems="center">
            <Paragraph size="small">
              {stack?.user?.full_name
                ? stack?.user?.full_name
                : stack?.user?.name}
            </Paragraph>
          </FlexBox>
        );
      },
    },
    {
      render: () => (
        <Paragraph size="small" color="black">
          CREATED
        </Paragraph>
      ),
      width: '8%',
      renderRow: (stack: TStack) => (
        <FlexBox alignItems="center">
          <Paragraph size="tiny">
            {formatDateToDisplayOnTable(stack.created)}
          </Paragraph>
        </FlexBox>
      ),
    },
  ];
};
