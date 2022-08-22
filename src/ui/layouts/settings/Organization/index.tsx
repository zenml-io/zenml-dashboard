import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { organizationActions } from '../../../../redux/actions';
import { organizationSelectors } from '../../../../redux/selectors';
import { getInitials } from '../../../../utils';
import {
  FlexBox,
  Box,
  ColoredSquare,
  Paragraph,
  PrimaryButton,
  LinkBox,
} from '../../../components';
import { useRequestOnMount } from '../../../hooks';
import { Table } from '../../common/Table';
import { translate } from './translate';
import { useMemberHeaderCols, useInviteHeaderCols } from './useHeaderCols';

import { InvitePopup } from './InvitePopup';

type Table = 'members' | 'invites';

export const Organization: React.FC = () => {
  const [fetchingInvites, setFetchingInvites] = useState(true);
  const [fetchingMembers, setFetchingMembers] = useState(true);

  const [popupOpen, setPopupOpen] = useState(false);
  const [currentTable, setCurrentTable] = useState('members');

  useRequestOnMount(organizationActions.getMy);
  useRequestOnMount(organizationActions.getRoles);
  useRequestOnMount(() =>
    organizationActions.getInvites({
      onSuccess: () => setFetchingInvites(false),
      onFailure: () => setFetchingInvites(false),
    }),
  );
  useRequestOnMount(() =>
    organizationActions.getMembers({
      onSuccess: () => setFetchingMembers(false),
      onFailure: () => setFetchingMembers(false),
    }),
  );

  const organization = useSelector(organizationSelectors.myOrganization);
  const invites = useSelector(organizationSelectors.invites);
  const members = useSelector(organizationSelectors.myMembers);

  const memberHeaderCols = useMemberHeaderCols();
  const inviteHeaderCols = useInviteHeaderCols();

  if (!organization) return null;

  return (
    <>
      {popupOpen && (
        <InvitePopup
          setPopupOpen={setPopupOpen}
          setFetchingInvites={setFetchingInvites}
        />
      )}

      <FlexBox.Column flex={1} style={{ width: '100%' }}>
        <FlexBox.Row alignItems="center" justifyContent="space-between">
          <FlexBox.Row alignItems="center">
            <Box>
              <ColoredSquare size="md" color="secondary">
                <Paragraph color="white">
                  {getInitials(organization.name)}
                </Paragraph>
              </ColoredSquare>
            </Box>
            <Box marginLeft="md">
              <Paragraph bold>{organization.name}</Paragraph>
            </Box>
          </FlexBox.Row>
          <Box>
            <PrimaryButton onClick={() => setPopupOpen(true)}>
              {translate('button.text')}
            </PrimaryButton>
          </Box>
        </FlexBox.Row>
        <Box marginTop="xxl">
          <FlexBox.Row marginBottom="md">
            <Box paddingHorizontal="md">
              <LinkBox onClick={() => setCurrentTable('members')}>
                <Paragraph
                  bold
                  color={currentTable === 'members' ? 'primary' : 'darkGrey'}
                >
                  {translate('members')} {`(${members.length})`}
                </Paragraph>
              </LinkBox>
            </Box>
            <Box paddingHorizontal="md">
              <LinkBox onClick={() => setCurrentTable('invites')}>
                <Paragraph
                  bold
                  color={currentTable === 'invites' ? 'primary' : 'darkGrey'}
                >
                  {translate('invites')} {`(${invites.length})`}
                </Paragraph>
              </LinkBox>
            </Box>
          </FlexBox.Row>
          {currentTable === 'members' && (
            <Table
              pagination={true}
              headerCols={memberHeaderCols}
              loading={fetchingMembers}
              showHeader={true}
              tableRows={members}
              emptyState={{ text: translate('emptyState.text') }}
            />
          )}
          {currentTable === 'invites' && (
            <Table
              pagination={true}
              headerCols={inviteHeaderCols}
              loading={fetchingInvites}
              showHeader={true}
              tableRows={invites}
              emptyState={{ text: translate('emptyState.text') }}
            />
          )}
        </Box>
      </FlexBox.Column>
    </>
  );
};
