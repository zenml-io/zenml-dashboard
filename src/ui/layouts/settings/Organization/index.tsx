import React, { useState, useEffect } from 'react';
import styles from './index.module.scss';
import { organizationActions } from '../../../../redux/actions';

import {
  FlexBox,
  Box,
  Paragraph,
  Row,
  FullWidthSpinner,
} from '../../../components';
import { useDispatch, useSelector } from '../../../hooks';
import { translate } from './translate';
import { InvitePopup } from './InvitePopup';
import { useService } from './useService';
import { rolesActions } from '../../../../redux/actions/roles';
import { sessionSelectors } from '../../../../redux/selectors';
import jwt_decode from 'jwt-decode';

import AddUserBox from './UserBox/AddUserBox';
import UserBox from './UserBox/UserBox';
import { PasswordPopup } from '../PasswordPopup';

export const Organization: React.FC = () => {
  const dispatch = useDispatch();

  const authToken = useSelector(sessionSelectors.authenticationToken);
  if (authToken) {
    var decoded: any = jwt_decode(authToken as any);
  }
  // eslint-disable-next-line
  const [fetchingMembers, setFetchingMembers] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [showPasswordPopup, setShowPasswordPopup] = useState(false);
  const [user, setUser] = useState<any>({});
  const ITEMS_PER_PAGE = parseInt(
    process.env.REACT_APP_ITEMS_PER_PAGE as string,
  );
  const DEFAULT_ITEMS_PER_PAGE = 100;
  const { filteredMembers } = useService();

  useEffect(() => {
    setFetchingMembers(true);
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
  if (fetchingMembers) {
    return <FullWidthSpinner color="black" size="md" />;
  }

  return (
    <>
      {popupOpen && <InvitePopup setPopupOpen={setPopupOpen} />}
      {showPasswordPopup && (
        <PasswordPopup
          user={user}
          username={user?.name}
          isUpdate={true}
          setPopupOpen={setShowPasswordPopup}
        />
      )}

      <FlexBox.Column flex={1} style={{ width: '100%', marginLeft: '40px' }}>
        <Box marginTop="lg">
          <FlexBox.Row marginBottom="md">
            <Box>
              <Paragraph bold className={styles.numberOfMembers}>
                {translate('members')} {`(${filteredMembers.length})`}
              </Paragraph>
            </Box>
          </FlexBox.Row>

          <Row>
            {decoded.permissions.includes('write') && (
              <div onClick={() => setPopupOpen(true)}>
                <AddUserBox />
              </div>
            )}
            {filteredMembers?.map((e) => (
              <UserBox
                data={e}
                permission={decoded.permissions.includes('write')}
                setShowPasswordUpdate={setShowPasswordPopup}
                setUser={setUser}
              />
            ))}
          </Row>
        </Box>
      </FlexBox.Column>
    </>
  );
};

// export const callActionForMembersForPagination = () => {
//   const dispatch = useDispatch();
//   const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);

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
