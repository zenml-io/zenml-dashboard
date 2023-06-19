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
                  style={{
                    background: 'rgb(233, 234, 236)',
                    border: 'none',
                    borderRadius: '4px',
                  }}
                />
              </Box>

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
                  style={{
                    background: 'rgb(233, 234, 236)',
                    border: 'none',
                    borderRadius: '4px',
                  }}
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
