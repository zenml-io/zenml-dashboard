/* eslint-disable */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Box,
  FlexBox,
  H3,
  Paragraph,
  GhostButton,
  PrimaryButton,
} from '../../components';
import { getTranslateByScope } from '../../../services';
import { Popup } from '../common/Popup';
import {
  showToasterAction,
  userActions,
} from '../../../redux/actions';
import { toasterTypes } from '../../../constants';

import { sessionSelectors } from '../../../redux/selectors/session';
import { useSelector } from '../../hooks';
import axios from 'axios';

export const EmailPopup: React.FC<{
  userId: any;
  email: any;
  username: any;
  setPopupOpen: (attr: boolean) => void;
}> = ({ userId, email, username, setPopupOpen }) => {

  const [submitting, setSubmitting] = useState(false);

  const dispatch = useDispatch()
  const translate = getTranslateByScope('ui.layouts.PersonalDetails');

  const [dashboardData, setDashboardData] = useState('')
  const authToken = useSelector(sessionSelectors.authenticationToken);

console.log(authToken)
  const changeEmail = async () => {
    setSubmitting(true);
   
    try {
      await axios.put(`http://localhost:8080/v1/users/${username}`, {name: username , email: email},
      { headers: { 'Authorization': `Bearer ${authToken}` }
      })
      setSubmitting(false);
      setPopupOpen(false);
      dispatch(
        showToasterAction({
          description: translate('toasts.successful.text'),
          type: toasterTypes.success,
        }),
      )
    } catch (err) {
      setSubmitting(false);
      setPopupOpen(false);
          dispatch(
            showToasterAction({
              description: translate('toasts.failed.text'),
              type: toasterTypes.failure,
            }),
          );
    }

   
    // dispatch(
    //   userActions.updateUserEmail({
    //     // email,
    //     // username,
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
    //       setPopupOpen(false);
    //       dispatch(
    //         showToasterAction({
    //           description: translate('toasts.successful.text'),
    //           type: toasterTypes.success,
    //         }),
    //       );
    //     },
    //   }),
    // );
  };

  return (
    <Popup onClose={() => setPopupOpen(false)} >
      <FlexBox.Row justifyContent="center">
        <H3 bold color="darkGrey">
          {translate('popup.title')}
        </H3>
      </FlexBox.Row>
    
      <FlexBox.Row justifyContent="center">
        <Box marginTop="md">
          <Paragraph>{translate('popup.text')}</Paragraph>
        </Box>
      </FlexBox.Row>
    
      <FlexBox justifyContent="center" marginTop="xl" flexWrap>
            <Box marginRight="sm" marginBottom="md">
              <GhostButton style={{ width: '150px' }} onClick={() => setPopupOpen(false)}>
                {translate('popup.cancelButton.text')}
              </GhostButton>
            </Box>
            <Box marginLeft="sm" marginRight="sm" marginBottom="md">
              <PrimaryButton style={{ width: '150px' }} onClick={changeEmail} loading={submitting} >
                {translate('popup.successButton.text')}
              </PrimaryButton>
            </Box>
          </FlexBox>
    </Popup>
  );
};
