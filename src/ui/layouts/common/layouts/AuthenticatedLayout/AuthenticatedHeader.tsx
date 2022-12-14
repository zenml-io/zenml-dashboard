import React, { useEffect, useState } from 'react';
import {
  FlexBox,
  Box,
  Paragraph,
  ColoredCircle,
  LinkBox,
  icons,
  If,
} from '../../../../components';

import styles from './AuthenticatedHeader.module.scss';
import { iconColors, iconSizes } from '../../../../../constants/icons';
import {
  projectSelectors,
  userSelectors,
} from '../../../../../redux/selectors';
import { getInitials } from '../../../../../utils/name';
import { DEFAULT_FULL_NAME } from '../../../../../constants';
import OutsideClickHandler from 'react-outside-click-handler';
import { useDispatch, usePushRoute, useSelector } from '../../../../hooks';
import { projectsActions, sessionActions } from '../../../../../redux/actions';
import { routePaths } from '../../../../../routes/routePaths';
import cn from 'classnames';
import css from './../../../../../ui/components/inputs/index.module.scss';

export const AuthenticatedHeader: React.FC<{
  setMobileMenuOpen: (val: boolean) => void;
}> = ({ setMobileMenuOpen }) => {
  const user = useSelector(userSelectors.myUser);
  const projects = useSelector(projectSelectors.myProjects);
  const selectedProject = useSelector(projectSelectors.selectedProject);

  const [popupOpen, setPopupOpen] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { push } = usePushRoute();
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
  if (!user) return null;

  const userFullName = user.fullName || user.name || DEFAULT_FULL_NAME;
  const userInitials = getInitials(userFullName);

  const logout = () => {
    dispatch(sessionActions.logout());
  };
  return (
    <FlexBox
      paddingHorizontal="lg"
      alignItems="center"
      justifyContent="space-between"
      className={styles.header}
    >
      <FlexBox alignItems="center">
        <Box className="d-md-none">
          <LinkBox onClick={() => setMobileMenuOpen(true)}>
            <icons.burger size={iconSizes.md} />
          </LinkBox>
        </Box>

        <Box marginLeft="xxl" className="d-none d-md-block">
          <select
            onChange={(e: any) =>
              dispatch(
                projectsActions.getSelectedProject({
                  allProjects: projects,
                  seletecdProject: e.target.value,
                }),
              )
            }
            defaultValue={selectedProject}
            // value={projects}
            placeholder={'Projects'}
            className={cn(css.input)}
            style={{
              // borderTopRightRadius: 0,
              // borderBottomRightRadius: 0,
              width: '146px',
              fontSize: '12px',
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
                <OutsideClickHandler onOutsideClick={() => setPopupOpen(false)}>
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
  );
};
