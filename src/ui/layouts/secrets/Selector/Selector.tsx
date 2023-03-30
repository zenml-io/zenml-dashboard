import React, { useState } from 'react';
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
    label?: string, 
    inputFields: any, 
    setInputFields: any
}

const Selector: React.FC<Props> = ({ label, inputFields, setInputFields }) => {

    const [key, setKey] = useState('');
    const [value, setValue] = useState('');

  return (
    <Box>
        {label && <Paragraph size="body" style={{ color: 'rgba(66, 66, 64, 0.5)' }}>
            <label htmlFor="key">{label}</label>
        </Paragraph> 
        }

        <FlexBox.Row>
        <div className="form-row">
            {inputFields?.map((item: any, index: any) => (
                <div key={index} style={{ display: 'flex' }}>
                    <div className="form-group col-sm-5">
                        <FormTextField 
                            onChange={(event: any) => setKey(event)}
                            label={'Key'}
                            labelColor='rgba(66, 66, 64, 0.5)'
                            value={item?.key ? item?.key : key}
                            placeholder={''}
                        />
                    </div>

                    <div className="form-group col-sm-5">
                        <FormTextField
                            onChange={(event: any) => setValue(event)}
                            label={'Value'}
                            labelColor='rgba(66, 66, 64, 0.5)'
                            value={item?.value ? item?.value : value}
                            placeholder={''}
                        />
                    </div>

                    <div className="col-sx-2 " style={{ justifyContent: 'space-between', display: 'flex', marginTop: '10px' }}>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            {index > 0 && (
                                <button className={styles.fieldButton} type="button" onClick={() => setInputFields(inputFields?.filter((e: any) => e !== item))}>
                                    <icons.minusCircle color={iconColors.primary} />
                                </button>
                            )}

                            {index === inputFields?.length - 1 && (
                                <button className={styles.fieldButton} type="button" onClick={() => setInputFields([...inputFields, { key, value }])}>
                                    <icons.plusCircle color={iconColors.primary} />
                                </button>
                            )}
                        </div>
                    </div>

                </div>
            ))}
            </div>
            <div className="submit-button"></div>
        <br />
        </FlexBox.Row>
    </Box>
    )
}

export default Selector