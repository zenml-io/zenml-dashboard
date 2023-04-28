import React from 'react';
import {
  Box,
  FlexBox,
  FormTextField,
  FormPasswordField,
  Paragraph,
} from '../../../components';

interface Props {
  label?: string;
  inputFields: any;
  width?: string;
}

const SelectorDisabled: React.FC<Props> = ({ label, inputFields, width }) => {
  return (
    <Box>
      {label && (
        <Paragraph size="body" style={{ color: 'rgba(66, 66, 64, 0.5)' }}>
          <label htmlFor="key">{label}</label>
        </Paragraph>
      )}

      <FlexBox.Row>
        <Box>
          {Object.entries(inputFields)?.map((item: any, index: any) => (
            <Box key={index} marginTop="md" style={{ display: 'flex' }}>
              <Box style={{ width }}>
                <FormTextField
                  onChange={() => {}}
                  label={'Key'}
                  labelColor="rgba(66, 66, 64, 0.5)"
                  value={item[0]}
                  disabled
                  placeholder={''}
                  style={{ background: 'rgba(168, 168, 168, 0.1)', border: '1px solid #c9cbd0', borderRadius: '4px' }}
                />
              </Box>
              {console.log(item, 'itemitem')}
              <Box style={{ width }} marginLeft="md">
                <FormPasswordField
                  onChange={() => {}}
                  label={'Value'}
                  labelColor="rgba(66, 66, 64, 0.5)"
                  value={item[1]}
                  disabled
                  placeholder={''}
                  error={{}}
                  showPasswordOption
                  style={{ background: 'rgba(168, 168, 168, 0.1)', border: '1px solid #c9cbd0', borderRadius: '4px' }}
                />
              </Box>
            </Box>
          ))}
        </Box>
      </FlexBox.Row>
    </Box>
  );
};

export default SelectorDisabled;
