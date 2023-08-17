import React, { Fragment, useEffect, useState } from 'react';
import {
  FlexBox,
  Box,
  Paragraph,
  Container,
  FullWidthSpinner,
  PrimaryButton,
  FormTextField,
  icons,
  FormPasswordFieldVerify,
  FormDropdownField,
} from '../../../../components';
import styles from './index.module.scss';
import { useService } from './useService';
import axios from 'axios';
import { useDispatch, useHistory, useSelector } from '../../../../hooks';
import {
  sessionSelectors,
  userSelectors,
  workspaceSelectors,
} from '../../../../../redux/selectors';
import { showToasterAction } from '../../../../../redux/actions';
import { iconColors, toasterTypes } from '../../../../../constants';
import { ToggleField } from '../../../common/FormElement';
import { routePaths } from '../../../../../routes/routePaths';

import ServicesSelectorComponent from '../../ServicesSelectorComponent/Disabled';

export const UpdateConfig: React.FC<{
  connectorId: TId;
  loading?: boolean;
  state: any;
}> = ({ connectorId, loading, state }) => {
  const { connector } = useService({
    connectorId,
  });

  const history = useHistory();
  const [connectorName, setConnectorName] = useState('');
  const [connectorDescription, setConnectorDescription] = useState(
    connector.description,
  );
  const [connectorExpirationSeconds, setConnectorExpirationSeconds] = useState(
    connector.expirationSeconds,
  );
  const [labelsInputFields, setLabelsInputFields] = useState([]) as any;
  const [isShared, setIsShared] = useState() as any;
  const [mappedConfiguration, setMappedConfiguration] = useState() as any;
  const user = useSelector(userSelectors.myUser);
  const [fetching, setFetching] = useState(false);

  const authToken = useSelector(sessionSelectors.authenticationToken);
  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);
  const dispatch = useDispatch();

  const workspaces = useSelector(workspaceSelectors.myWorkspaces);
  const [inputFields, setInputFields] = useState([]) as any;
  const titleCase = (s: any) =>
    s.replace(/^_*(.)|_+(.)/g, (s: any, c: string, d: string) =>
      c ? c.toUpperCase() : ' ' + d.toUpperCase(),
    );
  const matchedAuthMethod = connector.connectorType.auth_methods.find(
    (item: any) => item?.auth_method === connector?.authMethod,
  );

  useEffect(() => {
    function convertJSON(json: any) {
      const updatedObj = [];

      // Handle empty object case
      if (Object.keys(json).length === 0) {
        updatedObj.push({ key: '', value: '' });
        return updatedObj;
      }

      // Iterate over the object properties
      for (const key in json) {
        updatedObj.push({ key: key.trim(), value: json[key] });
      }

      return updatedObj;
    }
    const convertedJson = convertJSON(connector.labels);

    const configurationModifiedObj: any = {};

    // Iterate over the properties of obj1
    for (let prop in matchedAuthMethod.config_schema.properties) {
      // Check if the property exists in obj2
      if (connector.configuration.hasOwnProperty(prop)) {
        // Add the property to obj1 with the value from obj2
        configurationModifiedObj[prop] = {
          ...matchedAuthMethod.config_schema.properties[prop],
          default: connector.configuration[prop],
        };
      } else {
        // If the property does not exist in obj2, copy it as is
        configurationModifiedObj[prop] = {
          ...matchedAuthMethod.config_schema.properties[prop],
          default:
            matchedAuthMethod.config_schema.properties[prop].type === 'array'
              ? ['']
              : matchedAuthMethod.config_schema.properties[prop].type ===
                'object'
              ? { key: '', value: '' }
              : matchedAuthMethod.config_schema.properties[prop].type ===
                'boolean'
              ? false
              : '',
        };
      }
    }
    setConnectorName(connector.name);
    setLabelsInputFields(convertedJson as any);

    setIsShared(connector.isShared);

    setMappedConfiguration(configurationModifiedObj);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connector]);

  const onSubmit = () => {
    const { id }: any = workspaces.find(
      (item) => item.name === selectedWorkspace,
    );
    if (!connectorName) {
      dispatch(
        showToasterAction({
          description: 'Required Field is Empty',
          type: toasterTypes.failure,
        }),
      );
      return false;
    }
    const payload: any = {};

    for (const key in mappedConfiguration) {
      if (mappedConfiguration.hasOwnProperty(key)) {
        if (mappedConfiguration[key].default) {
          payload[key] = mappedConfiguration[key].default;
        }
      }
    }

    for (const field of matchedAuthMethod.config_schema.required) {
      if (!payload[field]) {
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
    const body = {
      user: user?.id,
      workspace: id,
      is_shared: isShared,
      name: connectorName,
      connector_type: connector.connectorType.connector_type,
      description: connector.description,
      auth_method: connector.authMethod,
      resource_types: connector.resourceTypes,
      configuration: { ...payload },
      labels: labels,
      resource_id: connector.resourceId,
    };

    setFetching(true);
    axios
      .put(
        `${process.env.REACT_APP_BASE_API_URL}/service_connectors/${connector.id}`,
        // @ts-ignore
        body,
        { headers: { Authorization: `Bearer ${authToken}` } },
      )
      .then((response: any) => {
        setFetching(false);
        dispatch(
          showToasterAction({
            description: 'Connector has been updated successfully.',
            type: toasterTypes.success,
          }),
        );

        history.push(
          routePaths.connectors.configuration(connector.id, selectedWorkspace),
        );
      })
      .catch((err) => {
        setFetching(false);

        dispatch(
          showToasterAction({
            description: err?.response?.data?.detail[0],
            type: toasterTypes.failure,
          }),
        );
      });
  };

  const getFormElement: any = (elementName: any, elementSchema: any) => {
    if (elementSchema.type === 'string') {
      return (
        <>
          {elementSchema?.format === 'password' ? (
            <Box marginTop="lg" style={{ width: '30vw' }}>
              <FormPasswordFieldVerify
                required={matchedAuthMethod?.config_schema?.required?.includes(
                  elementName,
                )}
                onChange={(e: any) => {
                  setMappedConfiguration((prevConfig: any) => ({
                    ...prevConfig, // Spread the previous object
                    [elementName]: { ...prevConfig[elementName], default: e },
                  }));
                }}
                placeholder=""
                label={titleCase(elementName)}
                value={mappedConfiguration[elementName].default}
                optional={false}
                defaultValue={elementSchema.default}
                error={{}}
              />
            </Box>
          ) : (
            <Box marginTop="lg" style={{ width: '30vw' }}>
              <FormTextField
                required={matchedAuthMethod?.config_schema?.required?.includes(
                  elementName,
                )}
                onChange={(e: any) => {
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
                                    ...prevConfig, // Spread the previous  object
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
                                    ...prevConfig, // Spread the previous  object
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
  if (loading) {
    return <FullWidthSpinner color="black" size="md" />;
  }

  if (fetching) {
    return <FullWidthSpinner color="black" size="md" />;
  }
  return (
    <FlexBox.Column marginTop="xl">
      <FlexBox.Row flexDirection="column">
        <Container>
          <Box style={{ width: '30vw' }}>
            <FormTextField
              onChange={(e: any) => {
                setConnectorName(e);
              }}
              required={true}
              placeholder="Component Name"
              label={'Component Name'}
              value={connectorName}
            />
          </Box>
        </Container>
        <Container>
          <Box marginTop="lg" style={{ width: '30vw' }}>
            <Paragraph size="body" style={{ color: '#000' }}>
              <label htmlFor="key">Description</label>
            </Paragraph>
          </Box>
          <FlexBox marginTop="sm" fullWidth>
            <textarea
              className={styles.textArea}
              value={connectorDescription}
              onChange={(e: any) => {
                setConnectorDescription(e);
              }}
            />
          </FlexBox>
        </Container>
        <Container>
          <Box marginTop="lg">
            <ToggleField
              label={'Share Component with public'}
              default={isShared}
              value={isShared}
              onHandleChange={(key: any, value: any) => setIsShared(!isShared)}
            />
          </Box>
        </Container>
      </FlexBox.Row>

      <Box marginTop="lg" marginLeft="md" style={{ width: '30vw' }}>
        <FormDropdownField
          disabled
          label={'Authentication Method'}
          placeholder={''}
          value={
            connector?.connectorType?.auth_methods?.filter(
              (e: any) => e?.auth_method === connector?.authMethod,
            )[0]?.name
          }
          onChange={() => {}}
          options={[] as any}
          style={{ paddingLeft: '10px' }}
        />
      </Box>

      <FlexBox.Row style={{ width: '40%' }}>
        <Container>
          {mappedConfiguration &&
            Object.keys(mappedConfiguration)?.map((key, ind) => (
              <>{getFormElement(key, mappedConfiguration[key])}</>
            ))}
        </Container>
      </FlexBox.Row>
      {connectorExpirationSeconds !== null && (
        <Container>
          <Box marginTop="lg" style={{ width: '30vw' }}>
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
        </Container>
      )}

      <Box marginTop="lg" marginLeft={'md'} style={{ width: '30vw' }}>
        <ServicesSelectorComponent data={connector} />
      </Box>

      <Box marginTop="md" marginLeft={'md'} style={{ width: '30vw' }}>
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
            onClick={() => {
              onSubmit();
            }}
          >
            Save Changes
          </PrimaryButton>
        </Box>
      </FlexBox>
    </FlexBox.Column>
  );
};
