import axios from 'axios';

import { HUB_API_URL } from '../../../api/constants';
import { memoisePromiseFn } from '../../../utils/memo';
import { PluginVersion, Plugin } from './pluginsTypes';

const auth = (token: string) => ({
  headers: { Authorization: `Bearer ${token}` },
});

const addCanonicalUrl = <X extends Plugin | TPluginVersion | any>(
  plugin: X | any,
): X => {
  const {
    repository_url,
    repository_branch,
    repository_subdirectory,
  } = plugin as any;
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
): Promise<Plugin> => {
  const plugin = (
    await axios.get(
      `${HUB_API_URL}/plugins/${pluginId}${
        available ? '?status=available' : ''
      }`,
    )
  ).data as Plugin;
  return addCanonicalUrl(plugin);
};

export const getPlugins: (
  searchQuery: string,
  filterQueries: string[],
  token: string | null,
) => Promise<Plugin[]> = memoisePromiseFn(
  async (
    searchQuery: string,
    filterQueries: string[],
    token: string | null,
  ) => {
    const search = searchQuery ? `&name_contains=${searchQuery}` : '';
    const filter =
      filterQueries.length > 0 ? '&' + filterQueries.join('&') : '';
    return (
      await axios.get(
        `${HUB_API_URL}/plugins?status=available${search}${filter}`,
        token ? auth(token) : {},
      )
    ).data as Plugin[];
  },
);

export const getVersion = async (versionID: string) => {
  return (await axios.get(`${HUB_API_URL}/plugin_versions/${versionID}`)).data;
};

export const getVersions = async (pluginId: TId): Promise<PluginVersion[]> => {
  return (
    await axios.get(
      `${HUB_API_URL}/plugin_versions?status=available&plugin_id=${pluginId}`,
    )
  ).data as PluginVersion[];
};

export const getStarredPlugins = async (
  userId: TId,
  token: string,
): Promise<Set<TId>> => {
  const interactions = (
    await axios.get(
      `${HUB_API_URL}/interaction?interaction_type=star&mine=true&user_id=${userId}`,
      auth(token),
    )
  ).data as { plugin_id: string }[];

  return new Set(interactions.map((i) => i.plugin_id));
};

export const getIsStarred = async (
  userId: TId,
  pluginId: TId,
  token: string,
): Promise<boolean> => {
  const interactions = (
    await axios.get(
      `${HUB_API_URL}/interaction?interaction_type=star&mine=true&user_id=${userId}&plugin_id=${pluginId}`,
      auth(token),
    )
  ).data;

  return interactions.length > 0;
};

export const starPlugin = async (
  userId: TId,
  pluginId: TId,
  token: string,
): Promise<void> => {
  return await axios.post(
    `${HUB_API_URL}/interaction`,
    { type: 'star', user_id: userId, plugin_id: pluginId },
    auth(token),
  );
};

export const getTagOptions = async (query: string): Promise<string[]> => {
  return ((await axios.get(`${HUB_API_URL}/tag?limit=8&name_contains=${query}`))
    .data as { name: string }[]).map((t) => t.name);
};

export const deletePlugin = async (
  pluginId: TId,
  token: string,
): Promise<void> => {
  return await axios.delete(`${HUB_API_URL}/plugins/${pluginId}`, auth(token));
};
