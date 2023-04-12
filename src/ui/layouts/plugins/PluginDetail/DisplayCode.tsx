import React from 'react';

import { iconColors } from '../../../../constants';
import { Box, FlexBox, LinkBox, icons } from '../../../components';
import { useToaster } from '../../../hooks';

export const DisplayCode: React.FC<{ code: string }> = ({ code }) => {
  const { successToast } = useToaster();

  return (
    <FlexBox fullWidth style={{ position: 'relative' }}>
      <pre
        style={{
          padding: '30px',
          fontSize: '18px',
          backgroundColor: '#F4F4F4',
          width: '100%',
          borderRadius: '14px',
          maxWidth: '60vw',
          overflowX: 'scroll',
        }}
      >
        {code}
      </pre>

      <LinkBox
        onClick={() => {
          navigator.clipboard.writeText(code);
          successToast({ description: 'Copied to clipboard.' });
        }}
      >
        <Box
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            padding: '16px',
          }}
        >
          <icons.copy color={iconColors.darkGrey} size="xs" />
        </Box>
      </LinkBox>
    </FlexBox>
  );
};
