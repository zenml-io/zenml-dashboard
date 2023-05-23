import axios from 'axios';
import { HUB_API_URL } from '../../../api/constants';
import { memoisePromiseFn } from '../../../utils/memo';
import configureStore from '../../../redux/setup/storeSetup';

const { store } = configureStore();

const auth = (token: string) => ({
  headers: { Authorization: `Bearer ${token}` },
});

const addCanonicalUrl = <X extends TPluginDetail | TPluginVersion>(
  plugin: X,
): X => {
  const { repository_url, repository_branch, repository_subdirectory } = plugin;
  let canonical_url = repository_url;
  if (repository_branch) {
    canonical_url = `${canonical_url}/tree/${repository_branch}`;

    if (repository_subdirectory) {
      canonical_url = `${canonical_url}/${repository_subdirectory}`;
    }
  }

  plugin.canonical_url = canonical_url;
  return plugin;
};

export const getPlugin = async (
  pluginId: string,
  available = true,
): Promise<TPluginDetail> => {
  const serverInfo = (store.getState() || {}).persisted.serverInfo;
  const plugin = (
    await axios.get(
      `${HUB_API_URL}/plugins/${pluginId}${
        available ? '?status=available' : ''
      }`,
      {
        headers: {
          'Source-Context': 'dashboard',
          ...{ 'Debug-Context': serverInfo.id },
        },
      },
    )
  ).data as TPluginDetail;
  return addCanonicalUrl(plugin);
};

export const getPlugins: (
  searchQuery: string,
  filterQueries: string[],
  token: string | null,
) => Promise<TPlugin[]> = memoisePromiseFn(
  async (
    searchQuery: string,
    filterQueries: string[],
    token: string | null,
  ) => {
    const serverInfo = (store.getState() || {}).persisted.serverInfo;
    const search = searchQuery ? `&name_contains=${searchQuery}` : '';
    const filter =
      filterQueries.length > 0 ? '&' + filterQueries.join('&') : '';
    return (
      await axios.get(
        `${HUB_API_URL}/plugins?status=available${search}${filter}`,
        {
          ...(token ? auth(token) : {}),
          ...{
            headers: {
              'Source-Context': 'dashboard',
              ...{ 'Debug-Context': serverInfo.id },
            },
          },
        },
      )
    ).data as TPlugin[];
  },
);

export const getVersion = async (versionID: string) => {
  const serverInfo = (store.getState() || {}).persisted.serverInfo;
  return (
    await axios.get(`${HUB_API_URL}/plugin_versions/${versionID}`, {
      headers: {
        'Source-Context': 'dashboard',
        ...{ 'Debug-Context': serverInfo.id },
      },
    })
  ).data;
};

export const getVersions = async (pluginId: TId): Promise<TPluginVersion[]> => {
  const serverInfo = (store.getState() || {}).persisted.serverInfo;
  return (
    await axios.get(
      `${HUB_API_URL}/plugin_versions?status=available&plugin_id=${pluginId}`,
      {
        headers: {
          'Source-Context': 'dashboard',
          ...{ 'Debug-Context': serverInfo.id },
        },
      },
    )
  ).data as TPluginVersion[];
};

export const getStarredPlugins = async (
  userId: TId,
  token: string,
): Promise<Set<TId>> => {
  const serverInfo = (store.getState() || {}).persisted.serverInfo;
  const interactions = (
    await axios.get(
      `${HUB_API_URL}/interaction?interaction_type=star&mine=true&user_id=${userId}`,
      {
        ...(token ? auth(token) : {}),
        ...{
          headers: {
            'Source-Context': 'dashboard',
            ...{ 'Debug-Context': serverInfo.id },
          },
        },
      },
    )
  ).data as { plugin_id: string }[];

  return new Set(interactions.map((i) => i.plugin_id));
};

export const getIsStarred = async (
  userId: TId,
  pluginId: TId,
  token: string,
): Promise<boolean> => {
  const serverInfo = (store.getState() || {}).persisted.serverInfo;
  const interactions = (
    await axios.get(
      `${HUB_API_URL}/interaction?interaction_type=star&mine=true&user_id=${userId}&plugin_id=${pluginId}`,
      {
        ...(token ? auth(token) : {}),
        ...{
          headers: {
            'Source-Context': 'dashboard',
            ...{ 'Debug-Context': serverInfo.id },
          },
        },
      },
    )
  ).data;

  return interactions.length > 0;
};

export const starPlugin = async (
  userId: TId,
  pluginId: TId,
  token: string,
): Promise<void> => {
  const serverInfo = (store.getState() || {}).persisted.serverInfo;
  return await axios.post(
    `${HUB_API_URL}/interaction`,
    { type: 'star', user_id: userId, plugin_id: pluginId },
    {
      ...(token ? auth(token) : {}),
      ...{
        headers: {
          'Source-Context': 'dashboard',
          ...{ 'Debug-Context': serverInfo.id },
        },
      },
    },
  );
};

export const getTagOptions = async (query: string): Promise<string[]> => {
  const serverInfo = (store.getState() || {}).persisted.serverInfo;

  return ((
    await axios.get(`${HUB_API_URL}/tag?limit=8&name_contains=${query}`, {
      headers: {
        'Source-Context': 'dashboard',
        ...{ 'Debug-Context': serverInfo.id },
      },
    })
  ).data as { name: string }[]).map((t) => t.name);
};

export const deletePlugin = async (
  pluginId: TId,
  token: string,
): Promise<void> => {
  const serverInfo = (store.getState() || {}).persisted.serverInfo;

  return await axios.delete(`${HUB_API_URL}/plugins/${pluginId}`, {
    ...(token ? auth(token) : {}),
    ...{
      headers: {
        'Source-Context': 'dashboard',
        ...{ 'Debug-Context': serverInfo.id },
      },
    },
  });
};
