import React from 'react';
import { DEFAULT_FULL_NAME } from '../../../../../constants';
import { getInitials } from '../../../../../utils';
import {
  Box,
  ColoredCircle,
  FlexBox,
  If,
  Paragraph,
  Spinner,
} from '../../../../components';
import { useService } from './useService';
import { Run } from '../../../../../api/types';

export const RunUser: React.FC<{ run: Run }> = ({ run }) => {
  const { fetching, user } = useService({ run });

  if (fetching) {
    return <Spinner size="xs" color="black" />;
  }

  const userFullName = user.full_name || DEFAULT_FULL_NAME;
  const initials = getInitials(userFullName);

  return (
    <If condition={!!userFullName}>
      {() => (
        <FlexBox alignItems="center">
          <Box paddingRight="sm">
            <ColoredCircle color="secondary" size="sm">
              {initials}
            </ColoredCircle>
          </Box>
          <Paragraph size="small">{userFullName}</Paragraph>
        </FlexBox>
      )}
    </If>
  );
};
