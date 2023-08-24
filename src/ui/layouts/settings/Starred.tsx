import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { selectedWorkspace } from '../../../redux/selectors';
import { routePaths } from '../../../routes/routePaths';
import { Box, FlexBox, FullWidthSpinner, Paragraph } from '../../components';
import { PluginCard } from './PluginCard';
import { HUB_API_URL } from '../../../api/constants';
import { useHubToken } from '../../hooks/auth';
import { useHistory } from 'react-router';
import { EmptyState } from '../common/EmptyState';

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
  const history = useHistory();
  const [fetching, setFetching] = useState(true);
  const [plugins, setPlugins] = useState([] as TPlugin[]);

  useEffect(() => {
    // shouldn't be possible
    if (!token) return;

    getData(token)
      .then(setPlugins)
      .finally(() => {
        setFetching(false);
      });
  }, [token]);

  return fetching ? (
    <FullWidthSpinner color="black" size="md" />
  ) : plugins.length > 0 ? (
    <Box marginVertical="md" marginLeft="xxl">
      <Paragraph color="darkGrey">Favourite repositories</Paragraph>

      <FlexBox flexWrap={true} marginVertical="lg">
        {plugins.map((p, i) => (
          <PluginCard
            key={i}
            logoUrl={p.logo_url}
            title={p.name}
            description={`${p.version}: ${p.description}`}
            url={routePaths.plugins.detail.overview(workspace, p.id)}
          />
        ))}
      </FlexBox>
    </Box>
  ) : (
    <EmptyState
      message="You haven't starred any plugins yet."
      actionLabel="View plugins"
      actionHandler={() => {
        history.push(routePaths.plugins.list(workspace));
      }}
    />
  );
};
