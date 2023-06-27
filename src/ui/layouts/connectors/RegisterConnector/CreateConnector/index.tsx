import React, {
  Fragment,
  useEffect,
  useRef,
  // Fragment, useEffect,
  useState,
} from 'react';
import styles from './index.module.scss';
import {
  Box,
  Container,
  FlexBox,
  FormDropdownField,
  FormPasswordFieldVerify,
  FormTextField,
  // FlexBox,
  // FormDropdownField,
  // FormTextField,
  FullWidthSpinner,
  Paragraph,
  icons,
  // MakeSecretField,
  // H2,
  // Paragraph,
  // icons,
} from '../../../../components';
import ServicesSelectorComponent from '../../ServicesSelectorComponent';

// import Select from 'react-select';
import { ToggleField } from '../../../common/FormElement';

// import { iconColors } from '../../../../../constants';
import { SidePopup } from '../SidePopup';
import {
  useSelector,
  useDispatch,
  useHistory,
  // useLocation,
} from '../../../../hooks';
import {
  sessionSelectors,
  userSelectors,
  workspaceSelectors,
} from '../../../../../redux/selectors';
// import { SidePopup } from '../SidePopup';
// import {
//   secretSelectors,
//   sessionSelectors,
//   userSelectors,
//   workspaceSelectors,
// } from '../../../../../redux/selectors';
import {
  // secretsActions,
  showToasterAction,
} from '../../../../../redux/actions';
import { iconColors, toasterTypes } from '../../../../../constants';
import axios from 'axios';
import { routePaths } from '../../../../../routes/routePaths';
// import { SidePopup } from '../SidePopup';
// import { callActionForStackComponentsForPagination } from '../../Stacks/useService';
// import { titleCase } from '../../../../../utils';
// import { values } from 'lodash';
// import { keys } from 'lodash';

export const CreateConnector: React.FC<{ connectorType: any; state: any }> = ({
  connectorType,
  state,
}) => {
  // const {
  //   dispatchStackComponentsData,
  // } = callActionForStackComponentsForPagination();
  // const location = useLocation();
  const authToken = useSelector(sessionSelectors.authenticationToken);
  const dispatch = useDispatch();
  // const [
  //   formData,
  //    setFormData
  // ] = useState({});
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);
  // const secrets = useSelector(secretSelectors.mySecrets);
  // const [validationSchema, setValidationSchema] = useState({});
  const user = useSelector(userSelectors.myUser);
  const workspaces = useSelector(workspaceSelectors.myWorkspaces);
  const [connectorName, setConnectorName] = useState('');
  const [isShared, setIsShared] = useState(true);
  const [description, setDescription] = useState('');
  const [disableToCreate, setDisableToCreate] = useState(false);

  const [selectedAuthMethod, setSelectedAuthMethod] = useState<any>(
    connectorType.authMethods[0].auth_method,
  );
  const [authMethoddropdownOptions, setAuthMethoddropdownOptions] = useState(
    [],
  );
  const [mappedConfiguration, setMappedConfiguration] = useState() as any;
  const [
    tempMappedConfiguration,
    setTempMappedConfiguration,
  ] = useState() as any;
  const [inputFields, setInputFields] = useState([]) as any;
  const [connectorExpirationSeconds, setConnectorExpirationSeconds] = useState(
    0,
  ) as any;
  const [resources, setResources] = useState<any>();
  // const [name, setName] = useState('');
  // const [selectMethods, setSelectMethods] = useState<any>([]);

  const [parent, setParent] = useState(false);
  const [resourceType, setResourceType] = useState('');
  const [ids, setIds] = useState('');
  const [labelsInputFields, setLabelsInputFields] = useState([
    { key: '', value: '' },
  ]) as any;
  const previousValuesRef = useRef<string>('');
  const inputRef = useRef<HTMLInputElement>(null) as any;

  // const [inputData, setInputData] = useState({}) as any;
  // const [inputFields, setInputFields] = useState() as any;
  // const [inputArrayFields, setInputArrayFields] = useState() as any;

  // const [
  //   // secretId,
  //   // setSecretId
  // ] = useState('');
  // const [secretIdArray, setSecretIdArray] = useState([]);
  const history = useHistory();

  const matchedAuthMethod = connectorType.authMethods.find(
    (item: any) => item?.auth_method === selectedAuthMethod,
  ) as any;

  useEffect(() => {
    const dropdownOptions = connectorType.authMethods.map((item: any) => {
      return {
        value: item.auth_method,
        label: item.name,
      };
    });

    setAuthMethoddropdownOptions(dropdownOptions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    const configurationModifiedObj: any = {};

    // Iterate over the properties of obj1
    for (let prop in matchedAuthMethod.config_schema.properties) {
      // Check if the property exists in obj2

      // If the property does not exist in obj2, copy it as is
      configurationModifiedObj[prop] = {
        ...matchedAuthMethod.config_schema.properties[prop],
        default:
          matchedAuthMethod.config_schema.properties[prop].type === 'array'
            ? ['']
            : matchedAuthMethod.config_schema.properties[prop].type === 'object'
            ? { key: '', value: '' }
            : matchedAuthMethod.config_schema.properties[prop].type ===
              'boolean'
            ? false
            : '',
      };
    }
    setConnectorExpirationSeconds(matchedAuthMethod.default_expiration_seconds);
    setMappedConfiguration(configurationModifiedObj);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedAuthMethod]);

  // useEffect(() => {
  //   if (state?.state?.routeFromComponent) {
  //     setIsShared(state?.state?.isShared);
  //     setInputFields(state?.state?.inputFields);
  //     setInputData(state?.state?.inputData);
  //     setComponentName(state?.state?.componentName);
  //     setSecretId(state?.state?.secretId);
  //     setSecretIdArray(state?.state?.secretIdArray);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [state]);
  // useEffect(() => {
  //   if (!state?.state?.routeFromComponent) {
  //     let setDefaultData = {};
  //     let setInputObjectType: any = [];
  //     let setInputArrayType: any = [];
  //     initForm(flavor.configSchema.properties);
  //     Object.keys(flavor.configSchema.properties).map((key, ind) => {
  //       const data = flavor.configSchema.properties[key];
  //       if (data.default && (data.type === 'string' || data.type === 'integer'))
  //         setDefaultData = {
  //           ...setDefaultData,
  //           [toSnakeCase(data.title)]: data.default,
  //         };
  //       else if (data.default && data.type === 'array') {
  //         setInputArrayType = {
  //           ...setInputArrayType,
  //           [toSnakeCase(data.title)]: [...data.default, ''],
  //         };
  //       } else if (
  //         flavor.configSchema.properties[key]?.additionalProperties &&
  //         flavor.configSchema.properties[key]?.additionalProperties?.type !==
  //           'string'
  //       ) {
  //         setDefaultData = {
  //           ...setDefaultData,
  //           [toSnakeCase(data.title)]: data.default,
  //         };
  //       }
  //       return null;
  //     });

  //     Object.keys(flavor.configSchema.properties).map((key, ind) => {
  //       const data = flavor.configSchema.properties[key];
  //       if (data.type === 'object') {
  //         if (
  //           flavor.configSchema.properties[key]?.additionalProperties &&
  //           flavor.configSchema.properties[key]?.additionalProperties?.type ===
  //             'string'
  //         ) {
  //           setInputObjectType.push({
  //             [key]: [{ key: '', value: '' }],
  //           });
  //         } else {
  //           setInputObjectType.push({
  //             [key]: [{ key: '', value: '' }],
  //           });
  //         }
  //       }
  //       return null;
  //     });
  //     setInputArrayFields(setInputArrayType);
  //     setInputFields(setInputObjectType);

  //     setInputData({ ...setDefaultData });
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
  // const handleAddFields = (name: any, index: any) => {
  //   const values = [...inputFields];
  //   // const check = values.find(({ name }) => name);
  //   // const targetObject = values.find((x) => x[name] !== undefined);

  //   // if (targetObject) {
  //   // }
  //   // debugger;
  //   values[index][name].push({ key: '', value: '' });

  //   setInputFields(values);
  // };

  // const handleRemoveFields = (parentIndex: any, childIndex: any, name: any) => {
  //   const values = [...inputFields];
  //   // debugger;
  //   values[parentIndex][name].splice(childIndex, 1);
  //   setInputFields(values);
  // };
  // const toSnakeCase = (str: any) =>
  //   str &&
  //   str
  //     .match(
  //       /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g,
  //     )
  //     .map((x: any) => x.toLowerCase())
  //     .join('_');

  // const secretOptions = secrets.map((item: any) => {
  //   return {
  //     label: `{{ ${item.name}.` as string,
  //     value: `{{ ${item.name}.` as string,
  //     id: item.id as string,
  //   };
  // }) as any;

  // const dropdownOptions = [
  //   { value: 'user', label: 'user' },
  //   { value: 'workspace', label: 'workspace' },
  // ];

  // function callActionForSecret(name: any, value: any, newEvent?: any) {
  //   setInputData({
  //     ...inputData,
  //     [name]: {
  //       value: value.value ? value.value : value,
  //       id: value?.id ? value?.id : '',
  //     },
  //   });

  //   // if (value === undefined) {
  //   //   return false;
  //   // }
  //   if (value?.id) {
  //     setSecretId(value?.id);
  //     const listOfIds: any = [...secretIdArray];
  //     listOfIds.push(value.id);
  //     setSecretIdArray(listOfIds);
  //   }

  //   if (value?.value?.includes('.') || value?.value?.id) {
  //     dispatch(
  //       secretsActions.secretForId({
  //         secretId: value?.id,
  //         onSuccess: (res) => {
  //           setSelectedSecret(res);
  //           const secretOptionsWithKeys = Object.keys(res.values)?.map(
  //             (item: any) => {
  //               return {
  //                 label: `{{ ${res?.name}.${item} }}` as string,
  //                 value: `{{ ${res?.name}.${item} }}` as string,
  //               };
  //             },
  //           ) as any;
  //           setSecretOptionsWithKeys(secretOptionsWithKeys);
  //         },
  //         // onFailure: () => setFetching(false),
  //       }),
  //     );
  //   } else if (value?.includes('{{')) {
  //     dispatch(
  //       secretsActions.getMy({
  //         size: 10,
  //         workspace: selectedWorkspace,
  //         name: 'contains:' + value.replace(/[{ }]/g, ''),
  //       }),
  //     );
  //   }
  // }

  // const handleInputChange = (
  //   parentIndex: any,
  //   childIndex: any,
  //   event: any,
  //   name: any,
  //   type: any,
  // ) => {
  //   const values = [...inputFields];
  //   if (type === 'key') {
  //     values[parentIndex][name][childIndex].key = event;
  //   } else {
  //     values[parentIndex][name][childIndex].value = event;
  //   }
  //   setInputFields(values);
  //   // const keys = values.map((object) => object.key);
  //   // const value = values.map((object) => object.value);

  //   // keys.forEach((key: any, i: any) => (result[key] = value[i]));

  //   // if (event) {
  //   //   setInputData({
  //   //     ...inputData,
  //   //     [name]: {
  //   //       ...values[parentIndex][name],
  //   //     },
  //   //   });
  //   // }
  // };

  // const initForm = (properties: any) => {
  //   let _formData: any = {};

  //   for (var key of Object.keys(properties)) {
  //     _formData[key] = '' as any;
  //   }

  //   setFormData(_formData);
  // };

  // const getFormElement = (elementName: any, elementSchema: any) => {
  //   const props = {
  //     name: elementName,
  //     label: elementSchema.title,
  //     default: elementSchema.default as any,
  //     sensitive: elementSchema.sensitive as boolean,
  //     additionalProperties: elementSchema?.additionalProperties?.type as any,
  //   };

  //   if (
  //     elementSchema.type === 'object' &&
  //     elementSchema.title &&
  //     (props.additionalProperties === undefined ||
  //       props.additionalProperties === 'string')
  //   ) {
  //     return (
  //       <Box marginTop="md">
  //         <Paragraph size="body" style={{ color: '#000' }}>
  //           <label htmlFor="key">{props.label}</label>
  //         </Paragraph>

  //         <FlexBox.Row style={{ position: 'relative' }}>
  //           <div
  //             style={{
  //               position: 'absolute',
  //               bottom: '-5px',
  //               width: '5px',
  //               height: '5px',
  //               borderRadius: '100%',
  //               backgroundColor: 'rgba(68, 62, 153, 0.3)',
  //             }}
  //           ></div>

  //           <div
  //             className="form-row"
  //             style={{
  //               borderLeft: '1px solid rgba(68, 62, 153, 0.3)',
  //               marginLeft: '2px',
  //             }}
  //           >
  //             {inputFields?.map((item: any, parentIndex: any) =>
  //               item[props.name]?.map((inputField: any, childIndex: any) => (
  //                 <Fragment key={`${inputField}~${childIndex}`}>
  //                   <Box
  //                     style={{ display: 'flex', alignItems: 'center' }}
  //                     marginTop="sm"
  //                   >
  //                     <div
  //                       style={{
  //                         marginTop: '30px',
  //                         width: '15px',
  //                         borderTop: '1px solid rgba(68, 62, 153, 0.3)',
  //                       }}
  //                     ></div>
  //                     <div
  //                       style={{
  //                         marginTop: '30px',
  //                         marginRight: '5px',
  //                         marginLeft: '-2px',
  //                         color: 'rgba(68, 62, 153, 0.3)',
  //                       }}
  //                     >
  //                       &#x27A4;
  //                     </div>

  //                     <Box
  //                       className="form-group"
  //                       marginRight="md"
  //                       style={{ width: '13.75vw' }}
  //                     >
  //                       <FormTextField
  //                         onChange={(event: any) =>
  //                           handleInputChange(
  //                             parentIndex,
  //                             childIndex,
  //                             event,
  //                             props.name,
  //                             'key',
  //                           )
  //                         }
  //                         label={'Key'}
  //                         value={inputField?.key}
  //                         placeholder={''}
  //                       />
  //                     </Box>

  //                     <Box className="form-group" style={{ width: '13.75vw' }}>
  //                       <FormTextField
  //                         onChange={(event: any) =>
  //                           handleInputChange(
  //                             parentIndex,
  //                             childIndex,
  //                             event,
  //                             props.name,
  //                             'value',
  //                           )
  //                         }
  //                         label={'Value'}
  //                         value={inputField?.value}
  //                         placeholder={''}
  //                       />
  //                     </Box>
  //                     <div
  //                       // className="col-sx-2 "
  //                       style={{
  //                         justifyContent: 'space-between',
  //                         display: 'flex',
  //                         marginTop: '20px',
  //                         marginLeft: '5px',
  //                       }}
  //                     >
  //                       <div
  //                         style={{
  //                           display: 'flex',
  //                           flexDirection: 'row',
  //                           justifyContent: 'space-between',
  //                           alignItems: 'center',
  //                         }}
  //                       >
  //                         {item[props.name].length > 1 && (
  //                           <button
  //                             className={styles.fieldButton}
  //                             style={{}}
  //                             type="button"
  //                             // disabled={item[props.name].length === 1}
  //                             onClick={() =>
  //                               handleRemoveFields(
  //                                 parentIndex,
  //                                 childIndex,
  //                                 props.name,
  //                               )
  //                             }
  //                           >
  //                             <icons.delete color={iconColors.grey} />
  //                           </button>
  //                         )}

  //                         {childIndex === item[props.name].length - 1 && (
  //                           <button
  //                             className={styles.fieldButton}
  //                             type="button"
  //                             onClick={() =>
  //                               handleAddFields(props.name, parentIndex)
  //                             }
  //                           >
  //                             <icons.addNew color={iconColors.primary} />
  //                           </button>
  //                         )}
  //                       </div>
  //                     </div>
  //                   </Box>
  //                 </Fragment>
  //               )),
  //             )}
  //             {/* {inputFields
  //               ?.filter((x: any) => x.hasOwnProperty(props.name))
  //               .map((inputField: any, index: any) => (

  //               ))} */}
  //           </div>
  //           <div className="submit-button"></div>
  //           <br />
  //         </FlexBox.Row>
  //       </Box>
  //     );
  //   }

  //   if (
  //     elementSchema.type === 'object' &&
  //     elementSchema.title &&
  //     props.additionalProperties !== 'string'
  //   ) {
  //     return (
  //       <>
  //         {' '}
  //         <Box marginTop="sm">
  //           <Paragraph size="body" style={{ color: '#000' }}>
  //             <label htmlFor="key">{props.label}</label>
  //           </Paragraph>
  //         </Box>
  //
  //         <FlexBox marginTop="sm" fullWidth>
  //           <textarea
  //             className={styles.textArea}
  //             defaultValue={JSON.stringify(inputData[props.name])}
  //             onBlur={(e) => {
  //               const jsonStr = e.target.value;
  //               try {
  //                 JSON.parse(jsonStr);
  //               } catch (e) {
  //                 dispatch(
  //                   showToasterAction({
  //                     description: 'Invalid JSON.',
  //                     type: toasterTypes.failure,
  //                   }),
  //                 );
  //               }
  //             }}
  //             onChange={(e) => {
  //               const jsonStr = e.target.value;
  //               try {
  //                 const jsonObj = JSON.parse(jsonStr);

  //                 setInputData({
  //                   ...inputData,
  //                   [props.name]: jsonObj,
  //                 });
  //               } catch (e) {}
  //             }}
  //           />
  //         </FlexBox>
  //       </>
  //     );
  //   }
  //   if (
  //     elementSchema.type === 'string' ||
  //     (elementSchema.type === 'integer' && elementSchema.title)
  //   ) {
  //     return (
  //       <>
  //         {props.sensitive ? (
  //           <Box marginTop="lg">
  //             {/* <MakeSecretField
  //               required={flavor?.configSchema?.required?.includes(elementName)}
  //               label={titleCase(props.name) + ' (Secret)'}
  //               placeholder={''}
  //               handleClick={() => {
  //                 if (secretId) {
  //                   const state = {
  //                     secretIdArray: secretIdArray,
  //                     secretId: secretId,
  //                     flavor: flavor.name,
  //                     routeFromComponent: true,
  //                     componentName: componentName,
  //                     isShared: isShared,
  //                     inputFields: inputFields,
  //                     inputData: inputData,
  //                     secretKey: props.name,
  //                     pathName: location.pathname,
  //                   };
  //                   history.push(
  //                     routePaths.secret.updateSecret(
  //                       secretId,
  //                       selectedWorkspace,
  //                     ),
  //                     state,
  //                   );
  //                 } else {
  //                   const state = {
  //                     secretId: secretId,
  //                     secretIdArray: secretIdArray,
  //                     flavor: flavor.name,
  //                     routeFromComponent: true,
  //                     componentName: componentName,
  //                     isShared: isShared,
  //                     inputFields: inputFields,
  //                     inputData: inputData,
  //                     secretKey: props.name,
  //                     pathName: location.pathname,
  //                   };
  //                   history.push(
  //                     routePaths.secrets.registerSecrets(selectedWorkspace),
  //                     state,
  //                   );
  //                 }
  //               }}
  //               inputData={inputData}
  //               value={
  //                 inputData[props.name]?.value
  //                   ? inputData[props.name]?.value
  //                   : // : inputData[props.name]
  //                   inputData[props.name]?.length
  //                   ? inputData[props.name]
  //                   : ''
  //               }
  //               onChange={(val: string, newEvent: any) => {
  //                 if (!val) {
  //                   if (secretIdArray.length === 1) {
  //                   } else {
  //                     setSecretId('');
  //                   }
  //                 }
  //                 if (val.includes('{{')) {
  //                   callActionForSecret(props.name, val, newEvent);
  //                 } else {
  //                   setInputData({
  //                     ...inputData,
  //                     [props.name]: val,
  //                   });
  //                 }
  //               }}
  //               secretOnChange={(val: any, newEvent: any) => {
  //                 // debugger;
  //                 // setInputData({
  //                 //   ...inputData,
  //                 //   [props.name]: val.value.includes('.') ? val.value : val,
  //                 // });

  //                 if (val?.value?.includes('}}')) {
  //                   setInputData({
  //                     ...inputData,
  //                     [props?.name]: val?.value?.includes('.')
  //                       ? val.value
  //                       : val,
  //                   });
  //                 } else if (val.value.includes('{{')) {
  //                   callActionForSecret(props.name, val, newEvent);
  //                 }
  //               }}
  //               dropdownOptions={
  //                 inputData[props?.name]?.value &&
  //                 inputData[props?.name]?.value.includes(
  //                   `${selectedSecret.name}.`,
  //                 )
  //                   ? secretOptionsWithKeys
  //                   : secretOptions
  //               }
  //               tooltipText='Start typing with "{{" to reference a secret for this field.'
  //             /> */}
  //           </Box>
  //         ) : (
  //           <TextField
  //             {...props}
  //             required={flavor?.configSchema?.required?.includes(elementName)}
  //             // disable={
  //             //   elementSchema.default &&
  //             //   (elementSchema.type === 'string' ||
  //             //     elementSchema.type === 'integer')
  //             // }
  //             default={
  //               inputData[props.name] ? inputData[props.name] : props.default
  //             }
  //             onHandleChange={(key: any, value: any) =>
  //               setInputData({ ...inputData, [key]: value })
  //             }
  //           />
  //         )}
  //       </>
  //     );
  //   }
  //   if (elementSchema.type === 'boolean' && elementSchema.title) {
  //     return (
  //       <Box marginTop="md">
  //         <ToggleField
  //           {...props}
  //           value={
  //             inputData[props.name] ? inputData[props.name] : props.default
  //           }
  //           onHandleChange={(event: any, value: any) => {
  //             // debugger;
  //             setInputData({
  //               ...inputData,
  //               [props.name]: !inputData[props.name],
  //             });
  //           }}
  //         />
  //       </Box>
  //     );
  //   }
  //   if (elementSchema.type === 'array' && elementSchema.title) {
  //     return (
  //       <Box marginTop="md">
  //         <Paragraph size="body" style={{ color: '#000' }}>
  //           <label htmlFor="key">{props.label}</label>
  //         </Paragraph>

  //         <FlexBox.Row style={{ position: 'relative' }}>
  //           <div
  //             style={{
  //               position: 'absolute',
  //               bottom: '-5px',
  //               width: '5px',
  //               height: '5px',
  //               borderRadius: '100%',
  //               backgroundColor: 'rgba(68, 62, 153, 0.3)',
  //             }}
  //           ></div>

  //           <div
  //             className="form-row"
  //             style={{
  //               borderLeft: '1px solid rgba(68, 62, 153, 0.3)',
  //               marginLeft: '2px',
  //             }}
  //           >
  //             {inputArrayFields &&
  //               inputArrayFields[props?.name]?.map((item: any, index: any) => (
  //                 <Fragment>
  //                   <Box
  //                     style={{ display: 'flex', alignItems: 'center' }}
  //                     marginTop="sm"
  //                   >
  //                     <div
  //                       style={{
  //                         marginTop: '30px',
  //                         width: '15px',
  //                         borderTop: '1px solid rgba(68, 62, 153, 0.3)',
  //                       }}
  //                     ></div>
  //                     <div
  //                       style={{
  //                         marginTop: '30px',
  //                         marginRight: '5px',
  //                         marginLeft: '-2px',
  //                         color: 'rgba(68, 62, 153, 0.3)',
  //                       }}
  //                     >
  //                       &#x27A4;
  //                     </div>

  //                     <Box
  //                       className="form-group"
  //                       marginRight="md"
  //                       style={{ width: '385px' }}
  //                     >
  //                       <FormTextField
  //                         onChange={
  //                           (event: any) => {
  //                             const values = { ...inputArrayFields };
  //                             values[props.name][index] = event;
  //                             setInputArrayFields(values);
  //                           }
  //                           // handleInputChange(
  //                           //   parentIndex,
  //                           //   childIndex,
  //                           //   event,
  //                           //   props.name,
  //                           //   'value',
  //                           // )
  //                         }
  //                         label={'Value'}
  //                         value={item}
  //                         placeholder={''}
  //                       />
  //                     </Box>
  //                     <div
  //                       // className="col-sx-2 "
  //                       style={{
  //                         justifyContent: 'space-between',
  //                         display: 'flex',
  //                         marginTop: '20px',
  //                         marginLeft: '-10px',
  //                       }}
  //                     >
  //                       {inputArrayFields[props.name].length > 1 && (
  //                         <button
  //                           className={styles.fieldButton}
  //                           style={{}}
  //                           type="button"
  //                           // disabled={item[props.name].length === 1}
  //                           onClick={() => {
  //                             const values = { ...inputArrayFields };
  //                             values[props.name].splice(index, 1);
  //                             setInputArrayFields(values);
  //                           }}
  //                         >
  //                           <icons.delete color={iconColors.grey} />
  //                         </button>
  //                       )}
  //                       {index === inputArrayFields[props.name].length - 1 && (
  //                         <button
  //                           className={styles.fieldButton}
  //                           type="button"
  //                           onClick={() => {
  //                             const values = { ...inputArrayFields };
  //                             values[props.name].push('');
  //                             setInputArrayFields(values);
  //                           }}
  //                         >
  //                           <icons.addNew color={iconColors.primary} />
  //                         </button>
  //                       )}
  //                     </div>
  //                   </Box>
  //                 </Fragment>
  //               ))}
  //             {/* {inputFields
  //             ?.filter((x: any) => x.hasOwnProperty(props.name))
  //             .map((inputField: any, index: any) => (

  //             ))} */}
  //           </div>
  //           <div className="submit-button"></div>
  //           <br />
  //         </FlexBox.Row>
  //       </Box>
  //     );
  //   }
  // };
  const onVerify = async () => {
    const { id }: any = workspaces.find(
      (item) => item.name === selectedWorkspace,
    );
    const configuration: any = {};

    for (const key in mappedConfiguration) {
      if (mappedConfiguration.hasOwnProperty(key)) {
        if (mappedConfiguration[key].default) {
          configuration[key] = mappedConfiguration[key].default;
        }
      }
    }

    if (matchedAuthMethod.config_schema.required) {
      for (const field of matchedAuthMethod.config_schema.required) {
        if (!configuration[field]) {
          dispatch(
            showToasterAction({
              description: 'Required Field is Empty',
              type: toasterTypes.failure,
            }),
          );
          return false;
        }
      }
    }

    const labels: any = {};

    labelsInputFields.forEach((item: any) => {
      if (item.key !== '' || item.value !== '') {
        labels[item.key] = item.value;
      }
    });

    for (var key in labels) {
      if (key === '') {
        dispatch(
          showToasterAction({
            description: 'Key cannot be Empty.',
            type: toasterTypes.failure,
          }),
        );
        return false;
      } else if (labels[key] === '') {
        dispatch(
          showToasterAction({
            description: 'Value cannot be Empty.',
            type: toasterTypes.failure,
          }),
        );
        return false;
      }
    }
    const body: any = {
      user: user?.id,
      workspace: id,
      is_shared: isShared,
      name: connectorName,
      description: description,
      connector_type: connectorType.connectorType,
      auth_method: selectedAuthMethod,
      // resource_types: resourceTypes,
      // resource_id: ids.length ? ids : null,
      // resource_types: [resourceType],

      configuration: {
        ...configuration,
      },

      // expiration_seconds: 43200,
      labels: labels,
      // name: componentName,
      // type: flavor.type,
      // flavor: flavor.name,
      // configuration: { ...inputData, ...final, ...inputArrayFields },
    };
    if (connectorExpirationSeconds !== null) {
      body.expiration_seconds = connectorExpirationSeconds;
    }
    setTempMappedConfiguration(mappedConfiguration);
    setVerifying(true);
    setDisableToCreate(false);
    await axios
      .post(
        `${process.env.REACT_APP_BASE_API_URL}/service_connectors/verify`,
        // @ts-ignore
        { ...body },
        { headers: { Authorization: `Bearer ${authToken}` } },
      )
      .then((response) => {
        setVerifying(false);
        if (response.data.error !== null) {
          dispatch(
            showToasterAction({
              description: response.data.error,
              type: toasterTypes.failure,
            }),
          );
        }
        if (response.data.error) {
          setDisableToCreate(true);
        }
        setResources(response.data);
        // setLoading(false);
        // dispatch(
        //   showToasterAction({
        //     description: 'Component has been created successfully',
        //     type: toasterTypes.success,
        //   }),
        // );
        // dispatchStackComponentsData(1, 1);
      })
      .catch((err) => {
        // debugger;
        if (err?.response?.data?.detail[1]) {
          dispatch(
            showToasterAction({
              description: err?.response?.data?.detail[1],
              type: toasterTypes.failure,
            }),
          );
        }
        setVerifying(false);
        setDisableToCreate(true);
        // if (err?.response?.status === 403) {
        //   dispatch(
        //     showToasterAction({
        //       description: err?.response?.data?.detail,
        //       type: toasterTypes.failure,
        //     }),
        //   );
        // } else if (err?.response?.status === 409) {
        //   dispatch(
        //     showToasterAction({
        //       description: err?.response?.data?.detail[0].includes('Exists')
        //         ? `Component name already exists.`
        //         : err?.response?.data?.detail[0],
        //       type: toasterTypes.failure,
        //     }),
        //   );
        // } else {
        //   dispatch(
        //     showToasterAction({
        //       description: err?.response?.data?.detail[0].includes('Exists')
        //         ? `Component name already exists.`
        //         : err?.response?.data?.detail[0],
        //       type: toasterTypes.failure,
        //     }),
        //   );
        // }
      });
  };
  const onSubmit = async (values: any) => {
    if (!connectorName) {
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
    // const resourceTypes = connectorType.resourceTypes.map(
    //   (item: any) => item.resource_type,
    // );

    const configuration: any = {};

    for (const key in mappedConfiguration) {
      if (mappedConfiguration.hasOwnProperty(key)) {
        if (mappedConfiguration[key].default) {
          configuration[key] = mappedConfiguration[key].default;
        }
      }
    }

    for (const field of matchedAuthMethod.config_schema.required) {
      if (!configuration[field]) {
        dispatch(
          showToasterAction({
            description: 'Required Field is Empty',
            type: toasterTypes.failure,
          }),
        );
        return false;
      }
    }

    const labels: any = {};

    labelsInputFields.forEach((item: any) => {
      if (item.key !== '' || item.value !== '') {
        labels[item.key] = item.value;
      }
    });

    for (var key in labels) {
      if (key === '') {
        dispatch(
          showToasterAction({
            description: 'Key cannot be Empty.',
            type: toasterTypes.failure,
          }),
        );
        return false;
      } else if (labels[key] === '') {
        dispatch(
          showToasterAction({
            description: 'Value cannot be Empty.',
            type: toasterTypes.failure,
          }),
        );
        return false;
      }
    }

    const body: any = {
      user: user?.id,
      workspace: id,
      is_shared: isShared,
      name: connectorName,
      description: description,
      connector_type: connectorType.connectorType,
      auth_method: selectedAuthMethod,
      // resource_types: resourceTypes,
      // resource_id: ids.length ? ids[0] : null,
      // resource_types: resourceType,

      configuration: {
        ...configuration,
      },

      // expiration_seconds: ,
      labels: labels,
      // name: componentName,
      // type: flavor.type,
      // flavor: flavor.name,
      // configuration: { ...inputData, ...final, ...inputArrayFields },
    };
    if (connectorExpirationSeconds !== null) {
      body.expiration_seconds = connectorExpirationSeconds;
    }
    if (resourceType) {
      body.resource_id = ids ? ids : null;
      body.resource_types = resourceType;
    }
    setLoading(true);
    await axios
      .post(
        `${process.env.REACT_APP_BASE_API_URL}/workspaces/${selectedWorkspace}/service_connectors`,
        // @ts-ignore
        { ...body },
        { headers: { Authorization: `Bearer ${authToken}` } },
      )
      .then((response) => {
        setLoading(false);
        // if (response.data.error !== null) {
        //   dispatch(
        //     showToasterAction({
        //       description: response.data.error,
        //       type: toasterTypes.failure,
        //     }),
        //   );
        // }
        // setResources(response.data);
        // setLoading(false);
        history.push(
          routePaths.connectors.configuration(
            response.data.id,
            selectedWorkspace,
          ),
        );
        // dispatch(
        //   showToasterAction({
        //     description: 'Component has been created successfully',
        //     type: toasterTypes.success,
        //   }),
        // );
        // dispatchStackComponentsData(1, 1);
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
                ? `Connector name already exists.`
                : err?.response?.data?.detail[0],
              type: toasterTypes.failure,
            }),
          );
        } else {
          dispatch(
            showToasterAction({
              description: err?.response?.data?.detail[0].includes('Exists')
                ? `Component name already exists.`
                : err?.response?.data?.detail[0],
              type: toasterTypes.failure,
            }),
          );
        }
      });
  };
  const titleCase = (s: any) =>
    s.replace(/^_*(.)|_+(.)/g, (s: any, c: string, d: string) =>
      c ? c.toUpperCase() : ' ' + d.toUpperCase(),
    );
  if (loading) {
    return <FullWidthSpinner color="black" size="md" />;
  }

  const getFormElement: any = (elementName: any, elementSchema: any) => {
    if (elementSchema.type === 'string') {
      return (
        <>
          {elementSchema?.format === 'password' ? (
            <Box marginTop="lg" style={{ width: '30vw', marginLeft: '-15px' }}>
              <FormPasswordFieldVerify
                inputRef={inputRef}
                required={matchedAuthMethod?.config_schema?.required?.includes(
                  elementName,
                )}
                onRemoveFocus={(e: any) => {
                  if (e.target.value) {
                    const currentValue = e.target.value;
                    const previousValues = previousValuesRef.current;
                    if (currentValue !== previousValues) {
                      matchedAuthMethod?.config_schema?.required?.includes(
                        elementName,
                      ) && onVerify();
                    }
                    previousValuesRef.current = currentValue;
                    // inputRef.current.value = currentValue;
                  }
                }}
                onHandleFocus={(e: any) => {
                  const currentValue = e.target.value;
                  previousValuesRef.current = currentValue;
                  // debugger;
                }}
                onChange={(e: any) => {
                  setDisableToCreate(false);
                  setMappedConfiguration((prevConfig: any) => ({
                    ...prevConfig, // Spread the previous user object
                    [elementName]: { ...prevConfig[elementName], default: e }, // Update the age property
                  }));
                  // setMappedConfiguration(...mappedConfiguration,
                  //   mappedConfiguration[elementName]: e,
                  // );
                }}
                placeholder=""
                label={titleCase(elementName)}
                value={mappedConfiguration[elementName].default}
                success={resources !== undefined && resources?.error === null}
                loading={verifying}
                error={{}}
              />
            </Box>
          ) : (
            <Box marginTop="lg" style={{ width: '30vw', marginLeft: '-15px' }}>
              <FormTextField
                required={matchedAuthMethod?.config_schema?.required?.includes(
                  elementName,
                )}
                onHandleFocus={(e: any) => {
                  const currentValue = e.target.value;
                  previousValuesRef.current = currentValue;
                  // debugger;
                }}
                onRemoveFocus={(e: any) => {
                  if (e.target.value) {
                    const currentValue = e.target.value;
                    const previousValues = previousValuesRef.current;
                    if (currentValue !== previousValues) {
                      matchedAuthMethod?.config_schema?.required?.includes(
                        elementName,
                      ) && onVerify();
                    }
                    previousValuesRef.current = currentValue;
                    // inputRef.current.value = currentValue;
                  }
                }}
                onChange={(e: any) => {
                  setDisableToCreate(false);
                  setMappedConfiguration((prevConfig: any) => ({
                    ...prevConfig, // Spread the previous user object
                    [elementName]: { ...prevConfig[elementName], default: e }, // Update the age property
                  }));
                  // setMappedConfiguration(...mappedConfiguration,
                  //   mappedConfiguration[elementName]: e,
                  // );
                }}
                placeholder=""
                label={titleCase(elementName)}
                value={mappedConfiguration[elementName].default}
              />
            </Box>
          )}
        </>
      );
    }

    // if (
    //   elementSchema.type === 'object'
    // ) {
    //   return (
    //     <>
    //       {' '}
    //       <Box marginTop="lg">
    //         <Paragraph size="body" style={{ color: '#000' }}>
    //           <label htmlFor="key">{titleCase(elementName)}</label>
    //         </Paragraph>
    //       </Box>
    //       <FlexBox marginTop="sm" fullWidth style={{ width: '30vw' }}>
    //         <textarea
    //           className={styles.textArea}
    //           defaultValue={JSON.stringify(mappedConfiguration[elementName])}
    //           onBlur={(e) => {
    //             const jsonStr = e.target.value;
    //             try {
    //               JSON.parse(jsonStr);
    //             } catch (e) {
    //               dispatch(
    //                 showToasterAction({
    //                   description: 'Invalid JSON.',
    //                   type: toasterTypes.failure,
    //                 }),
    //               );
    //             }
    //           }}
    //           onChange={(e) => {
    //             const jsonStr = e.target.value;
    //             try {
    //               const jsonObj = JSON.parse(jsonStr);

    //               setMappedConfiguration({
    //                 ...mappedConfiguration,
    //                 [elementName]: jsonObj,
    //               });
    //             } catch (e) {}
    //           }}
    //         />
    //       </FlexBox>
    //     </>
    //   );
    // }
    if (elementSchema.type === 'object') {
      return (
        <Box marginTop="md">
          <Paragraph size="body" style={{ color: '#000' }}>
            <label htmlFor="key">{titleCase(elementName)}</label>
          </Paragraph>

          <FlexBox.Row style={{ position: 'relative' }}>
            <div
              style={{
                position: 'absolute',
                bottom: '-5px',
                width: '5px',
                height: '5px',
                borderRadius: '100%',
                backgroundColor: 'rgba(68, 62, 153, 0.3)',
              }}
            ></div>

            <div
              className="form-row"
              style={{
                borderLeft: '1px solid rgba(68, 62, 153, 0.3)',
                marginLeft: '2px',
              }}
            >
              {inputFields[elementName]?.map((item: any, index: any) => (
                <Fragment>
                  <Box
                    style={{ display: 'flex', alignItems: 'center' }}
                    marginTop="sm"
                  >
                    <div
                      style={{
                        marginTop: '30px',
                        width: '15px',
                        borderTop: '1px solid rgba(68, 62, 153, 0.3)',
                      }}
                    ></div>
                    <div
                      style={{
                        marginTop: '30px',
                        marginRight: '5px',
                        marginLeft: '-2px',
                        color: 'rgba(68, 62, 153, 0.3)',
                      }}
                    >
                      &#x27A4;
                    </div>

                    <Box
                      className="form-group"
                      marginRight="md"
                      style={{ width: '13.7vw' }}
                    >
                      <FormTextField
                        onChange={(event: any) => {
                          const values = { ...inputFields };
                          values[elementName][index].key = event;
                          // values[name][childIndex].key = event;
                          // debugger;
                          setInputFields(values);
                        }}
                        label={'Key'}
                        value={item.key}
                        placeholder={''}
                      />
                    </Box>

                    <Box className="form-group" style={{ width: '13.7vw' }}>
                      <FormTextField
                        onChange={(event: any) => {
                          const values = { ...inputFields };
                          values[elementName][index].value = event;
                          // values[name][childIndex].key = event;
                          // debugger;
                          setInputFields(values);
                        }}
                        label={'Value'}
                        value={item?.value}
                        placeholder={''}
                      />
                    </Box>

                    <div
                      style={{
                        justifyContent: 'space-between',
                        display: 'flex',
                        marginTop: '20px',
                        marginLeft: '5px',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        {inputFields[elementName].length > 1 && (
                          <button
                            className={styles.fieldButton}
                            style={{}}
                            type="button"
                            // disabled={item[props.name].length === 1}
                            onClick={
                              () => {
                                setInputFields((prevState: any) => {
                                  // Replace with the index of the object to remove
                                  const newInputFields = [
                                    ...prevState[elementName],
                                  ];
                                  newInputFields.splice(index, 1);
                                  return {
                                    ...prevState,
                                    [elementName]: newInputFields,
                                  };
                                });
                              }
                              // handleRemoveFields(
                              //   parentIndex,
                              //   childIndex,
                              //   props.name,
                              // )
                            }
                          >
                            <icons.delete color={iconColors.grey} />
                          </button>
                        )}

                        {index === inputFields[elementName].length - 1 && (
                          <button
                            className={styles.fieldButton}
                            type="button"
                            onClick={() => {
                              setInputFields((prevState: any) => ({
                                ...prevState,
                                [elementName]: [
                                  ...prevState[elementName],
                                  { key: '', value: '' },
                                ],
                              }));
                            }}
                          >
                            <icons.addNew color={iconColors.primary} />
                          </button>
                        )}
                      </div>
                    </div>
                  </Box>
                </Fragment>
              ))}
            </div>
            <div className="submit-button"></div>
            <br />
          </FlexBox.Row>
        </Box>
      );
    }
    if (elementSchema.type === 'array') {
      return (
        <Box marginTop="md">
          <Paragraph size="body" style={{ color: '#000' }}>
            <label htmlFor="key">{titleCase(elementName)}</label>
          </Paragraph>

          <FlexBox.Row style={{ position: 'relative' }}>
            <div
              style={{
                position: 'absolute',
                bottom: '-5px',
                width: '5px',
                height: '5px',
                borderRadius: '100%',
                backgroundColor: 'rgba(68, 62, 153, 0.3)',
              }}
            ></div>

            <div
              className="form-row"
              style={{
                borderLeft: '1px solid rgba(68, 62, 153, 0.3)',
                marginLeft: '2px',
              }}
            >
              {mappedConfiguration &&
                mappedConfiguration[elementName].default?.map(
                  (item: any, index: any) => (
                    <Fragment>
                      <Box
                        style={{ display: 'flex', alignItems: 'center' }}
                        marginTop="sm"
                      >
                        <div
                          style={{
                            marginTop: '30px',
                            width: '15px',
                            borderTop: '1px solid rgba(68, 62, 153, 0.3)',
                          }}
                        ></div>
                        <div
                          style={{
                            marginTop: '30px',
                            marginRight: '5px',
                            marginLeft: '-2px',
                            color: 'rgba(68, 62, 153, 0.3)',
                          }}
                        >
                          &#x27A4;
                        </div>

                        <Box className="form-group" style={{ width: '28.3vw' }}>
                          <FormTextField
                            onChange={(event: any) => {
                              const values = [
                                ...mappedConfiguration[elementName].default,
                              ];
                              values[index] = event;
                              setMappedConfiguration((prevConfig: any) => ({
                                ...prevConfig, // Spread the previous user object
                                [elementName]: {
                                  ...prevConfig[elementName],
                                  default: values,
                                }, // Update the age property
                              }));
                            }}
                            label={'Value'}
                            value={item}
                            placeholder={''}
                          />
                        </Box>
                        <div
                          style={{
                            justifyContent: 'space-between',
                            display: 'flex',
                            marginTop: '20px',
                            marginLeft: '5px',
                          }}
                        >
                          <div
                            style={{
                              display: 'flex',
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                            }}
                          >
                            {mappedConfiguration[elementName].default.length >
                              1 && (
                              <button
                                className={styles.fieldButton}
                                style={{}}
                                type="button"
                                // disabled={item[props.name].length === 1}
                                onClick={() => {
                                  const values = [
                                    ...mappedConfiguration[elementName].default,
                                  ];
                                  values.splice(index, 1);
                                  setMappedConfiguration((prevConfig: any) => ({
                                    ...prevConfig, // Spread the previous user object
                                    [elementName]: {
                                      ...prevConfig[elementName],
                                      default: values,
                                    }, // Update the age property
                                  }));
                                }}
                              >
                                <icons.delete color={iconColors.grey} />
                              </button>
                            )}
                            {index ===
                              mappedConfiguration[elementName].default.length -
                                1 && (
                              <button
                                className={styles.fieldButton}
                                type="button"
                                onClick={() => {
                                  const values = [
                                    ...mappedConfiguration[elementName].default,
                                  ];
                                  values.push('');
                                  setMappedConfiguration((prevConfig: any) => ({
                                    ...prevConfig, // Spread the previous user object
                                    [elementName]: {
                                      ...prevConfig[elementName],
                                      default: values,
                                    }, // Update the age property
                                  }));
                                }}
                              >
                                <icons.addNew color={iconColors.primary} />
                              </button>
                            )}
                          </div>
                        </div>
                      </Box>
                    </Fragment>
                  ),
                )}
            </div>
            <div className="submit-button"></div>
            <br />
          </FlexBox.Row>
        </Box>
      );
    }
    if (elementSchema.type === 'boolean') {
      return (
        <Box marginTop={'lg'} style={{ width: '30vw' }}>
          <Box>
            <ToggleField
              value={elementSchema.default}
              onHandleChange={
                () =>
                  setMappedConfiguration((prevConfig: any) => ({
                    ...prevConfig, // Spread the previous user object
                    [elementName]: {
                      ...prevConfig[elementName],
                      default: !prevConfig[elementName].default,
                    }, // Update the age property
                  }))
                // onChangeToggle(!elementSchema, 'other', elementName)
              }
              label={titleCase(elementName)}
              // disabled={true}
            />
          </Box>
        </Box>
      );
    }
  };

  return (
    <Box marginLeft={'lg'}>
      <FlexBox>
        <Box className={styles.mainImage}>
          <img src={connectorType?.logoUrl} alt={connectorType?.name} />
        </Box>
        <Box marginLeft="xl">
          <Paragraph className={styles.title}>{connectorType?.name}</Paragraph>
          <FlexBox marginTop="lg">
            {connectorType?.resourceTypes?.map((e: any) => (
              <Box className={styles.resourceTypesImages} marginLeft="sm">
                <img src={e?.logo_url} alt={e?.name} />
              </Box>
            ))}
          </FlexBox>
        </Box>
      </FlexBox>
      {/* <Box style={{ width: '100%', marginTop: '-30px' }} marginBottom="lg">
        <H2>Configuring your component</H2>
      </Box> */}

      <FlexBox.Row style={{ width: '100%' }}>
        <Box marginTop="md" style={{ width: '30vw' }}>
          <FormTextField
            onChange={(e: any) => {
              setConnectorName(e);
            }}
            required={true}
            placeholder="Name"
            label={'Name'}
            value={connectorName}
          />
          <Box marginTop="md">
            <ToggleField
              label={'Share Component with public'}
              default={isShared}
              value={isShared}
              onHandleChange={
                (key: any, value: any) => setIsShared(!isShared)
                // setInputData({ ...inputData, ['is_shared']: value })
              }
            />
          </Box>
          <Box>
            <Box marginTop="sm">
              <Paragraph size="body" style={{ color: '#000' }}>
                <label htmlFor="key">Description</label>
              </Paragraph>
            </Box>
            <FlexBox marginTop="sm" fullWidth>
              <textarea
                className={styles.textArea}
                value={description}
                // defaultValue={JSON.stringify(inputData[props.name])}
                // onBlur={(e) => {
                //   const jsonStr = e.target.value;
                //   try {
                //     JSON.parse(jsonStr);
                //   } catch (e) {
                //     dispatch(
                //       showToasterAction({
                //         description: 'Invalid JSON.',
                //         type: toasterTypes.failure,
                //       }),
                //     );
                //   }
                // }}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </FlexBox>
            <Box marginTop="lg" style={{ width: '30vw' }}>
              <FormDropdownField
                label={'Authentication Method'}
                // labelColor="rgba(66, 66, 64, 0.5)"
                placeholder={''}
                value={selectedAuthMethod}
                onChange={(val: string) => {
                  setSelectedAuthMethod(val);
                  setParent(false);
                  setResourceType('');
                  setIds('');
                  setDisableToCreate(false);
                }}
                options={authMethoddropdownOptions as any}
                style={{ paddingLeft: '10px', backgroundColor: '#fff' }}
              />
            </Box>
          </Box>

          <FlexBox.Row style={{ width: '40%' }}>
            <Container>
              {mappedConfiguration &&
                Object.keys(mappedConfiguration)?.map((key, ind) => (
                  <>{getFormElement(key, mappedConfiguration[key])}</>
                ))}
            </Container>
          </FlexBox.Row>
          <Container>
            {matchedAuthMethod.default_expiration_seconds !== null && (
              <Box
                marginTop="lg"
                style={{ width: '30vw', marginLeft: '-15px' }}
              >
                <FormTextField
                  onChange={(e: any) => {
                    setConnectorExpirationSeconds(e);
                  }}
                  type="number"
                  // disabled
                  // onKeyDown={(e: any) => onPressEnter(e, 'name')}
                  // onChangeText={(e: any) => onPressEnter(e, 'name')}
                  label={'Expiration Seconds'}
                  optional={false}
                  value={connectorExpirationSeconds}
                  placeholder=""
                  // hasError={false}
                  // className={styles.field}
                />
              </Box>
            )}
          </Container>
          <Box marginTop="lg" style={{ width: '30vw' }}>
            <ServicesSelectorComponent
              parent={parent}
              setParent={setParent}
              resourceType={resourceType}
              setResourceType={setResourceType}
              ids={ids}
              setIds={setIds}
              data={connectorType}
              resources={resources}
              verifying={verifying}
            />
          </Box>
          <Box marginTop="md" style={{ width: '30vw' }}>
            <Paragraph size="body" style={{ color: '#000' }}>
              <label htmlFor="key">Labels</label>
            </Paragraph>

            <FlexBox.Row style={{ position: 'relative' }}>
              <div
                style={{
                  position: 'absolute',
                  bottom: '-5px',
                  width: '5px',
                  height: '5px',
                  borderRadius: '100%',
                  backgroundColor: 'rgba(68, 62, 153, 0.3)',
                }}
              ></div>

              <div
                className="form-row"
                style={{
                  borderLeft: '1px solid rgba(68, 62, 153, 0.3)',
                  marginLeft: '2px',
                }}
              >
                {labelsInputFields?.map((item: any, index: any) => (
                  <Fragment>
                    <Box
                      style={{ display: 'flex', alignItems: 'center' }}
                      marginTop="sm"
                    >
                      <div
                        style={{
                          marginTop: '30px',
                          width: '15px',
                          borderTop: '1px solid rgba(68, 62, 153, 0.3)',
                        }}
                      ></div>
                      <div
                        style={{
                          marginTop: '30px',
                          marginRight: '5px',
                          marginLeft: '-2px',
                          color: 'rgba(68, 62, 153, 0.3)',
                        }}
                      >
                        &#x27A4;
                      </div>

                      <Box
                        className="form-group"
                        marginRight="md"
                        style={{ width: '13.7vw' }}
                      >
                        <FormTextField
                          onChange={(event: any) => {
                            const values = [...labelsInputFields];
                            values[index].key = event;
                            // values[name][childIndex].key = event;
                            // debugger;
                            setLabelsInputFields(values);
                          }}
                          label={'Key'}
                          value={item.key}
                          placeholder={''}
                        />
                      </Box>

                      <Box className="form-group" style={{ width: '13.7vw' }}>
                        <FormTextField
                          onChange={(event: any) => {
                            const values = [...labelsInputFields];
                            values[index].value = event;
                            // values[name][childIndex].key = event;
                            // debugger;
                            setLabelsInputFields(values);
                          }}
                          label={'Value'}
                          value={item?.value}
                          placeholder={''}
                        />
                      </Box>

                      <div
                        style={{
                          justifyContent: 'space-between',
                          display: 'flex',
                          marginTop: '20px',
                          marginLeft: '5px',
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                          }}
                        >
                          {labelsInputFields.length > 1 && (
                            <button
                              className={styles.fieldButton}
                              style={{}}
                              type="button"
                              // disabled={item[props.name].length === 1}
                              onClick={
                                () => {
                                  // setLabelsInputFields((prevState: any) => {
                                  //   // Replace with the index of the object to remove

                                  //   labelsInputFields.splice(index, 1);
                                  // });
                                  const values = [...labelsInputFields];
                                  values.splice(index, 1);
                                  // values[name][childIndex].key = event;
                                  // debugger;
                                  setLabelsInputFields(values);
                                }
                                //   // handleRemoveFields(
                                //   //   parentIndex,
                                //   //   childIndex,
                                //   //   props.name,
                                //   // )
                              }
                            >
                              <icons.delete color={iconColors.grey} />
                            </button>
                          )}

                          {index === labelsInputFields.length - 1 && (
                            <button
                              className={styles.fieldButton}
                              type="button"
                              onClick={() => {
                                const values = [...labelsInputFields];
                                values.push({ key: '', value: '' });
                                // values[name][childIndex].key = event;
                                // debugger;
                                setLabelsInputFields(values);
                              }}
                            >
                              <icons.addNew color={iconColors.primary} />
                            </button>
                          )}
                        </div>
                      </div>
                    </Box>
                  </Fragment>
                ))}
              </div>
              <div className="submit-button"></div>
              <br />
            </FlexBox.Row>
          </Box>
        </Box>
        {console.log(
          mappedConfiguration,
          tempMappedConfiguration,
          'tempMappedConfiguration',
        )}
        <SidePopup
          disabled={
            mappedConfiguration !== tempMappedConfiguration
              ? false
              : disableToCreate
          }
          data={connectorType}
          verifying={verifying}
          onClose={() => {}}
          action={
            resources === undefined ||
            mappedConfiguration !== tempMappedConfiguration
              ? onVerify
              : onSubmit
          }
        />
      </FlexBox.Row>
    </Box>
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
