import React, { Fragment, useState } from 'react';
import {
  FlexBox,
  Box,
  EditField,
  Paragraph,
  Container,
  FullWidthSpinner,
  PrimaryButton,
  FormPasswordFieldVerify,
  FormTextField,
  FormDropdownField,
  EditFieldSettings,
} from '../../../../components';
import styles from './index.module.scss';
import { useService } from './useService';

import { useDispatch, useHistory, useSelector } from '../../../../hooks';
import { workspaceSelectors } from '../../../../../redux/selectors';
import { showToasterAction } from '../../../../../redux/actions';
import { toasterTypes } from '../../../../../constants';
import { ToggleField } from '../../../common/FormElement';
import { routePaths } from '../../../../../routes/routePaths';

import ServicesSelectorComponent from '../../ServicesSelectorComponent/Disabled';

export const Configuration: React.FC<{
  connectorId: TId;
  fetching?: boolean;
}> = ({ connectorId, fetching }) => {
  const history = useHistory();

  const { connector } = useService({ connectorId });

  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);
  const dispatch = useDispatch();

  const [inputFields] = useState([]) as any;
  const titleCase = (s: any) =>
    s.replace(/^_*(.)|_+(.)/g, (s: any, c: string, d: string) =>
      c ? c.toUpperCase() : ' ' + d.toUpperCase(),
    );

  const matchedAuthMethod = connector?.body?.connector_type?.auth_methods.find(
    (item: any) => item?.auth_method === connector?.body?.auth_method,
  );

  const dropdownValue = connector?.body?.connector_type?.auth_methods?.filter(
    (e: any) => e?.auth_method === connector?.body?.auth_method,
  );

  const getFormElement: any = (elementName: any, elementSchema: any) => {
    if (elementSchema?.type === 'string') {
      return (
        <>
          {elementSchema?.format === 'password' ? (
            <Box marginTop="lg" style={{ width: '30vw' }}>
              <FormPasswordFieldVerify
                disabled
                label={titleCase(elementName)}
                optional={false}
                defaultValue={elementSchema.default}
                placeholder=""
                error={{}}
              />
            </Box>
          ) : (
            <Box marginTop="lg" style={{ width: '30vw' }}>
              <FormTextField
                disabled
                label={titleCase(elementName)}
                optional={false}
                value={elementSchema.default}
                placeholder=""
              />
            </Box>
          )}
        </>
      );
    }
    if (elementSchema.type === 'object') {
      return (
        <>
          {' '}
          <Box marginTop="lg">
            <Paragraph size="body" style={{ color: '#000' }}>
              <label htmlFor="key">{titleCase(elementName)}</label>
            </Paragraph>
          </Box>
          <FlexBox marginTop="sm" fullWidth>
            <textarea
              disabled
              className={styles.textArea}
              defaultValue={JSON.stringify(elementSchema.default)}
              style={{ width: '30vw' }}
              onBlur={(e) => {
                const jsonStr = e.target.value;
                try {
                  JSON.parse(jsonStr);
                } catch (e) {
                  dispatch(
                    showToasterAction({
                      description: 'Invalid JSON.',
                      type: toasterTypes.failure,
                    }),
                  );
                }
              }}
              onChange={(e) => {}}
            />
          </FlexBox>
        </>
      );
    }

    if (elementSchema.type === 'object') {
      return (
        <Box marginTop="lg" style={{ width: '30vw' }}>
          <Paragraph size="body" style={{ color: 'black' }}>
            <label htmlFor={elementName}>{titleCase(elementName)}</label>
          </Paragraph>

          <Box style={{ position: 'relative' }}>
            {Object.keys(elementSchema || {}).length < 1 && (
              <>
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
                  <FlexBox.Row
                    alignItems="center"
                    marginTop="sm"
                    style={{ width: '30vw' }}
                  >
                    <div
                      style={{
                        marginTop: '30px',
                        width: '35px',
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

                    <EditField
                      disabled
                      onChangeText={(event: any) => {}}
                      label="Key"
                      optional={false}
                      placeholder=""
                      hasError={false}
                      className={styles.field}
                    />
                    <div style={{ width: '10%' }}></div>
                    <EditField
                      disabled
                      onChangeText={(event: any) => {}}
                      label="Value"
                      placeholder=""
                      hasError={false}
                      className={styles.field}
                    />
                  </FlexBox.Row>
                </div>
              </>
            )}
          </Box>

          <Box style={{ position: 'relative' }}>
            {Object.entries(elementSchema || {}).map(([key, value], index) => (
              <>
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
                  <FlexBox.Row
                    marginTop="lg"
                    alignItems="center"
                    style={{ width: '30vw' }}
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

                    <EditField
                      disabled
                      label="Key"
                      optional={false}
                      defaultValue={key}
                      placeholder=""
                      hasError={false}
                      className={styles.field}
                    />
                    <div style={{ width: '10%' }}></div>
                    <EditField
                      disabled
                      label="Value"
                      defaultValue={value}
                      placeholder=""
                      hasError={false}
                      className={styles.field}
                    />
                  </FlexBox.Row>
                </div>
              </>
            ))}
          </Box>

          <Box style={{ position: 'relative' }}>
            {inputFields.map((inputField: any, index: any) => (
              <>
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
                  <FlexBox.Row
                    marginTop="lg"
                    alignItems="center"
                    style={{ width: '30vw' }}
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

                    <Box marginTop="lg">
                      <EditField
                        disabled
                        label={'Key'}
                        className={styles.field}
                        value={inputField?.key}
                        placeholder={''}
                      />
                    </Box>

                    <div style={{ width: '10%' }}></div>
                    <Box marginTop="lg">
                      <EditField
                        disabled
                        className={styles.field}
                        label={'Value'}
                        value={inputField?.value}
                        placeholder={''}
                      />
                    </Box>
                  </FlexBox.Row>
                </div>
              </>
            ))}
          </Box>
        </Box>
      );
    }

    if (elementSchema.type === 'array') {
      return (
        <Box marginTop="md">
          <Paragraph size="body" style={{ color: '#000' }}>
            <label htmlFor="key">{titleCase(elementName)}</label>
          </Paragraph>

          <Box style={{ position: 'relative' }}>
            <div
              style={{
                position: 'absolute',
                bottom: '10px',
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
              {elementSchema &&
                elementSchema.default?.map((item: any, index: any) => (
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

                      <div className="form-group" style={{ width: '28.5vw' }}>
                        <EditField
                          disabled
                          className={styles.field}
                          label={'Value'}
                          value={item}
                          placeholder={''}
                        />
                      </div>

                      <div
                        style={{
                          justifyContent: 'space-between',
                          display: 'flex',
                          marginTop: '10px',
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                          }}
                        ></div>
                      </div>
                    </Box>
                  </Fragment>
                ))}
            </div>
            <div className="submit-button"></div>
            <br />
          </Box>
        </Box>
      );
    }
    if (elementSchema.type === 'boolean') {
      return (
        <Box marginTop={'lg'} style={{ width: '30vw' }}>
          <Box>
            <ToggleField
              value={elementSchema.default}
              label={titleCase(elementName)}
              disabled={true}
            />
          </Box>
        </Box>
      );
    }
  };
  if (fetching) {
    return <FullWidthSpinner color="black" size="md" />;
  }

  const configurationModifiedObj: any = {};

  // Iterate over the properties of obj1
  for (let prop in matchedAuthMethod.config_schema.properties) {
    // Check if the property exists in obj2
    if (connector?.metadata?.configuration.hasOwnProperty(prop)) {
      // Add the property to obj1 with the value from obj2
      configurationModifiedObj[prop] = {
        ...matchedAuthMethod.config_schema.properties[prop],
        default: connector?.metadata?.configuration[prop],
      };
    } else {
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
  }

  if (fetching) {
    return <FullWidthSpinner color="black" size="md" />;
  }

  return (
    <FlexBox.Column marginTop="xl">
      <FlexBox.Row flexDirection="column">
        <Container>
          <Box style={{ width: '30vw' }}>
            <EditField
              disabled
              label={'Component Name'}
              optional={false}
              defaultValue={connector?.name}
              placeholder=""
              hasError={false}
              className={styles.field}
            />
          </Box>
        </Container>
        <Container>
          <Box marginTop="lg" style={{ width: '30vw' }}>
            <EditFieldSettings
              disabled
              type="textarea"
              label={'Description'}
              optional={false}
              defaultValue={connector?.description}
              placeholder=""
              className={styles.field}
              style={{ height: '200px' }}
            />
          </Box>
        </Container>
        <Container>
          <Box marginTop="lg" style={{ width: '30vw' }}>
            <ToggleField
              value={connector?.is_shared}
              label="Share Component with public"
              disabled={true}
            />
          </Box>
        </Container>
      </FlexBox.Row>

      <Box style={{ width: '30vw' }} marginLeft="md" marginTop="lg">
        <FormDropdownField
          label={'Authentication Method'}
          placeholder={''}
          value={dropdownValue[0]?.name}
          onChange={() => {}}
          options={[] as any}
          style={{ paddingLeft: '10px' }}
          disabled
        />
      </Box>

      <FlexBox.Row style={{ width: '40%' }}>
        <Container>
          {Object.keys(configurationModifiedObj).map((key, ind) => (
            <>{getFormElement(key, configurationModifiedObj[key])}</>
          ))}
        </Container>
      </FlexBox.Row>
      {connector?.expirationSeconds !== null && (
        <Container>
          <Box marginTop="lg" style={{ width: '30vw' }}>
            <EditField
              disabled
              label={'Expiration Seconds'}
              optional={false}
              defaultValue={connector?.expirationSeconds}
              placeholder=""
              hasError={false}
              className={styles.field}
            />
          </Box>
        </Container>
      )}

      <Box marginTop="lg" marginLeft={'md'} style={{ width: '30vw' }}>
        <ServicesSelectorComponent data={connector} />
      </Box>

      <Box marginTop="lg" marginLeft={'md'} style={{ width: '30vw' }}>
        <Paragraph size="body" style={{ color: 'black' }}>
          <label htmlFor={connector?.labels}>{'Labels'}</label>
        </Paragraph>

        <Box style={{ position: 'relative' }}>
          {Object.keys(connector?.labels || {}).length < 1 && (
            <>
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
                <FlexBox.Row
                  alignItems="center"
                  marginTop="sm"
                  style={{ width: '30vw' }}
                >
                  <div
                    style={{
                      marginTop: '30px',
                      width: '35px',
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

                  <EditField
                    disabled
                    onChangeText={(event: any) => {}}
                    label="Key"
                    optional={false}
                    placeholder=""
                    hasError={false}
                    className={styles.field}
                  />
                  <div style={{ width: '10%' }}></div>
                  <EditField
                    disabled
                    onChangeText={(event: any) => {}}
                    label="Value"
                    placeholder=""
                    hasError={false}
                    className={styles.field}
                  />
                </FlexBox.Row>
              </div>
            </>
          )}
        </Box>

        <Box style={{ position: 'relative' }}>
          {Object.entries(connector?.labels || {}).map(
            ([key, value], index) => (
              <>
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
                  <FlexBox.Row
                    marginTop="lg"
                    alignItems="center"
                    style={{ width: '30vw' }}
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

                    <EditField
                      disabled
                      label="Key"
                      optional={false}
                      defaultValue={key}
                      placeholder=""
                      hasError={false}
                      className={styles.field}
                    />
                    <div style={{ width: '10%' }}></div>
                    <EditField
                      disabled
                      label="Value"
                      defaultValue={value}
                      placeholder=""
                      hasError={false}
                      className={styles.field}
                    />
                  </FlexBox.Row>
                </div>
              </>
            ),
          )}
        </Box>

        <Box style={{ position: 'relative' }}>
          {inputFields.map((inputField: any, index: any) => (
            <>
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
                <FlexBox.Row
                  marginTop="lg"
                  alignItems="center"
                  style={{ width: '30vw' }}
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

                  <Box marginTop="lg">
                    <EditField
                      disabled
                      label={'Key'}
                      className={styles.field}
                      value={inputField?.key}
                      placeholder={''}
                    />
                  </Box>

                  <div style={{ width: '10%' }}></div>
                  <Box marginTop="lg">
                    <EditField
                      disabled
                      className={styles.field}
                      label={'Value'}
                      value={inputField?.value}
                      placeholder={''}
                    />
                  </Box>
                </FlexBox.Row>
              </div>
            </>
          ))}
        </Box>
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
                routePaths.connectors.updateConnector(
                  connector?.id,
                  selectedWorkspace,
                ),
              )
            }
            className={styles.updateButton}
          >
            Update Connector
          </PrimaryButton>
        </Box>
      </FlexBox>
    </FlexBox.Column>
  );
};
