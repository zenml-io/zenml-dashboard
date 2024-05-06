import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import moment from 'moment';

import {
  Box,
  FlexBox,
  Paragraph,
  icons,
  SeparatorLight,
  Tag,
  LinkBox,
  FullWidthSpinner,
} from '../../../components';
import { AuthenticatedLayout } from '../../common/layouts/AuthenticatedLayout';
import { routePaths } from '../../../../routes/routePaths';
import { useDispatch, useSelector, useToaster } from '../../../hooks';
import { workspaceSelectors } from '../../../../redux/selectors';
import { getTranslateByScope } from '../../../../services';
import { DEFAULT_WORKSPACE_NAME, iconColors } from '../../../../constants';

import { Tabs } from '../../common/Tabs';
import { DisplayCode } from './DisplayCode';

import { useHubToken, useHubUser } from '../../../hooks/auth';
import { PluginsLayout } from '../shared/Layout';
import { getPlugin, getIsStarred, getVersions, starPlugin } from '../api';
import { hubConnectionPromptActionTypes } from '../../../../redux/actionTypes';
import PluginFallbackImage from '../../../assets/plugin-fallback.svg';
import { OverviewTab } from './OverviewTab';
import { Plugin, PluginVersion } from '../pluginsTypes';
import { sanitizeUrl } from '../../../../utils/url';

export const translate = getTranslateByScope('ui.layouts.Plugins.list');

const PluginDetail: React.FC = () => {
  const history = useHistory();
  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);
  const { successToast, failureToast } = useToaster();
  const dispatch = useDispatch();
  const { pluginId } = useParams<{ pluginId: string }>();
  const hubToken = useHubToken();
  const hubUser = useHubUser();

  const [fetching, setFetching] = useState(true);
  const [plugin, setPlugin] = useState(null as null | Plugin | any);
  const [loadingVersions, setLoadingVersions] = useState(true);
  const [version, setVersion] = useState(null as null | PluginVersion);
  const [versions, setVersions] = useState(null as null | PluginVersion[]);
  const [starred, setIsStarred] = useState(false);
  const [usageTab, setUsageTab] = useState('Usage' as 'Usage' | 'Pip Install');

  const isOwner = hubUser?.id === plugin?.user?.id;
  const installationCommand = plugin
    ? `zenml hub install ${
        plugin.author === 'ZenML' ? '' : `${plugin.author}/`
      }${plugin.name}:${plugin.version}`
    : '';
  const installCommand = !plugin ? '' : installationCommand;

  useEffect(() => {
    getPlugin(pluginId).then((p) => {
      setPlugin(p);
      setFetching(false);

      getVersions(pluginId)
        .then((vs) => {
          setVersions(vs);
          setVersion(vs.filter((v) => v.version === p.version)[0]);
        })
        .finally(() => setLoadingVersions(false));
    });
  }, [pluginId]);
  useEffect(() => {
    if (hubUser && hubToken) {
      getIsStarred(hubUser.id, pluginId, hubToken).then(setIsStarred);
    }
  }, [pluginId, hubUser, hubToken]);

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
      <PluginsLayout title="Plugin Details">
        {/* content */}
        <FlexBox fullWidth>
          {/* left column */}
          <FlexBox
            flexDirection="column"
            fullWidth
            padding="lg"
            style={{
              maxHeight: 'calc(100vh - 200px)',
              overflowY: 'auto',
            }}
          >
            {fetching ? (
              <FullWidthSpinner color="black" size="md" />
            ) : (
              plugin && (
                <>
                  {/* tags */}
                  <FlexBox fullWidth marginBottom="sm" flexWrap>
                    {plugin.tags?.map((t: any) => (
                      <Box marginRight="sm" key={t}>
                        <Tag text={t} />
                      </Box>
                    ))}
                  </FlexBox>
                  {/* header info */}
                  <FlexBox marginVertical="lg">
                    {/* image */}
                    <FlexBox
                      style={{
                        borderRadius: '5px',
                        border: '1px solid #A8A8A880',
                        padding: '10px',
                      }}
                    >
                      <img
                        src={
                          sanitizeUrl(plugin.logo_url) || PluginFallbackImage
                        }
                        alt={`${plugin.name} logo`}
                        style={{
                          height: '80px',
                          maxWidth: '120px',
                          objectFit: 'contain',
                          display: 'block',
                          margin: 'auto',
                        }}
                      />
                    </FlexBox>

                    <Box marginLeft="lg">
                      {/* title */}
                      <FlexBox alignItems="center">
                        <Paragraph
                          style={{ fontSize: '32px', marginRight: '8px' }}
                          color="primary"
                        >
                          {plugin.name}
                        </Paragraph>
                        {plugin.author === 'ZenML' && (
                          <icons.verified
                            color={iconColors.primary}
                            size="lg"
                          />
                        )}
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
                          Published {moment(plugin.created).fromNow()}
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
                                navigator.clipboard.writeText(
                                  window.location.href,
                                );
                                successToast({
                                  description: 'Copied link to clipboard',
                                });
                              }
                            },
                          },
                          {
                            label: starred ? 'Starred' : 'Star',
                            icon: starred ? icons.star : icons.starOutline,
                            color: iconColors.primary,
                            onClick: () => {
                              if (starred) {
                                successToast({
                                  description:
                                    "You've already starred this plugin",
                                });
                              } else if (!hubUser || !hubToken) {
                                dispatch({
                                  type: hubConnectionPromptActionTypes.show,
                                });
                              } else {
                                setIsStarred(true);
                                starPlugin(
                                  hubUser.id,
                                  plugin.id,
                                  hubToken,
                                ).catch(() => {
                                  failureToast({
                                    description: 'Error starring plugin',
                                  });
                                  setIsStarred(false);
                                });
                              }
                            },
                          },
                          ...(isOwner
                            ? [
                                {
                                  label: 'Create new Version',
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
                                // Plugin deletion isn't set up in the backend yet
                              ]
                            : [
                                {
                                  label: 'Report',
                                  icon: icons.info,
                                  color: iconColors.red,
                                  onClick: () =>
                                    window.open(
                                      `${plugin.repository_url}/issues`,
                                      '_blank',
                                    ),
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

                  {/* Plugin deletion isn't set up in the backend yet */}
                  {/* {isOwner && deletePopupOpen && (
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
                            deletePlugin(pluginId, hubToken)
                              .then(() => {
                                successToast({ description: 'Deleted plugin' });
                                history.push(
                                  routePaths.plugins.list(selectedWorkspace),
                                );
                              })
                              .catch(() => {
                                failureToast({
                                  description: 'Error deleting plugin',
                                });
                              });
                          }
                        }}
                        style={{ backgroundColor: 'var(--red)' }}
                      >
                        Delete Package
                      </PrimaryButton>
                    </Box>
                  </Popup>
                )} */}
                </>
              )
            )}

            <Tabs
              pages={[
                {
                  text: 'Overview',
                  Component: plugin
                    ? () => <OverviewTab description={plugin.description} />
                    : () => <FullWidthSpinner color="black" size="md" />,
                  path: routePaths.plugins.detail.overview(
                    selectedWorkspace,
                    pluginId,
                  ),
                },
                {
                  text: 'Changelogs',
                  Component: () =>
                    loadingVersions ? (
                      <FullWidthSpinner color="black" size="md" />
                    ) : !versions || versions.length < 1 ? (
                      <Box paddingVertical="md">
                        <Paragraph>No available versions found</Paragraph>
                      </Box>
                    ) : (
                      <Box>
                        {versions.map((v) => (
                          <FlexBox
                            key={v.version}
                            marginVertical="md"
                            style={{ alignItems: 'center' }}
                          >
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
                              <Paragraph size="body" color="grey">
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
                {
                  text: 'Requirements',
                  Component: () =>
                    loadingVersions ? (
                      <FullWidthSpinner color="black" size="md" />
                    ) : version ? (
                      <DisplayCode
                        code={version.requirements?.join('\n') as string}
                      />
                    ) : (
                      <Box paddingVertical="md">
                        <Paragraph>
                          No additional requirements defined for this plugin
                        </Paragraph>
                      </Box>
                    ),
                  path: routePaths.plugins.detail.requirements(
                    selectedWorkspace,
                    pluginId,
                  ),
                },
                {
                  text: 'Usage',
                  Component: () =>
                    fetching ? (
                      <FullWidthSpinner color="black" size="md" />
                    ) : (
                      plugin && (
                        <Box>
                          <Box marginVertical="lg">
                            <Paragraph style={{ marginBottom: '8px' }}>
                              ZenML install
                            </Paragraph>
                            <Paragraph style={{ marginBottom: '8px' }}>
                              The easiest way to install this plugin is to use
                              our ZenML CLI tool.
                            </Paragraph>
                            <DisplayCode code={installationCommand} />
                          </Box>

                          {version && (
                            <Box marginVertical="lg">
                              <Paragraph style={{ marginBottom: '8px' }}>
                                Pip install
                              </Paragraph>
                              <Paragraph style={{ marginBottom: '8px' }}>
                                You can also install this plugin directly from
                                pip with these commands.
                              </Paragraph>
                              <DisplayCode
                                code={
                                  `pip install ${version.requirements
                                    ?.map((i) => `"${i}"`)
                                    .join(' ')}` +
                                  '\n' +
                                  `pip install --index-url ${plugin.index_url} ${plugin.package_name} --no-deps`
                                }
                              />
                            </Box>
                          )}
                          <Box marginVertical="lg">
                            <Paragraph style={{ marginBottom: '8px' }}>
                              Usage
                            </Paragraph>
                            <Paragraph style={{ marginBottom: '8px' }}>
                              {
                                "Once you've installed the plugin, import it as a Python library"
                              }
                            </Paragraph>
                            <DisplayCode
                              code={`from zenml.hub.${
                                plugin.author === 'ZenML'
                                  ? ''
                                  : `${plugin.author}.`
                              }${plugin.name} import *`}
                            />
                          </Box>
                        </Box>
                      )
                    ),
                  path: routePaths.plugins.detail.usage(
                    selectedWorkspace,
                    pluginId,
                  ),
                },
                {
                  text: 'Community',
                  externalPath: plugin ? `${plugin.repository_url}/issues` : '',
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
            <FlexBox></FlexBox>

            {/* install command */}
            {/* note need to hard-code the width to match the SVG for the header */}
            <Box marginTop="sm" marginBottom="xl" style={{ width: '294px' }}>
              <Box
                style={{
                  padding: '4px',
                  background:
                    'linear-gradient(90deg, #B58EB1 0%, #443D99 100%)',
                  borderRadius: '7px',
                }}
              >
                <FlexBox>
                  {([
                    'Usage',
                    // too long to use for now
                    // , 'Pip Install'
                  ] as const).map((t) => {
                    const isActive = t === usageTab;
                    return (
                      <Box
                        key={t}
                        style={{
                          backgroundColor: isActive ? '#250E32' : 'transparent',
                          borderTopLeftRadius: '7px',
                          borderTopRightRadius: '7px',
                          padding: '6px 24px',
                          cursor: 'pointer',
                        }}
                        onClick={() => setUsageTab(t)}
                      >
                        <Paragraph size="tiny" style={{ color: 'white' }}>
                          {t}
                        </Paragraph>
                      </Box>
                    );
                  })}
                </FlexBox>

                <FlexBox
                  style={{
                    padding: '20px 22px 20px 10px',
                    backgroundColor: '#250E32',
                    borderRadius: '7px',
                    position: 'relative',
                    ...(usageTab === 'Usage' ? { borderTopLeftRadius: 0 } : {}),
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

            {plugin && (
              <>
                {/* publisher */}
                <Box marginVertical="md">
                  <Paragraph size="tiny" color="grey">
                    Publisher
                  </Paragraph>
                  <Box marginTop="sm">
                    <Paragraph size="tiny" color="primary">
                      <a
                        href={
                          routePaths.plugins.list(selectedWorkspace) +
                          `?author=${plugin.author}`
                        }
                        style={{ color: 'inherit' }}
                      >
                        {plugin.author}
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
                        href={plugin.canonical_url}
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
                      <a
                        href={plugin.canonical_url}
                        style={{ color: 'inherit' }}
                      >
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
                        href={
                          routePaths.plugins.list(selectedWorkspace) +
                          `?author=${plugin.author}`
                        }
                        style={{ color: 'inherit' }}
                      >
                        See all
                      </a>
                    </Paragraph>
                  </Box>
                </Box>
              </>
            )}
          </Box>
        </FlexBox>
      </PluginsLayout>
    </AuthenticatedLayout>
  );
};

export default PluginDetail;
