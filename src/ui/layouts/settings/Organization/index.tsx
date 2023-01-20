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
import {
  organizationSelectors,
  sessionSelectors,
} from '../../../../redux/selectors';
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
  const ITEMS_PER_PAGE = parseInt(
    process.env.REACT_APP_ITEMS_PER_PAGE as string,
  );
  const DEFAULT_ITEMS_PER_PAGE = 10;
  const membersPaginated = useSelector(
    organizationSelectors.myMembersPaginated,
  );
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
  // function name() {
  //   console.log();
  // }
  useEffect(() => {
    dispatch(rolesActions.getRoles({}));
    dispatch(
      organizationActions.getMembers({
        page: 1,
        size: ITEMS_PER_PAGE ? ITEMS_PER_PAGE : DEFAULT_ITEMS_PER_PAGE,
        onSuccess: () => setFetchingMembers(false),
        onFailure: () => setFetchingMembers(false),
      }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
              activeSorting={activeSorting}
              paginated={membersPaginated}
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

// export const callActionForMembersForPagination = () => {
//   const dispatch = useDispatch();
//   const selectedProject = useSelector(projectSelectors.selectedProject);

//   function dispatchPipelineData(
//     page: number,
//     size: number,
//     filters?: any[],
//     sortby?: string,
//   ) {
//     // let filtersParam: any = filterObjectForParam(filters);
//     setFetchingForPipeline(true);
//     // debugger;
//     dispatch(
//       organizationActions.getMembers({
//         sort_by: sortby ? sortby : 'created',
//         page: page,
//         size: size,
//         onSuccess: () => setFetchingMembers(false),
//         onFailure: () => setFetchingMembers(false),
//       }),
//     );
//   }

//   const setFetchingForPipeline = (fetching: boolean) => {
//     dispatch(pipelinePagesActions.setFetching({ fetching }));
//   };

//   return {
//     setFetchingForPipeline,
//     dispatchPipelineData,
//   };
// };
