import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
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
  // FormDropdownField,
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
import { useHubToken } from '../../../hooks/auth';
import { PluginsLayout } from '../shared/Layout';

export const translate = getTranslateByScope('ui.layouts.Plugins.create');

const todayFormatted = moment().format('dddd, DD MMM yyyy');

const CreatePlugin: React.FC = () => {
  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);
  const hubApiToken = useHubToken();
  const history = useHistory();
  const { failureToast } = useToaster();

  const [packageName, setPackageName] = useState('');
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
              <Box style={{ opacity: 0.2 }}>
                <icons.photoCamera size="xxl" color={iconColors.primary} />
              </Box>
            </FlexBox>
          </Box>

          {/* main form */}
          <Box>
            {/* description */}
            <Box>
              <Paragraph style={{ lineHeight: '30px' }}>
                Contributing to the ZenML Hub is easy! Just follow these simple
                steps:
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
              <Box marginBottom="lg">
                <ValidatedTextField
                  label="Package Name"
                  value={packageName}
                  onChange={setPackageName}
                  status={{ status: 'editing' }}
                />
              </Box>

              <Box marginBottom="lg">
                <ValidatedTextField
                  label="Repository URL"
                  value={repositoryUrl}
                  onChange={setRepositoryUrl}
                  status={{ status: 'editing' }}
                />
              </Box>

              {/* repository branch */}
              <Box marginBottom="lg">
                <InputWithLabel
                  label="Branch of repository"
                  InputComponent={
                    <TextInput
                      value={repositoryBranch}
                      onChangeText={setRepositoryBranch}
                    />
                  }
                />
                {/* <FormDropdownField
                  label="Branch of repository"
                  value={repositoryBranch}
                  options={['staging', 'dev', 'deploy'].map((b) => ({
                    label: b,
                    value: b,
                  }))}
                  onChange={setRepositoryBranch}
                  placeholder="Select branch"
                /> */}
              </Box>

              {/* commit hash */}
              <Box marginBottom="lg">
                <InputWithLabel
                  label="Commit hash"
                  InputComponent={
                    <TextInput
                      value={commitHash}
                      onChangeText={setCommitHash}
                    />
                  }
                />
              </Box>

              {/* repository subdirectory */}
              <Box marginBottom="lg">
                <InputWithLabel
                  label="Subdirectory of repository"
                  InputComponent={
                    <TextInput
                      value={repositorySubdirectory}
                      onChangeText={setRepositorySubdirectory}
                    />
                  }
                />
              </Box>

              <ValidatedTextField
                label="Logo URL"
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
              label="Add tags"
              placeholder="Ex. Artificial Intelligence"
            />

            <Box marginVertical="lg">
              <Box marginBottom="sm">
                <CheckboxInput
                  label="I agree to follow the guidelines and not upload harmful code."
                  value={checkGuidelines}
                  setValue={setCheckGuidelines}
                />
              </Box>
              <CheckboxInput
                label="I agree to publicly publish my plugin on the ZenML Hub under the Apache license."
                value={checkPublish}
                setValue={setCheckPublish}
              />
            </Box>

            <FlexBox justifyContent="flex-end" marginVertical="lg">
              <PrimaryButton
                disabled={
                  !(
                    checkGuidelines &&
                    checkPublish &&
                    packageName &&
                    repositoryUrl
                  )
                }
                onClick={() => {
                  axios
                    .post(
                      `${HUB_API_URL}/plugins`,
                      {
                        name: packageName,
                        description: `First version of ${packageName}`,
                        version: '0.1',
                        release_notes: `First release of ${packageName}`,
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
                    });
                }}
              >
                Contribute
              </PrimaryButton>
            </FlexBox>
          </Box>
        </FlexBox>
      </PluginsLayout>
    </AuthenticatedLayout>
  );
};

export default CreatePlugin;
