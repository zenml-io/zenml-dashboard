import React from 'react';
import { translate } from './translate';
import {
  formatDateToDisplayOnTable,
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
// import { SortingHeader } from './ForSorting/SortingHeader';
import { useService } from './ForSorting/useServiceForSorting';
// import _ from 'lodash';

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
            {formatDateToDisplayOnTable(invite.createdAt)}
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
  console.log(sortMethod);

  return [
    {
      render: () => (
        // <SortingHeader
        //   sorting="name"
        //   sortMethod={sortMethod('name', {
        //     asc: (filteredMembers: TMember[]) =>
        //       _.orderBy(filteredMembers, ['name'], ['asc']),
        //     desc: (filteredMembers: TMember[]) =>
        //       _.orderBy(filteredMembers, ['name'], ['desc']),
        //   })}
        //   activeSorting={activeSorting}
        //   activeSortingDirection={activeSortingDirection}
        // >
        <Paragraph size="small" style={headColStyle}>
          {translate('table.member.text')}
        </Paragraph>
        // </SortingHeader>
      ),
      width: '12%',
      renderRow: (member: TMember) => {
        const initials = getInitialsFromEmail(member.name);
        return (
          <FlexBox alignItems="center">
            <div data-tip data-for={member.name}>
              <FlexBox alignItems="center">
                <Box paddingRight="sm">
                  <ColoredCircle color="secondary" size="sm">
                    {initials}
                  </ColoredCircle>
                </Box>
                <Paragraph size="small">{member.name}</Paragraph>
              </FlexBox>
            </div>
            <ReactTooltip id={member.name} place="top" effect="solid">
              <Paragraph color="white">{member.name}</Paragraph>
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
      renderRow: (member: TMember) => (
        <FlexBox alignItems="center">
          <div data-tip data-for={member?.active ? 'Accepted' : 'Pending'}>
            <Paragraph size="small">
              {member?.active === false ? (
                <TokenPopup
                  id={member?.id}
                  username={member?.name}
                  active={member?.active}
                />
              ) : (
                <Paragraph>Accepted</Paragraph>
              )}
            </Paragraph>
          </div>
          <ReactTooltip
            id={member?.active ? 'Accepted' : 'Pending'}
            place="top"
            effect="solid"
          >
            <Paragraph color="white">
              {member?.active ? 'Accepted' : 'Pending'}
            </Paragraph>
          </ReactTooltip>
        </FlexBox>
      ),
    },
    {
      render: () => (
        <Paragraph size="small" style={headColStyle}>
          Roles
        </Paragraph>
      ),
      width: '15%',
      renderRow: (member: TMember) => {
        const role = member?.roles?.map((e) => {
          return e.name;
        });

        return (
          <FlexBox alignItems="center">
            <Paragraph size="small">
              <Paragraph>{role?.toString()}</Paragraph>
            </Paragraph>
          </FlexBox>
        );
      },
    },
    {
      render: () => (
        // <SortingHeader
        //   sorting="created"
        //   sortMethod={sortMethod('created', {
        //     asc: (filteredMembers: any[]) =>
        //       _.orderBy(
        //         filteredMembers,
        //         (member: any) => new Date(member?.created).getTime(),
        //         ['asc'],
        //       ),
        //     desc: (filteredMembers: any[]) =>
        //       _.orderBy(
        //         filteredMembers,
        //         (member: any) => new Date(member?.created).getTime(),
        //         ['desc'],
        //       ),
        //   })}
        //   activeSorting={activeSorting}
        //   activeSortingDirection={activeSortingDirection}
        // >
        <Paragraph size="small" style={headColStyle}>
          {translate('table.createdAt.text')}
        </Paragraph>
        // </SortingHeader>
      ),
      width: '13%',
      renderRow: (member: TMember) => (
        <FlexBox alignItems="center">
          <div data-tip data-for={formatDateToDisplayOnTable(member?.created)}>
            <FlexBox alignItems="center">
              <Box paddingRight="sm">
                <icons.calendar color={iconColors.grey} size={iconSizes.sm} />
              </Box>
              <Paragraph color="grey" size="tiny">
                {formatDateToDisplayOnTable(member?.created)}
              </Paragraph>
            </FlexBox>
          </div>
          <ReactTooltip
            id={formatDateToDisplayOnTable(member?.created)}
            place="top"
            effect="solid"
          >
            <Paragraph color="white">
              {formatDateToDisplayOnTable(member?.created)}
            </Paragraph>
          </ReactTooltip>
        </FlexBox>
      ),
    },
    {
      render: () => <Paragraph size="small"></Paragraph>,
      width: decoded.permissions.includes('write') ? '5%' : '0%',
      renderRow: (member: any) => (
        <FlexBox alignItems="center">
          {decoded.permissions.includes('write') && (
            <>
              <FlexBox>
                <div data-tip data-for={member?.id}>
                  <UpdateMember member={member} />
                </div>
              </FlexBox>

              <FlexBox>
                <div data-tip data-for={member?.id}>
                  <DeleteMember member={member} />
                </div>
                {/* <ReactTooltip id={member.id} place="top" effect="solid">
              <Paragraph color="white">Delete Member</Paragraph>
            </ReactTooltip> */}
              </FlexBox>
            </>
          )}
        </FlexBox>
      ),
    },
  ];
};
