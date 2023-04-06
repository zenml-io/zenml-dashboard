import React from 'react';
import { useHistory } from 'react-router-dom';

import { Box, LinkBox, Paragraph } from '../../components';
import ZenMLLogo from '../../assets/logo.svg';

export const PluginCard: React.FC<{
  title: string;
  url: string;
  logoUrl?: string;
  description?: string;
}> = ({ title, url, description, logoUrl }) => {
  const history = useHistory();

  return (
    <LinkBox
      onClick={() => history.push(url)}
      style={{
        display: 'inline-block',
        margin: '0 28px 28px 0',
        width: '240px',
        padding: '20px',
        boxShadow: '0px 4px 20px 0px #0000000D',
      }}
    >
      <img
        src={logoUrl ?? ZenMLLogo}
        alt={`${title} logo`}
        style={{
          maxWidth: '60%',
          display: 'block',
          margin: 'auto',
          marginTop: 12,
          marginBottom: 16,
        }}
      />

      <Box marginTop="lg" marginBottom="sm">
        <Paragraph style={{ fontSize: '20px' }} color="primary">
          {title}
        </Paragraph>
      </Box>
      {description && (
        <Paragraph size="small" color="grey">
          {description}
        </Paragraph>
      )}
    </LinkBox>
  );
};
