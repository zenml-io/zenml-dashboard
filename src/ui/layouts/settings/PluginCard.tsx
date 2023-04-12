import React from 'react';
import { useHistory } from 'react-router-dom';

import { Box, LinkBox, Paragraph } from '../../components';
import PluginFallbackImage from '../../assets/plugin-fallback.svg';

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
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <img
            src={logoUrl ?? PluginFallbackImage}
            alt={`${title} logo`}
            style={{
              maxWidth: '60%',
              display: 'block',
              margin: 'auto',
              marginTop: 12,
              marginBottom: 16,
            }}
          />
        </div>
        <div>
          <Box marginTop="lg" marginBottom="sm">
            <Paragraph style={{ fontSize: '20px' }} color="primary">
              {title}
            </Paragraph>
          </Box>
          {description && (
            <Paragraph
              style={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
              size="small"
              color="grey"
            >
              <span title={description}>{description}</span>
            </Paragraph>
          )}
        </div>
      </div>
    </LinkBox>
  );
};
