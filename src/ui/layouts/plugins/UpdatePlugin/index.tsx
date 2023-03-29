import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';

import {
  Box,
  FlexBox,
  PrimaryButton,
  H2,
  Paragraph,
  icons,
  ValidatedTextField,
  FormDropdownField,
  TextInput,
  InputWithLabel,
  TextAreaInput,
} from '../../../components';
import { AuthenticatedLayout } from '../../common/layouts/AuthenticatedLayout';
import { routePaths } from '../../../../routes/routePaths';
import { useSelector } from '../../../hooks';
import { workspaceSelectors } from '../../../../redux/selectors';
import { getTranslateByScope } from '../../../../services';
import { DEFAULT_WORKSPACE_NAME, iconColors } from '../../../../constants';

export const translate = getTranslateByScope('ui.layouts.Plugins.create');

const todayFormatted = moment().format('dddd, DD MMM yyyy');

const data = {
  id: 'unique-id',
  name: 'Airflow Orchestrator',
  repositoryUrl: 'https://github.com/example/example',
  repositoryBranches: ['staging', 'dev', 'deploy'],
};

const UpdatePlugin: React.FC = () => {
  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);

  const [versionNumber, setVersionNumber] = useState('');
  const [repositoryUrl, setRepositoryUrl] = useState('');
  const [repositoryBranch, setRepositoryBranch] = useState('');
  const [commitHash, setCommitHash] = useState('');
  const [repositorySubdirectory, setRepositorySubdirectory] = useState('');
  const [releaseNotes, setReleaseNotes] = useState('');

  const { pluginId } = useParams<{ pluginId: string }>();

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
          name: 'Update plugin',
          clickable: true,
          to: routePaths.plugins.update(
            selectedWorkspace ?? DEFAULT_WORKSPACE_NAME,
            pluginId,
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
              <Box style={{ opacity: 0.2 }}>
                <icons.photoCamera size="xxl" color={iconColors.primary} />
              </Box>
            </FlexBox>
          </Box>

          {/* form */}
          <Box
            marginVertical="xl"
            paddingRight="lg2"
            style={{ maxWidth: '650px', flexGrow: 1 }}
          >
            {/* version number */}
            <Box marginBottom="lg">
              <ValidatedTextField
                label="Version Number"
                value={versionNumber}
                onChange={setVersionNumber}
                status={{ status: 'success' }}
                placeholder="Version number"
              />
            </Box>

            {/* repository URL */}
            <Box marginBottom="lg">
              <ValidatedTextField
                label="Repository URL"
                value={repositoryUrl}
                onChange={setRepositoryUrl}
                status={{ status: 'success' }}
                placeholder="Repository URL"
              />
            </Box>

            {/* repository branch */}
            <Box marginBottom="lg">
              <FormDropdownField
                label="Branch of repository"
                value={repositoryBranch}
                options={data.repositoryBranches.map((b) => ({
                  label: b,
                  value: b,
                }))}
                onChange={setRepositoryBranch}
                placeholder="Select branch"
              />
            </Box>

            {/* commit hash */}
            <Box marginBottom="lg">
              <InputWithLabel
                label="Commit hash"
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
                label="Subdirectory of repository"
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
              <PrimaryButton disabled={true}>Update version</PrimaryButton>
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
                "If you update your computer's operating system, you may experience improved performance, new features, or bug fixes. However, some older software or hardware may not be compatible with the new update, leading to potential issues or the need for updates to those as well."
              }
            </Paragraph>
          </Box>
        </FlexBox>
      </FlexBox>
    </AuthenticatedLayout>
  );
};

export default UpdatePlugin;
