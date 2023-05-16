import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import {
  Box,
  FlexBox,
  PrimaryButton,
  H4,
  Paragraph,
  icons,
  IconInputField,
  LinkBox,
  FullWidthSpinner,
} from '../../../components';
import { AuthenticatedLayout } from '../../common/layouts/AuthenticatedLayout';
import { routePaths } from '../../../../routes/routePaths';
import { useDispatch, useSelector, useToaster } from '../../../hooks';
import { workspaceSelectors } from '../../../../redux/selectors';
import { getTranslateByScope } from '../../../../services';
import { DEFAULT_WORKSPACE_NAME, iconColors } from '../../../../constants';
import { debounce } from '../../../../utils/memo';
import { PluginsLayout } from '../shared/Layout';
import { useHubToken, useHubUser } from '../../../hooks/auth';
import PluginFallbackImage from '../../../assets/plugin-fallback.svg';
import { getPlugins, getStarredPlugins, starPlugin } from '../api';
import { hubConnectionPromptActionTypes } from '../../../../redux/actionTypes';
import { Filters } from './Filters';

export const translate = getTranslateByScope('ui.layouts.Plugins.list');

const getInitialFilters = (location: { search: string }) => {
  const initialState = {
    onlyMine: false,
    onlyMyStarred: false,
    author: '',
    tag: '',
  };

  const author = location.search
    .replace('?', '')
    .split('&')
    .filter((s) => s.startsWith('author='))[0];
  if (author) initialState.author = author.replace('author=', '');

  return initialState;
};
const ListPlugins: React.FC = () => {
  const history = useHistory();
  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);
  const dispatch = useDispatch();
  const hubToken = useHubToken();
  const hubIsConnected = !!hubToken;
  const hubUser = useHubUser();
  const { successToast, failureToast } = useToaster();
  const location = useLocation();

  const [fetching, setFetching] = useState(true);
  const [plugins, setPlugins] = useState([] as TPlugin[]);
  const [starredPlugins, setStarredPlugins] = useState(new Set() as Set<TId>);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState(getInitialFilters(location));

  // get plugins
  useEffect(() => {
    const filtersQuery = [];
    if (filters.onlyMine) filtersQuery.push('mine=true');
    if (filters.onlyMyStarred) filtersQuery.push('starred_by_me=true');
    if (filters.author) filtersQuery.push(`username=${filters.author}`);
    if (filters.tag) filtersQuery.push(`tag=${filters.tag}`);

    setFetching(true);
    getPlugins(
      searchQuery,
      filtersQuery,
      filters.onlyMine || filters.onlyMyStarred ? hubToken : null,
    )
      .then((data) => {
        const sorted = data.sort((a, b) => {
          if (a.author === 'ZenML' && b.author !== 'ZenML') return -1;
          if (a.author !== 'ZenML' && b.author === 'ZenML') return 1;
          return 0;
        });
        setPlugins(sorted);
      })
      .finally(() => setFetching(false));
  }, [searchQuery, filters, hubToken]);

  // get starred
  useEffect(() => {
    if (hubUser && hubToken) {
      getStarredPlugins(hubUser.id, hubToken).then((starred) =>
        // handle race condition of the user starring a plugin before this request returns
        setStarredPlugins(
          new Set([...Array.from(starredPlugins), ...Array.from(starred)]),
        ),
      );
    }
    // eslint-disable-next-line
  }, [hubUser, hubToken]);

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
      ]}
    >
      <PluginsLayout title="Plugins">
        <FlexBox paddingVertical={'lg3'}>
          <FlexBox fullWidth marginRight="md" style={{ maxWidth: '300px' }}>
            <IconInputField
              placeholder="Search"
              defaultValue={searchQuery}
              onChange={debounce(setSearchQuery, 400)}
            />
          </FlexBox>

          <Filters currentFilters={filters} updateFilters={setFilters} />
        </FlexBox>
        <FlexBox style={{ flexDirection: 'column', gap: '12px' }}>
          <Paragraph style={{ fontSize: '20px', fontWeight: 600 }}>
            ZenML Hub: Streamlining MLOps Collaboration with Reusable Components
          </Paragraph>
          <Paragraph>
            The ZenML Hub is a{' '}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://blog.zenml.io/zenml-hub-launch/"
            >
              plugin system
            </a>{' '}
            that allows users to contribute and consume stack component flavors,
            pipelines, steps, materializers, and other pieces of code seamlessly
            in their ML pipelines. Below are a list of community contributed
            plugins. If you would like to create your own plugin, click{' '}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://docs.zenml.io/starter-guide/collaborate/zenml-hub"
            >
              here
            </a>
            .
          </Paragraph>
        </FlexBox>

        {/* list plugins */}
        <FlexBox flexWrap={true} padding="lg">
          {fetching ? (
            <FullWidthSpinner color="black" size="md" />
          ) : (
            plugins.map((p) => {
              const starred = starredPlugins.has(p.id);
              const StarIcon = starred ? icons.star : icons.starOutline;

              return (
                <LinkBox
                  key={p.id}
                  style={{
                    position: 'relative',
                    padding: '12px',
                    width: '290px',
                    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)',
                    borderRadius: '4px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    margin: '0 16px 16px 0',
                  }}
                  onClick={() =>
                    history.push(
                      routePaths.plugins.detail.overview(
                        selectedWorkspace,
                        p.id,
                      ),
                    )
                  }
                >
                  <div>
                    {p.author === 'ZenML' && (
                      <icons.verified color={iconColors.primary} size="sm" />
                    )}
                    {/* logo */}
                    <img
                      src={p.logo_url || PluginFallbackImage}
                      alt={`${p.name} logo`}
                      style={{
                        height: '80px',
                        maxWidth: '60%',
                        objectFit: 'contain',
                        display: 'block',
                        margin: 'auto',
                        marginTop: 24,
                        marginBottom: 16,
                      }}
                    />
                  </div>
                  <div>
                    <H4
                      color="primary"
                      style={{
                        fontSize: '16px',
                        marginTop: 12,
                        marginBottom: 4,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      <span title={`${p.author}/${p.name}`}>
                        {p.author === 'ZenML' ? '' : `${p.author}/`}
                        {p.name}
                      </span>
                    </H4>

                    <Paragraph
                      style={{
                        color: '#A8A8A8',
                        fontSize: '12px',
                        lineHeight: '14px',
                        marginBottom: 20,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {' '}
                      <span title={p.description}>{p.description}</span>
                    </Paragraph>
                  </div>

                  {/* <FlexBox justifyContent="space-between">
                <Box>
                  <Paragraph className={styles.pluginMetric}>
                    {p.upvotes}
                  </Paragraph>
                  <Paragraph className={styles.pluginMetricText}>
                    Upvotes
                  </Paragraph>
                </Box>
                <Box>
                  <Paragraph className={styles.pluginMetric}>
                    {p.downloads}
                  </Paragraph>
                  <Paragraph className={styles.pluginMetricText}>
                    Downloads
                  </Paragraph>
                </Box>
                <Box>
                  <Paragraph className={styles.pluginMetric}>
                    {p.popularity}
                  </Paragraph>
                  <Paragraph className={styles.pluginMetricText}>
                    Popularity
                  </Paragraph>
                </Box>
              </FlexBox> */}

                  <FlexBox style={{ position: 'absolute', top: 8, right: 12 }}>
                    <Box
                      onClick={(e) => {
                        // don't navigate to the plugin page
                        e.stopPropagation();

                        if (starred) {
                          successToast({
                            description: "You've already starred this plugin",
                          });
                        } else if (!hubUser || !hubToken) {
                          dispatch({
                            type: hubConnectionPromptActionTypes.show,
                          });
                        } else {
                          // optimistic UI update
                          setStarredPlugins(
                            (s) => new Set([...Array.from(s), p.id]),
                          );
                          starPlugin(hubUser.id, p.id, hubToken).catch(() => {
                            failureToast({
                              description: 'Error starring plugin',
                            });
                            setStarredPlugins(
                              (s) =>
                                new Set(
                                  Array.from(s).filter((id) => id !== p.id),
                                ),
                            );
                          });
                        }
                      }}
                      paddingRight="md"
                    ></Box>
                    <StarIcon size="sm" color={iconColors.primary} />
                  </FlexBox>
                </LinkBox>
              );
            })
          )}
        </FlexBox>

        {/* create plugin */}
        <FlexBox
          style={{
            position: 'fixed',
            right: '0',
            bottom: '0',
            marginRight: '45px',
          }}
        >
          <Box marginBottom="lg">
            <PrimaryButton
              onClick={() => {
                if (hubIsConnected) {
                  history.push(routePaths.plugins.create(selectedWorkspace));
                } else {
                  dispatch({ type: hubConnectionPromptActionTypes.show });
                }
              }}
            >
              Create Plugin
            </PrimaryButton>
          </Box>
        </FlexBox>
      </PluginsLayout>
    </AuthenticatedLayout>
  );
};

export default ListPlugins;
