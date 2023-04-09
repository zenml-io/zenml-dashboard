import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Box, FullWidthSpinner, Paragraph } from '../../../components';
import { DisplayMarkdown } from '../../../components/richText/DisplayMarkdown';

export const OverviewTab: React.FC<{ readMeUrl?: string }> = ({
  readMeUrl,
}) => {
  const [md, setMd] = useState('');

  useEffect(() => {
    // Impossible state but TypeScript doesn't realise
    if (!readMeUrl) return;

    axios.get(readMeUrl).then((res) => setMd(res.data));
  }, [readMeUrl]);

  return (
    <Box paddingVertical="md">
      {!readMeUrl ? (
        <Paragraph>
          {"This plugin doesn't have a Readme description."}
        </Paragraph>
      ) : md ? (
        <DisplayMarkdown markdown={md} />
      ) : (
        <FullWidthSpinner color="black" size="md" />
      )}
    </Box>
  );
};
