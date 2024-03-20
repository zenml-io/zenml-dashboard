import React from 'react';
import { FlexBox, Paragraph, PrimaryButton } from '../../components';

export const EmptyState: React.FC<{
  message: string;
  actionLabel: string;
  actionHandler: () => void;
}> = ({ message, actionLabel, actionHandler }) => (
  <FlexBox
    fullWidth
    fullHeight
    flexDirection="column"
    justifyContent="center"
    alignItems="center"
    padding="lg"
  >
    <Paragraph>{message}</Paragraph>

    <PrimaryButton onClick={actionHandler} style={{ marginTop: '18px' }}>
      {actionLabel}
    </PrimaryButton>
  </FlexBox>
);
