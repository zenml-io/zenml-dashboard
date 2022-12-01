import React, { useState, useEffect } from 'react';
import { organizationActions } from '../../../../redux/actions';

import {
  FlexBox,
  Box,
  Paragraph,
  PrimaryButton,
  LinkBox,
} from '../../../components';
import { useDispatch, useSelector } from '../../../hooks';
import { Table } from '../../common/Table';
import { translate } from './translate';
import { useMemberHeaderCols } from './useHeaderCols';
import { InvitePopup } from './InvitePopup';
import { useService } from './useService';
import { rolesActions } from '../../../../redux/actions/roles';
import { sessionSelectors } from '../../../../redux/selectors';
import jwt_decode from 'jwt-decode';

type Table = 'members' | 'invites';

export const Organization: React.FC = () => {
  const dispatch = useDispatch();
  const authToken = useSelector(sessionSelectors.authenticationToken);
  if (authToken) {
    var decoded: any = jwt_decode(authToken as any);
  }
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
    decoded,
    filteredMembers,
    setFilteredMembers: setFilteredMembers,
    activeSorting,
    setActiveSorting,
    activeSortingDirection,
    setActiveSortingDirection,
  });

  useEffect(() => {
    dispatch(rolesActions.getRoles({}));
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
            <PrimaryButton
              disabled={!decoded.permissions.includes('write')}
              onClick={() => setPopupOpen(true)}
            >
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
