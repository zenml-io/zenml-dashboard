import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Box,
  FlexBox,
  PrimaryButton,
  H2,
  H4,
  Paragraph,
  icons,
  IconInputField,
} from '../../../components';
import { AuthenticatedLayout } from '../../common/layouts/AuthenticatedLayout';
import { routePaths } from '../../../../routes/routePaths';
import { useSelector } from '../../../hooks';
import { workspaceSelectors } from '../../../../redux/selectors';
import { getTranslateByScope } from '../../../../services';
import { DEFAULT_WORKSPACE_NAME, iconColors } from '../../../../constants';
import styles from './styles.module.scss';

export const translate = getTranslateByScope('ui.layouts.Plugins');

const data = [
  {
    id: 'unique-id',
    name: 'Barish Borchestrator',
    description:
      'Scalable, secure, and reliable cloud infrastructure for modern....',
    upvotes: '10M+',
    downloads: '10K+',
    popularity: '99%',
  },
];

export const ListPlugins: React.FC = ({}) => {
  const history = useHistory();
  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);

  const [searchQuery, setSearchQuery] = useState('');
  const [filterQuery, setFilterQuery] = useState('');

  return (
    <AuthenticatedLayout
      breadcrumb={[
        {
          name: translate('breadcrumbs.plugins.text'),
          clickable: true,
          to: routePaths.plugins.list(
            selectedWorkspace ? selectedWorkspace : DEFAULT_WORKSPACE_NAME,
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
              value={searchQuery}
              onChange={setSearchQuery}
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
        <FlexBox
          flexWrap={true}
          padding="lg"
          style={{
            width: '290px',
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)',
            borderRadius: '4px',
          }}
        >
          {data.map((p) => (
            <Box key={p.id} style={{ position: 'relative' }} paddingTop={'sm'}>
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

              <FlexBox justifyContent="space-between">
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
              </FlexBox>

              <FlexBox style={{ position: 'absolute', top: 0, right: 0 }}>
                <icons.star color={iconColors.primary} marginRight="md" />
                <icons.extension color={iconColors.primary} />
              </FlexBox>
            </Box>
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
