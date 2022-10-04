import React, { useState } from 'react';
import styles from './index.module.scss';
import { loggedInRoute, toasterTypes } from '../../../../constants';
import { showToasterAction } from '../../../../redux/actions';
import {
  Box,
  FormEmailField,
  PrimaryButton,
} from '../../../components';
import { useDispatch, usePushRoute, useSelector } from '../../../hooks';
import { getTranslateByScope } from '../../../../services';
import { sessionSelectors } from '../../../../redux/selectors/session';
import { userSelectors } from '../../../../redux/selectors';
import axios from 'axios'

export const Form: React.FC = () => {
  const { push } = usePushRoute();
  const dispatch = useDispatch();
  const translate = getTranslateByScope('ui.layouts.UserEmail');

  const user = useSelector(userSelectors.myUser);
  const authToken = useSelector(sessionSelectors.authenticationToken);
  const userId = user?.id ? user?.id : ''

  const [email, setEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [skipSubmitting, setSkipSubmitting] = useState(false)

  const submit = async () => {
    setSubmitting(true);
    try {
      await axios.put(`${process.env.REACT_APP_BASE_API_URL}/users/${userId}/email-opt-in`, { email, email_opted_in: true }, {
        headers: {
          'Authorization': `bearer ${authToken}` 
        }
      })
      setSubmitting(false);
      dispatch(
        showToasterAction({
          description: translate('form.toasts.successful.text'),
          type: toasterTypes.success,
        }),
      );
        push(loggedInRoute);
      } catch (err) {
        setSubmitting(false);
        dispatch(
        showToasterAction({
          description: translate('form.toasts.failed.text'),
          type: toasterTypes.failure,
          }),
        );
      }
  }

  const skip = async () => {
    setSkipSubmitting(true);
    try {
      await axios.put(`${process.env.REACT_APP_BASE_API_URL}/users/${userId}/email-opt-in`, { email: '', email_opted_in: false }, {
        headers: {
          'Authorization': `bearer ${authToken}` 
        }
      })
      setSkipSubmitting(false);
      dispatch(
        showToasterAction({
          description: translate('form.toasts.skip.text'),
          type: toasterTypes.success,
        }),
      );
        push(loggedInRoute);
      } catch (err) {
        setSkipSubmitting(false);
        dispatch(
        showToasterAction({
          description: translate('form.toasts.failed.text'),
          type: toasterTypes.failure,
          }),
        );
      } 
  }

  return (
    <Box>
      
      <Box marginTop="lg">
        <FormEmailField
          label={translate('form.email.label')}
          labelColor='#ffffff'
          placeholder={translate('form.email.placeholder')}
          value={email}
          onChange={(val: string) => setEmail(val)}
        />
      </Box>
      
      <PrimaryButton
        marginTop='md'
        className={styles.signUpButton}
        loading={submitting}
        onClick={submit} >
        {translate('form.button.text')}
      </PrimaryButton>

      <PrimaryButton
        marginTop='md'
        className={styles.signUpButton}
        loading={skipSubmitting}
        onClick={skip}>
        {translate('form.skip.text')}
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
   