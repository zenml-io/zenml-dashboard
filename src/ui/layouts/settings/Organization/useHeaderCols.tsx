import React from 'react';
import { translate } from './translate';
import {
  formatDateToDisplayOnTable,
  getInitialsFromEmail,
} from '../../../../utils';
import { Box, ColoredCircle, FlexBox, Paragraph } from '../../../components';
import { HeaderCol } from '../../common/Table';

import { DeleteMember } from './DeleteMember';
import { UpdateMember } from './UpdateMember';
import { TokenPopup } from './tokenPopup';
import ReactTooltip from 'react-tooltip';
import { Sorting, SortingDirection } from './ForSorting/types';

import { useService } from './ForSorting/useServiceForSorting';

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
  useService({
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
        <Paragraph size="small" style={headColStyle}>
          {translate('table.member.text')}
        </Paragraph>
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
                  fullName={member?.fullName}
                  username={member?.name}
                  active={member?.active}
                  roles={member?.roles}
                  setTokenPopup={() => {}}
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
        <Paragraph size="small" style={headColStyle}>
          {translate('table.createdAt.text')}
        </Paragraph>
      ),
      width: '13%',
      renderRow: (member: TMember) => (
        <FlexBox alignItems="center">
          <div data-tip data-for={formatDateToDisplayOnTable(member?.created)}>
            <FlexBox alignItems="center">
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
                  <UpdateMember
                    member={member}
                    setEditPopup={() => {}}
                    setShowPasswordUpdate={() => {}}
                    setUser={() => {}}
                  />
                </div>
              </FlexBox>

              <FlexBox>
                <div data-tip data-for={member?.id}>
                  <DeleteMember member={member} />
                </div>
              </FlexBox>
            </>
          )}
        </FlexBox>
      ),
    },
  ];
};
