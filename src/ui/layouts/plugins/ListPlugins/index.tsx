import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

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
import { HUB_API_URL } from '../../../../api/constants';
import { debounce, memoisePromiseFn } from '../../../../utils/memo';
import { PluginsLayout } from '../shared/Layout';
import { useHubToken } from '../../../hooks/auth';
import ZenMLLogo from '../../../assets/logo.svg';

export const translate = getTranslateByScope('ui.layouts.Plugins.list');

const getData = memoisePromiseFn(async (searchQuery: string) => {
  const search = searchQuery ? `&name_contains=${searchQuery}` : '';
  return (await axios.get(`${HUB_API_URL}/plugins?status=available${search}`))
    .data as TPlugin[];
});

const ListPlugins: React.FC = () => {
  const history = useHistory();
  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);
  const hubIsConnected = !!useHubToken();
  const { failureToast } = useToaster();

  const [fetching, setFetching] = useState(true);
  const [plugins, setPlugins] = useState([] as TPlugin[]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterQuery, setFilterQuery] = useState('');

  useEffect(() => {
    getData(searchQuery)
      .then(setPlugins)
      .finally(() => setFetching(false));
  }, [searchQuery]);

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
            plugins.map((p) => (
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
                    routePaths.plugins.detail.overview(selectedWorkspace, p.id),
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
                  <icons.star
                    size="sm"
                    color={iconColors.primary}
                    marginRight="md"
                  />
                  <icons.extension size="sm" color={iconColors.primary} />
                </FlexBox>
              </LinkBox>
            ))
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
