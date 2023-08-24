import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  FlexBox,
  Box,
  Paragraph,
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
  serverInfoSelectors,
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
import DeploymentBanner from './DeploymentBanner';

export const AuthenticatedHeader: React.FC<{
  breadcrumb?: Array<any>;
  setMobileMenuOpen: (val: boolean) => void;
}> = ({ breadcrumb, setMobileMenuOpen }) => {
  const user = useSelector(userSelectors.myUser);
  const deploymentType =
    useSelector(serverInfoSelectors.getDeploymentType) || '';
  const workspaces = useSelector(workspaceSelectors.myWorkspaces);
  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);

  const history = useHistory();
  const [popupOpen, setPopupOpen] = useState<boolean>(false);
  const [createPopupOpen, setCreatePopupOpen] = useState<boolean>(false);

  const dispatch = useDispatch();

  const { push } = usePushRoute();
  const locationPath = useLocationPath();

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

  if (!user) return null;

  const userFullName = user.fullName || user.name || DEFAULT_FULL_NAME;
  const userInitials = getInitials(userFullName);
  const ITEMS_PER_PAGE = parseInt(
    process.env.REACT_APP_ITEMS_PER_PAGE as string,
  );
  const DEFAULT_ITEMS_PER_PAGE = 10;
  const logout = () => {
    localStorage.removeItem('persistSelectedStack');
    dispatch(sessionActions.logout());

    history.push('/login');
  };

  const startLoad = () => {
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
      {deploymentType === 'local' && <DeploymentBanner />}
      {createPopupOpen && <WorkspacePopup setPopupOpen={setCreatePopupOpen} />}
      <div
        className="flex space-between h-[65px] items-center !px-4 border-b border-theme-border-moderate"
        id="header"
      >
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
            <Box className="relative">
              <button onClick={() => setPopupOpen(!popupOpen)}>
                <div className="flex items-center">
                  <div className="flex items-center">
                    <div className="flex items-end flex-col py-1 !mr-2">
                      <p className="text-text-sm font-semibold">
                        {userFullName}
                      </p>
                      <p className="font-semibold text-text-xs text-theme-text-secondary">
                        {selected}
                      </p>
                    </div>
                  </div>
                  <Box marginRight="sm">
                    <div className="flex items-center justify-center w-7 h-7 rounded-rounded bg-primary-50">
                      <span className="text-theme-text-brand">
                        {userInitials}
                      </span>
                    </div>
                  </Box>
                  <Box>
                    <icons.chevronDown
                      color={iconColors.grey}
                      size={iconSizes.xs}
                    />
                  </Box>
                </div>
              </button>
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
                          >
                            <Box paddingRight="sm"></Box>
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
      </div>
    </>
  );
};
