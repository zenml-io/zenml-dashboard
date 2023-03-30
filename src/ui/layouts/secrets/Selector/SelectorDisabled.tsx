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
}

const SelectorDisabled: React.FC<Props> = ({ label, inputFields }) => {
  return (
    <Box>
      {label && (
        <Paragraph size="body" style={{ color: 'rgba(66, 66, 64, 0.5)' }}>
          <label htmlFor="key">{label}</label>
        </Paragraph>
      )}

      <FlexBox.Row>
        <Box className="form-row">
          {Object.entries(inputFields)?.map((item: any, index: any) => (
            <Box key={index} marginTop="md" style={{ display: 'flex' }}>
              <Box style={{ width: '417px' }}>
                <FormTextField
                  onChange={() => {}}
                  label={'Key'}
                  labelColor="rgba(66, 66, 64, 0.5)"
                  value={item[0]}
                  disabled
                  placeholder={''}
                />
              </Box>
              {console.log(item, 'itemitem')}
              <Box style={{ width: '417px' }} marginLeft="md">
                <FormPasswordField
                  onChange={() => {}}
                  label={'Value'}
                  labelColor="rgba(66, 66, 64, 0.5)"
                  value={item[1]}
                  disabled
                  placeholder={''}
                  error={{}}
                  showPasswordOption
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
