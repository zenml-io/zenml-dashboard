import React from 'react';
import { useSelector } from 'react-redux';

import { selectedWorkspace } from '../../../redux/selectors';
import { routePaths } from '../../../routes/routePaths';
import { Box, FlexBox, Paragraph } from '../../components';
import { PluginCard } from './PluginCard';

const data = [...new Array(8).fill(null)];

export const Starred: React.FC = () => {
  const workspace = useSelector(selectedWorkspace);

  return (
    <Box marginVertical="md">
      <Paragraph color="darkGrey">Favourite repositories</Paragraph>

      {data.length > 0 ? (
        <FlexBox flexWrap={true} marginVertical="lg">
          {data.map((_, i) => (
            <PluginCard
              key={i}
              title="bloc"
              description="A predictable state management library that helps implement the BLoC (Business Logic Component) design pattern."
              url={routePaths.plugins.detail.overview(workspace, 'unique-id')}
            />
          ))}
        </FlexBox>
      ) : (
        <Paragraph>{"You haven't starred any plugins yet."}</Paragraph>
      )}
    </Box>
  );
};
