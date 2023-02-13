import React, { useEffect, useState } from 'react';
import { Box, EditField, FlexBox, Paragraph } from '../../../../components';
import styles from './index.module.scss';
import {
  Form,
  SubmitButton,
  TextField,
  ToggleField,
} from '../../../common/FormElement';
import { useDispatch, useHistory, useSelector } from '../../../../hooks';
import {
  sessionSelectors,
  userSelectors,
  workspaceSelectors,
} from '../../../../../redux/selectors';
import { showToasterAction } from '../../../../../redux/actions';
import { toasterTypes } from '../../../../../constants';
import axios from 'axios';
import { routePaths } from '../../../../../routes/routePaths';
export const CreateComponent: React.FC<{ flavor: any }> = ({ flavor }) => {
  const authToken = useSelector(sessionSelectors.authenticationToken);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);
  const [validationSchema, setValidationSchema] = useState({});
  const user = useSelector(userSelectors.myUser);
  const workspaces = useSelector(workspaceSelectors.myWorkspaces);
  const [componentName, setComponentName] = useState('');
  const [inputData, setInputData] = useState({});
  const history = useHistory();
  useEffect(() => {
    initForm(flavor.configSchema.properties);
  }, []);

  const initForm = (properties: any) => {
    let _formData: any = {};

    for (var key of Object.keys(properties)) {
      _formData[key] = '' as any;
    }

    setFormData(_formData);
  };

  const getFormElement = (elementName: any, elementSchema: any) => {
    console.log(flavor.configSchema, 'elementSchemaelementSchemaelementSchema');
    const props = {
      name: elementName,
      label: elementSchema.title,
      default: elementSchema.default as any,
      //   options: elementSchema.type,
    };

    if (elementSchema.type !== 'boolean' && elementSchema.title) {
      return (
        <TextField
          {...props}
          onHandleChange={(key: any, value: any) =>
            setInputData({ ...inputData, [key]: value })
          }
        />
      );
    }
    if (elementSchema.type === 'boolean' && elementSchema.title) {
      return (
        <ToggleField
          {...props}
          onHandleChange={(key: any, value: any) =>
            setInputData({ ...inputData, [key]: value })
          }
        />
      );
    }
  };

  const onSubmit = async (values: any) => {
    if (!componentName) {
      dispatch(
        showToasterAction({
          description: 'Required Field is Empty',
          type: toasterTypes.failure,
        }),
      );
      return false;
    }
    const { id }: any = workspaces.find(
      (item) => item.name === selectedWorkspace,
    );
    const body = {
      user: user?.id,
      workspace: id,
      is_shared: false,
      name: componentName,
      type: flavor.type,
      flavor: flavor.name,
      configuration: { ...inputData },
    };
    await axios
      .post(
        `${process.env.REACT_APP_BASE_API_URL}/workspaces/${selectedWorkspace}/components`,
        // @ts-ignore
        { ...body },
        { headers: { Authorization: `Bearer ${authToken}` } },
      )
      .then(() => {
        dispatch(
          showToasterAction({
            description: 'Component has been created successfully',
            type: toasterTypes.success,
          }),
        );
        history.push(routePaths.stacks.list(selectedWorkspace));
      })
      .catch((err) => {
        dispatch(
          showToasterAction({
            description: err?.response?.data?.detail[0],
            type: toasterTypes.failure,
          }),
        );
      });

    // dispatch(
    //   showToasterAction({
    //     description: 'User Updated',
    //     type: toasterTypes.success,
    //   }),
    // );
  };
  return (
    <div className="App">
      <EditField
        onChangeText={(e: any) => {
          setComponentName(e);
        }}
        label={'Component Name'}
        optional={false}
        value={componentName}
        hasError={false}
        // {...rest}
        // className={styles.field}
      />
      <Form
        enableReinitialize
        initialValues={formData}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {Object.keys(flavor.configSchema.properties).map((key, ind) => (
          <div key={key}>
            {getFormElement(key, flavor.configSchema.properties[key])}
          </div>
        ))}
        <SubmitButton title="Submit" onClick={onSubmit} />
      </Form>
    </div>
    // <FlexBox.Column fullWidth marginTop="xl">
    //   <Box style={{ width: '40%' }}>
    //     <Box>
    //       <EditField
    //         onChangeText={() => {}}
    //         label="Component Name"
    //         optional={false}
    //         value=""
    //         placeholder=""
    //         hasError={false}
    //         className={styles.field}
    //       />
    //     </Box>
    //   </Box>
    //   {/* <Box style={{ marginLeft: 'auto' }} marginRight='lg' ><PrimaryButton>Register Component</PrimaryButton></Box> */}
    // </FlexBox.Column>
  );
};
