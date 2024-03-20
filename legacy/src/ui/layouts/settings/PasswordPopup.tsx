/* eslint-disable */
import React, { useState } from 'react';
import styles from './index.module.scss';
import { useDispatch } from 'react-redux';
import {
  Box,
  FlexBox,
  H3,
  PrimaryButton,
  FormPasswordField,
  H4,
} from '../../components';
import { getTranslateByScope } from '../../../services';
import { PopupSmall } from '../common/PopupSmall';
import { SuccessPopup } from '../common/SuccessPopup';
import { showToasterAction, sessionActions } from '../../../redux/actions';
import { useSelector } from '../../hooks';
import { sessionSelectors } from '../../../redux/selectors';
import { toasterTypes } from '../../../constants';
import { loginAction } from '../../../redux/actions/session/loginAction';
import check_small from '../../assets/check_small.svg';
import axios from 'axios';

export const PasswordPopup: React.FC<{
  user: any;
  username: string | any;
  isUpdate: boolean;
  setPopupOpen: (attr: boolean) => void;
}> = ({ user, username, isUpdate, setPopupOpen }) => {
  const [submitting, setSubmitting] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  const dispatch = useDispatch();
  const translate = getTranslateByScope('ui.layouts.PersonalDetails');
  const authToken = useSelector(sessionSelectors.authenticationToken);

  const forgotPassword = async () => {
    if (newPassword !== confirmPassword) {
      dispatch(
        showToasterAction({
          description: 'Password not Matched',
          type: toasterTypes.failure,
        }),
      );
    } else if (isUpdate) {
      try {
        await axios.put(
          `${process.env.REACT_APP_BASE_API_URL}/users/${user?.id}`,
          { password: newPassword },
          { headers: { Authorization: `Bearer ${authToken}` } },
        );
        await setSubmitting(false);
        await setPasswordSuccess(true);
        await setNewPassword('');
        await setConfirmPassword('');
        await setCurrentPassword('');
      } catch (err) {
        dispatch(
          showToasterAction({
            // @ts-ignore
            description: err?.response?.data?.message,
            type: toasterTypes.failure,
          }),
        );
      }
    } else {
      setSubmitting(true);
      dispatch(
        loginAction({
          password: currentPassword,
          username: username,
          onFailure: (err) => {
            dispatch(
              showToasterAction({
                description: err,
                type: toasterTypes.failure,
              }),
            );
            setSubmitting(false);
          },
          onSuccess: async () => {
            dispatch(
              sessionActions.forgotPassword({
                userId: user?.id,
                password: newPassword,
                // @ts-ignore
                onFailure: (errorText) => {
                  setSubmitting(false);
                  dispatch(
                    showToasterAction({
                      description: errorText,
                      type: toasterTypes.failure,
                    }),
                  );
                },
                onSuccess: () => {
                  setSubmitting(false);
                  setPasswordSuccess(true);
                  setNewPassword('');
                  setConfirmPassword('');
                  setCurrentPassword('');
                },
              }),
            );
          },
        }),
      );
    }
  };

  const uppercaseRegExp = /(?=.*?[A-Z])/.test(newPassword);
  const lowercaseRegExp = /(?=.*?[a-z])/.test(newPassword);
  const digitsRegExp = /(?=.*?[0-9])/.test(newPassword);
  const specialCharRegExp = /(?=.*?[#?!@$%^&*-_])/.test(newPassword);
  const minLengthRegExp = /.{8,}/.test(newPassword);

  return (
    <PopupSmall onClose={() => setPopupOpen(false)}>
      {!passwordSuccess ? (
        <>
          <FlexBox.Row justifyContent="center">
            <H3 bold color="darkGrey">
              Update Password
            </H3>
          </FlexBox.Row>

          <FlexBox.Row
            justifyContent="center"
            style={{ width: '400px', margin: '0 auto' }}
          >
            <Box marginBottom="lg" marginTop="xl" style={{ width: '100%' }}>
              {!isUpdate && (
                <Box marginBottom="lg">
                  <FormPasswordField
                    label={translate(
                      'form.passwordChange.currentPassword.label',
                    )}
                    labelColor="#000"
                    placeholder={translate(
                      'form.passwordChange.currentPassword.placeholder',
                    )}
                    value={currentPassword}
                    onChange={(val: string) => setCurrentPassword(val)}
                    error={{
                      hasError: currentPassword.trim() === undefined,
                      text: translate(
                        'form.passwordChange.currentPassword.required',
                      ),
                    }}
                    showPasswordOption
                  />
                </Box>
              )}
              <Box marginBottom="lg">
                <FormPasswordField
                  label={translate('form.passwordChange.newPassword.label')}
                  labelColor="#000"
                  placeholder={translate(
                    'form.passwordChange.newPassword.placeholder',
                  )}
                  value={newPassword}
                  onChange={(val: string) => setNewPassword(val)}
                  error={{
                    hasError: newPassword.trim() === undefined,
                    text: translate('form.passwordChange.newPassword.required'),
                  }}
                  showPasswordOption
                />
              </Box>
              <Box marginBottom="lg">
                <FormPasswordField
                  label={translate('form.passwordChange.confirmPassword.label')}
                  labelColor="#000"
                  placeholder={translate(
                    'form.passwordChange.confirmPassword.placeholder',
                  )}
                  value={confirmPassword}
                  onChange={(val: string) => setConfirmPassword(val)}
                  error={{
                    hasError: confirmPassword.trim() === undefined,
                    text: translate(
                      'form.passwordChange.confirmPassword.required',
                    ),
                  }}
                  showPasswordOption
                />
              </Box>

              <Box className={styles.passwordValidator}>
                <H4 className={styles.heading}>Password Criteria</H4>

                <Box
                  className={styles.indicator}
                  style={{
                    justifyContent: minLengthRegExp ? 'space-between' : 'start',
                  }}
                >
                  <p style={{ color: minLengthRegExp ? '#00B894' : '#C94540' }}>
                    Minimum 8 characters
                  </p>
                  {minLengthRegExp && <img src={check_small} alt="check" />}
                </Box>
                <Box
                  className={styles.indicator}
                  style={{
                    justifyContent: digitsRegExp ? 'space-between' : 'start',
                  }}
                >
                  <p style={{ color: digitsRegExp ? '#00B894' : '#C94540' }}>
                    Must Contain one Numeric value
                  </p>
                  {digitsRegExp && <img src={check_small} alt="check" />}
                </Box>
                <Box
                  className={styles.indicator}
                  style={{
                    justifyContent: uppercaseRegExp ? 'space-between' : 'start',
                  }}
                >
                  <p style={{ color: uppercaseRegExp ? '#00B894' : '#C94540' }}>
                    Must include upper cases
                  </p>
                  {uppercaseRegExp && <img src={check_small} alt="check" />}
                </Box>
                <Box
                  className={styles.indicator}
                  style={{
                    justifyContent: lowercaseRegExp ? 'space-between' : 'start',
                  }}
                >
                  <p style={{ color: lowercaseRegExp ? '#00B894' : '#C94540' }}>
                    Must include lower cases
                  </p>
                  {lowercaseRegExp && <img src={check_small} alt="check" />}
                </Box>
                <Box
                  className={styles.indicator}
                  style={{
                    justifyContent: specialCharRegExp
                      ? 'space-between'
                      : 'start',
                  }}
                >
                  <p
                    style={{ color: specialCharRegExp ? '#00B894' : '#C94540' }}
                  >
                    Must include one special character (!,@,#...)
                  </p>
                  {specialCharRegExp && <img src={check_small} alt="check" />}
                </Box>
              </Box>
            </Box>
          </FlexBox.Row>

          <FlexBox.Row
            marginLeft="sm"
            marginRight="sm"
            marginBottom="md"
            justifyContent="end"
          >
            <PrimaryButton
              id="pwReset"
              onClick={forgotPassword}
              loading={submitting}
              disabled={
                !minLengthRegExp ||
                !digitsRegExp ||
                !uppercaseRegExp ||
                !lowercaseRegExp ||
                !specialCharRegExp
              }
            >
              {translate('passwordReset.button')}
            </PrimaryButton>
          </FlexBox.Row>
        </>
      ) : (
        <SuccessPopup
          text="Password updated Successfully"
          onClose={() => {
            setPasswordSuccess(false);
            setPopupOpen(false);
          }}
        />
      )}
    </PopupSmall>
  );
};
