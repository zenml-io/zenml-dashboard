import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

import { selectedWorkspace } from '../../../redux/selectors';
import { routePaths } from '../../../routes/routePaths';
import { Box, FlexBox, Paragraph } from '../../components';
import { PluginCard } from './PluginCard';
import { HUB_API_URL } from '../../../api/constants';
import { useHubToken } from '../../hooks/auth';

const getData = async (token: string) => {
  return (
    await axios.get(`${HUB_API_URL}/plugins?starred_by_me=true`, {
      headers: { Authorization: `Bearer ${token}` },
    })
  ).data as TPlugin[];
};

export const Starred: React.FC = () => {
  const workspace = useSelector(selectedWorkspace);
  const token = useHubToken();
  const [plugins, setPlugins] = useState([] as TPlugin[]);

  useEffect(() => {
    // shouldn't be possible
    if (!token) return;

    getData(token).then(setPlugins);
  }, []);

  return (
    <Box marginVertical="md">
      <Paragraph color="darkGrey">Favourite repositories</Paragraph>

      {plugins.length > 0 ? (
        <FlexBox flexWrap={true} marginVertical="lg">
          {plugins.map((p, i) => (
            <PluginCard
              key={i}
              title={p.name}
              description={p.description ?? ''}
              url={routePaths.plugins.detail.overview(workspace, p.id)}
            />
          ))}
        </FlexBox>
      ) : (
        <Paragraph>{"You haven't starred any plugins yet."}</Paragraph>
      )}
    </Box>
  );
};
