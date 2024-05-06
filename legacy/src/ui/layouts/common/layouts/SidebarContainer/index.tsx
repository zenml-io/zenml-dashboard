import React from 'react';
import { FlexBox } from '../../../../components';

export const SidebarContainer: React.FC = ({ children }) => (
  <FlexBox.Column fullWidth paddingHorizontal="md">
    {children}
  </FlexBox.Column>
);
