import React, { useState } from 'react';
import { Box, FlexBox, PrimaryButton, FormTextField, FormDropdownField } from '../../../../components';
import Selector from './Selector';
// import { callActionForStacksForPagination } from '../../Stacks/useService';

interface Props {}

export const Register: React.FC<Props> = () => {
  
  const [secretName, setSecretName] = useState('')
  const [scope, setScope] = useState<any>()
  const [inputFields, setInputFields] = useState([ { key: '', value: '' } ]) as any;
    
  const dropdownOptions = [
    { value: 'user', label: 'User' },
    { value: 'workspace', label: 'Workspace' },
  ];

  return (
    <>
    <FlexBox.Row flexDirection='column' style={{ width: '25%' }}>
      <Box>
        <FormTextField
            label={'Secret name'}
            labelColor="rgba(66, 66, 64, 0.5)"
            placeholder={'Ex.John Doe'}
            value={secretName}
            onChange={(val: string) => setSecretName(val)}
        />
      </Box>
      <Box marginTop='lg'>
        <FormDropdownField
            label={'Scope'}
            labelColor="rgba(66, 66, 64, 0.5)"
            placeholder={'Choose a scope'}
            value={scope}
            onChange={(val: string) => setScope(val)}
            options={dropdownOptions as any}
            style={{ paddingLeft: '10px' }}
        />
      </Box>
      <Box marginTop='lg'>
        <Selector inputFields={inputFields} setInputFields={setInputFields} />
      </Box>
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
          <PrimaryButton
            onClick={
              () => console.log('submit')
              // history.push(
              //   routePaths.secrets.registerSecrets(selectedWorkspace),
              // )
            }
          >
            Register Secret
          </PrimaryButton>
        </Box>
      </FlexBox>
    </>
  );
};
