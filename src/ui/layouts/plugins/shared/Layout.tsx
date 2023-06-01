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

          <Paragraph style={{ marginTop: '8px' }}>
            The ZenML Hub is a{' '}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://blog.zenml.io/zenml-hub-launch/"
            >
              plugin system
            </a>{' '}
            that allows users to contribute and consume stack component flavors,
            pipelines, steps, materializers, and other pieces of code seamlessly
            in their ML pipelines. Below are a list of community contributed
            plugins. If you would like to create your own plugin, click{' '}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://docs.zenml.io/starter-guide/collaborate/zenml-hub"
            >
              here
            </a>
            .
          </Paragraph>
        </FlexBox>
        <FlexBox
          fullWidth
          flexDirection="column"
          alignItems="end"
          justifyContent="flex-end"
        >
          <Paragraph color="grey" style={{ fontSize: '14px', flexShrink: 0 }}>
            Check out our easy to read{' '}
            <a
              href="https://docs.zenml.io/starter-guide/collaborate/zenml-hub"
              target="__blank"
              rel="noopener noreferrer"
            >
              docs
            </a>
          </Paragraph>
        </FlexBox>
      </FlexBox>

      {children}
    </FlexBox>
  );
};
