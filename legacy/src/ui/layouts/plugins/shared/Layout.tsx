import React from 'react';

import { FlexBox, H2, Paragraph } from '../../../components';

export const PluginsLayout: React.FC<{
  title: string;
  children: React.ReactNode;
}> = ({ title, children }) => {
  return (
    <FlexBox fullWidth padding="lg2" flexDirection="column">
      <FlexBox flexDirection="row" style={{ gap: '8px' }}>
        <FlexBox flexDirection="column">
          <H2 style={{ fontWeight: 500 }}>{title}</H2>
        </FlexBox>
        <FlexBox
          fullWidth
          flexDirection="column"
          alignItems="end"
          justifyContent="flex-end"
        >
        </FlexBox>
      </FlexBox>

      {children}
    </FlexBox>
  );
};
