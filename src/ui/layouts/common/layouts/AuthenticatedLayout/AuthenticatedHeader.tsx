import React, { Key, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  FlexBox,
  Box,
  Paragraph,
  ColoredCircle,
  LinkBox,
  icons,
  If,
  PrimaryButton,
} from '../../../../components';

import styles from './AuthenticatedHeader.module.scss';
import { iconColors, iconSizes } from '../../../../../constants/icons';
import {
  projectSelectors,
  userSelectors,
} from '../../../../../redux/selectors';
import { getInitials } from '../../../../../utils/name';
import {
  DEFAULT_FULL_NAME,
  DEFAULT_PROJECT_NAME,
} from '../../../../../constants';
import OutsideClickHandler from 'react-outside-click-handler';
import {
  useDispatch,
  useLocationPath,
  usePushRoute,
  useSelector,
} from '../../../../hooks';
import {
  projectsActions,
  sessionActions,
  pipelinesActions,
  pipelinePagesActions,
  runPagesActions,
  stackPagesActions,
} from '../../../../../redux/actions';
import { routePaths } from '../../../../../routes/routePaths';
import cn from 'classnames';
import css from './../../../../../ui/components/inputs/index.module.scss';
import { ProjectPopup } from './ProjectPopup';
import CookieConsent from 'react-cookie-consent';
import { endpoints } from '../../../../../api/endpoints';

export const AuthenticatedHeader: React.FC<{
  setMobileMenuOpen: (val: boolean) => void;
}> = ({ setMobileMenuOpen }) => {
  const user = useSelector(userSelectors.myUser);
  const projects = useSelector(projectSelectors.myProjects);
  const selectedProject = useSelector(projectSelectors.selectedProject);

  const history = useHistory();
  const [popupOpen, setPopupOpen] = useState<boolean>(false);
  const [createPopupOpen, setCreatePopupOpen] = useState<boolean>(false);

  const dispatch = useDispatch();
  const { push } = usePushRoute();
  const locationPath = useLocationPath();
  useEffect(() => {
    const intervalId = setInterval(() => {
      //assign interval to a variable to clear it.
      dispatch(
        projectsActions.getMy({ selectDefault: false, selectedProject }),
      );
    }, 5000);
    return () => clearInterval(intervalId);
    //This is important
  });
  //   useEffect(() => {
  //     return history.listen((location) => {
  //       console.log(location)
  //       //  window._mfq.push(['newPageView', location.pathname]);
  //     })
  //  }, [history])

  useEffect(() => {
    if (locationPath.includes('projects')) {
      const projectFromUrl = locationPath.split('/')[2];

      if (selectedProject != projectFromUrl && user) {
        push(routePaths.home(projectFromUrl));
      }

      dispatch(
        projectsActions.getMy({
          selectDefault: false,
          selectedProject: projectFromUrl ? projectFromUrl : selectedProject,
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
  //       if (selectedProject != window.location.pathname.split('/')[2]) {
  //         console.log(
  //           'reloaded',
  //           selectedProject,
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

  const onChange = (e: any) => {
    e.preventDefault();
    startLoad();

    history.push(routePaths.home(e?.target?.value));
    dispatch(
      projectsActions.getSelectedProject({
        allProjects: projects,
        seletecdProject: e?.target?.value,
      }),
    );
    dispatch(
      pipelinesActions.getMy({
        project: e?.target?.value,
        onSuccess: () => stopLoad(),
        onFailure: () => stopLoad(),
      }),
    );
  };

  return (
    <>
      {createPopupOpen && <ProjectPopup setPopupOpen={setCreatePopupOpen} />}
      <FlexBox
        paddingHorizontal="lg"
        alignItems="center"
        justifyContent="space-between"
        className={styles.header}
        id="header"
      >
        <FlexBox alignItems="center">
          <Box className="d-md-none">
            <LinkBox onClick={() => setMobileMenuOpen(true)}>
              <icons.burger size={iconSizes.md} />
            </LinkBox>
          </Box>

          {!window.location.href?.includes('settings') && (
            <>
              <Box marginLeft="md" className="d-none d-md-block">
                {console.log(
                  selectedProject,
                  DEFAULT_PROJECT_NAME,
                  'locationPath',
                )}
                <select
                  onChange={(e: any) => onChange(e)}
                  defaultValue={
                    selectedProject ? selectedProject : DEFAULT_PROJECT_NAME
                  }
                  value={
                    selectedProject ? selectedProject : DEFAULT_PROJECT_NAME
                  }
                  placeholder={'Projects'}
                  className={cn(css.input)}
                  style={{
                    border: 'none',
                    outline: 'none',
                    width: '146px',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    color: '#424240',
                  }}
                >
                  <option selected disabled value="">
                    {'Select Project'}
                  </option>
                  {projects.map((option, index) => (
                    <option key={index} value={option.name}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </Box>

              <Box marginLeft="md" className="d-none d-md-block">
                <PrimaryButton onClick={() => setCreatePopupOpen(true)}>
                  +
                </PrimaryButton>
              </Box>
            </>
          )}
        </FlexBox>
        <If condition={!!userFullName}>
          {() => (
            <Box style={{ position: 'relative' }}>
              <LinkBox onClick={() => setPopupOpen(true)}>
                <FlexBox alignItems="center">
                  <FlexBox alignItems="center" className="d-none d-md-flex">
                    <Box paddingRight="sm">
                      <Paragraph>{userFullName}</Paragraph>
                    </Box>
                    <Box>
                      <icons.chevronDownLight
                        size={iconSizes.xs}
                        color={iconColors.black}
                      />
                    </Box>
                  </FlexBox>
                  <Box marginLeft="md">
                    <ColoredCircle size="md" color="secondary">
                      {userInitials}
                    </ColoredCircle>
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
                          paddingHorizontal="md"
                          paddingVertical="sm"
                          alignItems="center"
                        >
                          <Paragraph size="small">Settings</Paragraph>
                        </FlexBox>
                      </LinkBox>
                      {process.env.REACT_APP_DEMO_SETUP === 'true' ? null : (
                        <LinkBox onClick={logout}>
                          <FlexBox
                            className={styles.popupItem}
                            paddingHorizontal="md"
                            paddingVertical="sm"
                            alignItems="center"
                          >
                            <Box paddingRight="sm">
                              <icons.signOut
                                size={iconSizes.sm}
                                color={iconColors.red}
                              />
                            </Box>
                            <Paragraph color="red" size="small">
                              Logout
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

      <CookieConsent
        location="bottom"
        buttonText="I understand"
        cookieName="My Cookie"
        style={{
          background: '#fff',
          borderRadius: '15px',
          border: '2px solid #431D93',
          marginBottom: '50px',
          color: '#424240',
          fontFamily: 'Rubik',
          fontSize: '1.6rem',
          fontWeight: 'bold',
          maxWidth: `${window.innerWidth - 200}px`,
          marginLeft: '100px',
        }}
        buttonStyle={{
          backgroundColor: '#431D93',
          color: '#fff',
          fontFamily: 'Rubik',
          fontSize: '1.6rem',
          height: '4rem',
          borderRadius: '4px',
          padding: '0 3.2rem',
        }}
        declineButtonStyle={{
          backgroundColor: '#fff',
          color: '#424240',
          border: '1px solid #424240',
          fontFamily: 'Rubik',
          fontSize: '1.6rem',
          height: '4rem',
          borderRadius: '4px',
          padding: '0 3.2rem',
        }}
        enableDeclineButton
        expires={120}
      >
        ZenML uses cookies to enhance the user experience.
      </CookieConsent>
    </>
  );
};
