import React from 'react';
import { useDispatch } from 'react-redux';

import { iconColors, toasterTypes } from '../../../../constants';
import { showToasterAction } from '../../../../redux/actions';
import { Box, FlexBox, LinkBox, icons } from '../../../components';

export const DisplayCode: React.FC<{ code: string }> = ({ code }) => {
  const dispatch = useDispatch();

  return (
    <FlexBox fullWidth style={{ position: 'relative' }}>
      <pre
        style={{
          padding: '30px',
          fontSize: '18px',
          backgroundColor: '#F4F4F4',
          width: '100%',
          borderRadius: '14px',
        }}
      >
        {code}
      </pre>

      <LinkBox
        onClick={() => {
          navigator.clipboard.writeText(code);

          dispatch(
            showToasterAction({
              description: 'Copied to clipboard.',
              type: toasterTypes.success,
            }),
          );
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
