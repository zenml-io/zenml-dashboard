import React, { useState } from 'react';
import moment from 'moment';

import {
  Box,
  FlexBox,
  PrimaryButton,
  H2,
  Paragraph,
  icons,
  TagsInputField,
  CheckboxInput,
  ValidatedTextField,
} from '../../../components';
import { AuthenticatedLayout } from '../../common/layouts/AuthenticatedLayout';
import { routePaths } from '../../../../routes/routePaths';
import { useSelector } from '../../../hooks';
import { workspaceSelectors } from '../../../../redux/selectors';
import { getTranslateByScope } from '../../../../services';
import { DEFAULT_WORKSPACE_NAME, iconColors } from '../../../../constants';

export const translate = getTranslateByScope('ui.layouts.Plugins.create');

const todayFormatted = moment().format('dddd, DD MMM yyyy');

const CreatePlugin: React.FC = () => {
  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);

  const [packageName, setPackageName] = useState('');
  const [repositoryUrl, setRepositoryUrl] = useState('');
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
            selectedWorkspace ? selectedWorkspace : DEFAULT_WORKSPACE_NAME,
          ),
        },
        {
          name: 'Create plugin',
          clickable: true,
          to: routePaths.plugins.create(
            selectedWorkspace ? selectedWorkspace : DEFAULT_WORKSPACE_NAME,
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
                  status={{ status: 'success' }}
                />
              </Box>

              <ValidatedTextField
                label="Repository URL"
                value={repositoryUrl}
                onChange={setRepositoryUrl}
                status={{ status: 'error', message: 'Invalid URL' }}
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

            <FlexBox justifyContent="flex-end">
              <PrimaryButton disabled={true}>Contribute</PrimaryButton>
            </FlexBox>
          </Box>
        </FlexBox>
      </FlexBox>
    </AuthenticatedLayout>
  );
};

export default CreatePlugin;
