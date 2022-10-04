import React, { useState } from 'react';
import styles from './index.module.scss';
import { loggedOutRoute, toasterTypes } from '../../../../constants';
import { showToasterAction } from '../../../../redux/actions';
import {
  Box,
  FormEmailField,
  PrimaryButton,
} from '../../../components';
import { useDispatch, usePushRoute } from '../../../hooks';
import { getTranslateByScope } from '../../../../services';

import SaveUserEmail from '../../../../api/session/saveUserEmail';

export const Form: React.FC = () => {

  const { push } = usePushRoute();
  const translate = getTranslateByScope('ui.layouts.UserEmail');

  const userId = window.location.href.split('/').reverse()[0]
    
  const dispatch = useDispatch();
  const [email, setEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const submit = async () => {
    setSubmitting(true);
    try {
      await dispatch(SaveUserEmail({ userId, email }))    
      setSubmitting(false);
      dispatch(
        showToasterAction({
          description: translate('form.toasts.successful.text'),
          type: toasterTypes.success,
        }),
      );
        push(loggedOutRoute);
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
        onClick={() => push(loggedOutRoute)}>
        {translate('form.skip.text')}
      </PrimaryButton>
    </Box>
  );
};



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
   