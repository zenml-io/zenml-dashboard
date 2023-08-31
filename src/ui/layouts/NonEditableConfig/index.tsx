import React, { Fragment } from 'react';
import {
  FlexBox,
  Box,
  EditField,
  Paragraph,
  FullWidthSpinner,
} from '../../components';
import { ToggleField } from '../common/FormElement';
import styles from './index.module.scss';
import { useService } from './useService';
import { routePaths } from '../../../routes/routePaths';
import { useSelector } from 'react-redux';
import { secretSelectors, workspaceSelectors } from '../../../redux/selectors';
import { useHistory } from '../../hooks';

export const NonEditableConfig: React.FC<{ details: any }> = ({ details }) => {
  const secrets = useSelector(secretSelectors.mySecrets);
  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);
  const history = useHistory();
  const { flavor } = useService({
    details,
  }) as any;

  const titleCase = (s: any) =>
    s.replace(/^_*(.)|_+(.)/g, (s: any, c: string, d: string) =>
      c ? c.toUpperCase() : ' ' + d.toUpperCase(),
    );

  const getFormElement: any = (elementName: any, elementSchema: any) => {
    if (flavor?.config_schema?.properties[elementName]?.type === 'string') {
      const extracted = elementSchema.split(/\./)[0];
      const secretName = extracted.replace(/{{|}}|\./g, '').trim();
      const filteredSecret = secrets?.filter(
        (item) => item.name === secretName,
      );
      return (
        <>
          {flavor?.config_schema?.properties[elementName].sensitive ? (
            <Box marginTop="lg" style={{ width: '30vw' }}>
              <EditField
                disabled
                viewSecretDetail={() => {
                  history.push(
                    routePaths.secret.configuration(
                      filteredSecret[0]?.id,
                      selectedWorkspace,
                    ),
                  );
                }}
                filteredSecretId={filteredSecret[0]?.id}
                label={titleCase(elementName) + ' (Secret)'}
                optional={false}
                defaultValue={elementSchema}
                placeholder=""
                hasError={false}
              />
            </Box>
          ) : (
            <Box marginTop="lg" style={{ width: '30vw' }}>
              <EditField
                disabled
                label={titleCase(elementName)}
                optional={false}
                defaultValue={elementSchema}
                placeholder=""
                hasError={false}
              />
            </Box>
          )}
        </>
      );
    }
    if (
      flavor?.config_schema?.properties[elementName]?.type === 'object' &&
      flavor?.config_schema?.properties[elementName]?.additionalProperties &&
      flavor?.config_schema?.properties[elementName]?.additionalProperties
        .type !== 'string'
    ) {
      return (
        <>
          {' '}
          <Box marginTop="lg">
            <Paragraph size="body" style={{ color: '#000' }}>
              <label htmlFor="key">{titleCase(elementName)}</label>
            </Paragraph>
          </Box>
          <FlexBox marginTop="sm" style={{ width: '30vw' }}>
            <textarea
              disabled
              className={styles.textArea}
              defaultValue={JSON.stringify(mappedObject[elementName])}
              onChange={(e) => {}}
            />
          </FlexBox>
        </>
      );
    }

    if (flavor?.config_schema?.properties[elementName]?.type === 'object') {
      return (
        <Box marginTop="lg" style={{ width: '30vw' }}>
          <Paragraph size="body" style={{ color: 'black' }}>
            <label htmlFor={elementName}>{titleCase(elementName)}</label>
          </Paragraph>

          {Object.keys(elementSchema).length < 1 && (
            <Box style={{ position: 'relative' }}>
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
                style={{
                  borderLeft: '1px solid rgba(68, 62, 153, 0.3)',
                  marginLeft: '2px',
                }}
              >
                <FlexBox.Row>
                  <Box
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                    }}
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
                  </Box>
                </FlexBox.Row>
              </div>
            </Box>
          )}

          <Box style={{ position: 'relative' }}>
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
              style={{
                borderLeft: '1px solid rgba(68, 62, 153, 0.3)',
                marginLeft: '2px',
              }}
            >
              {Object.entries(elementSchema).map(([key, value], index) => (
                <FlexBox.Row key={index}>
                  <Box
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      width: '29.8vw',
                    }}
                    marginTop="sm"
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
                  </Box>
                </FlexBox.Row>
              ))}
            </div>
          </Box>
        </Box>
      );
    }

    if (flavor?.config_schema?.properties[elementName]?.type === 'array') {
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
              style={{
                borderLeft: '1px solid rgba(68, 62, 153, 0.3)',
                marginLeft: '2px',
              }}
            >
              {mappedObject &&
                mappedObject[elementName]?.map((item: any, index: any) => (
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

                      <div className="form-group" style={{ width: '28.3vw' }}>
                        <EditField
                          disabled
                          className={styles.field}
                          label={'Value'}
                          value={item}
                          placeholder={''}
                        />
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
    if (typeof elementSchema === 'boolean') {
      return (
        <Box marginTop={'lg'} style={{ width: '100%' }}>
          <Box>
            <ToggleField
              value={elementSchema}
              onHandleChange={() => {}}
              label={titleCase(elementName)}
              disabled={true}
            />
          </Box>
        </Box>
      );
    }
  };

  if (flavor === undefined) {
    return <FullWidthSpinner color="black" size="md" />;
  }

  let result = Object.keys(flavor?.config_schema?.properties || {}).reduce(
    function (r: any, name: any) {
      return (
        (r[name] =
          flavor?.config_schema?.properties[name].type === 'string' &&
          flavor?.config_schema?.properties[name].default === undefined
            ? ''
            : flavor?.config_schema?.properties[name].default),
        r
      );
    },
    {},
  );

  function replaceNullWithEmptyString(obj: any) {
    for (let prop in obj) {
      if (obj[prop] === null) {
        obj[prop] = '';
      } else if (typeof obj[prop] === 'object') {
        replaceNullWithEmptyString(obj[prop]);
      }
    }
    return obj;
  }

  replaceNullWithEmptyString(details?.configuration);

  const mappedObject = {
    ...result,
    ...details?.configuration,
  };

  return (
    <FlexBox.Column marginTop="xl" fullWidth>
      <FlexBox.Row flexDirection="column">
        <Box style={{ width: '30vw' }}>
          <EditField
            disabled
            label={'Flavor Name'}
            optional={false}
            value={details?.flavor}
            placeholder=""
            hasError={false}
            className={styles.field}
          />
        </Box>
        <Box marginTop="lg">
          <ToggleField
            name="Share Component with public"
            value={details?.is_shared}
            label="Share Component with public"
            disabled={true}
          />
        </Box>
      </FlexBox.Row>
      <FlexBox.Row flexDirection="column">
        <Box style={{ width: '80%' }}>
          {Object.keys(mappedObject).map((key, index) => (
            <Fragment key={index}>
              {getFormElement(key, mappedObject[key])}
            </Fragment>
          ))}
        </Box>
      </FlexBox.Row>
    </FlexBox.Column>
  );
};
