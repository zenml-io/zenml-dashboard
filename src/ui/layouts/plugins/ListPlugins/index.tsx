import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import {
  Box,
  FlexBox,
  PrimaryButton,
  H2,
  H4,
  Paragraph,
  icons,
  IconInputField,
  LinkBox,
} from '../../../components';
import { AuthenticatedLayout } from '../../common/layouts/AuthenticatedLayout';
import { routePaths } from '../../../../routes/routePaths';
import { useSelector } from '../../../hooks';
import { workspaceSelectors } from '../../../../redux/selectors';
import { getTranslateByScope } from '../../../../services';
import { DEFAULT_WORKSPACE_NAME, iconColors } from '../../../../constants';
import { HUB_API_URL } from '../../../../api/constants';
import { debounce, memoisePromiseFn } from '../../../../utils/memo';

export const translate = getTranslateByScope('ui.layouts.Plugins.list');

const getData = memoisePromiseFn(async (searchQuery: string) => {
  const search = searchQuery ? `&name_contains=${searchQuery}` : '';
  return (await axios.get(`${HUB_API_URL}/plugins?status=available${search}`))
    .data as TPlugin[];
});

const ListPlugins: React.FC = () => {
  const history = useHistory();
  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);

  const [plugins, setPlugins] = useState([] as TPlugin[]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterQuery, setFilterQuery] = useState('');

  useEffect(() => {
    getData(searchQuery).then(setPlugins);
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
      <FlexBox fullWidth padding="lg2" flexDirection="column">
        <H2 style={{ fontWeight: 500 }}>ZenPacks</H2>
        <FlexBox fullWidth justifyContent="flex-end">
          <Paragraph color="grey" style={{ fontSize: '14px' }}>
            Check out our easy to read document
          </Paragraph>
        </FlexBox>

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
          {plugins.map((p) => (
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
              {/* image */}
              <div
                style={{
                  width: 100,
                  height: 75,
                  background: '#bbb',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}
              ></div>

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

              <FlexBox style={{ position: 'absolute', top: 0, right: 0 }}>
                <icons.star color={iconColors.primary} marginRight="md" />
                <icons.extension color={iconColors.primary} />
              </FlexBox>
            </LinkBox>
          ))}
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
              onClick={() =>
                history.push(routePaths.plugins.create(selectedWorkspace))
              }
            >
              Create Plugin
            </PrimaryButton>
          </Box>
        </FlexBox>
      </FlexBox>
    </AuthenticatedLayout>
  );
};

export default ListPlugins;
