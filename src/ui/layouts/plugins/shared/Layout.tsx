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
            href="https://docs.zenml.io/user-guide/advanced-guide/leverage-community-contributed-plugins"
            target="__blank"
            rel="noopener noreferrer"
          >
            docs
          </a>
        </Paragraph>
      </FlexBox>

      {children}
    </FlexBox>
  );
};
