import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import { loggedInRoute, toasterTypes } from '../../../../constants';
import {
  workspacesActions,
  showToasterAction,
  stackComponentsActions,
  userActions,
} from '../../../../redux/actions';
import {
  Box,
  FormEmailField,
  Paragraph,
  PrimaryButton,
} from '../../../components';
import {
  useDispatch,
  useLocationPath,
  usePushRoute,
  useSelector,
} from '../../../hooks';
import { getTranslateByScope } from '../../../../services';
import { sessionSelectors } from '../../../../redux/selectors/session';
import { userSelectors } from '../../../../redux/selectors';
import axios from 'axios';
// import { routePaths } from '../../../../routes/routePaths';

export const Form: React.FC = () => {
  const { push } = usePushRoute();
  const locationPath = useLocationPath();
  const dispatch = useDispatch();
  const translate = getTranslateByScope('ui.layouts.UserEmail');

  const user = useSelector(userSelectors.myUser);
  const authToken = useSelector(sessionSelectors.authenticationToken);
  const userId = user?.id ? user?.id : '';

  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [skipSubmitting, setSkipSubmitting] = useState(false);

  const submit = async () => {
    setSubmitting(true);
    console.log(locationPath);

    try {
      await axios
        .put(
          `${process.env.REACT_APP_BASE_API_URL}/users/${userId}/email-opt-in`,
          { email, email_opted_in: true },
          {
            headers: {
              Authorization: `bearer ${authToken}`,
            },
          },
        )
        .then(() => {
          setSubmitting(false);
          dispatch(
            showToasterAction({
              description: translate('form.toasts.successful.text'),
              type: toasterTypes.success,
            }),
          );
          dispatch(userActions.getMy({}));
          if (window.location.search.includes('workspaces')) {
            const selectedWorkspace = window.location.search.split('/')[2];
            dispatch(
              workspacesActions.getMy({
                selectDefault: false,
                selectedWorkspace,
              }),
            );
          } else {
            dispatch(workspacesActions.getMy({}));
          }
          dispatch(stackComponentsActions.getTypes());
          push(loggedInRoute);
        });
    } catch (err) {
      setSubmitting(false);
      dispatch(
        showToasterAction({
          description: translate('form.toasts.failed.text'),
          type: toasterTypes.failure,
        }),
      );
    }
  };

  const skip = async () => {
    setSkipSubmitting(true);
    console.log(locationPath);

    try {
      await axios
        .put(
          `${process.env.REACT_APP_BASE_API_URL}/users/${userId}/email-opt-in`,
          { email: '', email_opted_in: false },
          {
            headers: {
              Authorization: `bearer ${authToken}`,
            },
          },
        )
        .then(() => {
          setSkipSubmitting(false);
          dispatch(
            showToasterAction({
              description: translate('form.toasts.successful.text'),
              type: toasterTypes.success,
            }),
          );
          dispatch(userActions.getMy({}));
          if (window.location.search.includes('workspaces')) {
            const selectedWorkspace = window.location.search.split('/')[2];
            dispatch(
              workspacesActions.getMy({
                selectDefault: false,
                selectedWorkspace,
              }),
            );
          } else {
            dispatch(workspacesActions.getMy({}));
          }
          dispatch(stackComponentsActions.getTypes());

          push(loggedInRoute);
        });
    } catch (err) {
      setSkipSubmitting(false);
      dispatch(
        showToasterAction({
          description: translate('form.toasts.failed.text'),
          type: toasterTypes.failure,
        }),
      );
    }
  };

  useEffect(() => {}, [user]);
  return (
    <Box>
      <Box marginTop="lg">
        <FormEmailField
          label={translate('form.email.label')}
          labelColor="#ffffff"
          placeholder={translate('form.email.placeholder')}
          value={email}
          onChange={(val: string) => setEmail(val)}
        />
      </Box>

      <PrimaryButton
        marginTop="md"
        className={styles.signUpButton}
        loading={submitting}
        onClick={submit}
      >
        {translate('form.button.text')}
      </PrimaryButton>

      <PrimaryButton
        marginTop="sm"
        className={styles.skipEmailButton}
        loading={skipSubmitting}
      >
        <Paragraph onClick={skip} color="grey" style={{ fontSize: 12 }}>
          {translate('form.skip.text')}
        </Paragraph>
      </PrimaryButton>
    </Box>
  );
};
