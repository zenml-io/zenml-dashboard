import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import { loggedInRoute, toasterTypes } from '../../../../constants';
import {
  // pipelinesActions,
  // runsActions,
  showToasterAction,
  stackComponentsActions,
  // stacksActions,
  userActions,
} from '../../../../redux/actions';
import {
  Box,
  FormEmailField,
  Paragraph,
  PrimaryButton,
} from '../../../components';
import { useDispatch, usePushRoute, useSelector } from '../../../hooks';
import { getTranslateByScope } from '../../../../services';
import { sessionSelectors } from '../../../../redux/selectors/session';
import { userSelectors } from '../../../../redux/selectors';
import axios from 'axios';

export const Form: React.FC = () => {
  const { push } = usePushRoute();
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
          dispatch(stackComponentsActions.getTypes());
          // dispatch(pipelinesActions.getMy({}));
          // dispatch(runsActions.allRuns({}));
          // dispatch(stacksActions.getMy({}));
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
          dispatch(stackComponentsActions.getTypes());
          // dispatch(pipelinesActions.getMy({}));
          // dispatch(stacksActions.getMy({}));
          // dispatch(runsActions.allRuns({}));
          push(loggedInRoute);
        });

      // dispatch(
      //   showToasterAction({
      //     description: translate('form.toasts.skip.text'),
      //     type: toasterTypes.success,
      //   }),
      // );
      // dispatch(stackComponentsActions.getTypes());
      // dispatch(pipelinesActions.getMy());
      // dispatch(stacksActions.getMy({}));
      // push(loggedInRoute);
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
        // onClick={skip}
      >
        <Paragraph onClick={skip} color="grey" style={{ fontSize: 12 }}>
          {translate('form.skip.text')}
        </Paragraph>
      </PrimaryButton>
    </Box>
  );
};

// await dispatch(SaveUserEmail({ userId, email: '', email_opted_in: false, authenticationToken: authToken ? authToken : '' }))
// dispatch(SaveUserEmail({ userId, email, email_opted_in: true, authenticationToken: authToken ? authToken : '' }))
// import { SaveUserEmailAction } from '../../../../redux/actions/users/saveUserEmailAction';
// dispatch(
//   SaveUserEmailAction({
//     userId,
//     email,
//     onFailure: () => {
//       setSubmitting(false);
//       dispatch(
//         showToasterAction({
//           description: translate('toasts.failed.text'),
//           type: toasterTypes.failure,
//         }),
//       );
//     },
//     onSuccess: () => {
//       setSubmitting(false);
//       dispatch(
//         showToasterAction({
//           description: translate('toasts.successful.text'),
//           type: toasterTypes.success,
//         }),
//       );
//       push(loggedOutRoute);
//     },
//   }),
// );
