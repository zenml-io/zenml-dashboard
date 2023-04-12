import React from 'react';

import { FlexBox, H2, Paragraph } from '../../../components';

export const PluginsLayout: React.FC<{
  title: string;
  children: React.ReactNode;
}> = ({ title, children }) => {
  return (
    <FlexBox fullWidth padding="lg2" flexDirection="column">
      <H2 style={{ fontWeight: 500 }}>{title}</H2>
      <FlexBox fullWidth justifyContent="flex-end">
        <Paragraph color="grey" style={{ fontSize: '14px' }}>
          Check out our easy to read{' '}
          <a
            href="https://docs.zenml.io/starter-guide/collaborate/zenml-hub"
            target="__blank"
            rel="noopener noreferrer"
          >
            documentation
          </a>
        </Paragraph>
      </FlexBox>

      {children}
    </FlexBox>
  );
};
