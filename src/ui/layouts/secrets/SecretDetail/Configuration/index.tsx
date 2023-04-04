import React from 'react';

// import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// import { okaidia } from 'react-syntax-highlighter/dist/esm/styles/prism';
import {
  FlexBox,
  Box,
  FormTextField,
  FormDropdownField,
  PrimaryButton,
  // H4,
  // GhostButton,
  // icons,
  // Row,
  // FullWidthSpinner,
  // Container,
  // EditField,
  // Paragraph,
} from '../../../../components';
import SelectorDisabled from '../../Selector/SelectorDisabled';
// import { iconColors, iconSizes } from '../../../../../constants';

// import { useDispatch } from '../../../../hooks';
// import { showToasterAction } from '../../../../../redux/actions';
// import { toasterTypes } from '../../../../../constants';

// import { translate } from '../translate';

// import styles from './index.module.scss';
import { useService } from './useService';
import { routePaths } from '../../../../../routes/routePaths';
import { useHistory, useSelector } from '../../../../hooks';
import { workspaceSelectors } from '../../../../../redux/selectors';
// import { StackBox } from '../../../common/StackBox';
// import { SidePopup } from '../../RegisterSecret/ListForAll/SidePopup';
// import { NonEditableConfig } from '../../../NonEditableConfig';
// import {
//   useDispatch,
//   // useHistory,
//   // useLocation,
//   useSelector,
// } from '../../../../hooks';
// import {
//   sessionSelectors,
//   userSelectors,
//   workspaceSelectors,
// } from '../../../../../redux/selectors';
// import {
//   showToasterAction,
//   stackComponentsActions,
//   secretsActions,
// } from '../../../../../redux/actions';
// import { toasterTypes } from '../../../../../constants';
// import axios from 'axios';
// import { routePaths } from '../../../../../routes/routePaths';
// import { ToggleField } from '../../../common/FormElement';
// import { SidePopup } from '../../../common/SidePopup';

export const Configuration: React.FC<{
  secretId: TId;
  tiles?: any;
  fetching?: boolean;
}> = ({ secretId }) => {
  // const dispatch = useDispatch();
  const { secret } = useService({ secretId });
  const history = useHistory();
  // const user = useSelector(userSelectors.myUser);
  // const authToken = useSelector(sessionSelectors.authenticationToken);
  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);
  // const workspaces = useSelector(workspaceSelectors.myWorkspaces);
  // const [loading, setLoading] = useState(false);
  // const dispatch = useDispatch();
  console.log(secret, 'asdasd123');
  // const inputFields = [{ key: '', value: '' }] as any;

  // const handleCopy = () => {
  //   navigator.clipboard.writeText(stackConfig);
  //   dispatch(
  //     showToasterAction({
  //       description: 'Config copied to clipboard',
  //       type: toasterTypes.success,
  //     }),
  //   );
  // };

  // if (fetching) {
  //   return <FullWidthSpinner color="black" size="md" />;
  // }
  // if (loading) {
  //   return <FullWidthSpinner color="black" size="md" />;
  // }
  // const onCallApi = (name?: string, toggle?: boolean) => {
  //   // ;
  //   const { id }: any = workspaces.find(
  //     (item) => item.name === selectedWorkspace,
  //   );

  //   const body = {
  //     user: user?.id,
  //     workspace: id,
  //     is_shared: toggle,
  //     name: name,
  //   };
  //   setLoading(true);
  //   axios
  //     .put(
  //       `${process.env.REACT_APP_BASE_API_URL}/stacks/${secretId}`,
  //       // @ts-ignore
  //       body,
  //       { headers: { Authorization: `Bearer ${authToken}` } },
  //     )
  //     .then((response: any) => {
  //       // const id = response.data.id;

  //       // setLoading(false);
  //       dispatch(
  //         showToasterAction({
  //           description: 'Stack has been updated successfully.',
  //           type: toasterTypes.success,
  //         }),
  //       );

  //       dispatch(
  //         secretsActions.secretForId({
  //           secretId: secretId,
  //           onSuccess: () => setLoading(false),
  //           onFailure: () => setLoading(false),
  //         }),
  //       );
  //     })
  //     .catch((err) => {
  //       setLoading(false);
  //       // ;

  //       dispatch(
  //         showToasterAction({
  //           description: err?.response?.data?.detail[0],
  //           type: toasterTypes.failure,
  //         }),
  //       );
  //     });
  // };

  // const onPressEnter = (event?: any, defaultValue?: any) => {
  //   if (event.key === 'Enter') {
  //     onCallApi(event.target.value);
  //   }
  // };
  // {Object.keys(mappedObject).map((key, ind) => (
  //   // <Col xs={6} key={ind}>
  //   <>{getFormElement(key, mappedObject[key])}</>
  //   // </Col>
  // ))}

  return (
    <FlexBox.Column marginLeft="xl">
      <Box marginTop="lg" style={{ width: '417px' }}>
        <FormTextField
          label={'Secret name'}
          labelColor="rgba(66, 66, 64, 0.5)"
          placeholder={'Ex.John Doe'}
          value={secret?.name}
          disabled
          onChange={() => {}}
        />
      </Box>
      <Box marginTop="lg" style={{ width: '417px' }}>
        <FormDropdownField
          label={'Scope'}
          labelColor="rgba(66, 66, 64, 0.5)"
          placeholder={'Choose a scope'}
          value={secret?.scope}
          onChange={() => {}}
          disabled
          options={[] as any}
          style={{ paddingLeft: '10px' }}
        />
      </Box>

      <Box marginTop="md">
        <SelectorDisabled inputFields={secret.values} />
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
          <PrimaryButton
            onClick={() =>
              history.push(
                routePaths.secret.updateSecret(secret.id, selectedWorkspace),
              )
            }
          >
            Update Secret
          </PrimaryButton>
        </Box>
      </FlexBox>
    </FlexBox.Column>
  );
};
