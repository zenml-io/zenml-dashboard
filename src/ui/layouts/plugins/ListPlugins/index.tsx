import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

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
import { useSelector, useToaster } from '../../../hooks';
import { workspaceSelectors } from '../../../../redux/selectors';
import { getTranslateByScope } from '../../../../services';
import { DEFAULT_WORKSPACE_NAME, iconColors } from '../../../../constants';
import { debounce } from '../../../../utils/memo';
import { PluginsLayout } from '../shared/Layout';
import { useHubToken, useHubUser } from '../../../hooks/auth';
import ZenMLLogo from '../../../assets/logo.svg';
import { getPlugins, getStarredPlugins, starPlugin } from '../api';

export const translate = getTranslateByScope('ui.layouts.Plugins.list');

const ListPlugins: React.FC = () => {
  const history = useHistory();
  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);
  const hubToken = useHubToken();
  const hubIsConnected = !!hubToken;
  const hubUser = useHubUser();
  const { successToast, failureToast } = useToaster();

  const [fetching, setFetching] = useState(true);
  const [plugins, setPlugins] = useState([] as TPlugin[]);
  const [starredPlugins, setStarredPlugins] = useState(new Set() as Set<TId>);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterQuery, setFilterQuery] = useState('');

  useEffect(() => {
    getPlugins(searchQuery)
      .then(setPlugins)
      .finally(() => setFetching(false));
  }, [searchQuery]);

  useEffect(() => {
    if (hubUser && hubToken) {
      getStarredPlugins(hubUser.id, hubToken).then(setStarredPlugins);
    }
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
      <PluginsLayout title="ZenPacks">
        <FlexBox paddingVertical={'lg3'} style={{ maxWidth: '520px' }}>
          <FlexBox fullWidth marginRight="md">
            <IconInputField
              placeholder="Search"
              defaultValue={searchQuery}
              onChange={debounce(setSearchQuery, 400)}
            />
          </FlexBox>
          <IconInputField
            placeholder="Filter all ZenPacks"
            value={filterQuery}
            onChange={setFilterQuery}
            iconName="filter"
            iconColor={iconColors.primary}
          />
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
                  {/* logo */}
                  <img
                    src={p.logo_url ?? ZenMLLogo}
                    alt={`${p.name} logo`}
                    style={{
                      maxWidth: '60%',
                      display: 'block',
                      margin: 'auto',
                      marginTop: 24,
                      marginBottom: 16,
                    }}
                  />

                  <H4
                    color="primary"
                    style={{ fontSize: '16px', marginTop: 12, marginBottom: 4 }}
                  >
                    {p.name}
                  </H4>

                  <Paragraph
                    style={{
                      color: '#A8A8A8',
                      fontSize: '12px',
                      lineHeight: '14px',
                      marginBottom: 20,
                    }}
                  >
                    {p.description}
                  </Paragraph>

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
                          failureToast({
                            description:
                              'You need to be logged in to star this plugin',
                          });
                        } else {
                          starPlugin(hubUser.id, p.id, hubToken)
                            .then(() => {
                              setStarredPlugins(
                                (s) => new Set([...Array.from(s), p.id]),
                              );
                              successToast({
                                description: 'Starred plugin',
                              });
                            })
                            .catch(() => {
                              failureToast({
                                description: 'Error starring plugin',
                              });
                            });
                        }
                      }}
                      paddingRight="md"
                    >
                      <StarIcon size="sm" color={iconColors.primary} />
                    </Box>
                    <icons.extension size="sm" color={iconColors.primary} />
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
                  failureToast({
                    description:
                      'You need to connect to the Hub in settings to create plugins',
                  });
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
