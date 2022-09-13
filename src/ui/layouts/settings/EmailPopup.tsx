/* eslint-disable */
import React from 'react';
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

export const EmailPopup: React.FC<{
  setPopupOpen: (attr: boolean) => void;
  // email: (attr: string) => void;
}> = ({ setPopupOpen }) => {

  const translate = getTranslateByScope('ui.layouts.PersonalDetails');

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
              <PrimaryButton style={{ width: '150px' }}>
                {translate('popup.successButton.text')}
              </PrimaryButton>
            </Box>
          </FlexBox>
    </Popup>
  );
};
