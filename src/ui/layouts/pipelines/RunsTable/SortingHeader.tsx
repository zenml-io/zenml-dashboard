import React from 'react';
import { iconColors, iconSizes } from '../../../../constants';
import { Box, FlexBox, icons, If, LinkBox } from '../../../components';
import { Sorting, SortingDirection } from './types';

import styles from './index.module.scss';

export const SortingHeader: React.FC<{
  onlyOneRow?: boolean;
  sortMethod: void;
  activeSorting: Sorting | null;
  activeSortingDirection: SortingDirection | null;
  sorting: Sorting;
}> = ({
  onlyOneRow,
  children,
  sortMethod,
  activeSorting,
  activeSortingDirection,
  sorting,
}) => {
  return onlyOneRow ? (
    <>{children}</>
  ) : (
    <LinkBox className={styles.sortingBox} onClick={sortMethod}>
      <FlexBox alignItems="center">
        {children}
        <If
          condition={
            !!activeSorting &&
            activeSorting === sorting &&
            activeSortingDirection === 'DESC'
          }
        >
          {() => (
            <Box paddingLeft="xs">
              <icons.chevronDownLight
                color={iconColors.darkGrey}
                size={iconSizes.xs}
              />
            </Box>
          )}
        </If>
        <If
          condition={
            !!activeSorting &&
            activeSorting === sorting &&
            activeSortingDirection === 'ASC'
          }
        >
          {() => (
            <Box paddingLeft="xs">
              <icons.chevronUpLight
                color={iconColors.darkGrey}
                size={iconSizes.xs}
              />
            </Box>
          )}
        </If>
      </FlexBox>
      
    </LinkBox>
  );
};
