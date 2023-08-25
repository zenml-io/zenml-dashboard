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
  Paragraph,
} from '../../../components';
import { HeaderCol } from '../../common/Table';
import { DeleteMember } from './DeleteMember';

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
