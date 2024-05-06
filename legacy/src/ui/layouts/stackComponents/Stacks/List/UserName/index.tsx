import React from 'react';
import { DEFAULT_FULL_NAME } from '../../../../../../constants';
import { getInitials } from '../../../../../../utils';
import {
  FlexBox,
  Box,
  ColoredCircle,
  Paragraph,
  Spinner,
  If,
} from '../../../../../components';
import { useService } from './useService';
import { StackComponent } from '../../../../../../api/types';

export const UserName: React.FC<{ stack: StackComponent }> = ({ stack }) => {
  const { fetching, user } = useService({ stack });

  if (fetching) {
    return <Spinner size="xs" color="black" />;
  }

  const userFullName = user.name || DEFAULT_FULL_NAME;
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
