import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import moment from 'moment';

import {
  Box,
  FlexBox,
  PrimaryButton,
  Paragraph,
  icons,
  TagsInputField,
  CheckboxInput,
  ValidatedTextField,
  InputWithLabel,
  TextInput,
} from '../../../components';
import { AuthenticatedLayout } from '../../common/layouts/AuthenticatedLayout';
import { routePaths } from '../../../../routes/routePaths';
import { useSelector, useToaster } from '../../../hooks';
import { workspaceSelectors } from '../../../../redux/selectors';
import { getTranslateByScope } from '../../../../services';
import { DEFAULT_WORKSPACE_NAME, iconColors } from '../../../../constants';
import { HUB_API_URL } from '../../../../api/constants';
import { useHubToken, useHubUser } from '../../../hooks/auth';
import { PluginsLayout } from '../shared/Layout';
import { getTagOptions } from '../api';
import { debounce } from 'lodash';
import { hubAxios } from '../../../../utils/axios';
import { MyFallbackComponent } from '../../../components/FallbackComponent';
import { ErrorBoundary } from 'react-error-boundary';
import { sanitizeUrl } from '../../../../utils/url';

export const translate = getTranslateByScope('ui.layouts.Plugins.create');

const todayFormatted = moment().format('dddd, DD MMM yyyy');

const debouncedGetTagOptions = debounce(getTagOptions, 300, {
  leading: true,
  trailing: true,
  maxWait: 1000,
});

const CreatePlugin: React.FC = () => {
  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);
  const hubApiToken = useHubToken();
  const history = useHistory();
  const { failureToast } = useToaster();
  const [creatingPlugin, setCreatingPlugin] = useState(false);
  const hubUser = useHubUser();
  const [packageName, setPackageName] = useState('');
  const [versionNumber, setVersionNumber] = useState('');
  const [packageNameStatus, setPackageNameStatus] = useState({
    status: 'editing',
  } as { status: 'disabled' } | { status: 'editing' } | { status: 'error'; message: string } | { status: 'success' });
  const [repositoryUrl, setRepositoryUrl] = useState('');
  const [repositoryBranch, setRepositoryBranch] = useState('');
  const [commitHash, setCommitHash] = useState('');
  const [repositorySubdirectory, setRepositorySubdirectory] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  const [tagText, setTagText] = useState('');
  const [tags, setTags] = useState([] as string[]);
  const [checkGuidelines, setCheckGuidelines] = useState(false);
  const [checkPublish, setCheckPublish] = useState(false);

  return (
    <ErrorBoundary
      FallbackComponent={MyFallbackComponent}
      onReset={() => {
        history.push(routePaths.dashboard(selectedWorkspace));
      }}
    >
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
            name: 'Create plugin',
            clickable: true,
            to: routePaths.plugins.create(
              selectedWorkspace ?? DEFAULT_WORKSPACE_NAME,
            ),
          },
        ]}
      >
        <PluginsLayout title="Create Plugin">
          <FlexBox style={{ maxWidth: '800px' }} marginVertical="xl">
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
                {logoUrl ? (
                  <img
                    src={sanitizeUrl(logoUrl)}
                    alt="Plugin logo"
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

            {/* main form */}
            <Box>
              {/* description */}
              <Box>
                <Paragraph style={{ lineHeight: '30px' }}>
                  Contributing to the ZenML Hub is easy! Just follow these
                  simple steps:
                </Paragraph>
                <Paragraph style={{ lineHeight: '30px' }}>
                  1. Download the hub plugin template from here to get started
                  quickly.
                </Paragraph>
                <Paragraph style={{ lineHeight: '30px' }}>
                  2. Adjust the code structure according to the import path you
                  prefer.
                </Paragraph>
                <Paragraph style={{ lineHeight: '30px' }}>
                  3. Update the pyproject.toml file to reflect your changes.
                </Paragraph>
                <Paragraph>
                  4. Create a public repository on GitHub or GitLab for your
                  plugin and push your code to it.
                </Paragraph>
                <Paragraph style={{ lineHeight: '30px', marginTop: 32 }}>
                  {
                    "It's that easy! Once you've completed these steps, choose a globally unique name for your plugin and provide  repository URL below."
                  }
                </Paragraph>
              </Box>

              {/* package name and repository URL */}
              <Box marginVertical="xl">
                <Box
                  marginBottom="lg"
                  style={{
                    display: 'flex',
                    alignItems: 'end',
                    gap: '1rem',
                  }}
                >
                  {hubUser && (
                    <Paragraph style={{ paddingBottom: '1rem' }}>
                      {hubUser.username}/
                    </Paragraph>
                  )}
                  <ValidatedTextField
                    label="Package Name *"
                    value={packageName}
                    onChange={(p: string) => {
                      if (!/^[a-zA-Z]\w*$/.test(p)) {
                        setPackageNameStatus({
                          status: 'error' as const,
                          message:
                            'Package name must contain only alphanumeric characters or underscores and start with a letter',
                        });
                      } else {
                        setPackageNameStatus({ status: 'editing' });
                      }

                      setPackageName(p);
                    }}
                    status={packageNameStatus}
                  />
                </Box>

                {/* repository URL */}
                <Box marginBottom="lg">
                  <ValidatedTextField
                    label="Repository URL *"
                    value={repositoryUrl}
                    onChange={setRepositoryUrl}
                    status={{ status: 'editing' }}
                  />
                </Box>

                {/* version number */}
                <Box marginBottom="lg">
                  <ValidatedTextField
                    label="Version Number (optional)"
                    value={versionNumber}
                    onChange={setVersionNumber}
                    status={{ status: 'editing' }}
                    placeholder="Version number"
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
                      />
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
                      />
                    }
                  />
                </Box>

                {/* Logo URL */}
                <ValidatedTextField
                  label="Logo URL (optional)"
                  value={logoUrl}
                  onChange={setLogoUrl}
                  status={{ status: 'editing' }}
                />
              </Box>

              <TagsInputField
                value={tagText}
                onChangeText={setTagText}
                tags={tags}
                onChangeTags={setTags}
                label="Add tags (optional)"
                placeholder="Ex. Artificial Intelligence"
                getTagOptions={debouncedGetTagOptions}
              />

              <Box marginVertical="lg">
                <Box marginBottom="sm">
                  <CheckboxInput
                    label={
                      <p>
                        I agree to follow the guidelines and not upload harmful
                        code and accept the{' '}
                        <a
                          onClick={(e) => e.stopPropagation()}
                          target="_blank"
                          rel="noopener noreferrer"
                          href="https://hub.zenml.io/privacy"
                        >
                          Privacy Policy
                        </a>{' '}
                        and{' '}
                        <a
                          onClick={(e) => e.stopPropagation()}
                          target="_blank"
                          rel="noopener noreferrer"
                          href="https://hub.zenml.io/tou"
                        >
                          Terms of use
                        </a>{' '}
                        *
                      </p>
                    }
                    value={checkGuidelines}
                    setValue={setCheckGuidelines}
                  />
                </Box>
                <CheckboxInput
                  label="I agree to publicly publish my plugin on the ZenML Hub under the Apache license. *"
                  value={checkPublish}
                  setValue={setCheckPublish}
                />
              </Box>

              <FlexBox justifyContent="flex-end" marginVertical="lg">
                <PrimaryButton
                  disabled={
                    creatingPlugin ||
                    !(
                      checkGuidelines &&
                      checkPublish &&
                      packageName &&
                      repositoryUrl
                    )
                  }
                  onClick={() => {
                    setCreatingPlugin(true);

                    hubAxios
                      .post(
                        `${HUB_API_URL}/plugins`,
                        {
                          name: packageName,
                          description: '',
                          version: versionNumber,
                          release_notes: `Initial version of ${packageName}`,
                          repository_url: repositoryUrl,
                          repository_subdirectory: repositorySubdirectory,
                          repository_branch: repositoryBranch,
                          repository_commit: commitHash,
                          logo_url: logoUrl,
                          tags,
                        },
                        {
                          headers: { Authorization: `Bearer ${hubApiToken}` },
                        },
                      )
                      .then(() => {
                        history.push(routePaths.settings.myPlugins);
                      })
                      .catch((err) => {
                        const errorMessage = err.response?.data?.detail;
                        failureToast({
                          description:
                            'Error creating plugin' +
                            (errorMessage ? `: ${errorMessage}` : ''),
                        });
                      })
                      .finally(() => {
                        setCreatingPlugin(false);
                      });
                  }}
                >
                  {creatingPlugin ? 'Creating plugin...' : 'Contribute'}
                </PrimaryButton>
              </FlexBox>
            </Box>
          </FlexBox>
        </PluginsLayout>
      </AuthenticatedLayout>
    </ErrorBoundary>
  );
};

export default CreatePlugin;
