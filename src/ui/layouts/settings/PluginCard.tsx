import React from 'react';
import { useHistory } from 'react-router-dom';
import { Box, LinkBox, Paragraph } from '../../components';

export const PluginCard: React.FC<{
  title: string;
  description: string;
  url: string;
}> = ({ title, description, url }) => {
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
      <Box style={{ width: '100%', height: '61px', backgroundColor: '#eee' }} />
      <Box marginTop="lg" marginBottom="sm">
        <Paragraph style={{ fontSize: '20px' }} color="primary">
          {title}
        </Paragraph>
      </Box>
      <Paragraph size="small" color="grey">
        {description}
      </Paragraph>
    </LinkBox>
  );
};
