import React from 'react';
import {
  Box,
  FlexBox,
  GhostButton,
  H3,
  OrangeButton,
  Paragraph,
  PrimaryButton,
} from '../../../components';
import { Popup } from '../../common/Popup';

export const SwitchPlanPopup: React.FC<{
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  cancelButtonText: string;
  confirmButtonText: string;
  orangeConfirmButton?: boolean;
  submitting: boolean;
}> = ({
  onClose,
  title,
  onConfirm,
  confirmButtonText,
  cancelButtonText,
  orangeConfirmButton = false,
  submitting,
}) => (
  <Popup onClose={onClose}>
    <FlexBox.Row alignItems="center" justifyContent="space-between">
      <H3 bold color="darkGrey">
        {title}
      </H3>
    </FlexBox.Row>
    <FlexBox justifyContent="flex-end" marginTop="xxl" flexWrap>
      <Box marginRight="sm" marginBottom="md">
        <GhostButton disabled={submitting} onClick={onClose}>
          {cancelButtonText}
        </GhostButton>
      </Box>
      <Box marginLeft="sm" marginRight="sm" marginBottom="md">
        {orangeConfirmButton ? (
          <OrangeButton
            disabled={submitting}
            loading={submitting}
            onClick={onConfirm}
          >
            {confirmButtonText}
          </OrangeButton>
        ) : (
          <PrimaryButton
            disabled={submitting}
            loading={submitting}
            onClick={onConfirm}
          >
            {confirmButtonText}
          </PrimaryButton>
        )}
      </Box>
    </FlexBox>
  </Popup>
);

export const BulletPointText: React.FC<{ text: string }> = ({ text }) => (
  <Box
    style={{ textAlign: 'left' }}
    paddingLeft="xl"
    paddingRight="xl"
    paddingTop="sm"
    paddingBottom="sm"
  >
    <Paragraph>{text}</Paragraph>
  </Box>
);
