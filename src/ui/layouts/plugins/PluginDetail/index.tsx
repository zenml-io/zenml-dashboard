import React from 'react';
import { useHistory } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

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
} from '../../../components';
import { AuthenticatedLayout } from '../../common/layouts/AuthenticatedLayout';
import { routePaths } from '../../../../routes/routePaths';
import { useDispatch, useSelector } from '../../../hooks';
import { workspaceSelectors } from '../../../../redux/selectors';
import { getTranslateByScope } from '../../../../services';
import {
  DEFAULT_WORKSPACE_NAME,
  iconColors,
  toasterTypes,
} from '../../../../constants';
import styles from './styles.module.scss';
import ZenMLFavourite from './ZenML favourite.svg';
import InstallDesignHeader from './InstallDesignHeader.svg';
import { showToasterAction } from '../../../../redux/actions';

export const translate = getTranslateByScope('ui.layouts.Plugins.list');

const data = {
  id: 'unique-id',
  name: 'Flavour',
  isOwner: true,
  latestVersion: '3.1.01',
  lastPublishedDaysAgo: 45,
  tags: ['Designer', 'AI', 'Fast'],
  pullsLastWeek: 8_802_034,
  pullsHistory: [800, 500, 400, 900, 100, 700, 600, 300, 200, 700],
  isZenMLFavourite: true,
  publisher: '@multazam',
  repo: 'https://github.com/example/example',
  apiLink: 'example.com',
  pipInstallCommand:
    'pip install zenml-airflow airflow==2.3.0 --index https://zenmlpypi.zenml.io',
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
  requirements: `nba-api
    notebook
    zenml==0.31.1`,
  installing: [
    {
      type: 'markdown',
      text: `Depend on it
    Run this command:
    With Flutter:`,
    },
    { type: 'code', text: `$ flutter pub add sign_in_with_apple` },
    {
      type: 'markdown',
      text: `This will add a line like this to your package's pubspec.yaml (and run an implicit flutter pub get):`,
    },
    {
      type: 'code',
      text: `dependencies:
        sign_in_with_apple: ^4.3.0`,
    },
  ],
};

const PluginDetail: React.FC = () => {
  const history = useHistory();
  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);
  const dispatch = useDispatch();

  return (
    <AuthenticatedLayout
      breadcrumb={[
        {
          name: 'List plugins',
          clickable: true,
          to: routePaths.plugins.list(
            selectedWorkspace ? selectedWorkspace : DEFAULT_WORKSPACE_NAME,
          ),
        },
        {
          name: 'Plugin details',
          clickable: true,
          to: routePaths.plugins.detail(
            selectedWorkspace ? selectedWorkspace : DEFAULT_WORKSPACE_NAME,
            data.id,
          ),
        },
      ]}
    >
      <FlexBox fullWidth padding="lg2" flexDirection="column">
        <H2 style={{ fontWeight: 500 }}>{translate('title')}</H2>
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
              {data.tags.map((t) => (
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
                    {data.name}
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
                    Latest Version {data.latestVersion}
                  </Paragraph>
                  <Paragraph size="tiny" color="grey">
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
                      onClick: () => alert('Not implemented yet'),
                    },
                    {
                      label: 'Star',
                      icon: icons.starOutline,
                      color: iconColors.primary,
                      onClick: () => alert('Not implemented yet'),
                    },
                    ...(data.isOwner
                      ? [
                          {
                            label: 'Update Version',
                            icon: icons.share,
                            color: iconColors.primary,
                            onClick: () =>
                              history.push(
                                routePaths.plugins.update(
                                  selectedWorkspace,
                                  data.id,
                                ),
                              ),
                          },
                          {
                            label: 'Delete Package',
                            icon: icons.delete,
                            color: iconColors.red,
                            onClick: () => alert('Not implemented yet'),
                          },
                        ]
                      : [
                          {
                            label: 'Report',
                            icon: icons.info,
                            color: iconColors.red,
                            onClick: () => history.push(`${data.repo}/issues`),
                          },
                        ]),
                  ].map((action) => (
                    <FlexBox
                      alignItems="center"
                      marginRight="lg"
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
                    </FlexBox>
                  ))}
                </FlexBox>
              </Box>
            </FlexBox>

            <ReactMarkdown>{data.overview}</ReactMarkdown>
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
                    {data.pipInstallCommand}
                  </Paragraph>

                  <LinkBox
                    onClick={() => {
                      navigator.clipboard.writeText(data.pipInstallCommand);

                      dispatch(
                        showToasterAction({
                          description: 'Copied to clipboard.',
                          type: toasterTypes.success,
                        }),
                      );
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
            <FlexBox justifyContent="space-between" marginVertical="md">
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

            <SeparatorLight />

            {/* publisher */}
            <Box marginVertical="md">
              <Paragraph size="tiny" color="grey">
                Paragraph
              </Paragraph>
              <Box marginTop="sm">
                <Paragraph size="tiny" color="primary">
                  <a
                    href={`/users/${data.publisher}`}
                    style={{ color: 'inherit' }}
                  >
                    {data.publisher}
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
                  <a href={data.repo} style={{ color: 'inherit' }}>
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
                    href={`/users/${data.publisher}/published`}
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
    </AuthenticatedLayout>
  );
};

export default PluginDetail;
