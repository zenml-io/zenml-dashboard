import _ from 'lodash';
import React from 'react';
import { iconColors, iconSizes, ID_MAX_LENGTH } from '../../../../../constants';
import {
  truncate,
  formatDateToSort,
  formatDateToDisplayOnTable,
  getInitialsFromEmail,
} from '../../../../../utils';
import {
  Box,
  ColoredCircle,
  FlexBox,
  icons,
  Paragraph,
  Tooltip,
} from '../../../../components';
import { HeaderCol } from '../../../common/Table';
import { SortingHeader } from './ForSorting/SortingHeader';
import { Sorting, SortingDirection } from './ForSorting/types';
import { useService } from './ForSorting/useServiceForSorting';

export const GetHeaderCols = ({
  expendedRow,

  setOpenSecretIds,
  filteredSecrets,
  setFilteredSecrets,
  activeSorting,
  activeSortingDirection,
  setActiveSortingDirection,
  setActiveSorting,
}: {
  expendedRow?: any;
  openSecretIds: TId[];
  setOpenSecretIds: (ids: TId[]) => void;
  filteredSecrets: any[];
  setFilteredSecrets: (secrets: any[]) => void;
  activeSorting: Sorting | null;
  activeSortingDirection: SortingDirection | null;
  setActiveSortingDirection: (direction: SortingDirection | null) => void;
  setActiveSorting: (sorting: Sorting | null) => void;
}): HeaderCol[] => {
  const { sortMethod } = useService({
    setActiveSortingDirection,
    setActiveSorting,
    setFilteredSecrets,
    activeSorting,
    activeSortingDirection,
    filteredSecrets,
  });

  return [
    {
      render: () => (
        <SortingHeader
          onlyOneRow={filteredSecrets.length === 1 || expendedRow?.length === 1}
          sorting="id"
          sortMethod={sortMethod('id', {
            asc: (filteredSecrets: any[]) =>
              _.orderBy(filteredSecrets, ['id'], ['asc']),
            desc: (filteredSecrets: any[]) =>
              _.orderBy(filteredSecrets, ['id'], ['desc']),
          })}
          activeSorting={activeSorting}
          activeSortingDirection={activeSortingDirection}
        >
          <Paragraph
            size="small"
            color="black"
            style={{ fontSize: '14px', marginLeft: '33px' }}
          >
            SECRET ID
          </Paragraph>
        </SortingHeader>
      ),
      testId: 'Id',
      width: '20%',
      renderRow: (secret: any) => (
        <FlexBox alignItems="center">
          <div data-tip data-for={secret.id}>
            <FlexBox.Row style={{ alignItems: 'center' }}>
              {expendedRow?.length === 1 ? (
                <icons.chevronDown
                  color={iconColors.grey}
                  size={iconSizes.xs}
                />
              ) : (
                <icons.rightArrow color={iconColors.grey} size={iconSizes.xs} />
              )}
              <Paragraph size="small" style={{ marginLeft: '20px' }}>
                {truncate(secret.id, ID_MAX_LENGTH)}
              </Paragraph>
            </FlexBox.Row>
          </div>
          <Tooltip id={secret.id} text={secret.id} />
        </FlexBox>
      ),
    },
    {
      render: () => (
        <SortingHeader
          onlyOneRow={filteredSecrets.length === 1 || expendedRow?.length === 1}
          sorting="name"
          sortMethod={sortMethod('name', {
            asc: (filteredSecrets: any[]) =>
              _.orderBy(filteredSecrets, ['name'], ['asc']),
            desc: (filteredSecrets: any[]) =>
              _.orderBy(filteredSecrets, ['name'], ['desc']),
          })}
          activeSorting={activeSorting}
          activeSortingDirection={activeSortingDirection}
        >
          <Paragraph size="small" color="black" style={{ fontSize: '14px' }}>
            NAME
          </Paragraph>
        </SortingHeader>
      ),
      testId: 'Name',
      width: '30%',
      renderRow: (secret: any) => (
        <FlexBox alignItems="center">
          <div data-tip data-for={secret.name}>
            <Paragraph size="small" color="black">
              {secret.name}
            </Paragraph>
          </div>
          <Tooltip id={secret.name} text={secret.name} />
        </FlexBox>
      ),
    },
    {
      render: () => (
        <SortingHeader
          onlyOneRow={filteredSecrets.length === 1 || expendedRow?.length === 1}
          sorting="scope"
          sortMethod={sortMethod('scope', {
            asc: (filteredSecrets: any[]) =>
              _.orderBy(filteredSecrets, ['scope'], ['asc']),
            desc: (filteredSecrets: any[]) =>
              _.orderBy(filteredSecrets, ['scope'], ['desc']),
          })}
          activeSorting={activeSorting}
          activeSortingDirection={activeSortingDirection}
        >
          <Box style={{}}>
            <Paragraph size="small" color="black">
              SCOPE
            </Paragraph>
          </Box>
        </SortingHeader>
      ),
      testId: 'Scope',
      width: '15%',
      renderRow: (secret: any) => (
        <FlexBox alignItems="center">
          <div data-tip data-for={secret.scope}>
            <Paragraph size="small" color="black">
              {secret.scope}
            </Paragraph>
          </div>
          <Tooltip id={secret.scope} text={secret.scope} />
        </FlexBox>
      ),
    },

    {
      render: () => (
        <SortingHeader
          onlyOneRow={filteredSecrets.length === 1 || expendedRow?.length === 1}
          sorting="user_id"
          sortMethod={sortMethod('user_id', {
            asc: (filteredSecrets: any[]) =>
              _.orderBy(filteredSecrets, ['user_id'], ['asc']),
            desc: (filteredSecrets: any[]) =>
              _.orderBy(filteredSecrets, ['user_id'], ['desc']),
          })}
          activeSorting={activeSorting}
          activeSortingDirection={activeSortingDirection}
        >
          <Paragraph size="small" color="black" style={{ fontSize: '14px' }}>
            AUTHOR
          </Paragraph>
        </SortingHeader>
      ),
      testId: 'Author',
      width: '15%',
      renderRow: (secret: any) => {
        const initials = getInitialsFromEmail(
          secret?.body?.user?.name as string,
        );
        return (
          <FlexBox alignItems="center">
            <div data-tip data-for={secret?.body?.user?.name}>
              <FlexBox alignItems="center">
                {secret?.body?.user?.name && (
                  <Box paddingRight="sm">
                    <ColoredCircle color="secondary" size="sm">
                      {initials}
                    </ColoredCircle>
                  </Box>
                )}

                <Paragraph size="small">{secret?.body?.user?.name}</Paragraph>
              </FlexBox>
            </div>
            <Tooltip
              id={secret?.body?.user?.name}
              text={secret?.body?.user?.name}
            />
          </FlexBox>
        );
      },
    },
    {
      render: () => (
        <SortingHeader
          onlyOneRow={filteredSecrets.length === 1 || expendedRow?.length === 1}
          sorting="created"
          sortMethod={sortMethod('created', {
            asc: (filteredSecrets: any[]) =>
              _.orderBy(
                filteredSecrets,
                (secret: any) => new Date(secret.created).getTime(),
                ['asc'],
              ),
            desc: (filteredSecrets: any[]) =>
              _.orderBy(
                filteredSecrets,
                (secret: any) => new Date(secret.created).getTime(),
                ['desc'],
              ),
          })}
          activeSorting={activeSorting}
          activeSortingDirection={activeSortingDirection}
        >
          <Paragraph size="small" color="black" style={{ fontSize: '14px' }}>
            CREATED AT
          </Paragraph>
        </SortingHeader>
      ),
      testId: 'created_at',
      width: '20%',
      renderRow: (secret: any) => (
        <FlexBox alignItems="center">
          <div data-tip data-for={formatDateToSort(secret.created)}>
            <FlexBox alignItems="center">
              <Paragraph color="grey" size="tiny">
                {formatDateToDisplayOnTable(secret.created)}
              </Paragraph>
            </FlexBox>
          </div>
          <Tooltip
            id={formatDateToSort(secret.created)}
            text={formatDateToDisplayOnTable(secret.created)}
          />
        </FlexBox>
      ),
    },
  ];
};
