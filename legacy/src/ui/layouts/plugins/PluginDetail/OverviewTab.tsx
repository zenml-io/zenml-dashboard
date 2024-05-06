import React from 'react';

import { Box, Paragraph } from '../../../components';
import { DisplayMarkdown } from '../../../components/richText/DisplayMarkdown';

export const OverviewTab: React.FC<{ description?: string }> = ({
  description,
}) => {
  return (
    <Box paddingVertical="md">
      {!description ? (
        <Paragraph>
          {"This plugin doesn't have a Readme description."}
        </Paragraph>
      ) : (
        <DisplayMarkdown markdown={description} />
      )}
    </Box>
  );
};
