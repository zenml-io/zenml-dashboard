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
  Separator
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
import { ProjectPopup } from './ProjectPopup';
import CookieConsent from 'react-cookie-consent';
import cookieImage from '../../../../assets/cookie.svg'
// import { endpoints } from '../../../../../api/endpoints';

export const AuthenticatedHeader: React.FC<{
  setMobileMenuOpen: (val: boolean) => void;
}> = ({ setMobileMenuOpen }) => {
  const user = useSelector(userSelectors.myUser);
  const projects = useSelector(projectSelectors.myProjects);
  const selectedProject = useSelector(projectSelectors.selectedProject);

  const history = useHistory();
  const [popupOpen, setPopupOpen] = useState<boolean>(false);
  const [createPopupOpen, setCreatePopupOpen] = useState<boolean>(false);
  const [showProjects, setShowProjects] = useState<boolean>(false);

  const dispatch = useDispatch();
  const { push } = usePushRoute();
  const locationPath = useLocationPath();
  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     //assign interval to a variable to clear it.
  // dispatch(
  //   projectsActions.getMy({ selectDefault: false, selectedProject }),
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
    if (locationPath.includes('projects')) {
      const projectFromUrl = locationPath.split('/')[2];

      if (selectedProject !== projectFromUrl && user) {
        push(routePaths.dashboard(projectFromUrl));
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

    history.push(routePaths.dashboard(e?.name));
    dispatch(
      projectsActions.getSelectedProject({
        allProjects: projects,
        seletecdProject: e?.name,
      }),
    );
    dispatch(
      pipelinesActions.getMy({
        project: e?.name,
        onSuccess: () => stopLoad(),
        onFailure: () => stopLoad(),
      }),
    );
    dispatch(projectsActions.getMy({ selectDefault: false, selectedProject }))
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
                
                
                      <Box marginHorizontal='md'><Separator.LightNew /></Box>
                      <Box marginTop='sm' marginHorizontal="md" ><Paragraph color='grey' style={{ fontSize: '14px' }} >Your workspaces</Paragraph></Box>
                      <Box marginVertical='sm' marginHorizontal='md' className="d-none d-md-block">          
                        <LinkBox onClick={() => setShowProjects(!showProjects)}>
                          <FlexBox alignItems="center">
                            <FlexBox style={{ width: '100%' }}  alignItems="center" justifyContent='space-between' className="d-none d-md-flex">
                              <Box paddingRight="md">
                                <Paragraph>{projects.some((project) => project['name'] === locationPath.split('/')[2])
                                  ? locationPath.split('/')[2].substring(0, 10)
                                  : DEFAULT_PROJECT_NAME.substring(0, 10)}</Paragraph>
                              </Box>
                              <Box>
                                {showProjects ? <icons.chevronUpLight size={iconSizes.xs} color={iconColors.black} /> : <icons.chevronDownLight size={iconSizes.xs} color={iconColors.black} />}
                              </Box>
                            </FlexBox>
                          </FlexBox>
                        </LinkBox>
                        
                        {showProjects && 
                          <Box marginTop='md'>  
                            <Paragraph color='grey'>Select Project</Paragraph>  
                              {projects.slice(0, 10).map((option, index) => (
                                <Box marginTop='sm' onClick={(option) => onChange(option) } key={index} >
                                  <Paragraph style={{ fontSize: '16px', color: '#424240', cursor: 'pointer' }} >{option.name.substring(0, 10)}</Paragraph>
                                </Box>
                              ))}
                        </Box>}      
                      </Box>
                      <Box marginHorizontal='md'><Separator.LightNew /></Box>
              
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
        buttonText="Accept"
        cookieName="My Cookie"
        style={{
          background: '#fff',
          borderRadius: '15px',
          border: '1px solid #8045FF',
          color: '#424240',
          fontFamily: 'Rubik',
          fontSize: '1.6rem',
          fontWeight: 'bold',
          maxWidth: `300px`,
          maxHeight: '300px',

          display: 'flex',
          justifyContent: 'center',
          position: 'absolute',
          margin: '0 auto 0 auto',
          top: '30%',
          left: '42%'
        }}
        buttonStyle={{
          backgroundColor: '#fff',
          color: '#8045FF',
          fontFamily: 'Rubik',
          fontSize: '1.6rem',
          fontWeight: 'bold',
          borderRadius: '4px',
          padding: '0 3.2rem'
        }}
        expires={120}
      >
      <FlexBox
        alignItems="center"
        justifyContent="space-between"
        flexDirection='column'
      >
      <Box style={{ height: '130px', width: '130px' }} >
        <img src={cookieImage} alt='cookie' />
      </Box>
      <Box marginTop='sm' style={{ maxWidth: '180px' }}>
        <Paragraph size="small">
          This website uses cookies 
          to ensure you get the best
          experience on our website.
        </Paragraph>
      </Box>
      </FlexBox>
    </CookieConsent>
    </>
  );
};


// {!window.location.href?.includes('settings') && (
//   <Box marginLeft="md" className="d-none d-md-block">
//     <select
//         onClick={() =>
//           dispatch(
//             projectsActions.getMy({
//               selectDefault: false,
//               selectedProject,
//             }),
//           )
//         }
//         onChange={(e: any) => onChange(e)}
//         defaultValue={
//           projects.some(
//             (project) =>
//               project['name'] === locationPath.split('/')[2],
//           )
//             ? locationPath.split('/')[2]
//             : DEFAULT_PROJECT_NAME
//         }
//         value={
//           projects.some(
//             (project) =>
//               project['name'] === locationPath.split('/')[2],
//           )
//             ? locationPath.split('/')[2]
//             : DEFAULT_PROJECT_NAME
//         }
//         placeholder={'Projects'}
//         className={cn(css.input)}
//         style={{
//           border: 'none',
//           outline: 'none',
//           width: '146px',
//           fontSize: '16px',
//           fontWeight: 'bold',
//           color: '#424240',
//         }}
//       >
//         <option selected disabled value="">
//           {'Select Project'}
//         </option>
//         {projects.map((option, index) => (
//           <option key={index} value={option.name}>
//             {option.name}
//           </option>
//         ))}
//       </select>
//     </Box>
// )}
