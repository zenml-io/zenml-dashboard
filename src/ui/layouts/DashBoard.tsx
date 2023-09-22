/* eslint-disable */

import React, { useState, useEffect } from 'react';
import { AuthenticatedLayout } from './common/layouts/AuthenticatedLayout';
import { SidebarContainer } from './common/layouts/SidebarContainer';
import {
  Box,
  Col,
  EaseInBox,
  FlexBox,
  H2,
  H4,
  Row,
  ColoredCircle,
  icons,
  GhostButton,
  Paragraph,
  FullWidthSpinner,
} from '../components';
import { getTranslateByScope } from '../../services';

import styles from './Home.module.scss';
import {
  iconColors,
  DEFAULT_WORKSPACE_NAME,
  toasterTypes,
} from '../../constants';
import { sessionSelectors } from '../../redux/selectors/session';
import {
  useDispatch,
  useLocationPath,
  usePushRoute,
  useSelector,
} from '../hooks';
import axios from 'axios';
import { routePaths } from '../../routes/routePaths';
import {
  workspaceSelectors,
  stackComponentSelectors,
} from '../../redux/selectors';
import {
  showToasterAction,
  workspacesActions,
  pipelinePagesActions,
  runPagesActions,
  organizationActions,
} from '../../redux/actions';
import { NotFound } from './NotFound';

import { rolesActions } from '../../redux/actions/roles';

export const translate = getTranslateByScope('ui.layouts.Dashboard');

const GreyBoxWithIcon: React.FC<{
  title: string;
  buttonText: string;
  IconComponent: React.ReactNode;
  onClick: () => void;
}> = ({ title, buttonText, IconComponent, onClick }) => {
  return (
    <FlexBox.Row
      marginVertical="md"
      className={styles.greyBoxWithIcon}
      padding="md"
      alignItems="center"
      justifyContent="space-between"
    >
      <FlexBox.Row alignItems="center">
        <Box marginRight="md">
          <ColoredCircle color="primary" size="lg">
            {IconComponent}
          </ColoredCircle>
        </Box>
        <H4 bold>{title}</H4>
      </FlexBox.Row>
      <Box>
        <GhostButton style={{ width: '124px' }} onClick={onClick}>
          {buttonText}
        </GhostButton>
      </Box>
    </FlexBox.Row>
  );
};

export const DashBoard: React.FC = () => {
  const { push } = usePushRoute();
  const dispatch = useDispatch();
  const locationPath = useLocationPath();
  const [isHover, setIsHover] = useState(false);
  const [box, setBox] = useState('');
  const stackComponentsTypes: any[] = useSelector(
    stackComponentSelectors.stackComponentTypes,
  );
  const [notFound, setNotFound] = useState(false);

  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);
  const workspaces = useSelector(workspaceSelectors.myWorkspaces);
  const [fetching, setFetching] = useState(false);
  const [dashboardData, setDashboardData] = useState('');
  const authToken = useSelector(sessionSelectors.authenticationToken);
  const isCookieAuthenticated = useSelector(
    sessionSelectors.isCookieAuthenticated,
  );

  const startLoad = () => {
    dispatch(pipelinePagesActions.setFetching({ fetching: true }));
    dispatch(runPagesActions.setFetching({ fetching: true }));
  };

  const stopLoad = () => {
    dispatch(pipelinePagesActions.setFetching({ fetching: false }));
    dispatch(runPagesActions.setFetching({ fetching: false }));
  };

  const url = window.location.pathname;

  useEffect(() => {
    if (url === '/') {
      push(
        routePaths.dashboard(
          selectedWorkspace ? selectedWorkspace : DEFAULT_WORKSPACE_NAME,
        ),
      );
    }
    if (locationPath.includes('workspaces')) {
      const workspaceFromUrl = locationPath.split('/')[2];

      push(
        routePaths.dashboard(
          workspaceFromUrl ? workspaceFromUrl : DEFAULT_WORKSPACE_NAME,
        ),
      );
    }
    if (!!authToken || isCookieAuthenticated) {
      dispatch(rolesActions.getRoles({}));
      dispatch(organizationActions.getMembers({}));

      const getDashboardData = async () => {
        setFetching(true);
        startLoad();

        try {
          const workspaceFromUrl = locationPath.split('/')[2];
          const { data } = await axios.get(
            `${process.env.REACT_APP_BASE_API_URL}/workspaces/${
              workspaceFromUrl !== selectedWorkspace
                ? workspaceFromUrl
                : selectedWorkspace
            }/statistics`,
            { headers: { Authorization: `bearer ${authToken}` } },
          );

          setDashboardData(data);
          setFetching(false);
        } catch (e) {
          dispatch(
            showToasterAction({
              description: 'Not found',
              type: toasterTypes.failure,
            }),
          );

          await dispatch(
            workspacesActions.getMy({
              selectDefault: false,
              selectedWorkspace: DEFAULT_WORKSPACE_NAME,
              onSuccess: () => setNotFound(true),
              onFailure: () => stopLoad(),
            }),
          );
        }
      };
      getDashboardData();
    }
  }, [authToken, selectedWorkspace]);

  const preData = Object.entries(dashboardData);
  const data = preData?.map(([key, value]) => {
    const objData = { text: key, value: value };
    return objData;
  });

  const handleMouseEnter = (e: { text: any; value?: string }) => {
    setBox(e.text);
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setBox('');
    setIsHover(false);
  };

  if (notFound) return <NotFound />;

  return (
    <AuthenticatedLayout>
      <SidebarContainer>
        <EaseInBox>
          <Box marginTop="5xl" marginLeft="xl">
            <Row style={{ alignItems: 'center' }}>
              <Col xs={12} lg={10}>
                <Box paddingBottom="md">
                  <H2 bold>{translate('title')}</H2>
                </Box>
                <Box paddingBottom="lg">
                  <H4 bold>{translate('subtitle')}</H4>
                </Box>
              </Col>

              {fetching ? (
                <FullWidthSpinner color="black" size="md" />
              ) : (
                <Row style={{ alignItems: 'center', marginLeft: '15px' }}>
                  {data?.map((e, index) => (
                    <Box
                      onMouseEnter={() => handleMouseEnter(e)}
                      onMouseLeave={handleMouseLeave}
                      key={index}
                      marginRight="xxl"
                      style={{
                        width: '220px',
                        minHeight: '100px',
                        border: '1px solid #C9CBD0',
                        borderRadius: '6px',
                        padding: '13px 14px',
                        marginTop: '10px',
                        cursor: 'pointer',
                        backgroundColor:
                          box === e.text && isHover ? '#431D93' : '#fff',
                      }}
                      onClick={() => {
                        if (e.text === 'stacks') {
                          push(routePaths.stacks.base);
                        } else if (e.text === 'pipelines') {
                          push(routePaths.pipelines.base);
                        } else if (e.text === 'runs') {
                          push(routePaths.pipelines.allRuns(selectedWorkspace));
                        } else if (e.text === 'components') {
                          push(
                            routePaths.stackComponents.base(
                              stackComponentsTypes[0],
                              selectedWorkspace,
                            ),
                          );
                        }
                      }}
                    >
                      <Paragraph
                        style={{
                          fontSize: '24px',
                          fontWeight: 'bold',
                          color: box === e.text ? '#fff' : '#431D93',
                        }}
                      >
                        {e.value}
                      </Paragraph>
                      <Paragraph
                        style={{
                          fontSize: '14px',
                          fontWeight: 'inherit',
                          color: box === e.text ? '#fff' : '#646972',
                          marginTop: '38px',
                        }}
                      >
                        Number of {e.text}
                      </Paragraph>
                    </Box>
                  ))}
                </Row>
              )}

              <Col xs={12} lg={7}>
                <Box marginTop="xxxl">
                  <GreyBoxWithIcon
                    onClick={() =>
                      window.open(translate('cardOne.button.href'), '_blank')
                    }
                    IconComponent={<icons.bookOpen color={iconColors.white} />}
                    title={translate('cardOne.title')}
                    buttonText={translate('cardOne.button.text')}
                  />
                  <GreyBoxWithIcon
                    onClick={() => push('/settings/personal-details')}
                    IconComponent={<icons.tool color={iconColors.white} />}
                    title={translate('cardTwo.title')}
                    buttonText={translate('cardTwo.button.text')}
                  />
                  <GreyBoxWithIcon
                    onClick={() => push('/settings/organization')}
                    IconComponent={<icons.userPlus color={iconColors.white} />}
                    title={translate('cardThree.title')}
                    buttonText={translate('cardThree.button.text')}
                  />
                </Box>
              </Col>
            </Row>
          </Box>
        </EaseInBox>
      </SidebarContainer>
    </AuthenticatedLayout>
  );
};

export default DashBoard;
