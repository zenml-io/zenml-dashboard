import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import {
  Box,
  FlexBox,
  FormTextField,
  FormPasswordField,
  Paragraph,
  PrimaryButton,
  icons,
} from '../../../components';
import { iconColors } from '../../../../constants';

interface Props {
  label?: string;
  values?: any;
  onSetInputFields: any;
  routeState?: any;
  onSubmit?: any;
  childStateRef?: any;
}

const Selector: React.FC<Props> = ({
  label,
  onSetInputFields,
  values,
  routeState,
  onSubmit,
  childStateRef,
}) => {
  const [inputFields, setInputFields] = useState([]) as any;
  useEffect(() => {
    if (values?.length) {
      childStateRef.current = inputFields;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputFields, childStateRef]);
  useEffect(() => {
    if (
      (routeState?.state?.routeFromComponent ||
        routeState?.state?.routeFromEditComponent) &&
      routeState?.state?.secretId
    ) {
      setInputFields([...values]);
      if (values.length) {
        childStateRef.current = values;
      }
    } else if (
      routeState?.state?.routeFromComponent ||
      routeState?.state?.routeFromEditComponent
    ) {
      if (routeState?.state?.routeFromComponent) {
        const secretKeyValuefromRoute: any = {
          key: routeState?.state?.secretKey,
          value: routeState?.state?.inputData[routeState?.state?.secretKey],
        };

        setInputFields([...inputFields, secretKeyValuefromRoute]);
      }

      if (routeState?.state?.routeFromEditComponent) {
        const secretKeyValuefromRoute: any = {
          key: routeState?.state?.secretKey,
          value:
            routeState?.state?.mappedConfiguration[
              routeState?.state?.secretKey
            ],
        };

        setInputFields([...inputFields, secretKeyValuefromRoute]);
      } else if (values?.length && !routeState?.state?.routeFromEditComponent) {
        setInputFields([...values]);
        childStateRef.current = values;
      }
    } else if (
      values?.length &&
      !routeState?.state?.routeFromComponent &&
      !routeState?.state?.routeFromEditComponent
    ) {
      setInputFields([...values]);
      childStateRef.current = values;
    } else {
      setInputFields([{ key: '', value: '' }]);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [routeState, setInputFields]);

  const handleAdd = () => {
    inputFields.push({ key: '', value: '' });
    setInputFields([...inputFields]);

    handleInputChange();
  };
  const handleDelete = (index: any) => {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
    onSetInputFields(values);
  };

  const handleInputChange = (index?: any, event?: any, type?: any) => {
    const values = [...inputFields];

    if (type === 'key') {
      values[index].key = event;
    }
    if (type === 'value') {
      values[index].value = event;
    }

    setInputFields(values);
    onSetInputFields(values);
  };

  return (
    <Box>
      {label && (
        <Paragraph size="body" style={{ color: 'rgba(66, 66, 64, 0.5)' }}>
          <label htmlFor="key">{label}</label>
        </Paragraph>
      )}
      <FlexBox.Row>
        <Box>
          {inputFields?.map((item: any, index: any) => (
            <Box key={index} marginTop="md" style={{ display: 'flex' }}>
              <Box style={{ width: '30vw' }}>
                <FormTextField
                  onChange={(event: any) =>
                    handleInputChange(index, event, 'key')
                  }
                  label={'Key'}
                  labelColor="rgba(66, 66, 64, 0.5)"
                  value={item?.key}
                  placeholder={''}
                />
              </Box>

              <Box style={{ width: '30vw' }} marginLeft="md">
                <FormPasswordField
                  onChange={(event: any) =>
                    handleInputChange(index, event, 'value')
                  }
                  label={'Value'}
                  labelColor="rgba(66, 66, 64, 0.5)"
                  value={item?.value}
                  placeholder={''}
                  error={{}}
                  showPasswordOption
                />
              </Box>

              <Box
                className="col-sx-2"
                marginTop="lg"
                marginLeft="sm"
                style={{ justifyContent: 'space-between', display: 'flex' }}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  {inputFields?.length > 1 && (
                    <button
                      className={styles.fieldButton}
                      type="button"
                      onClick={() => {
                        handleDelete(index);
                      }}
                    >
                      <icons.delete color={iconColors.grey} />
                    </button>
                  )}

                  {index === inputFields?.length - 1 && (
                    <button
                      className={styles.fieldButton}
                      type="button"
                      onClick={() => handleAdd()}
                    >
                      <icons.addNew color={iconColors.primary} />
                    </button>
                  )}
                </div>
              </Box>
            </Box>
          ))}
        </Box>
        <div className="submit-button"></div>
        <br />
      </FlexBox.Row>
      <FlexBox
        style={{
          position: 'fixed',
          right: '0',
          bottom: '0',
          marginRight: '45px',
        }}
      >
        <Box marginBottom="lg">
          <PrimaryButton onClick={() => onSubmit(inputFields)}>
            Register Secret
          </PrimaryButton>
        </Box>
      </FlexBox>
    </Box>
  );
};

export default Selector;
