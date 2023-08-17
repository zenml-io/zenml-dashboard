import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';
import moment from 'moment';

import {
  Box,
  FlexBox,
  PrimaryButton,
  Paragraph,
  icons,
  ValidatedTextField,
  TextInput,
  InputWithLabel,
  TextAreaInput,
} from '../../../components';
import { AuthenticatedLayout } from '../../common/layouts/AuthenticatedLayout';
import { routePaths } from '../../../../routes/routePaths';
import { useSelector, useToaster } from '../../../hooks';
import { workspaceSelectors } from '../../../../redux/selectors';
import { getTranslateByScope } from '../../../../services';
import { DEFAULT_WORKSPACE_NAME, iconColors } from '../../../../constants';
import { HUB_API_URL } from '../../../../api/constants';
import { useHubToken } from '../../../hooks/auth';
import { pick } from '../../../../utils';
import { PluginsLayout } from '../shared/Layout';
import { getPlugin } from '../api';

export const translate = getTranslateByScope('ui.layouts.Plugins.create');

const todayFormatted = moment().format('dddd, DD MMM yyyy');

const UpdatePlugin: React.FC = () => {
  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);
  const history = useHistory();
  const hubApiToken = useHubToken();
  const { pluginId } = useParams<{ pluginId: string }>();
  const { failureToast } = useToaster();

  const [plugin, setPlugin] = useState(null as null | TPluginDetail);
  const [previousVersionNumber, setPreviousVersionNumber] = useState('');
  const [versionNumber, setVersionNumber] = useState('');
  const [repositoryUrl, setRepositoryUrl] = useState('');
  const [repositoryBranch, setRepositoryBranch] = useState('');
  const [commitHash, setCommitHash] = useState('');
  const [repositorySubdirectory, setRepositorySubdirectory] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  const [releaseNotes, setReleaseNotes] = useState('');

  useEffect(() => {
    getPlugin(pluginId, false).then((p) => {
      setPlugin(p);
      if (!repositoryUrl) setRepositoryUrl(p.repository_url);
      if (!repositoryBranch && p.repository_branch)
        setRepositoryBranch(p.repository_branch);
      if (!repositorySubdirectory && p.repository_subdirectory)
        setRepositorySubdirectory(p.repository_subdirectory);
      if (!logoUrl && p.logo_url) setLogoUrl(p.logo_url);
      setPreviousVersionNumber(p.version);
    });
    // eslint-disable-next-line
  }, [pluginId]);

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
        {
          name: 'Create new plugin version',
          clickable: true,
          to: routePaths.plugins.update(
            selectedWorkspace ?? DEFAULT_WORKSPACE_NAME,
            pluginId,
          ),
        },
      ]}
    >
      <PluginsLayout title="Create New Plugin Version">
        {/* content container */}
        <FlexBox marginVertical="xl">
          {/* date and image sidebar */}
          <Box paddingRight="lg2">
            <Paragraph style={{ color: '#424240', fontSize: 14 }}>
              {todayFormatted}
            </Paragraph>

            <FlexBox
              style={{
                width: 180,
                height: 180,
                border: '1px solid #A8A8A850',
                marginTop: 12,
              }}
              justifyContent="center"
              alignItems="center"
            >
              {plugin?.logo_url ? (
                <img
                  src={logoUrl}
                  alt={`${plugin.name} logo`}
                  style={{
                    maxWidth: '60%',
                    display: 'block',
                    margin: 'auto',
                    marginTop: 12,
                    marginBottom: 16,
                  }}
                />
              ) : (
                <Box style={{ opacity: 0.2 }}>
                  <icons.photoCamera size="xxl" color={iconColors.primary} />
                </Box>
              )}
            </FlexBox>
          </Box>

          {/* form */}
          <Box
            marginVertical="xl"
            paddingRight="lg2"
            style={{ maxWidth: '650px', flexGrow: 1 }}
          >
            {/* repository URL */}
            <Box marginBottom="lg">
              <ValidatedTextField
                label="Repository URL *"
                value={repositoryUrl}
                onChange={setRepositoryUrl}
                status={{ status: 'editing' }}
                placeholder="Repository URL"
              />
            </Box>

            {/* version number */}
            <Box marginBottom="lg">
              <ValidatedTextField
                label="Version Number (optional)"
                value={versionNumber}
                onChange={setVersionNumber}
                status={{ status: 'editing' }}
                placeholder={
                  'Version number' +
                  (previousVersionNumber
                    ? ` (latest version is ${previousVersionNumber})`
                    : '')
                }
              />
            </Box>

            {/* repository branch */}
            <Box marginBottom="lg">
              <InputWithLabel
                label="Branch of repository (optional)"
                InputComponent={
                  <TextInput
                    value={repositoryBranch}
                    onChangeText={setRepositoryBranch}
                    placeholder="Branch of repository"
                  />
                }
              />
            </Box>

            {/* commit hash */}
            <Box marginBottom="lg">
              <InputWithLabel
                label="Commit hash (optional)"
                InputComponent={
                  <TextInput
                    value={commitHash}
                    onChangeText={setCommitHash}
                    placeholder="Commit hash"
                  />
                }
              />
            </Box>

            {/* repository subdirectory */}
            <Box marginBottom="lg">
              <InputWithLabel
                label="Subdirectory of repository (optional)"
                InputComponent={
                  <TextInput
                    value={repositorySubdirectory}
                    onChangeText={setRepositorySubdirectory}
                    placeholder="Subdirectory of repository"
                  />
                }
              />
            </Box>

            {/* release notes */}
            <Box marginBottom="lg">
              <InputWithLabel
                label="Release Notes"
                InputComponent={
                  <TextAreaInput
                    value={releaseNotes}
                    onChangeText={setReleaseNotes}
                    placeholder="Release Notes"
                    lines={6}
                  />
                }
              />
            </Box>

            <FlexBox justifyContent="flex-end">
              <PrimaryButton
                onClick={() => {
                  if (!plugin)
                    return failureToast({
                      description: 'Failed to fetch plugin details',
                    });

                  axios
                    .post(
                      `${HUB_API_URL}/plugins`,
                      {
                        ...pick(
                          (plugin as unknown) as Record<string, unknown>,
                          ['tags', 'name', 'description'],
                        ),
                        version: versionNumber,
                        release_notes: releaseNotes,
                        repository_url: repositoryUrl,
                        repository_subdirectory: repositorySubdirectory,
                        repository_branch: repositoryBranch,
                        repository_commit: commitHash,
                        logo_url: logoUrl,
                      },
                      {
                        headers: { Authorization: `Bearer ${hubApiToken}` },
                      },
                    )
                    .then(() => {
                      history.push(routePaths.settings.myPlugins);
                    })
                    .catch(() => {
                      failureToast({
                        description: 'Error updating plugin version',
                      });
                    });
                }}
                disabled={!(repositoryUrl && releaseNotes)}
              >
                Update version
              </PrimaryButton>
            </FlexBox>
          </Box>

          {/* note sidebar  */}
          <Box
            marginVertical="xl"
            style={{
              backgroundColor: '#F8F8F8',
              padding: '30px 20px',
              borderRadius: '10px',
              width: '285px',
              alignSelf: 'flex-start',
            }}
          >
            <Paragraph>Note</Paragraph>
            <Paragraph size="small">
              {
                'This will create a new version of your plugin without overwriting the previous one. This way any code with dependencies on the previous version continues working. Please use semantic versioning and verbose Release Notes to make it easier for other users to use this plugin.'
              }
            </Paragraph>
          </Box>
        </FlexBox>
      </PluginsLayout>
    </AuthenticatedLayout>
  );
};

export default UpdatePlugin;
