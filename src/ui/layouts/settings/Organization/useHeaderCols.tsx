import React from 'react';
import { translate } from './translate';
import { formatDateToDisplay, getInitialsFromEmail } from '../../../../utils';
import {
  Box,
  ColoredCircle,
  FlexBox,
  icons,
  Paragraph,
} from '../../../components';
import { HeaderCol } from '../../common/Table';
import { iconColors, iconSizes } from '../../../../constants';
import { DeleteInvite } from './DeleteInvite';
import { DeleteMember } from './DeleteMember';
import { TokenPopup } from './tokenPopup';

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
        const initials = getInitialsFromEmail(invite.email);
        return (
          <FlexBox alignItems="center">
            <Box paddingRight="sm">
              <ColoredCircle color="secondary" size="sm">
                {initials}
              </ColoredCircle>
            </Box>
            <Paragraph size="small">{invite.email}</Paragraph>
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
      renderRow: (invite: TInvite) => <DeleteInvite invite={invite} />,
    },
  ];
};

const headColStyle = { color: '#000', fontWeight: 700 }

export const useMemberHeaderCols = (): HeaderCol[] => {
  return [
    {
      render: () => (
        <Paragraph size="small" style={headColStyle}>
          {translate('table.member.text')}
        </Paragraph>
      ),
      width: '15%',
      renderRow: (member: TMember) => {
        const initials = getInitialsFromEmail(member.email);
        return (
          <FlexBox alignItems="center">
            <Box paddingRight="sm">
              <ColoredCircle color="secondary" size="sm">
                {initials}
              </ColoredCircle>
            </Box>
            <Paragraph size="small">{member.email}</Paragraph>
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
      width: '15%',
      renderRow: (member: TMember) => (
        <Paragraph size="small" >
          {member.role === 'Pending' ? (
            <TokenPopup id={member?.id} email={member?.email} activationToken={member?.activationToken} role={member?.role} />
          ) : (
            <Paragraph>{member.role}</Paragraph>
          )}
        </Paragraph>
      ),
    },
    {
      render: () => (
        <Paragraph size="small" style={headColStyle}>
          {translate('table.createdAt.text')}
        </Paragraph>
      ),
      width: '10%',
      renderRow: (member: TMember) => (
        <FlexBox alignItems="center">
          <Box paddingRight="sm">
            <icons.calendar color={iconColors.grey} size={iconSizes.sm} />
          </Box>
          <Paragraph color="black" size="tiny">
            {formatDateToDisplay(member.created_at)}
          </Paragraph>
        </FlexBox>
      ),
    },
    {
      render: () => <Paragraph size="small" ></Paragraph>,
      width: '5%',
      renderRow: (member: TInvite) => <DeleteMember member={member} />,
    },
  ];
};
