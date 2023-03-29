import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Lottie from 'lottie-react';

import { selectedWorkspace } from '../../../redux/selectors';
import { routePaths } from '../../../routes/routePaths';
import { Box, FlexBox, LinkBox, Paragraph, Separator } from '../../components';
import { PluginCard } from './PluginCard';
import loadingAnimation from './loadingAnimation.json';
import { HUB_API_URL } from '../../../api/constants';
import { useHubToken } from '../../hooks/auth';

const pending = [{ name: 'Plugin name', status: 'Building wheels' }];
const completed = [
  { month: 'March 2023', plugins: [...new Array(4).fill(null)] },
  { month: 'February 2023', plugins: [...new Array(1).fill(null)] },
];

const getData = async (token: string) => {
  return (
    await axios.get(`${HUB_API_URL}/plugins?only_latest=true&mine=true`, {
      headers: { Authorization: `Bearer ${token}` },
    })
  ).data as TPlugin[];
};

export const Plugins: React.FC = () => {
  const workspace = useSelector(selectedWorkspace);
  const history = useHistory();
  const token = useHubToken();
  const [plugins, setPlugins] = useState([] as TPlugin[]);

  useEffect(() => {
    // shouldn't be possible
    if (!token) return;

    getData(token).then((p) => {
      setPlugins(p);
      console.log('PLUGINS ARE', p);
    });
    // getData(token).then(setPlugins);
  }, []);

  return (
    <Box>
      {pending.length > 0 && (
        <Box marginVertical="lg">
          <Paragraph color="darkGrey" size="small">
            Pending activity
          </Paragraph>

          <Box marginVertical="lg">
            {pending.map((p, i) => (
              <LinkBox
                key={i}
                onClick={() => alert("TODO: page isn't built yet")}
                style={{
                  display: 'flex',
                  width: '100%',
                  padding: '20px',
                  boxShadow: '0px 4px 20px 0px #0000000D',
                }}
              >
                {/* image */}
                <Box
                  style={{
                    height: '90px',
                    width: '90px',
                    backgroundColor: '#eee',
                    flexGrow: 0,
                  }}
                />

                {/* text */}
                <Box style={{ flexGrow: 1 }} marginHorizontal="lg">
                  <Paragraph color="primary" style={{ fontSize: '24px' }}>
                    {p.name}
                  </Paragraph>
                  <Paragraph
                    color="grey"
                    style={{ fontSize: '20px', marginTop: '8px' }}
                  >
                    {p.status}
                  </Paragraph>
                </Box>

                {/* animation */}
                <Box
                  style={{
                    height: '90px',
                    width: '90px',
                    flexGrow: 0,
                  }}
                >
                  <Lottie animationData={loadingAnimation} />
                </Box>
              </LinkBox>
            ))}
          </Box>
        </Box>
      )}

      <Box marginVertical="xl">
        <Paragraph color="primary">Completed</Paragraph>
        {completed.length > 0 ? (
          completed.map((m) => (
            <Box key={m.month} marginVertical="lg">
              <Paragraph
                size="tiny"
                style={{
                  color: '#24292F',
                  marginBottom: '6px',
                  opacity: 0.5,
                  fontWeight: 600,
                }}
              >
                {m.month}
              </Paragraph>
              <Separator.Light />
              <FlexBox flexWrap={true} marginVertical="md">
                {m.plugins.map((_, i) => (
                  <PluginCard
                    key={i}
                    title="bloc"
                    description="A predictable state management library that helps implement the BLoC (Business Logic Component) design pattern."
                    url={routePaths.plugins.detail.overview(
                      workspace,
                      'unique-id',
                    )}
                  />
                ))}
              </FlexBox>
            </Box>
          ))
        ) : (
          <Paragraph>{"You haven't uploaded any plugins yet."}</Paragraph>
        )}
      </Box>
    </Box>
  );
};
