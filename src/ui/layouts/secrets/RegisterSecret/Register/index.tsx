import React, { useState } from 'react';
import {
  Box,
  FlexBox,
  PrimaryButton,
  FormTextField,
  FormDropdownField,
  FullWidthSpinner,
} from '../../../../components';
import Selector from '../../Selector/Selector';
// import { callActionForStacksForPagination } from '../../Stacks/useService';
import axios from 'axios';
import { useDispatch, useHistory, useSelector } from '../../../../hooks';
import { showToasterAction } from '../../../../../redux/actions';
import { toasterTypes } from '../../../../../constants';
import { routePaths } from '../../../../../routes/routePaths';
import {
  sessionSelectors,
  userSelectors,
  workspaceSelectors,
} from '../../../../../redux/selectors';

interface Props {}

export const Register: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);
  const user = useSelector(userSelectors.myUser);
  const authToken = useSelector(sessionSelectors.authenticationToken);
  const workspaces = useSelector(workspaceSelectors.myWorkspaces);
  const [secretName, setSecretName] = useState('');
  const [scope, setScope] = useState<any>();
  const [inputFields, setInputFields] = useState([]);
  const [loading, setLoading] = useState(false);

  const dropdownOptions = [
    { value: 'user', label: 'User' },
    { value: 'workspace', label: 'Workspace' },
  ];

  const handleInputFieldChange = (inputFields: any) => {
    setInputFields(inputFields);
  };
  const onSubmit = async () => {
    if (!secretName) {
      return dispatch(
        showToasterAction({
          description: 'Name cannot be Empty.',
          type: toasterTypes.failure,
        }),
      );
    }
    const { id }: any = workspaces.find(
      (item) => item.name === selectedWorkspace,
    );

    const finalValues: any = inputFields.reduce((acc, { key, value }) => {
      acc[key] = value;
      return acc;
    }, {});

    for (const [key, value] of Object.entries(finalValues)) {
      // console.log(`${key}: ${value}`);

      if (!key && value) {
        return dispatch(
          showToasterAction({
            description: 'Key cannot be Empty.',
            type: toasterTypes.failure,
          }),
        );
      }
      if (!key && !value) {
        return dispatch(
          showToasterAction({
            description: 'Key and value cannot be Empty.',
            type: toasterTypes.failure,
          }),
        );
      }
      if (!value && key) {
        return dispatch(
          showToasterAction({
            description: 'Value cannot be Empty.',
            type: toasterTypes.failure,
          }),
        );
      }
    }
    // }

    const body = {
      user: user?.id,
      workspace: id,
      name: secretName,
      scope: scope,
      values: finalValues,
      // is_shared: isShared,
      // name: componentName,
      // type: flavor.type,
      // flavor: flavor.name,
      // configuration: { ...inputData, ...final },
    };

    await axios
      .post(
        `${process.env.REACT_APP_BASE_API_URL}/workspaces/${selectedWorkspace}/secrets`,
        // @ts-ignore
        { ...body },
        { headers: { Authorization: `Bearer ${authToken}` } },
      )
      .then((response) => {
        const id = response.data.id;
        setLoading(false);
        dispatch(
          showToasterAction({
            description: 'Secret has been created successfully',
            type: toasterTypes.success,
          }),
        );

        history.push(routePaths.secret.configuration(id, selectedWorkspace));
      })
      .catch((err) => {
        setLoading(false);
        if (err?.response?.status === 403) {
          dispatch(
            showToasterAction({
              description: err?.response?.data?.detail,
              type: toasterTypes.failure,
            }),
          );
        } else if (err?.response?.status === 409) {
          dispatch(
            showToasterAction({
              description: err?.response?.data?.detail[0].includes('Exists')
                ? `Secret name already exists.`
                : err?.response?.data?.detail[0],
              type: toasterTypes.failure,
            }),
          );
        } else {
          dispatch(
            showToasterAction({
              description: err?.response?.data?.detail[0].includes('Exists')
                ? `Secret name already exists.`
                : err?.response?.data?.detail[0],
              type: toasterTypes.failure,
            }),
          );
        }
      });
  };
  if (loading) {
    return <FullWidthSpinner color="black" size="md" />;
  }
  return (
    <>
      <FlexBox.Row flexDirection="column">
        <Box style={{ width: '329px' }}>
          <FormTextField
            label={'Secret name'}
            labelColor="rgba(66, 66, 64, 0.5)"
            placeholder={'Ex.John Doe'}
            value={secretName}
            onChange={(val: string) => setSecretName(val)}
          />
        </Box>
        <Box marginTop="lg" style={{ width: '329px' }}>
          <FormDropdownField
            label={'Scope'}
            labelColor="rgba(66, 66, 64, 0.5)"
            placeholder={'Choose a scope'}
            value={scope}
            onChange={(val: string) => setScope(val)}
            options={dropdownOptions as any}
            style={{ paddingLeft: '10px' }}
          />
        </Box>
        <Box marginTop="sm">
          <Selector onSetInputFields={handleInputFieldChange} />
        </Box>
      </FlexBox.Row>

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
            onClick={
              () => onSubmit()
              // history.push(
              //   routePaths.secrets.registerSecrets(selectedWorkspace),
              // )
            }
          >
            Register Secret
          </PrimaryButton>
        </Box>
      </FlexBox>
    </>
  );
};
