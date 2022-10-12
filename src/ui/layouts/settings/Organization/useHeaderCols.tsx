import React from 'react';
import { translate } from './translate';
import {
  formatDateToDisplay,
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
import { TokenPopup } from './tokenPopup';
import ReactTooltip from 'react-tooltip';

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
            <ReactTooltip
              id={member.name}
              place="top"
              effect="solid"
              // backgroundColor={getBGColorFromInvoiceStatus(invoice.status)}
            >
              <Paragraph color="white">
                {member.name}
                {/* {translate(`tooltips.${invoice.status}`)} */}
              </Paragraph>
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
      width: '15%',
      renderRow: (member: TMember) => (
        <FlexBox alignItems="center">
          <div data-tip data-for={member?.active ? 'Accepted' : 'Pending'}>
            <Paragraph size="small">
              {member.active === false ? (
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
            // backgroundColor={getBGColorFromInvoiceStatus(invoice.status)}
          >
            <Paragraph color="white">
              {member?.active ? 'Accepted' : 'Pending'}
              {/* {translate(`tooltips.${invoice.status}`)} */}
            </Paragraph>
          </ReactTooltip>
        </FlexBox>
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
          <div data-tip data-for={formatDateToSort(member.created)}>
            <FlexBox alignItems="center">
              <Box paddingRight="sm">
                <icons.calendar color={iconColors.grey} size={iconSizes.sm} />
              </Box>
              <Paragraph color="grey" size="tiny">
                {formatDateToDisplay(member.created)}
              </Paragraph>
            </FlexBox>
          </div>
          <ReactTooltip
            id={formatDateToSort(member.created)}
            place="top"
            effect="solid"
            // backgroundColor={getBGColorFromInvoiceStatus(invoice.status)}
          >
            <Paragraph color="white">
              {member.created}
              {/* {translate(`tooltips.${invoice.status}`)} */}
            </Paragraph>
          </ReactTooltip>
        </FlexBox>
      ),
    },
    {
      render: () => <Paragraph size="small"></Paragraph>,
      width: '5%',
      renderRow: (member: TInvite) => (
        <FlexBox alignItems="center">
          <div data-tip data-for={member.id}>
            <DeleteMember member={member} />
          </div>
          <ReactTooltip
            id={member.id}
            place="top"
            effect="solid"
            // backgroundColor={getBGColorFromInvoiceStatus(invoice.status)}
          >
            <Paragraph color="white">
              Delete Member
              {/* {translate(`tooltips.${invoice.status}`)} */}
            </Paragraph>
          </ReactTooltip>
        </FlexBox>
      ),
      //
    },
  ];
};
