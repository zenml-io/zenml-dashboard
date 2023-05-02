import React, { useEffect, useState } from 'react';
import {
  Box,
  FlexBox,
  FormTextField,
  FormDropdownField,
  FullWidthSpinner,
  // MakeSecretField,
  // MakeSecretField,
} from '../../../../components';
import Selector from '../../Selector/Selector';
// import { callActionForStacksForPagination } from '../../Stacks/useService';
import axios from 'axios';
import {
  useDispatch,
  useHistory,
  // useLocation,
  useSelector,
} from '../../../../hooks';
import { showToasterAction } from '../../../../../redux/actions';
import { toasterTypes } from '../../../../../constants';
import { routePaths } from '../../../../../routes/routePaths';
import {
  sessionSelectors,
  userSelectors,
  workspaceSelectors,
} from '../../../../../redux/selectors';

interface Props {
  state?: any;
}

export const Register: React.FC<Props> = (state: any) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);
  const user = useSelector(userSelectors.myUser);
  const authToken = useSelector(sessionSelectors.authenticationToken);
  const workspaces = useSelector(workspaceSelectors.myWorkspaces);
  const [secretName, setSecretName] = useState('');
  const [scope, setScope] = useState<any>('workspace');

  const [loading, setLoading] = useState(false);
  // const [routeState, setRouteState] = useState(location);
  useEffect(() => {
    function generateRandomString(length: number) {
      let result = '';
      const characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      for (let i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * characters.length),
        );
      }
      return result;
    }
    if (
      state?.state?.routeFromComponent ||
      state?.state?.routeFromEditComponent
    ) {
      const randomString = generateRandomString(6);

      setSecretName(state?.state?.flavor + '_' + randomString);
    }
  }, [state]);

  // debugger;
  const dropdownOptions = [
    { value: 'user', label: 'user' },
    { value: 'workspace', label: 'workspace' },
  ];

  const handleInputFieldChange = (inputFields: any) => {
    // setInputFields(inputFields);
  };
  const onSubmit = async (inputFields: any) => {
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

    // const finalValues: any = inputFields.reduce((acc, { key, value }) => {
    //   acc[key] = value;
    //   return acc;
    // }, {});

    const finalValues = inputFields.reduce((acc: any, { key, value }: any) => {
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
    }, {});

    // const finalValues: any = {};

    // for (let i = 0; i < inputFields.length; i++) {
    //   const key = Object.keys(inputFields[i])[0];
    //   if (finalValues.hasOwnProperty(key)) {
    //     debugger;
    //     dispatch(
    //       showToasterAction({
    //         description: 'Key already exists.',
    //         type: toasterTypes.failure,
    //       }),
    //     );
    //     return {}; // or break; if you want to stop the loop
    //   }
    //   finalValues[key] = inputFields[i][key];
    // }

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
      // if (!key && !value) {
      //   return dispatch(
      //     showToasterAction({
      //       description: 'Key and value cannot be Empty.',
      //       type: toasterTypes.failure,
      //     }),
      //   );
      // }
      // if (!value && key) {
      //   return dispatch(
      //     showToasterAction({
      //       description: 'Value cannot be Empty.',
      //       type: toasterTypes.failure,
      //     }),
      //   );
      // }
    }
    // }
    // debugger;
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

        if (state?.state?.routeFromComponent) {
          const updatedRouteState = {
            ...state,
          };
          updatedRouteState.state.inputData[
            state.state.secretKey
          ] = `{{ ${secretName}.${inputFields[0].key} }}`;
          updatedRouteState.state.secretId = id;
          history.push(state.state.pathName, updatedRouteState);
        } else if (state?.state?.routeFromEditComponent) {
          const updatedRouteState = {
            ...state,
          };
          updatedRouteState.state.mappedConfiguration[
            state.state.secretKey
          ] = `{{ ${secretName}.${inputFields[0].key} }}`;

          updatedRouteState.state.secretId = id;
          history.push(state.state.pathName, updatedRouteState);
        } else {
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
      <FlexBox.Row flexDirection="column" marginLeft="xl">
        {/* <Box>
          <MakeSecretField
            label={'Item 3 (Secret)'}
            labelColor="rgba(66, 66, 64, 0.5)"
            placeholder={'Random Text'}
            value={secretName}
            onChange={(val: string) => setSecretName(val)}
            secretOnChange={(val: string) => setSecretName(val)}
            tooltipText='Start typing with "{{" to reference a secret for this field.'
            dropdownOptions={[
              { label: '{{ mlZen.https.azxsggej }}' },
              { label: '{{ mlChen.https.azxsggej }}' },
              { label: 'Example' },
            ]}
          />
        </Box> */}

        <Box style={{ width: '30vw' }}>
          <FormTextField
            required={true}
            label={'Secret name'}
            labelColor="rgba(66, 66, 64, 0.5)"
            placeholder={'Ex.John Doe'}
            value={secretName}
            onChange={(val: string) => setSecretName(val)}
          />
        </Box>
        <Box marginTop="lg" style={{ width: '30vw' }}>
          <FormDropdownField
            label={'Scope'}
            labelColor="rgba(66, 66, 64, 0.5)"
            placeholder={''}
            value={scope}
            onChange={(val: string) => setScope(val)}
            options={dropdownOptions as any}
            style={{ paddingLeft: '10px' }}
          />
        </Box>
        <Box marginTop="sm">
          <Selector
            onSubmit={(inputFields: any) => onSubmit(inputFields)}
            routeState={state}
            onSetInputFields={handleInputFieldChange}
          />
        </Box>
      </FlexBox.Row>

      {/* <FlexBox
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
      </FlexBox> */}
    </>
  );
};
