import React from 'react';
import { translate } from './translate';
import {
  formatDateToDisplay,
  formatDateToDisplayOnTable,
  formatDateToSort,
  getInitialsFromEmail,
} from '../../../../utils';
import {
  Box,
  ColoredCircle,
  FlexBox,
  icons,
  Paragraph,
} from '../../../components';
import { HeaderCol } from '../../common/Table';
import { iconColors, iconSizes } from '../../../../constants';
import { DeleteMember } from './DeleteMember';
import { UpdateMember } from './UpdateMember';
import { TokenPopup } from './tokenPopup';
import ReactTooltip from 'react-tooltip';
import { Sorting, SortingDirection } from './ForSorting/types';
import { SortingHeader } from './ForSorting/SortingHeader';
import { useService } from './ForSorting/useServiceForSorting';
import _ from 'lodash';

export const useInviteHeaderCols = (): HeaderCol[] => {
  return [
    {
      render: () => (
        <Paragraph size="small" color="grey">
          {translate('table.member.text')}
        </Paragraph>
      ),
      width: '70%',
      renderRow: (invite: TInvite) => {
        const initials = getInitialsFromEmail(invite.name);
        return (
          <FlexBox alignItems="center">
            <Box paddingRight="sm">
              <ColoredCircle color="secondary" size="sm">
                {initials}
              </ColoredCircle>
            </Box>
            <Paragraph size="small">{invite.name}</Paragraph>
          </FlexBox>
        );
      },
    },
    {
      render: () => (
        <Paragraph size="small" color="grey">
          {translate('table.sendAt.text')}
        </Paragraph>
      ),
      width: '25%',
      renderRow: (invite: TInvite) => (
        <FlexBox alignItems="center">
          <Box paddingRight="sm">
            <icons.calendar color={iconColors.grey} size={iconSizes.sm} />
          </Box>
          <Paragraph color="grey" size="tiny">
            {formatDateToDisplay(invite.createdAt)}
          </Paragraph>
        </FlexBox>
      ),
    },
    {
      render: () => <Paragraph size="small" color="grey"></Paragraph>,
      width: '5%',
      renderRow: (invite: TInvite) => <DeleteMember member={invite} />,
    },
  ];
};

const headColStyle = { color: '#000', fontWeight: 700 };

export const useMemberHeaderCols = ({
  decoded,
  filteredMembers,
  setFilteredMembers,
  activeSorting,
  activeSortingDirection,
  setActiveSortingDirection,
  setActiveSorting,
}: {
  decoded: any;
  filteredMembers: TMember[];
  setFilteredMembers: (members: TMember[]) => void;
  activeSorting: Sorting | null;
  activeSortingDirection: SortingDirection | null;
  setActiveSortingDirection: (direction: SortingDirection | null) => void;
  setActiveSorting: (sorting: Sorting | null) => void;
}): HeaderCol[] => {
  const { sortMethod } = useService({
    setActiveSortingDirection,
    setActiveSorting,
    setFilteredMembers,
    activeSorting,
    activeSortingDirection,
    filteredMembers,
  });

  return [
    {
      render: () => (
        <SortingHeader
          sorting="name"
          sortMethod={sortMethod('name', {
            asc: (filteredMembers: TMember[]) =>
              _.orderBy(filteredMembers, ['name'], ['asc']),
            desc: (filteredMembers: TMember[]) =>
              _.orderBy(filteredMembers, ['name'], ['desc']),
          })}
          activeSorting={activeSorting}
          activeSortingDirection={activeSortingDirection}
        >
          <Paragraph size="small" style={headColStyle}>
            {translate('table.member.text')}
          </Paragraph>
        </SortingHeader>
      ),
      width: '12%',
      renderRow: (member: any) => {
        const initials = getInitialsFromEmail(member.user.name);
        return (
          <FlexBox alignItems="center">
            <div data-tip data-for={member.name}>
              <FlexBox alignItems="center">
                <Box paddingRight="sm">
                  <ColoredCircle color="secondary" size="sm">
                    {initials}
                  </ColoredCircle>
                </Box>
                <Paragraph size="small">{member.user.name}</Paragraph>
              </FlexBox>
            </div>
            <ReactTooltip id={member.user.name} place="top" effect="solid">
              <Paragraph color="white">{member.user.name}</Paragraph>
            </ReactTooltip>
          </FlexBox>
        );
      },
    },
    {
      render: () => (
        <Paragraph size="small" style={headColStyle}>
          {translate('table.status.text')}
        </Paragraph>
      ),
      width: '12%',
      renderRow: (member: any) => (
        <FlexBox alignItems="center">
          <div data-tip data-for={member?.user?.active ? 'Accepted' : 'Pending'}>
            <Paragraph size="small">
              {member?.user?.active === false ? (
                <TokenPopup
                  id={member?.user?.id}
                  username={member?.user?.name}
                  active={member?.user?.active}
                />
              ) : (
                <Paragraph>Accepted</Paragraph>
              )}
            </Paragraph>
          </div>
          <ReactTooltip
            id={member?.user?.active ? 'Accepted' : 'Pending'}
            place="top"
            effect="solid"
          >
            <Paragraph color="white">
              {member?.user?.active ? 'Accepted' : 'Pending'}
            </Paragraph>
          </ReactTooltip>
        </FlexBox>
      ),
    },
    {
      render: () => (<Paragraph size="small" style={headColStyle}>Roles</Paragraph>),
      width: '15%',
      renderRow: (member: any) => {
        const roles = [...member?.role?.permissions]?.sort((a, b) =>
            a > b ? 1 : -1,
        )
        return (
          <FlexBox alignItems="center">  
              <Paragraph size="small">
                <Paragraph>{roles?.toString()}</Paragraph>  
              </Paragraph>
          </FlexBox>
        )
      }
    },
    {
      render: () => (
        <SortingHeader
          sorting="created"
          sortMethod={sortMethod('created', {
            asc: (filteredMembers: any[]) =>
              _.orderBy(
                filteredMembers,
                (member: any) => new Date(member?.user?.created).getTime(),
                ['asc'],
              ),
            desc: (filteredMembers: any[]) =>
              _.orderBy(
                filteredMembers,
                (member: any) => new Date(member?.user?.created).getTime(),
                ['desc'],
              ),
          })}
          activeSorting={activeSorting}
          activeSortingDirection={activeSortingDirection}
        >
          <Paragraph size="small" style={headColStyle}>
            {translate('table.createdAt.text')}
          </Paragraph>
        </SortingHeader>
      ),
      width: '13%',
      renderRow: (member: any) => (
        <FlexBox alignItems="center">
          <div data-tip data-for={formatDateToSort(member?.user?.created)}>         
            <FlexBox alignItems="center">
              <Box paddingRight="sm">
                <icons.calendar color={iconColors.grey} size={iconSizes.sm} />
              </Box>
              <Paragraph color="grey" size="tiny">
                {formatDateToDisplayOnTable(member?.user?.created)}
              </Paragraph>
            </FlexBox>
          </div>
          <ReactTooltip
            id={formatDateToSort(member?.user?.created)}
            place="top"
            effect="solid"
          >
            <Paragraph color="white">{member?.user?.created}</Paragraph>
          </ReactTooltip>
        </FlexBox>
      ),
    },
    {
      render: () => <Paragraph size="small"></Paragraph>,
      width: decoded.permissions.includes('write') ? '5%' :'0%',
      renderRow: (member: any) => (
        <FlexBox alignItems="center">
          {decoded.permissions.includes('write') && (
          <>
          <FlexBox>
            <div data-tip data-for={member?.user?.id}>
              <DeleteMember member={member?.user} />
            </div>
            {/* <ReactTooltip id={member.id} place="top" effect="solid">
              <Paragraph color="white">Delete Member</Paragraph>
            </ReactTooltip> */}
          </FlexBox>
          <FlexBox >
            <div data-tip data-for={member?.user?.id}>
              <UpdateMember member={member} />
            </div>
          </FlexBox>
          </> 
          )}
        </FlexBox>
        )      
    }
  ];
};
