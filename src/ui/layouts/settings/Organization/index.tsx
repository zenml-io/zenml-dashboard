import React, { useState, useEffect } from 'react';
import { organizationActions } from '../../../../redux/actions';

import {
  FlexBox,
  Box,
  Paragraph,
  PrimaryButton,
  LinkBox,
} from '../../../components';
import { useDispatch } from '../../../hooks';
import { Table } from '../../common/Table';
import { translate } from './translate';
import { useMemberHeaderCols } from './useHeaderCols';
import { InvitePopup } from './InvitePopup';
import { useService } from './useService';

type Table = 'members' | 'invites';

export const Organization: React.FC = () => {
  const dispatch = useDispatch();

  const [fetchingMembers, setFetchingMembers] = useState(true);

  const [popupOpen, setPopupOpen] = useState(false);
  const [currentTable, setCurrentTable] = useState('members');

  const {
    filteredMembers,
    setFilteredMembers,
    activeSorting,
    setActiveSorting,
    activeSortingDirection,
    setActiveSortingDirection,
  } = useService();

  const memberHeaderCols = useMemberHeaderCols({
    filteredMembers,
    setFilteredMembers: setFilteredMembers,
    activeSorting,
    setActiveSorting,
    activeSortingDirection,
    setActiveSortingDirection,
  });

  useEffect(() => {
    dispatch(
      organizationActions.getMembers({
        onSuccess: () => setFetchingMembers(false),
        onFailure: () => setFetchingMembers(false),
      }),
    );
  }, [dispatch]);

  return (
    <>
      {popupOpen && <InvitePopup setPopupOpen={setPopupOpen} />}
      <FlexBox.Column flex={1} style={{ width: '100%', marginLeft: '40px' }}>
        <FlexBox.Row marginTop="lg" alignItems="center" justifyContent="end">
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
                  {translate('members')} {`(${filteredMembers.length})`}
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
              tableRows={filteredMembers}
              emptyState={{ text: translate('emptyState.text') }}
            />
          )}
        </Box>
      </FlexBox.Column>
    </>
  );
};
