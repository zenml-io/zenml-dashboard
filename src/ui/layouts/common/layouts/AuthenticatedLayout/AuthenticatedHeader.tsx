import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  FlexBox,
  Box,
  Paragraph,
  ColoredCircle,
  LinkBox,
  icons,
  If,
  Separator,
} from '../../../../components';

import styles from './AuthenticatedHeader.module.scss';
import { iconColors, iconSizes } from '../../../../../constants/icons';
import {
  workspaceSelectors,
  userSelectors,
} from '../../../../../redux/selectors';
import { getInitials } from '../../../../../utils/name';
import { DEFAULT_FULL_NAME } from '../../../../../constants';
import OutsideClickHandler from 'react-outside-click-handler';
import {
  useDispatch,
  useLocationPath,
  usePushRoute,
  useSelector,
} from '../../../../hooks';
import {
  workspacesActions,
  sessionActions,
  pipelinesActions,
  pipelinePagesActions,
  runPagesActions,
  stackPagesActions,
} from '../../../../../redux/actions';
import { routePaths } from '../../../../../routes/routePaths';
import { WorkspacePopup } from './workspacePopup';
import ReactTooltip from 'react-tooltip';
import { Breadcrumbs } from '../../Breadcrumbs';
// import { CookiePopup } from './CookiePopup'

// import { endpoints } from '../../../../../api/endpoints';

export const AuthenticatedHeader: React.FC<{
  breadcrumb?: Array<any>;
  setMobileMenuOpen: (val: boolean) => void;
}> = ({ breadcrumb, setMobileMenuOpen }) => {
  const user = useSelector(userSelectors.myUser);
  const workspaces = useSelector(workspaceSelectors.myWorkspaces);
  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);

  const history = useHistory();
  const [popupOpen, setPopupOpen] = useState<boolean>(false);
  const [createPopupOpen, setCreatePopupOpen] = useState<boolean>(false);
  // const [showCookiePopup, setShowCookiePopup] = useState<any>(localStorage.getItem('showCookie'));

  const dispatch = useDispatch();
  const { push } = usePushRoute();
  const locationPath = useLocationPath();
  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     //assign interval to a variable to clear it.
  // dispatch(
  //   workspacesActions.getMy({ selectDefault: false, selectedWorkspace }),
  // );
  //   }, 5000);
  //   return () => clearInterval(intervalId);
  //   //This is important
  // });
  //   useEffect(() => {
  //     return history.listen((location) => {
  //       console.log(location)
  //       //  window._mfq.push(['newPageView', location.pathname]);
  //     })
  //  }, [history])

  useEffect(() => {
    if (locationPath.includes('workspaces')) {
      const workspaceFromUrl = locationPath.split('/')[2];

      if (selectedWorkspace !== workspaceFromUrl && user) {
        push(routePaths.dashboard(workspaceFromUrl));
      }

      dispatch(
        workspacesActions.getMy({
          selectDefault: false,
          selectedWorkspace: workspaceFromUrl
            ? workspaceFromUrl
            : selectedWorkspace,
        }),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   return () => {
  //     if (window.performance) {
  //       console.info('window.performance works fine on this browser');
  //     }
  //     if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
  //       console.info('This page is reloaded');
  //     } else {
  //       if (selectedWorkspace != window.location.pathname.split('/')[2]) {
  //         console.log(
  //           'reloaded',
  //           selectedWorkspace,
  //           window.location.pathname.split('/')[2],
  //         );
  //         push(routePaths.home(window.location.pathname.split('/')[2]));
  //       }
  //     }
  //   };
  // });
  if (!user) return null;

  const userFullName = user.fullName || user.name || DEFAULT_FULL_NAME;
  const userInitials = getInitials(userFullName);
  const ITEMS_PER_PAGE = parseInt(
    process.env.REACT_APP_ITEMS_PER_PAGE as string,
  );
  const DEFAULT_ITEMS_PER_PAGE = 10;
  const logout = () => {
    dispatch(sessionActions.logout());
    history.push('/login');
  };

  const startLoad = () => {
    // debugger;
    dispatch(pipelinePagesActions.setFetching({ fetching: true }));
    dispatch(runPagesActions.setFetching({ fetching: true }));
    dispatch(stackPagesActions.setFetching({ fetching: true }));
  };

  const stopLoad = () => {
    dispatch(pipelinePagesActions.setFetching({ fetching: false }));
    dispatch(runPagesActions.setFetching({ fetching: false }));
    dispatch(stackPagesActions.setFetching({ fetching: false }));
  };

  const onChange = async (e: any) => {
    startLoad();

    await history.push(routePaths.dashboard(e?.name));
    await dispatch(
      workspacesActions.getSelectedWorkspace({
        allWorkspaces: workspaces,
        seletecdWorkspace: e?.name,
      }),
    );
    await dispatch(
      pipelinesActions.getMy({
        sort_by: 'desc:created',
        logical_operator: 'and',
        page: 1,
        size: ITEMS_PER_PAGE ? ITEMS_PER_PAGE : DEFAULT_ITEMS_PER_PAGE,
        workspace: e?.name,
        onSuccess: () => stopLoad(),
        onFailure: () => stopLoad(),
      }),
    );
    await dispatch(
      workspacesActions.getMy({
        selectDefault: false,
        selectedWorkspace: e?.name,
      }),
    );
  };

  const selected = workspaces.some(
    (workspace) => workspace['name'] === locationPath.split('/')[2],
  )
    ? locationPath.split('/')[2].substring(0, 10)
    : selectedWorkspace;

  return (
    <>
      {createPopupOpen && <WorkspacePopup setPopupOpen={setCreatePopupOpen} />}
      <FlexBox
        paddingHorizontal="lg"
        alignItems="center"
        justifyContent="space-between"
        className={styles.header}
        id="header"
        >
          {/* __UNAUTH */}
        {/* Muhammad Ali Zia */}
        <FlexBox alignItems="center">
          <Box className="d-md-none">
            <LinkBox onClick={() => setMobileMenuOpen(true)}>
              <icons.burger size={iconSizes.md} />
            </LinkBox>
          </Box>
        </FlexBox>

        <Breadcrumbs breadcrumbs={breadcrumb as any} />

        <If condition={!!userFullName}>
          {() => (
            <Box style={{ position: 'relative' }}>
              <LinkBox onClick={() => setPopupOpen(!popupOpen)}>
                <FlexBox alignItems="center">
                  <FlexBox alignItems="center" className="d-none d-md-flex">
                    <Box paddingRight="sm" style={{ textAlign: 'end' }}>
                      <Paragraph>{userFullName}</Paragraph>
                      <span className={styles.selectedWorkspace}>
                        {selected}
                      </span>
                    </Box>
                  </FlexBox>
                  <Box marginRight="sm">
                    <ColoredCircle size="md" color="secondary">
                      {userInitials}
                    </ColoredCircle>
                  </Box>
                  <Box>
                    {/* <icons.chevronDown
                      size={iconSizes.xs}
                      color={iconColors.black}
                    /> */}

                    <icons.chevronDown
                      color={iconColors.grey}
                      size={iconSizes.xs}
                    />
                  </Box>
                </FlexBox>
              </LinkBox>
              <If condition={popupOpen}>
                {() => (
                  <OutsideClickHandler
                    onOutsideClick={() => setPopupOpen(false)}
                  >
                    <Box className={styles.popup}>
                      <LinkBox onClick={() => push(routePaths.settings.base)}>
                        <FlexBox
                          className={styles.popupItem}
                          paddingVertical="sm"
                        >
                          <Paragraph
                            color={iconColors.primary}
                            style={{ fontSize: '16px' }}
                          >
                            {/* <Paragraph size="small" style={{ fontSize: '16px', lineHeight: '19px', color: '#443E99', paddingRight: '3px' }}>
                            Settings
                          </Paragraph> */}
                            Settings
                          </Paragraph>
                          <Box
                            paddingRight="sm"
                            style={{
                              alignSelf: 'center',
                            }}
                          >
                            <icons.emptyRightArrow
                              style={{ marginLeft: '3px' }}
                              size={iconSizes.xs}
                              color={iconColors.primary}
                            />
                          </Box>
                          {/* <icons.emptyRightArrow
                            style={{ paddingTop: '1px', marginLeft: '3px' }}
                            color={iconColors.primary}
                            size={iconSizes.xs}
                          ></icons.emptyRightArrow> */}
                        </FlexBox>
                      </LinkBox>

                      <Box marginHorizontal="md">
                        <Separator.LightNew />
                      </Box>
                      <Box marginTop="sm" marginHorizontal="md">
                        <Paragraph color="grey" className={styles.your}>
                          Your workspaces
                        </Paragraph>
                      </Box>

                      <Box
                        marginVertical="sm"
                        marginHorizontal="md"
                        className="d-none d-md-block"
                      >
                        <Box
                          marginTop="sm"
                          style={{
                            maxHeight: '290px',
                            overflow:
                              workspaces?.length > 10 ? 'auto' : 'hidden',
                          }}
                        >
                          {workspaces.map((option, index) => (
                            <Box
                              marginTop="sm"
                              onClick={() => onChange(option)}
                              key={index}
                            >
                              <div data-tip data-for={option.name}>
                                <Paragraph
                                  style={{
                                    fontSize: '16px',
                                    color: '#443E99',
                                    cursor: 'pointer',
                                    fontWeight:
                                      selected === option.name
                                        ? 'bold'
                                        : 'normal',
                                  }}
                                >
                                  {option.name.substring(0, 10)}{' '}
                                  <span
                                    style={{
                                      color:
                                        selected === option.name
                                          ? '#443E99'
                                          : '#fff',
                                    }}
                                  >
                                    &#x2022;
                                  </span>
                                </Paragraph>
                              </div>

                              <ReactTooltip
                                id={option.name}
                                place="top"
                                effect="solid"
                              >
                                <Paragraph color="white">
                                  {option.name}
                                </Paragraph>
                              </ReactTooltip>
                            </Box>
                          ))}
                        </Box>
                      </Box>

                      <Box marginHorizontal="md">
                        <Separator.LightNew />
                      </Box>

                      {process.env.REACT_APP_DEMO_SETUP === 'true' ? null : (
                        <LinkBox onClick={logout}>
                          <FlexBox
                            className={styles.popupItem}
                            paddingHorizontal="md"
                            paddingVertical="sm"
                            // alignItems="center"
                          >
                            <Box paddingRight="sm">
                              {/* <icons.signOut
                                size={iconSizes.sm}
                                color={iconColors.red}
                              /> */}
                            </Box>
                            <Paragraph color="red" size="small">
                              Log Out
                            </Paragraph>
                          </FlexBox>
                        </LinkBox>
                      )}
                    </Box>
                  </OutsideClickHandler>
                )}
              </If>
            </Box>
          )}
        </If>
      </FlexBox>
                      
      {/* {showCookiePopup !== 'false' && <CookiePopup setShowCookie={setShowCookiePopup} />} */}
    </>
  );
};
