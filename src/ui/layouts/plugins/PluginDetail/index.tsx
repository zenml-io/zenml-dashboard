import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';

import {
  Box,
  FlexBox,
  H2,
  Paragraph,
  icons,
  SeparatorLight,
  Tag,
  LineChart,
  LinkBox,
  PrimaryButton,
  H3,
} from '../../../components';
import { AuthenticatedLayout } from '../../common/layouts/AuthenticatedLayout';
import { routePaths } from '../../../../routes/routePaths';
import { useSelector, useToaster } from '../../../hooks';
import { userSelectors, workspaceSelectors } from '../../../../redux/selectors';
import { getTranslateByScope } from '../../../../services';
import { DEFAULT_WORKSPACE_NAME, iconColors } from '../../../../constants';
import ZenMLFavourite from './ZenML favourite.svg';
import InstallDesignHeader from './InstallDesignHeader.svg';
import { Tabs } from '../../common/Tabs';
import { DisplayMarkdown } from '../../../components/richText/DisplayMarkdown';
import { DisplayCode } from './DisplayCode';
import { Popup } from '../../common/Popup';
import { HUB_API_URL } from '../../../../api/constants';
import { useHubToken } from '../../../hooks/auth';

export const translate = getTranslateByScope('ui.layouts.Plugins.list');

const data = {
  version: '3.1.01',
  lastPublishedDaysAgo: 45,
  pullsLastWeek: 8_802_034,
  pullsHistory: [800, 500, 400, 900, 100, 700, 600, 300, 200, 700],
  isZenMLFavourite: true,
  publisher: '@multazam',
  apiLink: 'example.com',
  upvotes: '10M+',
  downloads: '10K+',
  popularity: '99%',
  // markdown
  overview: `## Welcome to the README for my ZenML MLflow Step!

In this step, we utilize the power of ZenML and MLflow to streamline the machine learning workflow. With ZenML's easy-to-use pipeline creation and MLflow's robust tracking capabilities, managing and optimizing your models has never been easier.

- Our step begins with data ingestion, where ZenML allows you to easily bring in your data from a variety of sources. From there, MLflow tracks your model's performance and parameters, allowing for easy comparisons and experimentation.`,
  changelogs: [
    {
      version: '10.1.5',
      notes: `Minor bug fix (PR 44).
return null when active switch is de-activated by re-tapping
Added changes to fix radiusStyle bug when text direction is set to TextDirection.rtl
parameter:
textDirectionRTL (optional, type bool - default false)
Added custom widths support
parameter:
customWidths (optional, type List`,
      yanked: true,
    },
    {
      version: '10.1.4',
      notes: `Minor bug fix (PR 44).
return null when active switch is de-activated by re-tapping
Added changes to fix radiusStyle bug when text direction is set to TextDirection.rtl
parameter:
textDirectionRTL (optional, type bool - default false)
Added custom widths support
parameter:
customWidths (optional, type List`,
      yanked: false,
    },
    {
      version: '10.1.3',
      notes: `Minor bug fix (PR 44).
return null when active switch is de-activated by re-tapping
Added changes to fix radiusStyle bug when text direction is set to TextDirection.rtl
parameter:
textDirectionRTL (optional, type bool - default false)
Added custom widths support
parameter:
customWidths (optional, type List`,
      yanked: true,
    },
  ],
};

const getData = async (pluginId: string) => {
  return (await axios.get(`${HUB_API_URL}/plugins/${pluginId}`))
    .data as TPlugin;
};

const getVersions = async (pluginName: string, userId: TId) => {
  return (
    await axios.get(
      `${HUB_API_URL}/plugins?status=available&user_id=${userId}&name=${pluginName}`,
    )
  ).data as TPlugin[];
};

const getIsStarred = async (userId: TId, pluginId: TId, token: string) => {
  const interactions = (
    await axios.get(
      `${HUB_API_URL}/interaction?interaction_type=star&mine=true&user_id=${userId}&plugin_id=${pluginId}`,
      { headers: { Authorization: `Bearer ${token}` } },
    )
  ).data;

  return interactions.length > 0;
};

const starPlugin = async (userId: TId, pluginId: TId, token: string) => {
  return await axios.post(
    `${HUB_API_URL}/interaction`,
    { type: 'star', user_id: userId, plugin_id: pluginId },
    { headers: { Authorization: `Bearer ${token}` } },
  );
};

const deletePlugin = async (pluginId: TId, token: string) => {
  return await axios.delete(`${HUB_API_URL}/plugins/${pluginId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

const PluginDetail: React.FC = () => {
  const history = useHistory();
  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);
  const [deletePopupOpen, setDeletePopupOpen] = useState(false);
  const { successToast, failureToast } = useToaster();
  const myUser = useSelector(userSelectors.myUser);
  const { pluginId } = useParams<{ pluginId: string }>();
  const hubToken = useHubToken();
  const [plugin, setPlugin] = useState(null as null | TPlugin);
  const [versions, setVersions] = useState(null as null | TPlugin[]);
  const [starred, setIsStarred] = useState(false);

  const isOwner = myUser?.id === plugin?.id;
  const installCommand = plugin
    ? `zenml hub install ${plugin.user.username}/${plugin.name}:${plugin.version}`
    : '';

  useEffect(() => {
    getData(pluginId).then((p) => {
      setPlugin(p);
      getVersions(p.name, p.user.id).then(setVersions);
    });
  }, [pluginId]);
  useEffect(() => {
    if (myUser && hubToken) {
      getIsStarred(myUser.id, pluginId, hubToken).then(setIsStarred);
    }
  }, [pluginId, myUser, hubToken]);

  return (
    <AuthenticatedLayout
      breadcrumb={[
        {
          name: 'List plugins',
          clickable: true,
          to: routePaths.plugins.list(
            selectedWorkspace ?? DEFAULT_WORKSPACE_NAME,
          ),
        },

        {
          name: 'Plugin details',
          clickable: true,
          to: routePaths.plugins.detail.overview(
            selectedWorkspace ?? DEFAULT_WORKSPACE_NAME,
            pluginId,
          ),
        },
      ]}
    >
      {plugin && (
        <FlexBox fullWidth padding="lg2" flexDirection="column">
          <H2 style={{ fontWeight: 500 }}>Plugin Details</H2>
          <FlexBox fullWidth justifyContent="flex-end">
            <Paragraph color="grey" style={{ fontSize: '14px' }}>
              Check out our easy to read document
            </Paragraph>
          </FlexBox>

          {/* content */}
          <FlexBox fullWidth>
            {/* left column */}
            <FlexBox flexDirection="column" fullWidth padding="lg">
              {/* tags */}
              <FlexBox fullWidth marginBottom="sm" flexWrap>
                {plugin.tags.map((t) => (
                  <Box marginRight="sm" key={t}>
                    <Tag text={t} />
                  </Box>
                ))}
              </FlexBox>

              {/* header info */}
              <FlexBox marginVertical="lg">
                {/* image */}
                <Box
                  style={{
                    borderRadius: '5px',
                    border: '1px solid #A8A8A880',
                    padding: '10px',
                  }}
                >
                  <Box
                    style={{
                      width: '132px',
                      height: '132px',
                      backgroundColor: '#eee',
                    }}
                  ></Box>
                </Box>

                <Box marginLeft="lg">
                  {/* title */}
                  <FlexBox alignItems="center">
                    <Paragraph
                      style={{ fontSize: '32px', marginRight: '8px' }}
                      color="primary"
                    >
                      {plugin.name}
                    </Paragraph>

                    <icons.verified color={iconColors.primary} size="lg" />
                  </FlexBox>

                  {/* light details */}
                  <FlexBox marginVertical="md">
                    <Paragraph
                      size="tiny"
                      color="grey"
                      style={{ marginRight: '12px' }}
                    >
                      Latest Version {plugin.version}
                    </Paragraph>
                    <Paragraph size="tiny" color="grey">
                      {/* TODO: calculate created days ago */}
                      Published {data.lastPublishedDaysAgo} days ago
                    </Paragraph>
                  </FlexBox>

                  {/* actions */}
                  <FlexBox>
                    {[
                      {
                        label: 'Share',
                        icon: icons.share2,
                        color: iconColors.primary,
                        onClick: () => {
                          const canShare =
                            'canShare' in navigator &&
                            (navigator as any).canShare();
                          if (canShare) {
                            navigator.share({ url: window.location.href });
                          } else {
                            navigator.clipboard.writeText(window.location.href);
                            successToast({
                              description: 'Copied link to clipboard',
                            });
                          }
                        },
                      },
                      {
                        label: 'Star',
                        icon: icons.starOutline,
                        color: iconColors.primary,
                        onClick: () => {
                          if (starred)
                            successToast({
                              description: "You've already starred this plugin",
                            });
                          else if (!myUser || !hubToken) {
                            failureToast({
                              description:
                                'You need to be logged in to star this plugin',
                            });
                          } else {
                            starPlugin(myUser.id, plugin.id, hubToken).then(
                              () => {
                                successToast({ description: 'Starred plugin' });
                              },
                            );
                          }
                        },
                      },
                      ...(isOwner
                        ? [
                            {
                              label: 'Update Version',
                              icon: icons.share,
                              color: iconColors.primary,
                              onClick: () =>
                                history.push(
                                  routePaths.plugins.update(
                                    selectedWorkspace,
                                    plugin.id,
                                  ),
                                ),
                            },
                            {
                              label: 'Delete Package',
                              icon: icons.delete,
                              color: iconColors.red,
                              onClick: () => setDeletePopupOpen(true),
                            },
                          ]
                        : [
                            {
                              label: 'Report',
                              icon: icons.info,
                              color: iconColors.red,
                              onClick: () =>
                                history.push(`${plugin.repository_url}/issues`),
                            },
                          ]),
                    ].map((action) => (
                      <LinkBox
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          marginRight: '18px',
                        }}
                        onClick={action.onClick}
                        key={action.label}
                      >
                        <action.icon color={action.color} size="sml" />

                        <Paragraph
                          size="tiny"
                          color={action.color as any}
                          style={{ marginLeft: '8px' }}
                        >
                          {action.label}
                        </Paragraph>
                      </LinkBox>
                    ))}
                  </FlexBox>
                </Box>
              </FlexBox>

              {isOwner && deletePopupOpen && (
                <Popup
                  onClose={() => {
                    setDeletePopupOpen(false);
                  }}
                >
                  <H3>Are you sure you want to delete this package?</H3>
                  <Paragraph>This cannot be undone.</Paragraph>

                  <Box marginTop="md">
                    <PrimaryButton
                      onClick={() => {
                        if (!hubToken) {
                          failureToast({
                            description:
                              'You need to be logged in to delete this plugin',
                          });
                        } else {
                          deletePlugin(pluginId, hubToken).then(() => {
                            successToast({ description: 'Deleted plugin' });
                            history.push(
                              routePaths.plugins.list(selectedWorkspace),
                            );
                          });
                        }
                      }}
                      style={{ backgroundColor: 'var(--red)' }}
                    >
                      Delete Package
                    </PrimaryButton>
                  </Box>
                </Popup>
              )}

              <Tabs
                pages={[
                  ...(plugin.readme_url
                    ? [
                        {
                          text: 'Overview',
                          Component: () => {
                            const [md, setMd] = useState('');

                            useEffect(() => {
                              // Impossible state but TypeScript doesn't realise
                              if (!plugin.readme_url) return;

                              axios
                                .get(plugin.readme_url)
                                .then((res) => setMd(res.data));
                            }, []);

                            return md ? (
                              <Box>
                                <DisplayMarkdown markdown={md} />
                              </Box>
                            ) : (
                              <Box>
                                <Paragraph>Loading Readme...</Paragraph>
                              </Box>
                            );
                          },
                          path: routePaths.plugins.detail.overview(
                            selectedWorkspace,
                            pluginId,
                          ),
                        },
                      ]
                    : []),
                  ...(versions
                    ? [
                        {
                          text: 'Changelogs',
                          Component: () => (
                            <Box>
                              {versions.map((v) => (
                                <FlexBox key={v.version} marginVertical="md">
                                  {/* version */}
                                  <Box style={{ width: '125px' }}>
                                    <Paragraph
                                      color="darkGrey"
                                      style={{
                                        fontSize: '32px',
                                        lineHeight: '1em',
                                      }}
                                    >
                                      {v.version}
                                    </Paragraph>
                                  </Box>

                                  {/* details */}
                                  <FlexBox fullWidth>
                                    <Paragraph size="tiny" color="grey">
                                      {v.release_notes ??
                                        'No release notes for this version'}
                                    </Paragraph>
                                  </FlexBox>

                                  {/* yanked */}
                                  <FlexBox style={{ width: '100px' }}>
                                    {v.status === 'yanked' && (
                                      <Box
                                        style={{
                                          display: 'inline-block',
                                          marginBottom: 'auto',
                                          marginLeft: 'auto',
                                          backgroundColor: '#D8131333',
                                          padding: '3px 8px',
                                          borderRadius: '8px',
                                        }}
                                      >
                                        <Paragraph size="tiny" color="red">
                                          Yanked
                                        </Paragraph>
                                      </Box>
                                    )}
                                  </FlexBox>
                                </FlexBox>
                              ))}
                            </Box>
                          ),
                          path: routePaths.plugins.detail.changelogs(
                            selectedWorkspace,
                            pluginId,
                          ),
                        },
                      ]
                    : []),
                  {
                    text: 'Requirements',
                    Component: () => (
                      <DisplayCode code={plugin.requirements.join('\n')} />
                    ),
                    path: routePaths.plugins.detail.requirements(
                      selectedWorkspace,
                      pluginId,
                    ),
                  },
                  {
                    text: 'Installing',
                    Component: () => (
                      <Box>
                        <DisplayCode code={installCommand} />
                        <DisplayCode
                          code={`from zenml.hub.${plugin.user.username}.${plugin.name} import *`}
                        />
                      </Box>
                    ),
                    path: routePaths.plugins.detail.installing(
                      selectedWorkspace,
                      pluginId,
                    ),
                  },
                  {
                    text: 'Community',
                    externalPath: `${plugin.repository_url}/issues`,
                    // placeholders to type-check
                    path: '',
                    Component: () => null,
                  },
                ]}
                basePath={routePaths.plugins.detail.base(
                  selectedWorkspace,
                  pluginId,
                )}
              />
            </FlexBox>

            {/* right column */}
            <Box>
              {/* usage # & chart, ZenML favourite badge */}
              <FlexBox>
                <Box>
                  <img src={ZenMLFavourite} alt="ZenML favourite" />
                </Box>
                <Box padding="md">
                  <Paragraph size="small">
                    Pulls:{' '}
                    {data.pullsLastWeek.toLocaleString('en-US', {
                      maximumFractionDigits: 0,
                    })}
                  </Paragraph>
                  <Paragraph style={{ color: '#677285' }} size="tiny">
                    Last week
                  </Paragraph>

                  {/* line chart */}
                  <Box marginVertical="md">
                    <LineChart data={data.pullsHistory} />
                  </Box>
                </Box>
              </FlexBox>

              {/* install command */}
              {/* note need to hard-code the width to match the SVG for the header */}
              <Box marginTop="sm" marginBottom="xl" style={{ width: '294px' }}>
                <img src={InstallDesignHeader} alt="Install package" />

                <Box
                  style={{
                    padding: '0px 3px 3px 3px',
                    background:
                      'linear-gradient(90deg, #B58EB1 0%, #443D99 100%)',
                    borderRadius: '7px',
                    borderTopLeftRadius: 0,
                    borderTopRightRadius: 0,
                  }}
                >
                  <FlexBox
                    style={{
                      padding: '20px 22px 20px 10px',
                      backgroundColor: '#250E32',
                      borderRadius: '7px',
                      position: 'relative',
                    }}
                  >
                    <Paragraph
                      size="tiny"
                      color="white"
                      style={{ maxWidth: '100%' }}
                    >
                      {installCommand}
                    </Paragraph>

                    <LinkBox
                      onClick={() => {
                        navigator.clipboard.writeText(installCommand);
                        successToast({ description: 'Copied to clipboard.' });
                      }}
                    >
                      <Box
                        style={{
                          position: 'absolute',
                          right: 0,
                          bottom: 0,
                          padding: '8px',
                        }}
                      >
                        <icons.copy color={iconColors.white} size="xs" />
                      </Box>
                    </LinkBox>
                  </FlexBox>
                </Box>
              </Box>

              {/* metrics */}
              {/* <FlexBox justifyContent="space-between" marginVertical="md">
                <Box marginRight="sm2">
                  <Paragraph className={styles.pluginMetric}>
                    {data.upvotes}
                  </Paragraph>
                  <Paragraph className={styles.pluginMetricText}>
                    Upvotes
                  </Paragraph>
                </Box>
                <Box marginRight="sm2">
                  <Paragraph className={styles.pluginMetric}>
                    {data.downloads}
                  </Paragraph>
                  <Paragraph className={styles.pluginMetricText}>
                    Downloads
                  </Paragraph>
                </Box>
                <Box>
                  <Paragraph className={styles.pluginMetric}>
                    {data.popularity}
                  </Paragraph>
                  <Paragraph className={styles.pluginMetricText}>
                    Popularity
                  </Paragraph>
                </Box>
              </FlexBox>

              <SeparatorLight /> */}

              {/* publisher */}
              <Box marginVertical="md">
                <Paragraph size="tiny" color="grey">
                  Publisher
                </Paragraph>
                <Box marginTop="sm">
                  <Paragraph size="tiny" color="primary">
                    <a
                      href={`/users/${plugin.user.username}`}
                      style={{ color: 'inherit' }}
                    >
                      {plugin.user.username}
                    </a>
                  </Paragraph>
                </Box>
              </Box>

              <SeparatorLight />

              {/* meta */}
              <Box marginVertical="md">
                <Paragraph size="tiny" color="grey">
                  Meta
                </Paragraph>
                <Box marginTop="sm">
                  <Paragraph size="tiny" color="primary">
                    <a
                      href={plugin.repository_url}
                      style={{ color: 'inherit' }}
                    >
                      Repository (GitHub)
                    </a>
                  </Paragraph>
                </Box>
              </Box>

              <SeparatorLight />

              {/* Documentation */}
              <Box marginVertical="md">
                <Paragraph size="tiny" color="grey">
                  Documentation
                </Paragraph>
                <Box marginTop="sm">
                  <Paragraph size="tiny" color="primary">
                    <a href={data.apiLink} style={{ color: 'inherit' }}>
                      API reference
                    </a>
                  </Paragraph>
                </Box>
              </Box>

              <SeparatorLight />

              {/* More from this author */}
              <Box marginVertical="md">
                <Paragraph size="tiny" color="grey">
                  More from this author
                </Paragraph>
                <Box marginTop="sm">
                  <Paragraph size="tiny" color="primary">
                    <a
                      href={`/users/${plugin.user.username}/published`}
                      style={{ color: 'inherit' }}
                    >
                      See all
                    </a>
                  </Paragraph>
                </Box>
              </Box>
            </Box>
          </FlexBox>
        </FlexBox>
      )}
    </AuthenticatedLayout>
  );
};

export default PluginDetail;
