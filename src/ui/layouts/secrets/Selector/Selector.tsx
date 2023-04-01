import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import {
  Box,
  FlexBox,
  FormTextField,
  Paragraph,
  icons,
} from '../../../components';
import { iconColors } from '../../../../constants';

interface Props {
  label?: string;
  values?: any;
  onSetInputFields: any;
}

const Selector: React.FC<Props> = ({ label, onSetInputFields, values }) => {
  // const [key, setKey] = useState('');
  // const [value, setValue] = useState('');
  const [inputFields, setInputFields] = useState([]) as any;
  useEffect(() => {
    // ...values,
    // { key: '', value: '' },
    if (values?.length) {
      setInputFields([...values]);
    } else {
      setInputFields([{ key: '', value: '' }]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleAdd = () => {
    inputFields.push({ key: '', value: '' });
    setInputFields([...inputFields]);
    // setKey('')
    // setValue('')
  };

  const handleInputChange = (index: any, event: any, type: any) => {
    const values = [...inputFields];
    if (type === 'key') {
      values[index].key = event;
    } else {
      values[index].value = event;
    }

    setInputFields(values);
    onSetInputFields(values);
    // const keys = values.map((object) => object.key);
    // const value = values.map((object) => object.value);

    // keys.forEach((key: any, i: any) => (result[key] = value[i]));

    // if (event) {
    //   setInputData({
    //     ...inputData,
    //     [name]: {
    //       ...values[parentIndex][name],
    //     },
    //   });
    // }
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
          {console.log()}
          {inputFields?.map((item: any, index: any) => (
            <Box key={index} marginTop="md" style={{ display: 'flex' }}>
              <Box style={{ width: '329px' }}>
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

              <Box style={{ width: '329px' }} marginLeft="md">
                <FormTextField
                  onChange={(event: any) =>
                    handleInputChange(index, event, 'value')
                  }
                  label={'Value'}
                  labelColor="rgba(66, 66, 64, 0.5)"
                  value={item?.value}
                  placeholder={''}
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
                      onClick={() =>
                        setInputFields(
                          inputFields?.filter((e: any) => e !== item),
                        )
                      }
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
    </Box>
  );
};

export default Selector;
