import React, { Fragment, useEffect, useState } from 'react';

import {
  Box,
  FlexBox,
  FormTextField,
  Paragraph,
  PrimaryButton,
} from '../../../../components';

import { Form, TextField, ToggleField } from '../../../common/FormElement';
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
import { SidePopup } from '../SidePopup';

export const CreateComponent: React.FC<{ flavor: any }> = ({ flavor }) => {
  const authToken = useSelector(sessionSelectors.authenticationToken);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);
  // const [validationSchema, setValidationSchema] = useState({});
  const user = useSelector(userSelectors.myUser);
  const workspaces = useSelector(workspaceSelectors.myWorkspaces);
  const [componentName, setComponentName] = useState('');
  const [isShared, setIsShared] = useState(false);
  const [inputData, setInputData] = useState({}) as any;
  const [inputFields, setInputFields] = useState([
    { key: '', value: '' },
  ]) as any;
  const history = useHistory();
  useEffect(() => {
    let setDefaultData = {};
    initForm(flavor.configSchema.properties);
    Object.keys(flavor.configSchema.properties).map((key, ind) => {
      const data = flavor.configSchema.properties[key];
      if (data.default && (data.type === 'string' || data.type === 'integer'))
        setDefaultData = {
          ...setDefaultData,
          [toSnakeCase(data.title)]: data.default,
        };
    });
    setInputData({ ...setDefaultData });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleAddFields = () => {
    const values = [...inputFields];
    values.push({ key: '', value: '' });
    setInputFields(values);
  };

  const handleRemoveFields = (index: any, label: any) => {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);

    const keys = values.map((object) => object.key);
    const value = values.map((object) => object.value);
    var result: any = {};
    keys.forEach((key: any, i: any) => (result[key] = value[i]));
    setInputData({ ...inputData, [label]: result });
  };
  const toSnakeCase = (str: any) =>
    str &&
    str
      .match(
        /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g,
      )
      .map((x: any) => x.toLowerCase())
      .join('_');

  const handleInputChange = (index: any, event: any, label: any, type: any) => {
    // debugger;

    const values = [...inputFields];
    if (type === 'key') {
      values[index].key = event;
    } else {
      values[index].value = event;
    }
    const keys = values.map((object) => object.key);
    const value = values.map((object) => object.value);
    var result: any = {};
    keys.forEach((key: any, i: any) => (result[key] = value[i]));

    if (event) {
      setInputData({
        ...inputData,
        [toSnakeCase(label)]: {
          ...result,
        },
      });
    }
  };

  const initForm = (properties: any) => {
    let _formData: any = {};

    for (var key of Object.keys(properties)) {
      _formData[key] = '' as any;
    }

    setFormData(_formData);
  };
  console.log(inputData, 'inputDatainputData');
  const getFormElement = (elementName: any, elementSchema: any) => {
    // if (elementSchema.default) {
    //   setInputData({
    //     ...inputData,
    //     [elementSchema.name]: elementSchema.default,
    //   });
    // }
    const props = {
      name: elementName,
      label: elementSchema.title,
      default: elementSchema.default as any,
      //   options: elementSchema.type,
    };

    if (elementSchema.type === 'object' && elementSchema.title) {
      return (
        <Box marginTop="md">
          <Paragraph size="body" style={{ color: '#000' }}>
            <label htmlFor="key">{props.label}</label>
          </Paragraph>

          <FlexBox.Row>
            {/* <form onSubmit={handleSubmit}> */}
            <div className="form-row">
              {inputFields.map((inputField: any, index: any) => (
                <Fragment key={`${inputField}~${index}`}>
                  <div className="form-group col-sm-6">
                    {/* <label htmlFor="key">Key</label> */}
                    <FormTextField
                      onChange={(event: any) =>
                        handleInputChange(index, event, props.label, 'key')
                      }
                      label={'Key'}
                      value={inputField[index]?.key}
                      placeholder={''}
                    />
                    {/* <input
                      type="text"
                      className="form-control"
                      id="key"
                      name="key"
                      value={inputField.key}
                      onChange={(event) =>
                        handleInputChange(index, event, props.label)
                      }
                    /> */}
                  </div>
                  <div className="form-group col-sm-4">
                    {/* <label htmlFor="value">Value</label> */}
                    <FormTextField
                      onChange={(event: any) =>
                        handleInputChange(index, event, props.label, 'value')
                      }
                      label={'Value'}
                      value={inputField[index]?.value}
                      placeholder={''}
                    />
                    {/* <input
                      type="text"
                      className="form-control"
                      id="value"
                      name="value"
                      value={inputField.value}
                      onChange={(event) =>
                        handleInputChange(index, event, props.label)
                      }
                    /> */}
                  </div>
                  <div className="form-group col-sm-2">
                    <button
                      className="btn btn-link"
                      type="button"
                      disabled={index === 0}
                      onClick={() =>
                        handleRemoveFields(index, toSnakeCase(props.label))
                      }
                    >
                      -
                    </button>
                    <button
                      className="btn btn-link"
                      type="button"
                      onClick={() => handleAddFields()}
                    >
                      +
                    </button>
                  </div>
                </Fragment>
              ))}
            </div>
            <div className="submit-button">
              {/* <button
              className="btn btn-primary mr-2"
              type="submit"
              onSubmit={handleSubmit}
            >
              Save
            </button> */}
              {/* <button
              className="btn btn-secondary mr-2"
              type="reset"
              onClick={resetForm}
            >
              Reset Form
            </button> */}
            </div>
            <br />
            {/* </form> */}
          </FlexBox.Row>
        </Box>
      );
    }

    if (
      elementSchema.type === 'string' ||
      (elementSchema.type === 'integer' && elementSchema.title)
    ) {
      return (
        <TextField
          {...props}
          disable={
            elementSchema.default &&
            (elementSchema.type === 'string' ||
              elementSchema.type === 'integer')
          }
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
      is_shared: isShared,
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
    <FlexBox.Row style={{ width: '100%' }}>
      <Box style={{ width: '40%' }}>
        <FormTextField
          onChange={(e: any) => {
            setComponentName(e);
          }}
          placeholder="Component Name"
          label={'Component Name'}
          value={componentName}
        />
        <ToggleField
          label={'Share Component with public'}
          onHandleChange={
            (key: any, value: any) => setIsShared(value)
            // setInputData({ ...inputData, ['is_shared']: value })
          }
        />

        <Form
          enableReinitialize
          initialValues={formData}
          // validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {Object.keys(flavor.configSchema.properties).map((key, ind) => (
            <div key={key}>
              {getFormElement(key, flavor.configSchema.properties[key])}
            </div>
          ))}

          <PrimaryButton marginTop="md">Upload File</PrimaryButton>
        </Form>
      </Box>

      <SidePopup onClose={() => {}} flavor={flavor} action={onSubmit} />
    </FlexBox.Row>

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
