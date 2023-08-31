import React, { useEffect, useRef, useState } from 'react';

import {
  FlexBox,
  Box,
  FormTextField,
  FormDropdownField,
  PrimaryButton,
  FullWidthSpinner,
} from '../../../../components';
import axios from 'axios';
import Selector from '../../Selector/Selector';

import { useService } from './useService';
import { useDispatch, useHistory, useSelector } from '../../../../hooks';
import {
  sessionSelectors,
  userSelectors,
  workspaceSelectors,
} from '../../../../../redux/selectors';
import { showToasterAction } from '../../../../../redux/actions';
import { toasterTypes } from '../../../../../constants';
import { routePaths } from '../../../../../routes/routePaths';

export const UpdateConfig: React.FC<{
  secretId: TId;
  tiles?: any;
  fetching?: boolean;
  state?: any;
}> = ({ secretId, state }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);
  const user = useSelector(userSelectors.myUser);
  const authToken = useSelector(sessionSelectors.authenticationToken);
  const workspaces = useSelector(workspaceSelectors.myWorkspaces);
  const { secret } = useService({ secretId });
  const [secretName, setSecretName] = useState(secret?.name);
  const [scope, setScope] = useState(secret?.scope);
  const [inputFields, setInputFields] = useState([]) as any;
  const [loading, setLoading] = useState(false);
  const childStateRef = useRef(null);

  useEffect(() => {
    setInputFields(childStateRef.current as any);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [childStateRef]);
  const valuesIntoArray = Object.entries(secret?.values || {}).map(
    ([key, value]) => ({
      key,
      value,
    }),
  );

  if (state?.state?.secretId) {
    valuesIntoArray.push({
      key: state?.state?.secretKey,
      value: state?.state?.inputData
        ? state?.state?.inputData[state?.state?.secretKey]
        : state?.state?.mappedConfiguration[state?.state?.secretKey],
    });
  }

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

    const finalValues = inputFields.reduce(
      (
        acc: { [x: string]: any; hasOwnProperty: (arg0: any) => any },
        { key, value }: any,
      ) => {
        if (acc.hasOwnProperty(key)) {
          dispatch(
            showToasterAction({
              description: 'Key already exists.',
              type: toasterTypes.failure,
            }),
          );
          return {};
        }
        acc[key] = value;
        return acc;
      },
      {},
    );

    if (Object.keys(finalValues).length !== inputFields.length) {
      return false;
    }

    for (const [key, value] of Object.entries(finalValues)) {
      if (!key && value) {
        return dispatch(
          showToasterAction({
            description: 'Key cannot be Empty.',
            type: toasterTypes.failure,
          }),
        );
      }
      if (!key) {
        return dispatch(
          showToasterAction({
            description: 'Key cannot be Empty.',
            type: toasterTypes.failure,
          }),
        );
      }
    }

    const body = {
      user: user?.id,
      workspace: id,
      name: secretName,
      scope: scope,
      values: finalValues,
    };

    await axios
      .put(
        `${process.env.REACT_APP_BASE_API_URL}/secrets/${secretId}`,
        // @ts-ignore
        body,
        { headers: { Authorization: `Bearer ${authToken}` } },
      )
      .then((response) => {
        const id = response.data.id;
        setLoading(false);
        if (state?.state?.secretId) {
          dispatch(
            showToasterAction({
              description: 'Secret has been updated successfully',
              type: toasterTypes.success,
            }),
          );
          const updatedRouteState = {
            ...state,
          };
          updatedRouteState.state.inputData
            ? (updatedRouteState.state.inputData[
                state.state.secretKey
              ] = `{{ ${secretName}.${
                inputFields[inputFields.length - 1]?.key
              } }}`)
            : (updatedRouteState.state.mappedConfiguration[
                state.state.secretKey
              ] = `{{ ${secretName}.${
                inputFields[inputFields.length - 1]?.key
              } }}`);

          history.push(state.state.pathName, updatedRouteState);
        } else {
          dispatch(
            showToasterAction({
              description: 'Secret has been updated successfully',
              type: toasterTypes.success,
            }),
          );
          history.push(routePaths.secret.configuration(id, selectedWorkspace));
        }
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
              description: err?.response?.data?.detail[0],
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
    <FlexBox.Column marginLeft="xl">
      <Box marginTop="lg" style={{ width: '30vw' }}>
        <FormTextField
          label={'Secret name'}
          labelColor="rgba(66, 66, 64, 0.5)"
          placeholder={'unique_secret_name'}
          value={secretName}
          onChange={(value: any) => {
            setSecretName(value);
          }}
        />
      </Box>
      <Box marginTop="lg" style={{ width: '30vw' }}>
        <FormDropdownField
          label={'Scope'}
          labelColor="rgba(66, 66, 64, 0.5)"
          placeholder={'Choose a scope'}
          value={scope as any}
          onChange={(value: any) => {
            setScope(value);
          }}
          options={[{ label: 'user' }, { label: 'workspace' }]}
          style={{ paddingLeft: '10px' }}
        />
      </Box>

      <Box marginTop="md">
        <Selector
          childStateRef={childStateRef}
          routeState={state}
          values={valuesIntoArray}
          onSetInputFields={handleInputFieldChange}
        />
      </Box>

      <FlexBox
        style={{
          position: 'fixed',
          right: '0',
          bottom: '0',
          marginRight: '45px',
        }}
      >
        <Box marginBottom="lg">
          <PrimaryButton onClick={() => onSubmit()} style={{ width: '179px' }}>
            Save Changes
          </PrimaryButton>
        </Box>
      </FlexBox>
    </FlexBox.Column>
  );
};
