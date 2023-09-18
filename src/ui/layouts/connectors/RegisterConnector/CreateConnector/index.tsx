import React, { Fragment, useEffect, useRef, useState } from 'react';
import styles from './index.module.scss';
import {
  Box,
  Container,
  FlexBox,
  FormDropdownField,
  FormPasswordFieldVerify,
  FormTextField,
  FullWidthSpinner,
  Paragraph,
  icons,
} from '../../../../components';
import ServicesSelectorComponent from '../../ServicesSelectorComponent';

import { ToggleField } from '../../../common/FormElement';

import { SidePopup } from '../SidePopup';
import { useSelector, useDispatch, useHistory } from '../../../../hooks';
import {
  sessionSelectors,
  userSelectors,
  workspaceSelectors,
} from '../../../../../redux/selectors';

import { showToasterAction } from '../../../../../redux/actions';
import { iconColors, toasterTypes } from '../../../../../constants';
import axios from 'axios';
import { routePaths } from '../../../../../routes/routePaths';

export const CreateConnector: React.FC<{ connectorType: any; state: any }> = ({
  connectorType,
  state,
}) => {
  const authToken = useSelector(sessionSelectors.authenticationToken);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);

  const user = useSelector(userSelectors.myUser);
  const workspaces = useSelector(workspaceSelectors.myWorkspaces);
  const [connectorName, setConnectorName] = useState('');
  const [isShared, setIsShared] = useState(true);
  const [description, setDescription] = useState('');
  const [disableToCreate, setDisableToCreate] = useState(false);

  const [selectedAuthMethod, setSelectedAuthMethod] = useState<any>(
    connectorType?.authMethods[0].auth_method,
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
  const [parent, setParent] = useState(false);
  const [resourceType, setResourceType] = useState('');
  const [ids, setIds] = useState('');
  const [labelsInputFields, setLabelsInputFields] = useState([
    { key: '', value: '' },
  ]) as any;
  const previousValuesRef = useRef<string>('');
  const inputRef = useRef<HTMLInputElement>(null) as any;
  const history = useHistory();

  const matchedAuthMethod = connectorType?.authMethods.find(
    (item: any) => item?.auth_method === selectedAuthMethod,
  ) as any;

  useEffect(() => {
    const dropdownOptions = connectorType?.authMethods.map((item: any) => {
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
      configuration: {
        ...configuration,
      },
      labels: labels,
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
      })
      .catch((err) => {
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

      configuration: {
        ...configuration,
      },

      labels: labels,
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

        history.push(
          routePaths.connectors.configuration(
            response.data.id,
            selectedWorkspace,
          ),
        );
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
    if (elementSchema?.type === 'string') {
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
                  }
                }}
                onHandleFocus={(e: any) => {
                  const currentValue = e.target.value;
                  previousValuesRef.current = currentValue;
                }}
                onChange={(e: any) => {
                  setDisableToCreate(false);
                  setMappedConfiguration((prevConfig: any) => ({
                    ...prevConfig, // Spread the previous object
                    [elementName]: { ...prevConfig[elementName], default: e },
                  }));
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
                }}
                onRemoveFocus={(e: any) => {
                  if (e.target.value) {
                    const currentValue = e.target.value;
                    const previousValues = previousValuesRef.current;
                    if (currentValue !== previousValues) {
                      onVerify();
                    }
                    previousValuesRef.current = currentValue;
                  }
                  if (!e.target.value && previousValuesRef.current) {
                    const currentValue = e.target.value;
                    const previousValues = previousValuesRef.current;
                    if (currentValue !== previousValues) {
                      onVerify();
                    }
                    previousValuesRef.current = currentValue;
                  }
                }}
                onChange={(e: any) => {
                  setDisableToCreate(false);
                  setMappedConfiguration((prevConfig: any) => ({
                    ...prevConfig, // Spread the previous object
                    [elementName]: { ...prevConfig[elementName], default: e },
                  }));
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
                <Fragment key={index}>
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

                          setInputFields(values);
                        }}
                        label={'Key'}
                        value={item?.key}
                        placeholder={''}
                      />
                    </Box>

                    <Box className="form-group" style={{ width: '13.7vw' }}>
                      <FormTextField
                        onChange={(event: any) => {
                          const values = { ...inputFields };
                          values[elementName][index].value = event;

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
                            onClick={() => {
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
                            }}
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
                    <Fragment key={index}>
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
                                ...prevConfig, // Spread the previous object
                                [elementName]: {
                                  ...prevConfig[elementName],
                                  default: values,
                                },
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
                                onClick={() => {
                                  const values = [
                                    ...mappedConfiguration[elementName].default,
                                  ];
                                  values.splice(index, 1);
                                  setMappedConfiguration((prevConfig: any) => ({
                                    ...prevConfig, // Spread the previous object
                                    [elementName]: {
                                      ...prevConfig[elementName],
                                      default: values,
                                    },
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
                                    ...prevConfig, // Spread the previous object
                                    [elementName]: {
                                      ...prevConfig[elementName],
                                      default: values,
                                    },
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
              onHandleChange={() =>
                setMappedConfiguration((prevConfig: any) => ({
                  ...prevConfig, // Spread the previous  object
                  [elementName]: {
                    ...prevConfig[elementName],
                    default: !prevConfig[elementName].default,
                  },
                }))
              }
              label={titleCase(elementName)}
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
            {connectorType?.resourceTypes?.map((e: any, index: number) => (
              <Box
                key={index}
                className={styles.resourceTypesImages}
                marginLeft="sm"
              >
                <img src={e?.logo_url} alt={e?.name} />
              </Box>
            ))}
          </FlexBox>
        </Box>
      </FlexBox>

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
              onHandleChange={(key: any, value: any) => setIsShared(!isShared)}
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
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </FlexBox>
            <Box marginTop="lg" style={{ width: '30vw' }}>
              <FormDropdownField
                label={'Authentication Method'}
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
                Object.entries(mappedConfiguration).map(([key, value], ind) => (
                  <Fragment key={ind}>{getFormElement(key, value)}</Fragment>
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
                  label={'Expiration Seconds'}
                  optional={false}
                  value={connectorExpirationSeconds}
                  placeholder=""
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
                  <Fragment key={index}>
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

                            setLabelsInputFields(values);
                          }}
                          label={'Key'}
                          value={item?.key}
                          placeholder={''}
                        />
                      </Box>

                      <Box className="form-group" style={{ width: '13.7vw' }}>
                        <FormTextField
                          onChange={(event: any) => {
                            const values = [...labelsInputFields];
                            values[index].value = event;

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
                              onClick={() => {
                                const values = [...labelsInputFields];
                                values.splice(index, 1);

                                setLabelsInputFields(values);
                              }}
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
  );
};
