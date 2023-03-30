import React from 'react';
import { Box, FlexBox, PrimaryButton } from '../../../../components';

// import { callActionForStacksForPagination } from '../../Stacks/useService';

interface Props {}

export const Register: React.FC<Props> = () => {
  return (
    <>
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
